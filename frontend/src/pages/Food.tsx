import { useState, useEffect } from "react";
import { FOOD_DATA } from "../data/FoodData";
import eatingman from "../assets/eatingman.png";
import { Popcorn, Hamburger, Sandwich, Pizza, Trash2 } from "lucide-react";
import { useDate } from "../contexts/DateContext";
import "../animations.css";

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

interface Meal {
  _id: string;
  mealType: MealType;
  foodName: string;
  quantity: number;
  emissions: number;
  timestamp: string;
}

export const Food = () => {
  const { selectedDate, formatDateForDisplay } = useDate();
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState("");

  const [todaysMeals, setTodaysMeals] = useState<Meal[]>([]);
  const [totalEmissions, setTotalEmissions] = useState(0);

  useEffect(() => {
    fetchMealsForDate();
  }, [selectedDate]);

  const availableFoods = selectedCategory
    ? FOOD_DATA.find((cat) => cat.name === selectedCategory)?.items || []
    : [];

  const fetchMealsForDate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/food/mealsbydate?date=${selectedDate}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setTodaysMeals(data.meals);
      setTotalEmissions(data.totalEmissions);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  };

  const selectMealType = (mealType: MealType) => {
    setSelectedMealType(mealType);
    setSelectedCategory("");
    setSelectedFood("");
    setQuantity("");
  };

  const handleAddMeal = async () => {
    if (!selectedFood || !quantity || !selectedMealType) return;

    const foodItem = availableFoods.find((f) => f.name === selectedFood);
    if (!foodItem) return;

    const emissions = foodItem.kgCO2ePerKg * (parseFloat(quantity) / 1000);

    const mealData = {
      mealType: selectedMealType,
      foodName: selectedFood,
      quantity: parseFloat(quantity),
      emissions,
      date: selectedDate, // Use the selected date from context
    };

    try {
      const response = await fetch("http://localhost:3000/food/uploadmeals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        throw new Error("Failed to save meal");
      }

      console.log("Meal saved successfully!");

      await fetchMealsForDate(); // Updated function name

      setSelectedMealType(null);
      setSelectedCategory("");
      setSelectedFood("");
      setQuantity("");
    } catch (error) {
      console.error("Failed to save meal:", error);
      alert("Failed to save meal. Please try again.");
    }
  };

  const deleteMeal = async (mealId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/food/deletemeals/${mealId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }

      setTodaysMeals((prev) => prev.filter((meal) => meal._id !== mealId));

      await fetchMealsForDate();

      console.log("Meal deleted successfully");
    } catch (error) {
      console.error("Error deleting meal:", error);
      alert("Failed to delete meal. Please try again.");
    }
  };

  return (
    <div className="mr-[10vw] ml-[10vw] mt-2vh max-[1200px]:mr-[2vw] max-[1200px]:ml-[2vw]">
      <h1 className="text-black font-bold text-4xl">Daily Food Tracker</h1>
      <div className="flex items-center mb-2">
      <h2 className="text-gray-600 text-xl font-bold mt-2">
        Selected date: 
      </h2>
      <h2 className="text-white text-xl font-bold mt-2 bg-blue-800 ml-2 p-1 rounded-lg">
        {formatDateForDisplay(selectedDate)}
      </h2>
      </div>
      {/* Today's Summary */}
      <div
        style={{ background: "#FAF0E6" }}
        className="rounded-lg shadow-lg p-6 mb-6"
      >
        <div className="mb-2 flex max-[1000px]:flex-col max-[1000px]:items-center min-[1001px]:justify-center min-[1001px]:items-center gap-4">
          <img
            src={eatingman}
            alt="mascot riding bus"
            className="h-96 min-[2000px]:h-[550px] w-auto rounded-tr-lg rounded-tl-[40px] rounded-bl-lg rounded-br-lg"
          />
          <h4 className="max-[1000px]:hidden text-gray-700 text-lg min-[2000px]:text-2xl leading-relaxed font-semibold max-w-xl min-[2000px]:max-w-3xl text-center bg-green-200 p-12 min-[2000px]:p-16 rounded-full shadow-sm">
            Track your daily food carbon footprint with ease. Whether you're
            having breakfast, lunch, dinner, or a snack, we help you understand
            the environmental impact of your meals. Simply select your meal type
            below, enter what you ate and the quantity, and we'll calculate the
            CO₂ emissions for you. Every conscious food choice contributes to a
            healthier planet!
          </h4>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Today's Food Emissions
          </h2>
          <div className="text-right">
            <p className="text-4xl font-bold text-green-600">
              {totalEmissions.toFixed(2)}
            </p>
            <p className="text-gray-600">kg CO₂e</p>
          </div>
        </div>

        {/* Meal Type Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <button
            onClick={() => selectMealType("Breakfast")}
            className={`transport-button ${
              selectedMealType === "Breakfast" ? "active" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <Sandwich color="currentColor" />
            </div>
            <div className="text-sm font-medium">Add Breakfast</div>
          </button>
          <button
            onClick={() => selectMealType("Lunch")}
            className={`transport-button ${
              selectedMealType === "Lunch" ? "active" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <Hamburger color="currentColor" />
            </div>
            <div className="text-sm font-medium">Add Lunch</div>
          </button>
          <button
            onClick={() => selectMealType("Dinner")}
            className={`transport-button ${
              selectedMealType === "Dinner" ? "active" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <Pizza color="currentColor" />
            </div>
            <div className="text-sm font-medium">Add Dinner</div>
          </button>
          <button
            onClick={() => selectMealType("Snack")}
            className={`transport-button ${
              selectedMealType === "Snack" ? "active" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <Popcorn color="currentColor" />
            </div>
            <div className="text-sm font-medium">Add Snack</div>
          </button>
        </div>

        {/* Calculator Section - Shows when meal type is selected */}
        {selectedMealType && (
          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Add {selectedMealType}
              </h3>
              <button
                onClick={() => setSelectedMealType(null)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>

            {/* Category Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Step 1: Select Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FOOD_DATA.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setSelectedFood("");
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCategory === category.name
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Food Selection */}
            {selectedCategory && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Step 2: Select Food Item
                </label>
                <select
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">-- Choose a food item --</option>
                  {availableFoods.map((food) => (
                    <option key={food.name} value={food.name}>
                      {food.name} ({food.kgCO2ePerKg} kg CO₂e/kg)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Input */}
            {selectedFood && (
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Step 3: Enter Quantity (g)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g., 250"
                  step="1"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}

            {/* Add Meal Button */}
            <button
              onClick={handleAddMeal}
              disabled={!selectedFood || !quantity}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Meal for {selectedDate}
            </button>
          </div>
        )}

        {/* Meals List for Selected Date */}
        <div className={selectedMealType ? "border-t pt-6 mt-6" : ""}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {formatDateForDisplay(selectedDate)} Meals
          </h3>
          {todaysMeals.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No meals logged for {selectedDate}. Add your first meal above!
            </p>
          ) : (
            <div className="space-y-2">
              {todaysMeals.map((meal) => (
                <div
                  key={meal._id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-800">
                      {meal.mealType}
                    </span>
                    <span className="text-gray-600 ml-2">
                      • {meal.foodName}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({meal.quantity} g)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-green-600 font-semibold">
                      {meal.emissions.toFixed(2)} kg CO₂e
                    </div>
                    <button
                      onClick={() => deleteMeal(meal._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                      title="Delete meal"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Did you know?</h3>
        <ul className="text-gray-700 space-y-2">
          <li>• Beef produces ~100 kg CO₂e per kg (highest impact)</li>
          <li>• Plant-based foods typically produce &lt;5 kg CO₂e per kg</li>
          <li>• Switching from beef to chicken reduces emissions by ~90%</li>
          <li>• Tofu and legumes have similar emissions to vegetables</li>
        </ul>
      </div>
    </div>
  );
};

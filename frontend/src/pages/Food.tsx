import { useState, useEffect } from "react";
import { FOOD_DATA } from "../data/FoodData";

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

interface Meal {
  id: string;
  mealType: MealType;
  foodName: string;
  quantity: number;
  emissions: number;
  timestamp: string;
}

export const Food = () => {
  // Calculator state
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState("");

  // Today's meals
  const [todaysMeals, setTodaysMeals] = useState<Meal[]>([]);
  const [totalEmissions, setTotalEmissions] = useState(0);

  // Get available food items for selected category
  const availableFoods = selectedCategory
    ? FOOD_DATA.find((cat) => cat.name === selectedCategory)?.items || []
    : [];

  // Fetch today's meals from backend
  useEffect(() => {
    fetchTodaysMeals();
  }, []);

  const fetchTodaysMeals = async () => {
    try {
      const response = await fetch('http://localhost:3000/food/todaysmeals', { credentials: 'include' });
      const data = await response.json();
      setTodaysMeals(data.meals);
      setTotalEmissions(data.totalEmissions);  // Backend already calculated this
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    }
  };

  const selectMealType = (mealType: MealType) => {
    setSelectedMealType(mealType);
    // Reset calculator when changing meal type
    setSelectedCategory("");
    setSelectedFood("");
    setQuantity("");
  };

  const handleAddMeal = async () => {
    if (!selectedFood || !quantity || !selectedMealType) return;

    // Find the food item and calculate emissions
    const foodItem = availableFoods.find((f) => f.name === selectedFood);
    if (!foodItem) return;

    const emissions = foodItem.kgCO2ePerKg * parseFloat(quantity);

    const mealData = {
      mealType: selectedMealType,
      foodName: selectedFood,
      quantity: parseFloat(quantity),
      emissions,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await fetch('http://localhost:3000/food/uploadmeals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(mealData)
      });

      if (!response.ok) {
        throw new Error('Failed to save meal');
      }

      console.log('Meal saved successfully!');

      // Refresh the meals list
      await fetchTodaysMeals();
      
      // Reset calculator
      setSelectedMealType(null);
      setSelectedCategory("");
      setSelectedFood("");
      setQuantity("");
    } catch (error) {
      console.error('Failed to save meal:', error);
      alert('Failed to save meal. Please try again.');
    }
  };

  return (
    <div className="mr-10vw ml-10vw mt-2vh">
      <h1 className="text-black font-semibold text-4xl mb-8">Daily Food Tracker</h1>
      
      {/* Today's Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Today's Food Emissions</h2>
          <div className="text-right">
            <p className="text-4xl font-bold text-green-600">{totalEmissions.toFixed(2)}</p>
            <p className="text-gray-600">kg CO₂e</p>
          </div>
        </div>

        {/* Meal Type Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => selectMealType("Breakfast")}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedMealType === "Breakfast"
                ? "bg-yellow-100 border-yellow-400"
                : "bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
            }`}
          >
            <div className="text-3xl mb-1">🍳</div>
            <div className="text-sm font-medium text-gray-700">Add Breakfast</div>
          </button>
          <button
            onClick={() => selectMealType("Lunch")}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedMealType === "Lunch"
                ? "bg-orange-100 border-orange-400"
                : "bg-orange-50 hover:bg-orange-100 border-orange-200"
            }`}
          >
            <div className="text-3xl mb-1">🍱</div>
            <div className="text-sm font-medium text-gray-700">Add Lunch</div>
          </button>
          <button
            onClick={() => selectMealType("Dinner")}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedMealType === "Dinner"
                ? "bg-purple-100 border-purple-400"
                : "bg-purple-50 hover:bg-purple-100 border-purple-200"
            }`}
          >
            <div className="text-3xl mb-1">🍽️</div>
            <div className="text-sm font-medium text-gray-700">Add Dinner</div>
          </button>
          <button
            onClick={() => selectMealType("Snack")}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedMealType === "Snack"
                ? "bg-pink-100 border-pink-400"
                : "bg-pink-50 hover:bg-pink-100 border-pink-200"
            }`}
          >
            <div className="text-3xl mb-1">🍿</div>
            <div className="text-sm font-medium text-gray-700">Add Snack</div>
          </button>
        </div>

        {/* Calculator Section - Shows when meal type is selected */}
        {selectedMealType && (
          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add {selectedMealType}</h3>
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
                    <div className="text-3xl mb-1">{category.emoji}</div>
                    <div className="text-sm font-medium text-gray-700">{category.name}</div>
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
                  Step 3: Enter Quantity (kg)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g., 0.5"
                  step="0.01"
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
              Add to Today's Meals
            </button>
          </div>
        )}

        {/* Today's Meals List */}
        <div className={selectedMealType ? "border-t pt-6 mt-6" : ""}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Meals</h3>
          {todaysMeals.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No meals logged yet. Add your first meal above!</p>
          ) : (
            <div className="space-y-2">
              {todaysMeals.map((meal) => (
                <div key={meal.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-800">{meal.mealType}</span>
                    <span className="text-gray-600 ml-2">• {meal.foodName}</span>
                    <span className="text-gray-500 text-sm ml-2">({meal.quantity} kg)</span>
                  </div>
                  <div className="text-green-600 font-semibold">{meal.emissions.toFixed(2)} kg CO₂e</div>
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

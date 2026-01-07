import { useEffect, useState } from "react";
import { ITEM_DATA } from "../data/ShoppingData";
import { Shirt, Tv, Sofa, Trash2 } from "lucide-react";
import { useDate } from "../contexts/DateContext";
import shoppingMan from "../assets/shoppingman.png";
import "../animations.css";

type ItemType =
  | "Clothing"
  | "Electronics"
  | "Furniture"
  | "Material-based-purchases";

interface Item {
  _id: string;
  itemType: ItemType;
  itemName: string;
  quantity: number;
  emissions: number;
  timestamp: string;
}

export const Shopping = () => {
  const { selectedDate, formatDateForDisplay } = useDate();
  const [selectedItemType, setSelectedItemType] = useState<ItemType | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const [todaysPurchases, setTodaysPurchases] = useState<Item[]>([]);
  const [totalEmissions, setTotalEmissions] = useState(0);

  useEffect(() => {
    fetchItemsForDate();
  }, [selectedDate]);

  const availableItems = selectedItemType
    ? ITEM_DATA.find((cat) => cat.name === selectedItemType)?.items || []
    : [];

  const fetchItemsForDate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/shopping/itemsbydate?date=${selectedDate}`,
        { credentials: "include" }
      );
      const data = await response.json();
      setTodaysPurchases(data.items || []);
      setTotalEmissions(data.totalEmissions || 0);
    } catch (error) {
      console.error("failed to fetch todays items");
      setTodaysPurchases([]);
      setTotalEmissions(0);
    }
  };

  const selectItemType = (itemType: ItemType) => {
    setSelectedItemType(itemType);
    setSelectedItem("");
    setQuantity("");
  };

  const handleAddItem = async () => {
    if (!selectedItem || !quantity || !selectedItemType) return;

    const shoppingItem = availableItems.find((f) => f.name === selectedItem);
    if (!shoppingItem) return;

    const emissions = shoppingItem.kgCO2ePerKg
      ? shoppingItem.kgCO2ePerKg * parseFloat(quantity)
      : shoppingItem.kgCO2ePerItem! * parseFloat(quantity);

    const itemData = {
      itemType: selectedItemType,
      itemName: selectedItem,
      quantity: parseFloat(quantity),
      emissions,
      date: selectedDate,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/shopping/uploaditem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save item");
      }

      console.log("Item saved successfully!");

      await fetchItemsForDate();

      setSelectedItemType(null);
      setSelectedItem("");
      setQuantity("");
    } catch (error) {
      console.error("Failed to save item:", error);
      alert("Failed to save item. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/shopping/deleteitem/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      await fetchItemsForDate();
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  return (
    <>
      <div className="mr-[10vw] ml-[10vw] mt-[2vh] max-[1200px]:mr-[2vw] max-[1200px]:ml-[2vw] ">
        <h1 className="text-black font-bold text-4xl">Shopping</h1>
         <div className="flex items-center mb-2">
      <h2 className="text-gray-600 text-xl font-bold mt-2">
        Selected date: 
      </h2>
      <h2 className="text-white text-xl font-bold mt-2 bg-blue-800 ml-2 p-1 rounded-lg">
        {formatDateForDisplay(selectedDate)}
      </h2>
      </div>
        <section
          style={{ background: "#FAF0E6" }}
          className="rounded-lg shadow-lg p-6 mb-6"
        >
          <div className="mb-2 flex max-[1000px]:flex-col max-[1000px]:items-center min-[1001px]:justify-center min-[1001px]:items-center gap-4">
            <img
              src={shoppingMan}
              alt="mascot riding bus"
              className="h-96 min-[2000px]:h-[550px] w-auto rounded-tr-lg rounded-tl-[40px] rounded-bl-lg rounded-br-lg"
            />
            <h4 className="max-[1000px]:hidden text-gray-700 text-lg min-[2000px]:text-2xl leading-relaxed font-semibold max-w-xl min-[2000px]:max-w-3xl text-center bg-green-200 p-12 min-[2000px]:p-16 rounded-full shadow-sm">
              Track your daily shopping carbon footprint with ease. Whether
              you're buying clothing, electronics, furniture, or other material
              goods, we help you understand the environmental impact of your
              purchases. Simply select your item category below, enter the
              details of what you bought, and we'll calculate the CO₂ emissions
              for you. Every mindful purchase makes a difference!
            </h4>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-black font-semibold text-2xl ">
              Todays Consumed emissions
            </h2>
            <div className="text-right">
              <p className="text-4xl font-bold text-green-600">
                {totalEmissions.toFixed(2)}
              </p>
              <p className="text-gray-600">kg CO₂e</p>
            </div>
          </div>

          {/* button section  */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <button
              onClick={() => selectItemType("Clothing")}
              className={`transport-button ${
                selectedItemType === "Clothing" ? "active" : ""
              }`}
            >
              <div className="flex justify-center">
                <Shirt color="currentColor"></Shirt>
              </div>
              <div className="text-sm font-medium">Add Clothing</div>
            </button>
            <button
              onClick={() => selectItemType("Electronics")}
              className={`transport-button ${
                selectedItemType === "Electronics" ? "active" : ""
              }`}
            >
              <div className="flex justify-center">
                <Tv color="currentColor"></Tv>
              </div>
              <div className="text-sm font-medium">Add Electronics</div>
            </button>
            <button
              onClick={() => selectItemType("Furniture")}
              className={`transport-button ${
                selectedItemType === "Furniture" ? "active" : ""
              }`}
            >
              <div className="flex justify-center">
                <Sofa color="currentColor"></Sofa>
              </div>
              <div className="text-sm font-medium">Add Furniture</div>
            </button>
            <button
              onClick={() => selectItemType("Material-based-purchases")}
              className={`transport-button ${
                selectedItemType === "Material-based-purchases" ? "active" : ""
              }`}
            >
              <div className="flex justify-center">
                <Shirt color="currentColor"></Shirt>
              </div>
              <div className="text-sm font-medium">
                Add Material-based-purchases
              </div>
            </button>
          </div>
          {/* catagory section */}
          {selectedItemType && (
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add {selectedItemType}
                </h3>
                <button
                  onClick={() => setSelectedItemType(null)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Cancel
                </button>
              </div>

              {/* select item section */}
              <div className="mb-4">
                <p className="p-4 bg-red-400 mt-2 mb-2 rounded-l text-lg font-semibold">
                  note that data for furniture and electionics uses average
                  emission factors based on cradele to gate values. and there
                  calculations uses co2e/item and not its weight
                </p>
                <label className="block text-gray-700 font-medium mb-2">
                  Step 1: Select {selectedItemType}
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Choose Purchased {selectedItemType}</option>
                  {availableItems.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} (
                      {item.kgCO2ePerKg
                        ? `${item.kgCO2ePerKg} kg CO₂e/kg`
                        : `${item.kgCO2ePerItem} kg CO₂e/item`}
                      )
                    </option>
                  ))}
                </select>
              </div>

              {selectedItem &&
                (() => {
                  const item = availableItems.find(
                    (i) => i.name === selectedItem
                  );
                  const isWeightBased = item?.kgCO2ePerKg !== undefined;

                  return (
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Step 2: Enter{" "}
                        {isWeightBased ? "Weight (kg)" : "Quantity"}
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder={isWeightBased ? "e.g., 0.5" : "e.g., 1"}
                        step={isWeightBased ? "0.01" : "1"}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  );
                })()}
              {/* Add Meal Button */}
              <button
                onClick={handleAddItem}
                disabled={!selectedItem || !quantity}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add to Today's Purchase
              </button>
            </div>
          )}
          {/* Today's shopping section */}
          <div className={selectedItemType ? "border-t pt-6 mt-6" : ""}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Today's purchases
            </h3>
            {todaysPurchases.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No items logged yet. Add your first item above!
              </p>
            ) : (
              <div className="space-y-2">
                {todaysPurchases.map((item) => {
                  const isQuantityBased =
                    item.itemType === "Electronics" ||
                    item.itemType === "Furniture";
                  const displayText = isQuantityBased
                    ? `quantity: ${item.quantity}`
                    : `${item.quantity} kg`;

                  return (
                    <div
                      key={item._id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-gray-800">
                          {item.itemType}
                        </span>
                        <span className="text-gray-600 ml-2">
                          • {item.itemName}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          ({displayText})
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-green-600 font-semibold">
                          {item.emissions.toFixed(2)} kg CO₂e
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-300 p-2 rounded transition-colors"
                          title="Delete item"
                        >
                          <Trash2></Trash2>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

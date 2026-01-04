interface FoodItem {
  name: string;
  kgCO2ePerKg: number;
}

 export interface FoodCategory {
  name: string;
  items: FoodItem[];
}


export const FOOD_DATA: FoodCategory[] = [
  {
    name: "Meat",
    items: [
      { name: "Beef (beef herd)", kgCO2ePerKg: 99.48 },
      { name: "Beef (dairy herd)", kgCO2ePerKg: 33.3 },
      { name: "Lamb & Mutton", kgCO2ePerKg: 39.72 },
      { name: "Pig Meat", kgCO2ePerKg: 12.31 },
      { name: "Poultry Meat", kgCO2ePerKg: 9.87 },
    ],
  },
  {
    name: "Dairy",
    items: [
      { name: "Milk", kgCO2ePerKg: 3.2 },
      { name: "Cheese", kgCO2ePerKg: 23.88 },
      { name: "Eggs", kgCO2ePerKg: 4.67 },
    ],
  },
  {
    name: "Seafood",
    items: [
      { name: "Fish (farmed)", kgCO2ePerKg: 13.63 },
      { name: "Prawns (farmed)", kgCO2ePerKg: 26.87 },
    ],
  },
  {
    name: "Grains & Staples",
    items: [
      { name: "Wheat & Rye", kgCO2ePerKg: 1.57 },
      { name: "Rice", kgCO2ePerKg: 4.45 },
      { name: "Maize", kgCO2ePerKg: 1.7 },
      { name: "Oatmeal", kgCO2ePerKg: 2.48 },
      { name: "Barley", kgCO2ePerKg: 1.18 },
      { name: "Potatoes", kgCO2ePerKg: 0.46 },
      { name: "Cassava", kgCO2ePerKg: 1.32 },
    ],
  },
  {
    name: "Plant-Based",
    items: [
      { name: "Tofu", kgCO2ePerKg: 3.16 },
      { name: "Soy milk", kgCO2ePerKg: 0.98 },
      { name: "Nuts", kgCO2ePerKg: 0.43 },
      { name: "Peas", kgCO2ePerKg: 0.98 },
      { name: "Groundnuts", kgCO2ePerKg: 3.23 },
      { name: "Other Pulses", kgCO2ePerKg: 1.79 },
      { name: "Tomatoes", kgCO2ePerKg: 2.09 },
      { name: "Onions & Leeks", kgCO2ePerKg: 0.5 },
      { name: "Root Vegetables", kgCO2ePerKg: 0.43 },
      { name: "Brassicas", kgCO2ePerKg: 0.51 },
      { name: "Other Vegetables", kgCO2ePerKg: 0.53 },
      { name: "Apples", kgCO2ePerKg: 0.43 },
      { name: "Bananas", kgCO2ePerKg: 0.86 },
      { name: "Citrus Fruit", kgCO2ePerKg: 0.39 },
      { name: "Berries & Grapes", kgCO2ePerKg: 1.53 },
      { name: "Other Fruit", kgCO2ePerKg: 1.05 },
      { name: "Cane Sugar", kgCO2ePerKg: 3.2 },
      { name: "Beet Sugar", kgCO2ePerKg: 1.81 },
    ],
  },
];
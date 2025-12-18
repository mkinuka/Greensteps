interface FoodItem {
  name: string;
  kgCO2ePerKg: number;
}

 export interface FoodCategory {
  name: string;
  emoji: string;
  items: FoodItem[];
}
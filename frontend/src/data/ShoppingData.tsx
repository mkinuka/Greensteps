export interface ShoppingItem {
  name: string;
  kgCO2ePerKg?: number;
  kgCO2ePerItem?: number;
}

export interface ItemCategory {
  name: string;
  items: ShoppingItem[];
}

export const ITEM_DATA: ItemCategory[] = [
  {
    name: "Clothing",
    items: [
      { name: "Cotton garment (ca 1 kg)", kgCO2ePerKg: 28 },
      { name: "Polyester garment", kgCO2ePerKg: 21 },
      { name: "Wool garment", kgCO2ePerKg: 46 },
      { name: "Silk garment", kgCO2ePerKg: 25 },
      { name: "Flax/linen garment", kgCO2ePerKg: 15 },
      { name: "Viscose garment", kgCO2ePerKg: 30 },
      { name: "Acrylic garment", kgCO2ePerKg: 38 },
    ],
  },
  {
    name: "Electronics",
    items: [
      { name: "Vacuum cleaner", kgCO2ePerItem: 40 },
      { name: "Television 40 inch", kgCO2ePerItem: 300 },
      { name: "Smartphone", kgCO2ePerItem: 60 },
      { name: "Refrigerator", kgCO2ePerItem: 250 },
      { name: "Freezer", kgCO2ePerItem: 250 },
      { name: "Washing machine", kgCO2ePerItem: 250 },
      { name: "Clothes dryer", kgCO2ePerItem: 240 },
    ],
  },
  {
    name: "Furniture",
    items: [
     { name: "Sofa three sit", kgCO2ePerItem: 280 }, 
     { name: "Bed (90 cm)", kgCO2ePerItem: 280 }, 
     { name: "Dining set (table + 6 chairs)", kgCO2ePerItem: 145 }, 
     { name: "Coffee table", kgCO2ePerItem: 57 }, 
     { name: "Rug large", kgCO2ePerItem: 110 }, 
     { name: "Two long curtains", kgCO2ePerItem: 100 }, 
     { name: "Sectional sofa", kgCO2ePerItem: 30 }, 
     { name: "Recliner/armchair", kgCO2ePerItem: 42.5 },
     { name: "Wardrobe", kgCO2ePerItem: 90 },
     { name: "Dresser", kgCO2ePerItem: 45 },
    ],
  },
  {

    name: "Material-based-purchases",
    items: [
     { name: "Solid wood", kgCO2ePerKg: 0.6 },
     { name: "MDF / particle board", kgCO2ePerKg: 1.2 },
     { name: "Steel", kgCO2ePerKg: 2.2 },
     { name: "Aluminium", kgCO2ePerKg: 9 },
     { name: "Plastics / foam", kgCO2ePerKg: 3.5 }
    ]
  }
];

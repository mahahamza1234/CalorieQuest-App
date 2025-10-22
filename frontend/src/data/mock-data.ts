import { Restaurant } from "@/types";

export const restaurants: Restaurant[] = [
  {
    restaurant_id: "mcdonalds-1",
    name: "McDonald's",
    address: "123 Main St, Anytown, USA",
    latitude: 34.0522,
    longitude: -118.2437,
    menuItems: [
      { item_id: "mcd-1", name: "Egg McMuffin", calorie_count: 310 },
      { item_id: "mcd-2", name: "McDouble", calorie_count: 400 },
      { item_id: "mcd-3", name: "Small French Fries", calorie_count: 230 },
      { item_id: "mcd-4", name: "Chicken McNuggets (6pc)", calorie_count: 250 },
      { item_id: "mcd-5", name: "Side Salad", calorie_count: 20 },
    ],
  },
  {
    restaurant_id: "subway-1",
    name: "Subway",
    address: "456 Oak Ave, Anytown, USA",
    latitude: 34.055,
    longitude: -118.25,
    menuItems: [
      { item_id: "sub-1", name: "6\" Turkey Breast Sub", calorie_count: 250 },
      { item_id: "sub-2", name: "6\" Veggie Delite Sub", calorie_count: 200 },
      { item_id: "sub-3", name: "Black Forest Ham Salad", calorie_count: 110 },
      { item_id: "sub-4", name: "6\" Roast Beef Sub", calorie_count: 290 },
    ],
  },
  {
    restaurant_id: "starbucks-1",
    name: "Starbucks",
    address: "789 Pine Ln, Anytown, USA",
    latitude: 34.05,
    longitude: -118.24,
    menuItems: [
      { item_id: "sbx-1", name: "Spinach, Feta & Egg White Wrap", calorie_count: 290 },
      { item_id: "sbx-2", name: "Rolled & Steel-Cut Oatmeal", calorie_count: 160 },
      { item_id: "sbx-3", name: "Egg White & Roasted Red Pepper Egg Bites", calorie_count: 170 },
      { item_id: "sbx-4", name: "Tall Caffe Latte with 2% Milk", calorie_count: 150 },
    ],
  },
  {
    restaurant_id: "chickfila-1",
    name: "Chick-fil-A",
    address: "101 Maple Rd, Anytown, USA",
    latitude: 34.06,
    longitude: -118.23,
    menuItems: [
      { item_id: "cfa-1", name: "Grilled Chicken Sandwich", calorie_count: 390 },
      { item_id: "cfa-2", name: "Grilled Nuggets (8ct)", calorie_count: 130 },
      { item_id: "cfa-3", name: "Market Salad with Grilled Chicken", calorie_count: 250 },
      { item_id: "cfa-4", name: "Side Salad", calorie_count: 80 },
      { item_id: "cfa-5", name: "Fruit Cup (Medium)", calorie_count: 60 },
    ],
  },
  {
    restaurant_id: "chipotle-1",
    name: "Chipotle",
    address: "212 Birch Blvd, Anytown, USA",
    latitude: 34.04,
    longitude: -118.26,
    menuItems: [
      { item_id: "chip-1", name: "Steak Burrito Bowl (basic)", calorie_count: 470 },
      { item_id: "chip-2", name: "Chicken Salad (basic)", calorie_count: 340 },
      { item_id: "chip-3", name: "Sofritas Tacos (3, basic)", calorie_count: 490 },
      { item_id: "chip-4", name: "Veggie Burrito Bowl (basic)", calorie_count: 410 },
    ],
  },
];
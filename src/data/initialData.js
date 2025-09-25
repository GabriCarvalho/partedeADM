// src/data/initialData.js

export const initialMockRestaurants = [
  {
    id: "rest1",
    name: "Hamburgueria do Zé",
    address: "Rua Principal, 123",
    phone: "(11) 98765-4321",
    logo: null,
    openingHours: "Seg-Dom: 18h às 23h",
    description: "Os melhores hambúrgueres artesanais da cidade!",
  },
  {
    id: "rest2",
    name: "Burger Mania",
    address: "Av. Secundária, 456",
    phone: "(21) 91234-5678",
    logo: null,
    openingHours: "Ter-Sáb: 17h às 22h",
    description: "Hambúrgueres criativos para todos os gostos.",
  },
];

export const initialMockTotems = [
  {
    id: "totemA1",
    restaurantId: "rest1",
    name: "Totem Principal",
    status: "online",
  },
  {
    id: "totemA2",
    restaurantId: "rest1",
    name: "Totem Drive-Thru",
    status: "offline",
  },
  {
    id: "totemB1",
    restaurantId: "rest2",
    name: "Totem Loja",
    status: "online",
  },
];

export const initialIngredients = [
  { id: 1, name: "Pão de Hambúrguer", category: "Pães", price: 0 },
  { id: 2, name: "Hambúrguer 150g", category: "Carnes", price: 0 },
  { id: 3, name: "Alface", category: "Vegetais", price: 0 },
  { id: 4, name: "Tomate", category: "Vegetais", price: 0 },
  { id: 5, name: "Cebola", category: "Vegetais", price: 0 },
  { id: 6, name: "Queijo Cheddar", category: "Queijos", price: 2.5 },
  { id: 7, name: "Bacon", category: "Carnes", price: 4.0 },
  { id: 8, name: "Maionese", category: "Molhos", price: 0 },
  { id: 9, name: "Ketchup", category: "Molhos", price: 0 },
  { id: 10, name: "Mostarda", category: "Molhos", price: 0 },
];

export const initialIngredientCategories = [
  "Pães",
  "Carnes",
  "Vegetais",
  "Queijos",
  "Molhos",
  "Outros",
];

export const initialCategories = [
  "Hambúrgueres",
  "Bebidas",
  "Sobremesas",
  "Porções",
];

export const initialComplementItems = [
  { id: 101, name: "Bacon Extra", price: 4.5, available: true },
  { id: 102, name: "Cheddar Cremoso", price: 3.0, available: true },
  { id: 103, name: "Batata Frita P", price: 8.0, available: true },
  { id: 104, name: "Coca-Cola Lata", price: 5.0, available: true },
  { id: 105, name: "Guaraná Lata", price: 5.0, available: true },
];

export const initialComplementGroups = [
  {
    id: 201,
    name: "Adicione Turbinadas",
    min: 0,
    max: 3,
    required: false,
    itemIds: [101, 102],
  },
  {
    id: 202,
    name: "Escolha sua Bebida",
    min: 1,
    max: 1,
    required: true,
    itemIds: [104, 105],
  },
];

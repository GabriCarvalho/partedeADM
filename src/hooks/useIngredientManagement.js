// src/hooks/useIngredientManagement.js
import { useState } from "react";
import {
  initialIngredients,
  initialIngredientCategories,
} from "@/data/initialData";

export const useIngredientManagement = (showDbModal) => {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    category: "",
    price: "",
  });
  const ingredientCategories = initialIngredientCategories;

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const ingredient = {
      id: Date.now(),
      name: newIngredient.name,
      category: newIngredient.category,
      price: parseFloat(newIngredient.price) || 0,
    };
    setIngredients((prev) => [...prev, ingredient]);
    showDbModal(
      "Adicionar Ingrediente",
      `Salvando ingrediente: ${ingredient.name}`
    );
    setNewIngredient({ name: "", category: "", price: "" });
  };

  const handleDeleteIngredient = (id) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
    showDbModal("Deletar Ingrediente", `Removendo ingrediente ID: ${id}`);
  };

  const getIngredientsByIds = (ids) => {
    return ingredients.filter((ingredient) => ids.includes(ingredient.id));
  };

  return {
    ingredients,
    setIngredients,
    newIngredient,
    setNewIngredient,
    ingredientCategories,
    handleAddIngredient,
    handleDeleteIngredient,
    getIngredientsByIds,
  };
};

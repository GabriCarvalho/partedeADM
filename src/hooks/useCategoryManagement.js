// src/hooks/useCategoryManagement.js
import { useState } from "react";
import { initialCategories } from "@/data/initialData";

export const useCategoryManagement = (showDbModal) => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories((prev) => [...prev, newCategoryName]);
      showDbModal(
        "Adicionar Categoria",
        `Salvando categoria: ${newCategoryName}`
      );
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (categoryName) => {
    setCategories((prev) => prev.filter((cat) => cat !== categoryName));
    showDbModal("Deletar Categoria", `Removendo categoria: ${categoryName}`);
  };

  return {
    categories,
    setCategories,
    newCategoryName,
    setNewCategoryName,
    handleAddCategory,
    handleDeleteCategory,
  };
};

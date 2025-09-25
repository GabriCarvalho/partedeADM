// src/hooks/useProductManagement.js
import { useState } from "react";

export const useProductManagement = (
  selectedRestaurant,
  showDbModal,
  ingredients,
  complementGroups
) => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    ingredients: [],
    complementGroups: [],
    available: true,
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!selectedRestaurant) {
      showDbModal(
        "Erro",
        "Nenhum restaurante selecionado para adicionar o produto."
      );
      return;
    }
    const product = {
      id: Date.now(),
      ...productForm,
      price: parseFloat(productForm.price) || 0,
      createdAt: new Date().toISOString(),
      restaurantId: selectedRestaurant.id, // Associando ao restaurante
    };
    setProducts((prev) => [...prev, product]);
    showDbModal("Adicionar Produto", `Salvando produto: ${product.name}`);
    setProductForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
      ingredients: [],
      complementGroups: [],
      available: true,
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showDbModal("Deletar Produto", `Removendo produto ID: ${id}`);
  };

  const handleToggleProductAvailability = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, available: !product.available }
          : product
      )
    );
  };

  const handleIngredientSelection = (ingredientId) => {
    setProductForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredientId)
        ? prev.ingredients.filter((id) => id !== ingredientId)
        : [...prev.ingredients, ingredientId],
    }));
  };

  const handleComplementGroupSelection = (groupId) => {
    setProductForm((prev) => ({
      ...prev,
      complementGroups: prev.complementGroups.includes(groupId)
        ? prev.complementGroups.filter((id) => id !== groupId)
        : [...prev.complementGroups, groupId],
    }));
  };

  return {
    products,
    setProducts,
    productForm,
    setProductForm,
    handleAddProduct,
    handleDeleteProduct,
    handleToggleProductAvailability,
    handleIngredientSelection,
    handleComplementGroupSelection,
  };
};

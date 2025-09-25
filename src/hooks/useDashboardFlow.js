// src/hooks/useDashboardFlow.js
import { useState, useEffect } from "react";
import { initialMockRestaurants, initialMockTotems } from "@/data/initialData"; // Importa os dados iniciais

export const useDashboardFlow = (showDbModal) => {
  const [restaurants, setRestaurants] = useState(initialMockRestaurants);
  const [totems, setTotems] = useState(initialMockTotems);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedTotem, setSelectedTotem] = useState(null);
  const [availableTotems, setAvailableTotems] = useState([]);

  const [showCreateRestaurantForm, setShowCreateRestaurantForm] =
    useState(false);
  const [newRestaurantForm, setNewRestaurantForm] = useState({
    name: "",
    address: "",
    phone: "",
    openingHours: "",
    description: "",
  });

  const [showCreateTotemForm, setShowCreateTotemForm] = useState(false);
  const [newTotemForm, setNewTotemForm] = useState({
    name: "",
    status: "online",
  });

  useEffect(() => {
    if (selectedRestaurant) {
      setAvailableTotems(
        totems.filter((t) => t.restaurantId === selectedRestaurant.id)
      );
    } else {
      setAvailableTotems([]);
    }
  }, [selectedRestaurant, totems]);

  const handleSelectRestaurant = (restaurantId) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    setSelectedRestaurant(restaurant);
    setSelectedTotem(null);
  };

  const handleSelectTotem = (totemId) => {
    const totem = availableTotems.find((t) => t.id === totemId);
    setSelectedTotem(totem);
  };

  const handleBackToRestaurantSelection = () => {
    setSelectedRestaurant(null);
    setSelectedTotem(null);
    setAvailableTotems([]);
    setShowCreateRestaurantForm(false);
    setShowCreateTotemForm(false); // Garante que ambos os formulários de criação sejam escondidos
  };

  const handleBackToTotemSelection = () => {
    setSelectedTotem(null);
    setShowCreateTotemForm(false); // Garante que o formulário de criação de totem seja escondido
  };

  const handleCreateRestaurant = (e) => {
    e.preventDefault();
    const newRest = {
      id: `rest${Date.now()}`,
      logo: null, // Assume null para logo em novas criações
      ...newRestaurantForm,
    };
    setRestaurants((prev) => [...prev, newRest]);
    showDbModal(
      "Adicionar Hamburgueria",
      `Salvando hamburgueria: ${newRest.name}`
    );
    setNewRestaurantForm({
      name: "",
      address: "",
      phone: "",
      openingHours: "",
      description: "",
    });
    setShowCreateRestaurantForm(false);
    setSelectedRestaurant(newRest);
  };

  const handleCreateTotem = (e) => {
    e.preventDefault();
    const newTtm = {
      id: `totem${Date.now()}`,
      restaurantId: selectedRestaurant.id,
      ...newTotemForm,
    };
    setTotems((prev) => [...prev, newTtm]);
    showDbModal(
      "Adicionar Totem",
      `Salvando totem "${newTtm.name}" para ${selectedRestaurant.name}`
    );
    setNewTotemForm({ name: "", status: "online" });
    setShowCreateTotemForm(false);
    setSelectedTotem(newTtm);
  };

  return {
    restaurants,
    setRestaurants,
    totems,
    setTotems,
    selectedRestaurant,
    setSelectedRestaurant,
    selectedTotem,
    setSelectedTotem,
    availableTotems,
    showCreateRestaurantForm,
    setShowCreateRestaurantForm,
    newRestaurantForm,
    setNewRestaurantForm,
    showCreateTotemForm,
    setShowCreateTotemForm,
    newTotemForm,
    setNewTotemForm,
    handleSelectRestaurant,
    handleSelectTotem,
    handleBackToRestaurantSelection,
    handleBackToTotemSelection,
    handleCreateRestaurant,
    handleCreateTotem,
  };
};

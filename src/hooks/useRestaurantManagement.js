// src/hooks/useRestaurantManagement.js
import { useState, useEffect } from "react";

export const useRestaurantManagement = (
  selectedRestaurant,
  setRestaurants,
  showDbModal
) => {
  const [restaurantData, setRestaurantData] = useState(
    selectedRestaurant || {
      name: "",
      address: "",
      phone: "",
      logo: null,
      openingHours: "",
      description: "",
    }
  );

  useEffect(() => {
    if (selectedRestaurant) {
      setRestaurantData(selectedRestaurant);
    } else {
      setRestaurantData({
        name: "",
        address: "",
        phone: "",
        logo: null,
        openingHours: "",
        description: "",
      });
    }
  }, [selectedRestaurant]);

  const handleUpdateRestaurant = (e) => {
    e.preventDefault();
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurantData.id ? restaurantData : r))
    );
    showDbModal(
      "Atualizar Informações do Restaurante",
      `Salvando dados para ${restaurantData.name}`
    );
    // Em um cenário real, você atualizaria o selectedRestaurant após uma resposta bem-sucedida da API
  };

  return { restaurantData, setRestaurantData, handleUpdateRestaurant };
};

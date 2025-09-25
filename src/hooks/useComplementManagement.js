// src/hooks/useComplementManagement.js
import { useState } from "react";
import {
  initialComplementItems,
  initialComplementGroups,
} from "@/data/initialData";

export const useComplementManagement = (showDbModal) => {
  const [complementItems, setComplementItems] = useState(
    initialComplementItems
  );
  const [newComplementItem, setNewComplementItem] = useState({
    name: "",
    price: "",
    available: true,
  });

  const [complementGroups, setComplementGroups] = useState(
    initialComplementGroups
  );
  const [newComplementGroup, setNewComplementGroup] = useState({
    name: "",
    min: 0,
    max: 1,
    required: false,
    itemIds: [],
  });

  // --- Funções para Itens de Complemento ---
  const handleAddComplementItem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      ...newComplementItem,
      price: parseFloat(newComplementItem.price) || 0,
    };
    setComplementItems((prev) => [...prev, item]);
    showDbModal("Adicionar Item de Complemento", `Salvando item: ${item.name}`);
    setNewComplementItem({ name: "", price: "", available: true });
  };

  const handleDeleteComplementItem = (id) => {
    setComplementItems((prev) => prev.filter((item) => item.id !== id));
    showDbModal("Deletar Item de Complemento", `Removendo item ID: ${id}`);
  };

  const handleToggleComplementItemAvailability = (id) => {
    setComplementItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const getComplementItemsByIds = (ids) => {
    return complementItems.filter((item) => ids.includes(item.id));
  };

  // --- Funções para Grupos de Complemento ---
  const handleAddComplementGroup = (e) => {
    e.preventDefault();
    const group = {
      id: Date.now(),
      ...newComplementGroup,
      min: parseInt(newComplementGroup.min) || 0,
      max: parseInt(newComplementGroup.max) || 1,
    };
    setComplementGroups((prev) => [...prev, group]);
    showDbModal(
      "Adicionar Grupo de Complementos",
      `Salvando grupo: ${group.name}`
    );
    setNewComplementGroup({
      name: "",
      min: 0,
      max: 1,
      required: false,
      itemIds: [],
    });
  };

  const handleDeleteComplementGroup = (id) => {
    setComplementGroups((prev) => prev.filter((group) => group.id !== id));
    showDbModal("Deletar Grupo de Complementos", `Removendo grupo ID: ${id}`);
  };

  const handleComplementItemSelectionForGroup = (itemId) => {
    setNewComplementGroup((prev) => ({
      ...prev,
      itemIds: prev.itemIds.includes(itemId)
        ? prev.itemIds.filter((id) => id !== itemId)
        : [...prev.itemIds, itemId],
    }));
  };

  return {
    complementItems,
    setComplementItems,
    newComplementItem,
    setNewComplementItem,
    complementGroups,
    setComplementGroups,
    newComplementGroup,
    setNewComplementGroup,
    handleAddComplementItem,
    handleDeleteComplementItem,
    handleToggleComplementItemAvailability,
    getComplementItemsByIds,
    handleAddComplementGroup,
    handleDeleteComplementGroup,
    handleComplementItemSelectionForGroup,
  };
};

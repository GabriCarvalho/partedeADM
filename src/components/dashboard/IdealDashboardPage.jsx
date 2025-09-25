// src/components/dashboard/IdealDashboardPage.jsx
"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChefHat } from "lucide-react";

// Importe o modal de ação do banco de dados
import DatabaseActionModal from "@/components/layout/DatabaseActionModal";

// Importe os componentes de fluxo de seleção
import RestaurantSelection from "./SelectionFlow/RestaurantSelection";
import CreateRestaurantForm from "./SelectionFlow/CreateRestaurantForm";
import TotemSelection from "./SelectionFlow/TotemSelection";
import CreateTotemForm from "./SelectionFlow/CreateTotemForm";

// Importe o conteúdo principal do dashboard
import DashboardContent from "./MainDashboard/DashboardContent";

// Importe seus hooks customizados
import { useDatabaseActionModal } from "@/hooks/useDatabaseActionModal";
import { useDashboardFlow } from "@/hooks/useDashboardFlow";
import { useRestaurantManagement } from "@/hooks/useRestaurantManagement";
import { useIngredientManagement } from "@/hooks/useIngredientManagement";
import { useProductManagement } from "@/hooks/useProductManagement";
import { useCategoryManagement } from "@/hooks/useCategoryManagement";
import { useComplementManagement } from "@/hooks/useComplementManagement";

export function IdealDashboardPage() {
  const { modalInfo, showDbModal, closeDbModal } = useDatabaseActionModal();

  const {
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
  } = useDashboardFlow(showDbModal);

  // Hooks de gerenciamento de dados específicos do restaurante/totem
  const { restaurantData, setRestaurantData, handleUpdateRestaurant } =
    useRestaurantManagement(selectedRestaurant, setRestaurants, showDbModal);

  const {
    ingredients,
    newIngredient,
    setNewIngredient,
    ingredientCategories,
    handleAddIngredient,
    handleDeleteIngredient,
    getIngredientsByIds,
  } = useIngredientManagement(showDbModal);

  const {
    categories,
    newCategoryName,
    setNewCategoryName,
    handleAddCategory,
    handleDeleteCategory,
  } = useCategoryManagement(showDbModal);

  const {
    complementItems,
    newComplementItem,
    setNewComplementItem,
    complementGroups,
    newComplementGroup,
    setNewComplementGroup,
    handleAddComplementItem,
    handleDeleteComplementItem,
    handleToggleComplementItemAvailability,
    getComplementItemsByIds,
    handleAddComplementGroup,
    handleDeleteComplementGroup,
    handleComplementItemSelectionForGroup,
  } = useComplementManagement(showDbModal);

  const {
    products,
    productForm,
    setProductForm,
    handleAddProduct,
    handleDeleteProduct,
    handleToggleProductAvailability,
    handleIngredientSelection,
    handleComplementGroupSelection,
  } = useProductManagement(
    selectedRestaurant,
    showDbModal,
    ingredients,
    complementGroups
  );

  // Renderização condicional baseada na seleção
  const renderContent = () => {
    if (showCreateRestaurantForm) {
      return (
        <CreateRestaurantForm
          newRestaurantForm={newRestaurantForm}
          setNewRestaurantForm={setNewRestaurantForm}
          handleCreateRestaurant={handleCreateRestaurant}
          setShowCreateRestaurantForm={setShowCreateRestaurantForm}
        />
      );
    }

    if (!selectedRestaurant) {
      return (
        <RestaurantSelection
          restaurants={restaurants}
          handleSelectRestaurant={handleSelectRestaurant}
          setShowCreateRestaurantForm={setShowCreateRestaurantForm}
        />
      );
    }

    if (showCreateTotemForm) {
      return (
        <CreateTotemForm
          selectedRestaurant={selectedRestaurant}
          newTotemForm={newTotemForm}
          setNewTotemForm={setNewTotemForm}
          handleCreateTotem={handleCreateTotem}
          setShowCreateTotemForm={setShowCreateTotemForm}
        />
      );
    }

    if (!selectedTotem) {
      return (
        <TotemSelection
          selectedRestaurant={selectedRestaurant}
          availableTotems={availableTotems}
          handleSelectTotem={handleSelectTotem}
          setShowCreateTotemForm={setShowCreateTotemForm}
          handleBackToRestaurantSelection={handleBackToRestaurantSelection}
        />
      );
    }

    // Conteúdo principal do dashboard (exibido apenas após selecionar restaurante e totem)
    return (
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <ChefHat className="h-8 w-8" />
            Painel Administrativo - {selectedRestaurant.name}
          </CardTitle>
          <CardDescription className="text-orange-100 flex items-center flex-wrap">
            Gerenciando o Totem:{" "}
            <span className="font-semibold ml-1">{selectedTotem.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-4 text-orange-100 hover:bg-orange-600 hover:text-white"
              onClick={handleBackToTotemSelection}
            >
              <ArrowLeft className="mr-1 h-3 w-3" /> Alterar Totem
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 text-orange-100 hover:bg-orange-600 hover:text-white"
              onClick={handleBackToRestaurantSelection}
            >
              <ArrowLeft className="mr-1 h-3 w-3" /> Alterar Hamburgueria
            </Button>
          </CardDescription>
        </CardHeader>

        <DashboardContent
          // Props de RestaurantManagement
          restaurantData={restaurantData}
          setRestaurantData={setRestaurantData}
          handleUpdateRestaurant={handleUpdateRestaurant}
          // Props de IngredientManagement
          ingredients={ingredients}
          newIngredient={newIngredient}
          setNewIngredient={setNewIngredient}
          ingredientCategories={ingredientCategories}
          handleAddIngredient={handleAddIngredient}
          handleDeleteIngredient={handleDeleteIngredient}
          getIngredientsByIds={getIngredientsByIds}
          // Props de ProductManagement
          products={products}
          productForm={productForm}
          setProductForm={setProductForm}
          handleAddProduct={handleAddProduct}
          handleDeleteProduct={handleDeleteProduct}
          handleToggleProductAvailability={handleToggleProductAvailability}
          handleIngredientSelection={handleIngredientSelection}
          handleComplementGroupSelection={handleComplementGroupSelection}
          // Props de CategoryManagement
          categories={categories}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          handleAddCategory={handleAddCategory}
          handleDeleteCategory={handleDeleteCategory}
          // Props de ComplementManagement
          complementItems={complementItems}
          newComplementItem={newComplementItem}
          setNewComplementItem={setNewComplementItem}
          complementGroups={complementGroups}
          newComplementGroup={newComplementGroup}
          setNewComplementGroup={setNewComplementGroup}
          handleAddComplementItem={handleAddComplementItem}
          handleDeleteComplementItem={handleDeleteComplementItem}
          handleToggleComplementItemAvailability={
            handleToggleComplementItemAvailability
          }
          getComplementItemsByIds={getComplementItemsByIds}
          handleAddComplementGroup={handleAddComplementGroup}
          handleDeleteComplementGroup={handleDeleteComplementGroup}
          handleComplementItemSelectionForGroup={
            handleComplementItemSelectionForGroup
          }
        />
      </Card>
    );
  };

  return (
    <>
      {modalInfo && (
        <DatabaseActionModal {...modalInfo} onClose={closeDbModal} />
      )}

      <div className="flex min-h-screen w-full bg-gray-50 p-4">
        {renderContent()}
      </div>
    </>
  );
}

export default IdealDashboardPage;

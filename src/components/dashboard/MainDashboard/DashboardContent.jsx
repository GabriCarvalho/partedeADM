// src/components/dashboard/MainDashboard/DashboardContent.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Utensils,
  ChefHat,
  Package,
  Sandwich,
  Layers,
  Tag,
} from "lucide-react";

// Importe os componentes das abas
import RestaurantSettingsTab from "./Tabs/RestaurantSettingsTab";
import IngredientsTab from "./Tabs/IngredientsTab";
import ProductsTab from "./Tabs/ProductsTab";
import ComplementItemsTab from "./Tabs/ComplementItemsTab";
import ComplementGroupsTab from "./Tabs/ComplementGroupsTab";
import CategoriesTab from "./Tabs/CategoriesTab";

export default function DashboardContent({
  // Props do useRestaurantManagement
  restaurantData,
  setRestaurantData,
  handleUpdateRestaurant,
  // Props do useIngredientManagement
  ingredients,
  newIngredient,
  setNewIngredient,
  ingredientCategories,
  handleAddIngredient,
  handleDeleteIngredient,
  getIngredientsByIds,
  // Props do useProductManagement
  products,
  productForm,
  setProductForm,
  handleAddProduct,
  handleDeleteProduct,
  handleToggleProductAvailability,
  handleIngredientSelection,
  handleComplementGroupSelection,
  // Props do useCategoryManagement
  categories,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
  handleDeleteCategory,
  // Props do useComplementManagement
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
}) {
  return (
    <CardContent className="p-6">
      <Tabs defaultValue="restaurant" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="restaurant" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Restaurante
          </TabsTrigger>
          <TabsTrigger value="ingredients" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Ingredientes
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Produtos
          </TabsTrigger>
          <TabsTrigger
            value="complement_items"
            className="flex items-center gap-2"
          >
            <Sandwich className="h-4 w-4" />
            Complementos
          </TabsTrigger>
          <TabsTrigger
            value="complement_groups"
            className="flex items-center gap-2"
          >
            <Layers className="h-4 w-4" />
            Grupos
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Categorias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant">
          <RestaurantSettingsTab
            restaurantData={restaurantData}
            setRestaurantData={setRestaurantData}
            handleUpdateRestaurant={handleUpdateRestaurant}
          />
        </TabsContent>

        <TabsContent value="ingredients">
          <IngredientsTab
            ingredients={ingredients}
            newIngredient={newIngredient}
            setNewIngredient={setNewIngredient}
            ingredientCategories={ingredientCategories}
            handleAddIngredient={handleAddIngredient}
            handleDeleteIngredient={handleDeleteIngredient}
          />
        </TabsContent>

        <TabsContent value="products">
          <ProductsTab
            products={products}
            productForm={productForm}
            setProductForm={setProductForm}
            categories={categories}
            ingredientCategories={ingredientCategories}
            ingredients={ingredients}
            complementGroups={complementGroups}
            handleAddProduct={handleAddProduct}
            handleToggleProductAvailability={handleToggleProductAvailability}
            handleDeleteProduct={handleDeleteProduct}
            handleIngredientSelection={handleIngredientSelection}
            handleComplementGroupSelection={handleComplementGroupSelection}
            getIngredientsByIds={getIngredientsByIds}
          />
        </TabsContent>

        <TabsContent value="complement_items">
          <ComplementItemsTab
            complementItems={complementItems}
            newComplementItem={newComplementItem}
            setNewComplementItem={setNewComplementItem}
            handleAddComplementItem={handleAddComplementItem}
            handleDeleteComplementItem={handleDeleteComplementItem}
            handleToggleComplementItemAvailability={
              handleToggleComplementItemAvailability
            }
          />
        </TabsContent>

        <TabsContent value="complement_groups">
          <ComplementGroupsTab
            complementItems={complementItems}
            complementGroups={complementGroups}
            newComplementGroup={newComplementGroup}
            setNewComplementGroup={setNewComplementGroup}
            handleAddComplementGroup={handleAddComplementGroup}
            handleDeleteComplementGroup={handleDeleteComplementGroup}
            handleComplementItemSelectionForGroup={
              handleComplementItemSelectionForGroup
            }
            getComplementItemsByIds={getComplementItemsByIds}
          />
        </TabsContent>

        <TabsContent value="categories">
          <CategoriesTab
            categories={categories}
            newCategoryName={newCategoryName}
            setNewCategoryName={setNewCategoryName}
            handleAddCategory={handleAddCategory}
            handleDeleteCategory={handleDeleteCategory}
            products={products}
          />
        </TabsContent>
      </Tabs>
    </CardContent>
  );
}

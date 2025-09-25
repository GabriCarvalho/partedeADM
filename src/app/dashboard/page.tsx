"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Utensils,
  Package,
  Tag,
  Trash2,
  Sandwich,
  Layers,
  X,
  Edit,
  Save,
  Cancel,
  ChefHat,
  Eye,
  EyeOff,
  Upload,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Modal para simular ações do banco de dados
function DatabaseActionModal({ title, description, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-blue-600">
            Ação do Banco de Dados
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600 mt-2 bg-blue-50 p-3 rounded-md border border-blue-200">
            {description}
          </p>
        </div>
        <div className="mt-6 text-right">
          <Button onClick={onClose}>Entendido</Button>
        </div>
      </div>
    </div>
  );
}

// Componente para exibir ingredientes
function IngredientsList({ ingredients, onRemove, editable = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ingredients.map((ingredient) => (
        <Badge key={ingredient.id} variant="secondary" className="text-xs">
          {ingredient.name}
          {editable && (
            <button
              onClick={() => onRemove(ingredient.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X size={12} />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
}

export function IdealDashboardPage() {
  const [modalInfo, setModalInfo] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Estados do Restaurante
  const [restaurantData, setRestaurantData] = useState({
    name: "Hamburgueria do Zé",
    address: "",
    phone: "",
    logo: null,
    openingHours: "",
    description: "",
  });

  // Estados dos Ingredientes
  const [ingredients, setIngredients] = useState([
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
  ]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [ingredientCategories] = useState([
    "Pães",
    "Carnes",
    "Vegetais",
    "Queijos",
    "Molhos",
    "Outros",
  ]);

  // Estados dos Produtos
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

  // Estados das Categorias
  const [categories, setCategories] = useState([
    "Hambúrgueres",
    "Bebidas",
    "Sobremesas",
    "Porções",
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Estados dos Itens de Complemento
  const [complementItems, setComplementItems] = useState([
    { id: 101, name: "Bacon Extra", price: 4.5, available: true },
    { id: 102, name: "Cheddar Cremoso", price: 3.0, available: true },
    { id: 103, name: "Batata Frita P", price: 8.0, available: true },
    { id: 104, name: "Coca-Cola Lata", price: 5.0, available: true },
    { id: 105, name: "Guaraná Lata", price: 5.0, available: true },
  ]);
  const [newComplementItem, setNewComplementItem] = useState({
    name: "",
    price: "",
    available: true,
  });

  // Estados dos Grupos de Complementos
  const [complementGroups, setComplementGroups] = useState([
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
  ]);
  const [newComplementGroup, setNewComplementGroup] = useState({
    name: "",
    min: 0,
    max: 1,
    required: false,
    itemIds: [],
  });

  const showDbModal = (title, description) =>
    setModalInfo({ title, description });

  // Funções do Restaurante
  const handleUpdateRestaurant = (e) => {
    e.preventDefault();
    showDbModal(
      "Atualizar Informações do Restaurante",
      `Salvando dados: ${JSON.stringify(restaurantData)}`
    );
  };

  // Funções dos Ingredientes
  const handleAddIngredient = (e) => {
    e.preventDefault();
    const ingredient = {
      id: Date.now(),
      name: newIngredient.name,
      category: newIngredient.category,
      price: parseFloat(newIngredient.price) || 0,
    };
    setIngredients([...ingredients, ingredient]);
    showDbModal(
      "Adicionar Ingrediente",
      `Salvando ingrediente: ${JSON.stringify(ingredient)}`
    );
    setNewIngredient({ name: "", category: "", price: "" });
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
    showDbModal("Deletar Ingrediente", `Removendo ingrediente ID: ${id}`);
  };

  // Funções dos Produtos
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      ...productForm,
      price: parseFloat(productForm.price),
      createdAt: new Date().toISOString(),
    };
    setProducts([...products, product]);
    showDbModal(
      "Adicionar Produto",
      `Salvando produto: ${JSON.stringify(product)}`
    );
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
    setProducts(products.filter((item) => item.id !== id));
    showDbModal("Deletar Produto", `Removendo produto ID: ${id}`);
  };

  const handleToggleProductAvailability = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, available: !product.available }
          : product
      )
    );
  };

  // Funções das Categorias
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      showDbModal(
        "Adicionar Categoria",
        `Salvando categoria: ${newCategoryName}`
      );
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (categoryName) => {
    setCategories(categories.filter((cat) => cat !== categoryName));
    showDbModal("Deletar Categoria", `Removendo categoria: ${categoryName}`);
  };

  // Funções dos Itens de Complemento
  const handleAddComplementItem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      ...newComplementItem,
      price: parseFloat(newComplementItem.price),
    };
    setComplementItems([...complementItems, item]);
    showDbModal(
      "Adicionar Item de Complemento",
      `Salvando item: ${JSON.stringify(item)}`
    );
    setNewComplementItem({ name: "", price: "", available: true });
  };

  const handleDeleteComplementItem = (id) => {
    setComplementItems(complementItems.filter((item) => item.id !== id));
    showDbModal("Deletar Item de Complemento", `Removendo item ID: ${id}`);
  };

  const handleToggleComplementItemAvailability = (id) => {
    setComplementItems(
      complementItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  // Funções dos Grupos de Complementos
  const handleAddComplementGroup = (e) => {
    e.preventDefault();
    const group = {
      id: Date.now(),
      ...newComplementGroup,
    };
    setComplementGroups([...complementGroups, group]);
    showDbModal(
      "Adicionar Grupo de Complementos",
      `Salvando grupo: ${JSON.stringify(group)}`
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
    setComplementGroups(complementGroups.filter((group) => group.id !== id));
    showDbModal("Deletar Grupo de Complementos", `Removendo grupo ID: ${id}`);
  };

  // Funções auxiliares
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

  const handleComplementItemSelection = (itemId) => {
    setNewComplementGroup((prev) => ({
      ...prev,
      itemIds: prev.itemIds.includes(itemId)
        ? prev.itemIds.filter((id) => id !== itemId)
        : [...prev.itemIds, itemId],
    }));
  };

  const getIngredientsByIds = (ids) => {
    return ingredients.filter((ingredient) => ids.includes(ingredient.id));
  };

  const getComplementItemsByIds = (ids) => {
    return complementItems.filter((item) => ids.includes(item.id));
  };

  return (
    <>
      {modalInfo && (
        <DatabaseActionModal
          {...modalInfo}
          onClose={() => setModalInfo(null)}
        />
      )}

      <div className="flex min-h-screen w-full bg-gray-50 p-4">
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <ChefHat className="h-8 w-8" />
              Painel Administrativo - Hamburgueria
            </CardTitle>
            <CardDescription className="text-orange-100">
              Gerencie todos os aspectos do seu negócio para os totens de
              autoatendimento
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="restaurant" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger
                  value="restaurant"
                  className="flex items-center gap-2"
                >
                  <Utensils className="h-4 w-4" />
                  Restaurante
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="flex items-center gap-2"
                >
                  <ChefHat className="h-4 w-4" />
                  Ingredientes
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="flex items-center gap-2"
                >
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
                <TabsTrigger
                  value="categories"
                  className="flex items-center gap-2"
                >
                  <Tag className="h-4 w-4" />
                  Categorias
                </TabsTrigger>
              </TabsList>

              {/* Aba Restaurante */}
              <TabsContent value="restaurant">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Restaurante</CardTitle>
                    <CardDescription>
                      Configure as informações básicas que aparecerão no totem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleUpdateRestaurant}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="restaurantName">
                            Nome da Hamburgueria *
                          </Label>
                          <Input
                            id="restaurantName"
                            value={restaurantData.name}
                            onChange={(e) =>
                              setRestaurantData({
                                ...restaurantData,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="restaurantPhone">Telefone</Label>
                          <Input
                            id="restaurantPhone"
                            value={restaurantData.phone}
                            onChange={(e) =>
                              setRestaurantData({
                                ...restaurantData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="restaurantAddress">
                          Endereço Completo
                        </Label>
                        <Input
                          id="restaurantAddress"
                          value={restaurantData.address}
                          onChange={(e) =>
                            setRestaurantData({
                              ...restaurantData,
                              address: e.target.value,
                            })
                          }
                          placeholder="Rua, número, bairro, cidade"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="restaurantDescription">Descrição</Label>
                        <Textarea
                          id="restaurantDescription"
                          value={restaurantData.description}
                          onChange={(e) =>
                            setRestaurantData({
                              ...restaurantData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descreva sua hamburgueria..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="restaurantHours">
                            Horário de Funcionamento
                          </Label>
                          <Input
                            id="restaurantHours"
                            value={restaurantData.openingHours}
                            onChange={(e) =>
                              setRestaurantData({
                                ...restaurantData,
                                openingHours: e.target.value,
                              })
                            }
                            placeholder="Seg-Dom: 18h às 23h"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="restaurantLogo">
                            Logo do Restaurante
                          </Label>
                          <Input
                            id="restaurantLogo"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setRestaurantData({
                                ...restaurantData,
                                logo: e.target.files[0],
                              })
                            }
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Informações do Restaurante
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Ingredientes */}
              <TabsContent value="ingredients">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adicionar Ingrediente</CardTitle>
                      <CardDescription>
                        Cadastre os ingredientes que compõem seus produtos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddIngredient}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="ingredientName">
                            Nome do Ingrediente *
                          </Label>
                          <Input
                            id="ingredientName"
                            value={newIngredient.name}
                            onChange={(e) =>
                              setNewIngredient({
                                ...newIngredient,
                                name: e.target.value,
                              })
                            }
                            placeholder="Ex: Bacon"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ingredientCategory">
                            Categoria *
                          </Label>
                          <Select
                            value={newIngredient.category}
                            onValueChange={(value) =>
                              setNewIngredient({
                                ...newIngredient,
                                category: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              {ingredientCategories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ingredientPrice">
                            Preço Adicional (R$)
                          </Label>
                          <Input
                            id="ingredientPrice"
                            type="number"
                            step="0.01"
                            value={newIngredient.price}
                            onChange={(e) =>
                              setNewIngredient({
                                ...newIngredient,
                                price: e.target.value,
                              })
                            }
                            placeholder="0.00"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Adicionar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ingredientes Cadastrados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ingredientCategories.map((category) => {
                          const categoryIngredients = ingredients.filter(
                            (ing) => ing.category === category
                          );
                          if (categoryIngredients.length === 0) return null;

                          return (
                            <div key={category}>
                              <h4 className="font-semibold text-lg mb-2">
                                {category}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {categoryIngredients.map((ingredient) => (
                                  <div
                                    key={ingredient.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div>
                                      <span className="font-medium">
                                        {ingredient.name}
                                      </span>
                                      {ingredient.price > 0 && (
                                        <span className="text-sm text-green-600 ml-2">
                                          +R$ {ingredient.price.toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Confirmar Exclusão
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Tem certeza que deseja excluir o
                                            ingrediente "{ingredient.name}"?
                                            Esta ação não pode ser desfeita.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancelar
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDeleteIngredient(
                                                ingredient.id
                                              )
                                            }
                                          >
                                            Excluir
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                ))}
                              </div>
                              <Separator className="mt-4" />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Aba Produtos */}
              <TabsContent value="products">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adicionar Novo Produto</CardTitle>
                      <CardDescription>
                        Cadastre hambúrgueres, bebidas e outros itens do
                        cardápio
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddProduct} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="productName">
                              Nome do Produto *
                            </Label>
                            <Input
                              id="productName"
                              value={productForm.name}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  name: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="productPrice">Preço (R$) *</Label>
                            <Input
                              id="productPrice"
                              type="number"
                              step="0.01"
                              value={productForm.price}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  price: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="productDescription">Descrição</Label>
                          <Textarea
                            id="productDescription"
                            value={productForm.description}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                description: e.target.value,
                              })
                            }
                            placeholder="Descreva o produto..."
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="productCategory">Categoria *</Label>
                            <Select
                              value={productForm.category}
                              onValueChange={(value) =>
                                setProductForm({
                                  ...productForm,
                                  category: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="productImage">
                              Imagem do Produto
                            </Label>
                            <Input
                              id="productImage"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  image: e.target.files[0],
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-semibold">
                            Ingredientes do Produto
                          </Label>
                          <p className="text-sm text-gray-600">
                            Selecione os ingredientes que compõem este produto.
                            Os clientes poderão remover ingredientes no totem.
                          </p>
                          <Card className="p-4">
                            <div className="space-y-4">
                              {ingredientCategories.map((category) => {
                                const categoryIngredients = ingredients.filter(
                                  (ing) => ing.category === category
                                );
                                if (categoryIngredients.length === 0)
                                  return null;

                                return (
                                  <div key={category}>
                                    <h5 className="font-medium mb-2">
                                      {category}
                                    </h5>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                      {categoryIngredients.map((ingredient) => (
                                        <div
                                          key={ingredient.id}
                                          className="flex items-center space-x-2"
                                        >
                                          <Checkbox
                                            id={`ingredient-${ingredient.id}`}
                                            checked={productForm.ingredients.includes(
                                              ingredient.id
                                            )}
                                            onCheckedChange={() =>
                                              handleIngredientSelection(
                                                ingredient.id
                                              )
                                            }
                                          />
                                          <Label
                                            htmlFor={`ingredient-${ingredient.id}`}
                                            className="text-sm"
                                          >
                                            {ingredient.name}
                                            {ingredient.price > 0 && (
                                              <span className="text-green-600 ml-1">
                                                (+R${" "}
                                                {ingredient.price.toFixed(2)})
                                              </span>
                                            )}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </Card>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-semibold">
                            Grupos de Complementos
                          </Label>
                          <p className="text-sm text-gray-600">
                            Selecione quais grupos de complementos estarão
                            disponíveis para este produto
                          </p>
                          <Card className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {complementGroups.map((group) => (
                                <div
                                  key={group.id}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`group-${group.id}`}
                                    checked={productForm.complementGroups.includes(
                                      group.id
                                    )}
                                    onCheckedChange={() =>
                                      handleComplementGroupSelection(group.id)
                                    }
                                  />
                                  <Label
                                    htmlFor={`group-${group.id}`}
                                    className="text-sm"
                                  >
                                    {group.name}
                                    <span className="text-gray-500 ml-1">
                                      (
                                      {group.required
                                        ? "Obrigatório"
                                        : "Opcional"}
                                      )
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Adicionar Produto ao Cardápio
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Lista de Produtos */}
                  {products.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Produtos Cadastrados ({products.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {products.map((product) => (
                            <Card key={product.id} className="relative">
                              <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <CardTitle className="text-lg">
                                      {product.name}
                                    </CardTitle>
                                    <Badge variant="secondary" className="mt-1">
                                      {product.category}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        handleToggleProductAvailability(
                                          product.id
                                        )
                                      }
                                    >
                                      {product.available ? (
                                        <Eye className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                      )}
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Confirmar Exclusão
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Tem certeza que deseja excluir o
                                            produto "{product.name}"? Esta ação
                                            não pode ser desfeita.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancelar
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDeleteProduct(product.id)
                                            }
                                          >
                                            Excluir
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-green-600">
                                      R$ {product.price.toFixed(2)}
                                    </span>
                                    <Badge
                                      variant={
                                        product.available
                                          ? "default"
                                          : "secondary"
                                      }
                                    >
                                      {product.available
                                        ? "Disponível"
                                        : "Indisponível"}
                                    </Badge>
                                  </div>

                                  {product.description && (
                                    <p className="text-sm text-gray-600">
                                      {product.description}
                                    </p>
                                  )}

                                  {product.ingredients.length > 0 && (
                                    <div>
                                      <Label className="text-xs font-semibold text-gray-700">
                                        Ingredientes:
                                      </Label>
                                      <IngredientsList
                                        ingredients={getIngredientsByIds(
                                          product.ingredients
                                        )}
                                      />
                                    </div>
                                  )}

                                  {product.complementGroups.length > 0 && (
                                    <div>
                                      <Label className="text-xs font-semibold text-gray-700">
                                        Grupos de Complementos:
                                      </Label>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {product.complementGroups.map(
                                          (groupId) => {
                                            const group = complementGroups.find(
                                              (g) => g.id === groupId
                                            );
                                            return group ? (
                                              <Badge
                                                key={groupId}
                                                variant="outline"
                                                className="text-xs"
                                              >
                                                {group.name}
                                              </Badge>
                                            ) : null;
                                          }
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Aba Itens de Complemento */}
              <TabsContent value="complement_items">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adicionar Item de Complemento</CardTitle>
                      <CardDescription>
                        Cadastre itens adicionais como bacon extra, bebidas,
                        porções, etc.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddComplementItem}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="complementItemName">
                            Nome do Item *
                          </Label>
                          <Input
                            id="complementItemName"
                            value={newComplementItem.name}
                            onChange={(e) =>
                              setNewComplementItem({
                                ...newComplementItem,
                                name: e.target.value,
                              })
                            }
                            placeholder="Ex: Bacon Extra"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="complementItemPrice">
                            Preço (R$) *
                          </Label>
                          <Input
                            id="complementItemPrice"
                            type="number"
                            step="0.01"
                            value={newComplementItem.price}
                            onChange={(e) =>
                              setNewComplementItem({
                                ...newComplementItem,
                                price: e.target.value,
                              })
                            }
                            placeholder="4.50"
                            required
                          />
                        </div>
                        <div className="flex items-end">
                          <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Adicionar Item
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Itens de Complemento Cadastrados (
                        {complementItems.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {complementItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.name}</span>
                                <Badge
                                  variant={
                                    item.available ? "default" : "secondary"
                                  }
                                >
                                  {item.available
                                    ? "Disponível"
                                    : "Indisponível"}
                                </Badge>
                              </div>
                              <span className="text-lg font-bold text-green-600">
                                R$ {item.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleToggleComplementItemAvailability(
                                    item.id
                                  )
                                }
                              >
                                {item.available ? (
                                  <Eye className="h-4 w-4 text-green-600" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                )}
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Confirmar Exclusão
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o item "
                                      {item.name}"? Esta ação não pode ser
                                      desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteComplementItem(item.id)
                                      }
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Aba Grupos de Complementos */}
              <TabsContent value="complement_groups">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Criar Grupo de Complementos</CardTitle>
                      <CardDescription>
                        Organize os itens de complemento em grupos (ex: "Turbine
                        seu Lanche", "Escolha sua Bebida")
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddComplementGroup}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="groupName">Nome do Grupo *</Label>
                            <Input
                              id="groupName"
                              value={newComplementGroup.name}
                              onChange={(e) =>
                                setNewComplementGroup({
                                  ...newComplementGroup,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Ex: Turbine seu Lanche"
                              required
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <Switch
                              id="groupRequired"
                              checked={newComplementGroup.required}
                              onCheckedChange={(checked) =>
                                setNewComplementGroup({
                                  ...newComplementGroup,
                                  required: checked,
                                })
                              }
                            />
                            <Label htmlFor="groupRequired">
                              Seleção Obrigatória
                            </Label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="groupMin">Quantidade Mínima</Label>
                            <Input
                              id="groupMin"
                              type="number"
                              min="0"
                              value={newComplementGroup.min}
                              onChange={(e) =>
                                setNewComplementGroup({
                                  ...newComplementGroup,
                                  min: parseInt(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="groupMax">Quantidade Máxima</Label>
                            <Input
                              id="groupMax"
                              type="number"
                              min="1"
                              value={newComplementGroup.max}
                              onChange={(e) =>
                                setNewComplementGroup({
                                  ...newComplementGroup,
                                  max: parseInt(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-semibold">
                            Itens do Grupo
                          </Label>
                          <p className="text-sm text-gray-600">
                            Selecione quais itens de complemento farão parte
                            deste grupo
                          </p>
                          <Card className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {complementItems.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`group-item-${item.id}`}
                                    checked={newComplementGroup.itemIds.includes(
                                      item.id
                                    )}
                                    onCheckedChange={() =>
                                      handleComplementItemSelection(item.id)
                                    }
                                  />
                                  <Label
                                    htmlFor={`group-item-${item.id}`}
                                    className="text-sm"
                                  >
                                    {item.name}
                                    <span className="text-green-600 ml-1">
                                      (R$ {item.price.toFixed(2)})
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Criar Grupo de Complementos
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Lista de Grupos */}
                  {complementGroups.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Grupos de Complementos Cadastrados (
                          {complementGroups.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {complementGroups.map((group) => (
                            <Card key={group.id} className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-lg">
                                    {group.name}
                                  </h4>
                                  <div className="flex items-center gap-4 mt-1">
                                    <Badge
                                      variant={
                                        group.required
                                          ? "destructive"
                                          : "secondary"
                                      }
                                    >
                                      {group.required
                                        ? "Obrigatório"
                                        : "Opcional"}
                                    </Badge>
                                    <span className="text-sm text-gray-600">
                                      Mín: {group.min} | Máx: {group.max}
                                    </span>
                                  </div>
                                </div>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Confirmar Exclusão
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja excluir o grupo "
                                        {group.name}"? Esta ação não pode ser
                                        desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancelar
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDeleteComplementGroup(group.id)
                                        }
                                      >
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">
                                  Itens do Grupo ({group.itemIds.length}):
                                </Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {getComplementItemsByIds(group.itemIds).map(
                                    (item) => (
                                      <Badge key={item.id} variant="outline">
                                        {item.name} (R$ {item.price.toFixed(2)})
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Aba Categorias */}
              <TabsContent value="categories">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adicionar Categoria</CardTitle>
                      <CardDescription>
                        Crie categorias para organizar seus produtos no cardápio
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddCategory}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4"
                      >
                        <div className="md:col-span-3 space-y-2">
                          <Label htmlFor="categoryName">
                            Nome da Categoria *
                          </Label>
                          <Input
                            id="categoryName"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Ex: Combos, Porções, Sobremesas"
                            required
                          />
                        </div>
                        <div className="flex items-end">
                          <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Adicionar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Categorias Cadastradas ({categories.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => {
                          const categoryProductCount = products.filter(
                            (product) => product.category === category
                          ).length;

                          return (
                            <div
                              key={category}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div>
                                <span className="font-medium">{category}</span>
                                <p className="text-sm text-gray-600">
                                  {categoryProductCount} produto(s)
                                </p>
                              </div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Confirmar Exclusão
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir a categoria
                                      "{category}"?
                                      {categoryProductCount > 0 && (
                                        <span className="block mt-2 text-orange-600">
                                          <AlertCircle className="inline h-4 w-4 mr-1" />
                                          Atenção: Esta categoria possui{" "}
                                          {categoryProductCount} produto(s)
                                          associado(s).
                                        </span>
                                      )}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteCategory(category)
                                      }
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default IdealDashboardPage;

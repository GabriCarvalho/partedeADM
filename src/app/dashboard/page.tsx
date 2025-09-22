"use client";

import { useState } from "react";
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

// --- Componente de Modal para simular a integração com o BD ---
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

export function IdealDashboardPage() {
  const [modalInfo, setModalInfo] = useState(null);
  const [restaurantName, setRestaurantName] = useState("Hamburgueria do Zé");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantLogo, setRestaurantLogo] = useState(null);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productComplementGroups, setProductComplementGroups] = useState([]);
  const [categories, setCategories] = useState([
    "Hambúrgueres",
    "Bebidas",
    "Sobremesas",
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [complementItems, setComplementItems] = useState([
    { id: 101, name: "Bacon Extra", price: 4.5 },
    { id: 102, name: "Cheddar Cremoso", price: 3.0 },
    { id: 103, name: "Batata Frita P", price: 8.0 },
    { id: 104, name: "Coca-Cola Lata", price: 5.0 },
    { id: 105, name: "Guaraná Lata", price: 5.0 },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
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
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMin, setNewGroupMin] = useState(0);
  const [newGroupMax, setNewGroupMax] = useState(1);
  const [newGroupRequired, setNewGroupRequired] = useState(false);
  const [newGroupItemIds, setNewGroupItemIds] = useState([]);

  const showDbModal = (title, description) =>
    setModalInfo({ title, description });

  const handleRegisterRestaurant = (e) => {
    e.preventDefault();
    const data = { restaurantName, restaurantAddress, restaurantLogo };
    showDbModal(
      "Salvar Informações do Restaurante",
      `Aqui você enviaria os dados para a tabela 'restaurants'. JSON: ${JSON.stringify(
        { name: data.restaurantName, address: data.restaurantAddress }
      )} e faria o upload da logo.`
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      category: productCategory,
      complementGroupIds: productComplementGroups,
    };
    setProducts([...products, newProduct]);
    showDbModal(
      "Cadastrar Novo Produto",
      `Aqui você enviaria os dados para a tabela 'products'. JSON: ${JSON.stringify(
        newProduct
      )}`
    );
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductCategory("");
    setProductComplementGroups([]);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      showDbModal(
        "Adicionar Categoria",
        `Enviando nova categoria '${newCategoryName}' para a tabela 'categories'.`
      );
      setNewCategoryName("");
    } else {
      alert("Nome da categoria inválido ou já existente.");
    }
  };

  const handleAddComplementItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: newItemName,
      price: parseFloat(newItemPrice),
    };
    setComplementItems([...complementItems, newItem]);
    showDbModal(
      "Adicionar Item de Complemento",
      `Salvando '${
        newItem.name
      }' na tabela 'complement_items'. JSON: ${JSON.stringify(newItem)}`
    );
    setNewItemName("");
    setNewItemPrice("");
  };

  const handleAddComplementGroup = (e) => {
    e.preventDefault();
    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      min: newGroupMin,
      max: newGroupMax,
      required: newGroupRequired,
      itemIds: newGroupItemIds,
    };
    setComplementGroups([...complementGroups, newGroup]);
    showDbModal(
      "Criar Grupo de Complementos",
      `Salvando o grupo '${
        newGroup.name
      }' na tabela 'complement_groups'. JSON: ${JSON.stringify(newGroup)}`
    );
    setNewGroupName("");
    setNewGroupMin(0);
    setNewGroupMax(1);
    setNewGroupRequired(false);
    setNewGroupItemIds([]);
  };

  const handleGroupSelectionForProduct = (groupId) =>
    setProductComplementGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  const handleItemSelectionForGroup = (itemId) =>
    setNewGroupItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );

  return (
    <>
      {modalInfo && (
        <DatabaseActionModal
          {...modalInfo}
          onClose={() => setModalInfo(null)}
        />
      )}
      <div className="flex min-h-screen w-full bg-gray-100 p-4">
        <Card className="w-full max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Dashboard da Hamburgueria
            </CardTitle>
            <CardDescription>
              Gerencie as informações que aparecerão nos totens de
              autoatendimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="restaurant">
                  <Utensils className="mr-2 h-4 w-4" />
                  Restaurante
                </TabsTrigger>
                <TabsTrigger value="products">
                  <Package className="mr-2 h-4 w-4" />
                  Produtos
                </TabsTrigger>
                <TabsTrigger value="complement_items">
                  <Sandwich className="mr-2 h-4 w-4" />
                  Itens de Comp.
                </TabsTrigger>
                <TabsTrigger value="complement_groups">
                  <Layers className="mr-2 h-4 w-4" />
                  Grupos de Comp.
                </TabsTrigger>
                <TabsTrigger value="categories">
                  <Tag className="mr-2 h-4 w-4" />
                  Categorias
                </TabsTrigger>
              </TabsList>

              {/* Aba Restaurante */}
              <TabsContent value="restaurant" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Restaurante</CardTitle>
                    <CardDescription>
                      Estes dados, como o nome e a logo, aparecerão na tela
                      inicial do totem.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleRegisterRestaurant}
                      className="grid gap-4"
                    >
                      <div className="grid gap-2">
                        <Label htmlFor="restaurantName">
                          Nome da Hamburgueria
                        </Label>
                        <Input
                          id="restaurantName"
                          value={restaurantName}
                          onChange={(e) => setRestaurantName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="restaurantAddress">
                          Endereço (opcional)
                        </Label>
                        <Input
                          id="restaurantAddress"
                          value={restaurantAddress}
                          onChange={(e) => setRestaurantAddress(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="restaurantLogo">
                          Logo (será exibida no totem)
                        </Label>
                        <Input
                          id="restaurantLogo"
                          type="file"
                          onChange={(e) => setRestaurantLogo(e.target.files[0])}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Salvar Informações
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Produtos */}
              <TabsContent value="products" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Adicionar Novo Produto</CardTitle>
                    <CardDescription>
                      Cadastre os lanches, bebidas e outros itens principais do
                      cardápio.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddProduct} className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="productName">Nome do Produto</Label>
                          <Input
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="productPrice">Preço Base</Label>
                          <Input
                            id="productPrice"
                            type="number"
                            step="0.01"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                          <Label htmlFor="productDescription">Descrição</Label>
                          <Textarea
                            id="productDescription"
                            value={productDescription}
                            onChange={(e) =>
                              setProductDescription(e.target.value)
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="productCategory">Categoria</Label>
                          <Select
                            onValueChange={setProductCategory}
                            value={productCategory}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-base font-semibold">
                          Grupos de Complementos
                        </Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Selecione os grupos de adicionais que o cliente poderá
                          escolher para este produto.
                        </p>
                        <Card className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            {complementGroups.map((group) => (
                              <div
                                key={group.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`group-prod-${group.id}`}
                                  checked={productComplementGroups.includes(
                                    group.id
                                  )}
                                  onCheckedChange={() =>
                                    handleGroupSelectionForProduct(group.id)
                                  }
                                />
                                <Label htmlFor={`group-prod-${group.id}`}>
                                  {group.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                      <Button type="submit" className="w-full">
                        Adicionar Produto ao Cardápio
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Itens de Complemento */}
              <TabsContent value="complement_items" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Itens de Complemento</CardTitle>
                    <CardDescription>
                      Cadastre as opções individuais que podem ser adicionadas
                      (ex: Bacon, Cheddar, Coca-Cola).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleAddComplementItem}
                      className="grid grid-cols-3 gap-4 items-end"
                    >
                      <div className="col-span-2 grid gap-2">
                        <Label htmlFor="newItemName">Nome do Item</Label>
                        <Input
                          id="newItemName"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          placeholder="Ex: Bacon Extra"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="newItemPrice">Preço Adicional</Label>
                        <Input
                          id="newItemPrice"
                          type="number"
                          step="0.01"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(e.target.value)}
                          placeholder="Ex: 4.50"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full col-span-3">
                        Salvar Item
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Grupos de Complementos */}
              <TabsContent value="complement_groups" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Grupos de Complementos</CardTitle>
                    <CardDescription>
                      Crie os grupos que aparecerão para o cliente no totem (ex:
                      "Turbine seu Lanche", "Escolha sua Bebida").
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleAddComplementGroup}
                      className="grid gap-6"
                    >
                      <div className="grid gap-2">
                        <Label htmlFor="newGroupName">Nome do Grupo</Label>
                        <Input
                          id="newGroupName"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          placeholder="Ex: Turbine seu Lanche"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                        <div className="grid gap-2">
                          <Label htmlFor="newGroupMin">Mínimo</Label>
                          <Input
                            id="newGroupMin"
                            type="number"
                            value={newGroupMin}
                            onChange={(e) =>
                              setNewGroupMin(parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="newGroupMax">Máximo</Label>
                          <Input
                            id="newGroupMax"
                            type="number"
                            value={newGroupMax}
                            onChange={(e) =>
                              setNewGroupMax(parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <Switch
                            id="newGroupRequired"
                            checked={newGroupRequired}
                            onCheckedChange={setNewGroupRequired}
                          />
                          <Label htmlFor="newGroupRequired">Obrigatório</Label>
                        </div>
                      </div>
                      <div>
                        <Label className="text-base font-semibold">
                          Itens do Grupo
                        </Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Selecione quais itens farão parte deste grupo.
                        </p>
                        <Card className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {complementItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`item-group-${item.id}`}
                                  checked={newGroupItemIds.includes(item.id)}
                                  onCheckedChange={() =>
                                    handleItemSelectionForGroup(item.id)
                                  }
                                />
                                <Label htmlFor={`item-group-${item.id}`}>
                                  {item.name} (+ R$ {item.price.toFixed(2)})
                                </Label>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                      <Button type="submit" className="w-full">
                        Criar Grupo
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* --- CONTEÚDO DA ABA CATEGORIAS (RESTAURADO) --- */}
              <TabsContent value="categories" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Gerenciar Categorias</CardTitle>
                    <CardDescription>
                      Adicione ou remova categorias para organizar seus produtos
                      no totem.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddCategory} className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="newCategoryName">
                          Nome da Nova Categoria
                        </Label>
                        <Input
                          id="newCategoryName"
                          type="text"
                          placeholder="Ex: Combos, Porções"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Criar Categoria
                      </Button>
                    </form>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Categorias Existentes:
                      </h3>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <div
                            key={cat}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <p className="text-sm font-medium">{cat}</p>
                            {/* A função de deletar categoria precisaria ser criada */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                alert(
                                  `Função para deletar '${cat}' a ser implementada.`
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default IdealDashboardPage;

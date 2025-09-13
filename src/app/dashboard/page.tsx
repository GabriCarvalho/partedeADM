"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Utensils, Package, Tag, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function IdealDashboardPage() {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [restaurantLogo, setRestaurantLogo] = useState(null);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPhotos, setProductPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([
    "Hambúrgueres",
    "Sobremesas",
    "Combos",
    "Bebidas",
    "Promoções",
  ]);
  const [products, setProducts] = useState([]); // Novo estado para armazenar os produtos

  const handleRestaurantLogoChange = (event) => {
    setRestaurantLogo(event.target.files[0]);
  };

  const handleProductPhotosChange = (event) => {
    setProductPhotos(Array.from(event.target.files));
  };

  const handleRegisterRestaurant = (event) => {
    event.preventDefault();
    console.log("Registrar Restaurante:", {
      restaurantName,
      restaurantAddress,
      restaurantDescription,
      restaurantLogo,
    });
    alert("Restaurante registrado! (Integração com Supabase seria aqui)");
    // Resetar formulário
    setRestaurantName("");
    setRestaurantAddress("");
    setRestaurantDescription("");
    setRestaurantLogo(null);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    const newProduct = {
      id: Date.now(), // ID temporário para o exemplo
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      photos: productPhotos.map((file) => URL.createObjectURL(file)), // Armazena URLs temporárias para exibição
      category: selectedCategory,
    };
    setProducts([...products, newProduct]); // Adiciona o novo produto à lista
    console.log("Adicionar Produto:", newProduct);
    alert("Produto adicionado! (Integração com Supabase seria aqui)");
    // Resetar formulário
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductPhotos([]);
    setSelectedCategory("");
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName("");
      alert(`Categoria '${newCategoryName}' adicionada!`);
    } else if (categories.includes(newCategoryName)) {
      alert(`A categoria '${newCategoryName}' já existe.`);
    } else {
      alert("Por favor, insira um nome para a nova categoria.");
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert("Produto excluído!");
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Dashboard do Administrador
          </CardTitle>
          <CardDescription>
            Gerencie seu restaurante, categorias e produtos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="restaurant" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="restaurant">
                <Utensils className="mr-2 h-4 w-4" /> Restaurante
              </TabsTrigger>
              <TabsTrigger value="products">
                <Package className="mr-2 h-4 w-4" /> Produtos
              </TabsTrigger>
              <TabsTrigger value="categories">
                <Tag className="mr-2 h-4 w-4" /> Categorias
              </TabsTrigger>
            </TabsList>

            <TabsContent value="restaurant" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastrar Restaurante</CardTitle>
                  <CardDescription>
                    Preencha os detalhes do seu estabelecimento.
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
                        type="text"
                        placeholder="Nome do seu restaurante"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="restaurantAddress">Endereço</Label>
                      <Input
                        id="restaurantAddress"
                        type="text"
                        placeholder="Rua, Número, Bairro, Cidade"
                        value={restaurantAddress}
                        onChange={(e) => setRestaurantAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="restaurantDescription">Descrição</Label>
                      <Textarea
                        id="restaurantDescription"
                        placeholder="Uma breve descrição sobre seu restaurante..."
                        value={restaurantDescription}
                        onChange={(e) =>
                          setRestaurantDescription(e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="restaurantLogo">
                        Logo do Restaurante
                      </Label>
                      <Input
                        id="restaurantLogo"
                        type="file"
                        accept="image/*"
                        onChange={handleRestaurantLogoChange}
                      />
                      {restaurantLogo && (
                        <p className="text-sm text-gray-500 mt-1">
                          {restaurantLogo.name} selecionado.
                        </p>
                      )}
                    </div>
                    <Button type="submit" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" /> Cadastrar
                      Restaurante
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novo Produto</CardTitle>
                  <CardDescription>
                    Detalhes e fotos do seu novo produto.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="productName">Nome do Produto</Label>
                      <Input
                        id="productName"
                        type="text"
                        placeholder="Nome do produto"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="productDescription">Descrição</Label>
                      <Textarea
                        id="productDescription"
                        placeholder="Ingredientes e detalhes..."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="productPrice">Preço</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        step="0.01"
                        placeholder="9.99"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="productCategory">Categoria</Label>
                      <Select
                        onValueChange={setSelectedCategory}
                        value={selectedCategory}
                      >
                        <SelectTrigger id="productCategory">
                          <SelectValue placeholder="Selecione uma categoria" />
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
                    <div className="grid gap-2">
                      <Label htmlFor="productPhotos">Fotos do Produto</Label>
                      <Input
                        id="productPhotos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleProductPhotosChange}
                      />
                      {productPhotos.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          {productPhotos.length} arquivo(s) selecionado(s).
                        </p>
                      )}
                    </div>
                    <Button type="submit" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Produto
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Lista de Produtos Cadastrados */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Produtos Cadastrados</CardTitle>
                  <CardDescription>
                    Visualize e gerencie seus produtos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <p className="text-gray-500">
                      Nenhum produto cadastrado ainda.
                    </p>
                  ) : (
                    <div className="grid gap-4">
                      {products.map((product) => (
                        <Card
                          key={product.id}
                          className="flex items-center justify-between p-4"
                        >
                          <div className="flex items-center gap-4">
                            {product.photos.length > 0 && (
                              <img
                                src={product.photos[0]}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            )}
                            <div>
                              <p className="font-semibold">
                                {product.name} ({product.category})
                              </p>
                              <p className="text-sm text-gray-600">
                                R$ {product.price.toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product.description}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Categorias</CardTitle>
                  <CardDescription>
                    Adicione novas categorias para seus produtos.
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
                        placeholder="Ex: Sobremesas, Bebidas, Combos"
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
                    <ul className="list-disc pl-5">
                      {categories.map((cat) => (
                        <li key={cat} className="text-gray-700">
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default IdealDashboardPage;

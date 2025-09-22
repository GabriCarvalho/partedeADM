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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Minus,
  ShoppingCart,
  Check,
  X,
  CreditCard,
  Smartphone,
  DollarSign,
  Star,
  Utensils,
  Coffee,
  IceCream2,
  Tag,
  ChevronRight,
} from "lucide-react";

// Hook para buscar dados do dashboard em tempo real
function useDashboardData() {
  const [dashboardData, setDashboardData] = useState({
    restaurant: {
      name: "fcrazybossburgers",
      address: "Carregando...",
      logo: "🍔",
    },
    categories: [
      { id: "bestsellers", name: "Mais Vendidos", icon: Star },
      { id: "burgers", name: "Lanches", icon: Utensils },
      { id: "drinks", name: "Bebidas", icon: Coffee },
      { id: "desserts", name: "Sobremesas", icon: IceCream2 },
      { id: "promotions", name: "Promoções", icon: Tag },
    ],
    complementItems: [],
    removableIngredients: [],
    products: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Função para buscar dados do GitHub (simulando API do dashboard)
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Simula busca de dados de uma API que conecta com seu dashboard
      // Em produção, isso seria uma chamada real para sua API
      const mockApiResponse = {
        restaurant: {
          name: "fcrazybossburgers",
          address: "Vila Sanja",
          logo: "🍔",
        },
        complementItems: [
          { id: 101, name: "Bacon Extra", price: 4.5 },
          { id: 102, name: "Cheddar Cremoso", price: 3.0 },
          { id: 103, name: "Queijo Suíço", price: 3.5 },
          { id: 104, name: "Molho Especial", price: 1.0 },
          { id: 105, name: "Alface Extra", price: 1.5 },
          { id: 106, name: "Tomate Extra", price: 1.5 },
        ],
        removableIngredients: [
          { id: 201, name: "Cebola" },
          { id: 202, name: "Tomate" },
          { id: 203, name: "Alface" },
          { id: 204, name: "Molho" },
          { id: 205, name: "Picles" },
        ],
        products: [
          {
            id: 1,
            name: "X-Burger Clássico",
            description:
              "Hambúrguer artesanal, alface, tomate, cebola e molho especial",
            price: 18.9,
            category: "burgers",
            image: "🍔",
            bestseller: true,
            ingredients: [
              "Hambúrguer",
              "Alface",
              "Tomate",
              "Cebola",
              "Molho especial",
            ],
          },
          {
            id: 2,
            name: "X-Bacon Supremo",
            description:
              "Hambúrguer artesanal, bacon crocante, queijo cheddar, alface e tomate",
            price: 22.9,
            category: "burgers",
            image: "🥓",
            bestseller: true,
            ingredients: [
              "Hambúrguer",
              "Bacon",
              "Queijo cheddar",
              "Alface",
              "Tomate",
            ],
          },
          {
            id: 3,
            name: "Coca-Cola Lata",
            description: "Refrigerante Coca-Cola 350ml gelado",
            price: 5.0,
            category: "drinks",
            image: "🥤",
            ingredients: [],
          },
          {
            id: 4,
            name: "Sorvete Artesanal",
            description: "Sorvete cremoso sabor chocolate ou baunilha",
            price: 8.5,
            category: "desserts",
            image: "🍦",
            ingredients: [],
          },
          {
            id: 5,
            name: "Combo X-Burger",
            description: "X-Burger + Batata + Refrigerante",
            price: 24.9,
            category: "promotions",
            image: "🍟",
            originalPrice: 30.4,
            ingredients: ["X-Burger", "Batata frita", "Refrigerante"],
          },
        ],
      };

      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDashboardData((prev) => ({
        ...prev,
        ...mockApiResponse,
      }));

      setLastUpdate(new Date());
      console.log(
        "🔄 Dados sincronizados com o dashboard GitHub às",
        new Date().toLocaleTimeString()
      );
    } catch (error) {
      console.error("❌ Erro ao sincronizar com dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca inicial dos dados
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Polling para buscar atualizações a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, []);

  // Função manual para forçar atualização
  const refreshData = () => {
    fetchDashboardData();
  };

  return {
    ...dashboardData,
    isLoading,
    lastUpdate,
    refreshData,
  };
}

export default function TotemPage() {
  const { isLoading, lastUpdate, refreshData, ...dashboardData } =
    useDashboardData();
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [selectedCategory, setSelectedCategory] = useState("bestsellers");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [productComplements, setProductComplements] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [customizationStep, setCustomizationStep] = useState("complements");
  const [paymentMethod, setPaymentMethod] = useState(null);

  const getProductsByCategory = (category) => {
    if (category === "bestsellers") {
      return dashboardData.products.filter((product) => product.bestseller);
    }
    return dashboardData.products.filter(
      (product) => product.category === category
    );
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      const complementsTotal =
        item.complements?.reduce(
          (compTotal, comp) => compTotal + comp.price,
          0
        ) || 0;
      return total + (item.price + complementsTotal) * item.quantity;
    }, 0);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductComplements([]);
    setRemovedIngredients([]);
    setCustomizationStep("complements");
    setCurrentScreen("customize");
  };

  const handleComplementToggle = (complement) => {
    setProductComplements((prev) => {
      const exists = prev.find((c) => c.id === complement.id);
      if (exists) {
        return prev.filter((c) => c.id !== complement.id);
      }
      return [...prev, complement];
    });
  };

  const handleIngredientToggle = (ingredient) => {
    setRemovedIngredients((prev) => {
      const exists = prev.find((i) => i.id === ingredient.id);
      if (exists) {
        return prev.filter((i) => i.id !== ingredient.id);
      }
      return [...prev, ingredient];
    });
  };

  const addToCart = () => {
    const cartItem = {
      id: Date.now(),
      ...selectedProduct,
      complements: productComplements,
      removedIngredients: removedIngredients,
      quantity: 1,
    };

    setCart((prev) => [...prev, cartItem]);
    setCurrentScreen("main");
    setSelectedProduct(null);
    setProductComplements([]);
    setRemovedIngredients([]);
  };

  const updateCartItemQuantity = (itemId, change) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = Math.max(0, item.quantity + change);
            return newQuantity === 0
              ? null
              : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const proceedToPayment = () => {
    setCurrentScreen("payment");
  };

  const processPayment = () => {
    alert(
      `Pedido finalizado!\n\nTotal: R$ ${calculateCartTotal().toFixed(
        2
      )}\nPagamento: ${paymentMethod}\n\nObrigado pela preferência!`
    );
    setCart([]);
    setCurrentScreen("welcome");
    setPaymentMethod(null);
  };

  // Tela de boas-vindas
  if (currentScreen === "welcome") {
    return (
      <div
        className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 cursor-pointer"
        onClick={() => setCurrentScreen("main")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setCurrentScreen("main");
          }
        }}
        aria-label="Toque para começar"
      >
        <div className="text-center max-w-xl select-none">
          <div className="text-8xl mb-6">{dashboardData.restaurant.logo}</div>

          <h1 className="text-5xl font-semibold text-gray-900 mb-2">
            {dashboardData.restaurant.name}
          </h1>

          <p className="text-lg text-gray-600 mb-12">
            {dashboardData.restaurant.address}
          </p>

          <h2 className="text-3xl font-medium text-gray-700">
            Toque para começar
          </h2>
        </div>
      </div>
    );
  }

  // Tela principal com barra lateral
  if (currentScreen === "main") {
    const products = getProductsByCategory(selectedCategory);

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Barra lateral fixa */}
        <div className="w-80 bg-white shadow-lg p-6">
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">{dashboardData.restaurant.logo}</div>
            <h2 className="text-2xl font-bold text-gray-800">
              {dashboardData.restaurant.name}
            </h2>
            {isLoading && (
              <div className="text-sm text-yellow-600 mt-1">
                🔄 Carregando dados...
              </div>
            )}
          </div>

          <div className="space-y-2">
            {dashboardData.categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  className="w-full justify-start text-left h-16 text-lg"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <IconComponent className="h-6 w-6 mr-3" />
                  {category.name}
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>
              );
            })}

            <Button
              variant={cart.length > 0 ? "default" : "ghost"}
              className="w-full justify-start text-left h-16 text-lg bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setCurrentScreen("cart")}
              disabled={cart.length === 0}
            >
              <ShoppingCart className="h-6 w-6 mr-3" />
              Carrinho
              {cart.length > 0 && (
                <Badge className="ml-auto bg-red-500">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {
              dashboardData.categories.find((c) => c.id === selectedCategory)
                ?.name
            }
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => handleProductSelect(product)}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{product.image}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center justify-center gap-2 mb-4">
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>

                    {product.bestseller && (
                      <Badge className="bg-yellow-500 text-black">
                        <Star className="h-4 w-4 mr-1" />
                        Mais Vendido
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500">
                Esta categoria ainda não possui produtos disponíveis.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tela de personalização
  if (currentScreen === "customize" && selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header do produto */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-6xl mr-6">{selectedProduct.image}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {selectedProduct.description}
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    R$ {selectedProduct.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navegação entre etapas */}
          <div className="flex mb-6">
            <Button
              variant={
                customizationStep === "complements" ? "default" : "outline"
              }
              className="flex-1 mr-2"
              onClick={() => setCustomizationStep("complements")}
            >
              1. Adicionar Complementos
            </Button>
            <Button
              variant={
                customizationStep === "ingredients" ? "default" : "outline"
              }
              className="flex-1 ml-2"
              onClick={() => setCustomizationStep("ingredients")}
            >
              2. Remover Ingredientes
            </Button>
          </div>

          {/* Complementos opcionais */}
          {customizationStep === "complements" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Complementos Opcionais
                </CardTitle>
                <CardDescription className="text-lg">
                  Selecione os complementos que deseja adicionar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.complementItems.map((complement) => {
                    const isSelected = productComplements.find(
                      (c) => c.id === complement.id
                    );

                    return (
                      <div
                        key={complement.id}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          isSelected
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleComplementToggle(complement)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                              isSelected
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold">
                              {complement.name}
                            </h4>
                            <p className="text-green-600 font-bold">
                              + R$ {complement.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentScreen("main")}
                  >
                    Voltar
                  </Button>
                  <Button onClick={() => setCustomizationStep("ingredients")}>
                    Próximo: Ingredientes
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Remoção de ingredientes */}
          {customizationStep === "ingredients" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">Remover Ingredientes</CardTitle>
                <CardDescription className="text-lg">
                  Selecione os ingredientes que NÃO deseja no seu produto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.removableIngredients.map((ingredient) => {
                    const isSelected = removedIngredients.find(
                      (i) => i.id === ingredient.id
                    );

                    return (
                      <div
                        key={ingredient.id}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          isSelected
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleIngredientToggle(ingredient)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                              isSelected
                                ? "border-red-500 bg-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && <X className="h-4 w-4 text-white" />}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold">
                              {ingredient.name}
                            </h4>
                            {isSelected && (
                              <p className="text-red-600 font-bold">
                                Será removido
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCustomizationStep("complements")}
                  >
                    Voltar: Complementos
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={addToCart}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resumo do produto */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Produto:</strong> {selectedProduct.name}
                </p>
                <p>
                  <strong>Preço base:</strong> R${" "}
                  {selectedProduct.price.toFixed(2)}
                </p>

                {productComplements.length > 0 && (
                  <div>
                    <p>
                      <strong>Complementos:</strong>
                    </p>
                    <ul className="ml-4">
                      {productComplements.map((comp) => (
                        <li key={comp.id}>
                          • {comp.name} (+R$ {comp.price.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {removedIngredients.length > 0 && (
                  <div>
                    <p>
                      <strong>Ingredientes removidos:</strong>
                    </p>
                    <ul className="ml-4">
                      {removedIngredients.map((ing) => (
                        <li key={ing.id} className="text-red-600">
                          • Sem {ing.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-xl font-bold text-green-600 pt-2 border-t">
                  Total: R${" "}
                  {(
                    selectedProduct.price +
                    productComplements.reduce(
                      (total, comp) => total + comp.price,
                      0
                    )
                  ).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela do carrinho
  if (currentScreen === "cart") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Seu Carrinho</h1>
            <Button variant="outline" onClick={() => setCurrentScreen("main")}>
              Continuar Comprando
            </Button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Carrinho vazio
              </h3>
              <p className="text-gray-500 mb-6">
                Adicione alguns produtos para continuar.
              </p>
              <Button onClick={() => setCurrentScreen("main")}>
                Voltar às Compras
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-4xl mr-4">{item.image}</div>
                          <div>
                            <h3 className="text-xl font-bold">{item.name}</h3>

                            {item.complements &&
                              item.complements.length > 0 && (
                                <div className="text-sm text-green-600 mt-1">
                                  <strong>Complementos:</strong>{" "}
                                  {item.complements
                                    .map((comp) => comp.name)
                                    .join(", ")}
                                </div>
                              )}

                            {item.removedIngredients &&
                              item.removedIngredients.length > 0 && (
                                <div className="text-sm text-red-600 mt-1">
                                  <strong>Sem:</strong>{" "}
                                  {item.removedIngredients
                                    .map((ing) => ing.name)
                                    .join(", ")}
                                </div>
                              )}

                            <div className="text-lg font-bold text-green-600 mt-2">
                              R${" "}
                              {(
                                (item.price +
                                  (item.complements?.reduce(
                                    (total, comp) => total + comp.price,
                                    0
                                  ) || 0)) *
                                item.quantity
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-4 text-xl font-bold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold">Total do Pedido:</span>
                    <span className="text-3xl font-bold text-green-600">
                      R$ {calculateCartTotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setCurrentScreen("main")}
                    >
                      Continuar Comprando
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={proceedToPayment}
                    >
                      Finalizar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  }

  // Tela de pagamento
  if (currentScreen === "payment") {
    const paymentMethods = [
      { id: "credit", name: "Cartão de Crédito/Débito", icon: CreditCard },
      { id: "pix", name: "PIX", icon: Smartphone },
      { id: "cash", name: "Dinheiro", icon: DollarSign },
    ];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Pagamento</h1>

          {/* Resumo do pedido */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>
                      R${" "}
                      {(
                        (item.price +
                          (item.complements?.reduce(
                            (total, comp) => total + comp.price,
                            0
                          ) || 0)) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span className="text-green-600">
                    R$ {calculateCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seleção da forma de pagamento */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Escolha a forma de pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          paymentMethod === method.id
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === method.id && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <IconComponent className="h-8 w-8 mr-4" />
                      <span className="text-xl font-semibold">
                        {method.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Botões de ação */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentScreen("cart")}
            >
              Voltar ao Carrinho
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={processPayment}
              disabled={!paymentMethod}
            >
              Confirmar Pagamento
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

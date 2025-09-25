// src/components/dashboard/MainDashboard/Tabs/ProductsTab.jsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import ProductCard from "../common/ProductCard";

export default function ProductsTab({
  products,
  productForm,
  setProductForm,
  categories,
  ingredientCategories,
  ingredients, // All ingredients
  complementGroups, // All complement groups
  handleAddProduct,
  handleToggleProductAvailability,
  handleDeleteProduct,
  handleIngredientSelection,
  handleComplementGroupSelection,
  getIngredientsByIds, // Helper function
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Produto</CardTitle>
          <CardDescription>
            Cadastre hambúrgueres, bebidas e outros itens do cardápio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Nome do Produto *</Label>
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
                <Label htmlFor="productPrice">Preço (R\$) *</Label>
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
                <Label htmlFor="productImage">Imagem do Produto</Label>
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
                Selecione os ingredientes que compõem este produto. Os clientes
                poderão remover ingredientes no totem.
              </p>
              <Card className="p-4">
                <div className="space-y-4">
                  {ingredientCategories.map((category) => {
                    const categoryIngredients = ingredients.filter(
                      (ing) => ing.category === category
                    );
                    if (categoryIngredients.length === 0) return null;

                    return (
                      <div key={category}>
                        <h5 className="font-medium mb-2">{category}</h5>
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
                                  handleIngredientSelection(ingredient.id)
                                }
                              />
                              <Label
                                htmlFor={`ingredient-${ingredient.id}`}
                                className="text-sm"
                              >
                                {ingredient.name}
                                {ingredient.price > 0 && (
                                  <span className="text-green-600 ml-1">
                                    (+R\$ {ingredient.price.toFixed(2)})
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
                Selecione quais grupos de complementos estarão disponíveis para
                este produto
              </p>
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complementGroups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={productForm.complementGroups.includes(
                          group.id
                        )}
                        onCheckedChange={() =>
                          handleComplementGroupSelection(group.id)
                        }
                      />
                      <Label htmlFor={`group-${group.id}`} className="text-sm">
                        {group.name}
                        <span className="text-gray-500 ml-1">
                          ({group.required ? "Obrigatório" : "Opcional"})
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

      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Produtos Cadastrados ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleToggleProductAvailability={
                    handleToggleProductAvailability
                  }
                  handleDeleteProduct={handleDeleteProduct}
                  getIngredientsByIds={getIngredientsByIds}
                  complementGroups={complementGroups}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

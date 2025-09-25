// src/components/dashboard/MainDashboard/Tabs/IngredientsTab.jsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";

export default function IngredientsTab({
  ingredients,
  newIngredient,
  setNewIngredient,
  ingredientCategories,
  handleAddIngredient,
  handleDeleteIngredient,
}) {
  return (
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
              <Label htmlFor="ingredientName">Nome do Ingrediente *</Label>
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
              <Label htmlFor="ingredientCategory">Categoria *</Label>
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
              <Label htmlFor="ingredientPrice">Preço Adicional (R\$)</Label>
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
                  <h4 className="font-semibold text-lg mb-2">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {categoryIngredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{ingredient.name}</span>
                          {ingredient.price > 0 && (
                            <span className="text-sm text-green-600 ml-2">
                              +R\$ {ingredient.price.toFixed(2)}
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
                                Tem certeza que deseja excluir o ingrediente "
                                {ingredient.name}"? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteIngredient(ingredient.id)
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
  );
}

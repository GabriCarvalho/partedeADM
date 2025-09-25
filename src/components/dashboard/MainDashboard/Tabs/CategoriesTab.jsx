// src/components/dashboard/MainDashboard/Tabs/CategoriesTab.jsx
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
import { AlertCircle, PlusCircle, Trash2 } from "lucide-react";

export default function CategoriesTab({
  categories,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
  handleDeleteCategory,
  products, // Necessário para contar produtos por categoria
}) {
  return (
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
              <Label htmlFor="categoryName">Nome da Categoria *</Label>
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
          <CardTitle>Categorias Cadastradas ({categories.length})</CardTitle>
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
                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir a categoria "{category}
                          "?
                          {categoryProductCount > 0 && (
                            <span className="block mt-2 text-orange-600">
                              <AlertCircle className="inline h-4 w-4 mr-1" />
                              Atenção: Esta categoria possui{" "}
                              {categoryProductCount} produto(s) associado(s).
                            </span>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category)}
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
  );
}

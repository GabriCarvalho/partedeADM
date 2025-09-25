// src/components/dashboard/MainDashboard/common/ProductCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
// Remova a linha: import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import IngredientsList from "./IngredientsList";

export default function ProductCard({
  product,
  handleToggleProductAvailability,
  handleDeleteProduct,
  getIngredientsByIds,
  complementGroups,
}) {
  return (
    <Card key={product.id} className="relative">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {product.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleToggleProductAvailability(product.id)}
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
                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir o produto "{product.name}"?
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteProduct(product.id)}
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
              R\$ {product.price.toFixed(2)}
            </span>
            <Badge variant={product.available ? "default" : "secondary"}>
              {product.available ? "Disponível" : "Indisponível"}
            </Badge>
          </div>

          {product.description && (
            <p className="text-sm text-gray-600">{product.description}</p>
          )}

          {product.ingredients.length > 0 && (
            <div>
              {/* Substituído Label por span */}
              <span className="text-xs font-semibold text-gray-700 block mb-1">
                Ingredientes:
              </span>
              <IngredientsList
                ingredients={getIngredientsByIds(product.ingredients)}
              />
            </div>
          )}

          {product.complementGroups.length > 0 && (
            <div>
              {/* Substituído Label por span */}
              <span className="text-xs font-semibold text-gray-700 block mb-1">
                Grupos de Complementos:
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.complementGroups.map((groupId) => {
                  const group = complementGroups.find((g) => g.id === groupId);
                  return group ? (
                    <Badge key={groupId} variant="outline" className="text-xs">
                      {group.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// src/components/dashboard/MainDashboard/Tabs/ComplementItemsTab.jsx
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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Eye, EyeOff } from "lucide-react";

export default function ComplementItemsTab({
  complementItems,
  newComplementItem,
  setNewComplementItem,
  handleAddComplementItem,
  handleDeleteComplementItem,
  handleToggleComplementItemAvailability,
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Item de Complemento</CardTitle>
          <CardDescription>
            Cadastre itens adicionais como bacon extra, bebidas, porções, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAddComplementItem}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="complementItemName">Nome do Item *</Label>
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
              <Label htmlFor="complementItemPrice">Preço (R\$) *</Label>
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
            Itens de Complemento Cadastrados ({complementItems.length})
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
                    <Badge variant={item.available ? "default" : "secondary"}>
                      {item.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    R\$ {item.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleToggleComplementItemAvailability(item.id)
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
                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o item "{item.name}"?
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteComplementItem(item.id)}
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
  );
}

// src/components/dashboard/MainDashboard/Tabs/ComplementGroupsTab.jsx
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
import { PlusCircle, Trash2 } from "lucide-react";

export default function ComplementGroupsTab({
  complementItems, // All complement items
  complementGroups,
  newComplementGroup,
  setNewComplementGroup,
  handleAddComplementGroup,
  handleDeleteComplementGroup,
  handleComplementItemSelectionForGroup,
  getComplementItemsByIds, // Helper function
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Criar Grupo de Complementos</CardTitle>
          <CardDescription>
            Organize os itens de complemento em grupos (ex: "Turbine seu
            Lanche", "Escolha sua Bebida")
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddComplementGroup} className="space-y-6">
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
                <Label htmlFor="groupRequired">Seleção Obrigatória</Label>
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
              <Label className="text-base font-semibold">Itens do Grupo</Label>
              <p className="text-sm text-gray-600">
                Selecione quais itens de complemento farão parte deste grupo
              </p>
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {complementItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-item-${item.id}`}
                        checked={newComplementGroup.itemIds.includes(item.id)}
                        onCheckedChange={() =>
                          handleComplementItemSelectionForGroup(item.id)
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

      {complementGroups.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Grupos de Complementos Cadastrados ({complementGroups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complementGroups.map((group) => (
                <Card key={group.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{group.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge
                          variant={group.required ? "destructive" : "secondary"}
                        >
                          {group.required ? "Obrigatório" : "Opcional"}
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
                            Tem certeza que deseja excluir o grupo "{group.name}
                            "? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
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
                      {getComplementItemsByIds(group.itemIds).map((item) => (
                        <Badge key={item.id} variant="outline">
                          {item.name} (R$ {item.price.toFixed(2)})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

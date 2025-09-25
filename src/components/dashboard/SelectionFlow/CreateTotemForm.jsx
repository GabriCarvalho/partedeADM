// src/components/dashboard/SelectionFlow/CreateTotemForm.jsx
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
import { PlusCircle, Monitor } from "lucide-react";

export default function CreateTotemForm({
  selectedRestaurant,
  newTotemForm,
  setNewTotemForm,
  handleCreateTotem,
  setShowCreateTotemForm,
}) {
  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          Novo Totem para "{selectedRestaurant.name}"
        </CardTitle>
        <CardDescription className="text-green-100">
          Preencha os dados para cadastrar um novo totem.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleCreateTotem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newTotemName">Nome do Totem *</Label>
            <Input
              id="newTotemName"
              value={newTotemForm.name}
              onChange={(e) =>
                setNewTotemForm({ ...newTotemForm, name: e.target.value })
              }
              placeholder="Ex: Totem Entrada Principal"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newTotemStatus">Status Inicial</Label>
            <Select
              value={newTotemForm.status}
              onValueChange={(value) =>
                setNewTotemForm({ ...newTotemForm, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateTotemForm(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Criar Totem
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

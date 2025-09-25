// src/components/dashboard/SelectionFlow/CreateRestaurantForm.jsx
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
import { PlusCircle, Store } from "lucide-react";

export default function CreateRestaurantForm({
  newRestaurantForm,
  setNewRestaurantForm,
  handleCreateRestaurant,
  setShowCreateRestaurantForm,
}) {
  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Store className="h-6 w-6" />
          Nova Hamburgueria
        </CardTitle>
        <CardDescription className="text-blue-100">
          Preencha os dados para cadastrar uma nova unidade.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleCreateRestaurant} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newRestaurantName">Nome da Hamburgueria *</Label>
            <Input
              id="newRestaurantName"
              value={newRestaurantForm.name}
              onChange={(e) =>
                setNewRestaurantForm({
                  ...newRestaurantForm,
                  name: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newRestaurantAddress">Endereço Completo</Label>
            <Input
              id="newRestaurantAddress"
              value={newRestaurantForm.address}
              onChange={(e) =>
                setNewRestaurantForm({
                  ...newRestaurantForm,
                  address: e.target.value,
                })
              }
              placeholder="Rua, número, bairro, cidade"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newRestaurantPhone">Telefone</Label>
            <Input
              id="newRestaurantPhone"
              value={newRestaurantForm.phone}
              onChange={(e) =>
                setNewRestaurantForm({
                  ...newRestaurantForm,
                  phone: e.target.value,
                })
              }
              placeholder="(11) 99999-9999"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newRestaurantHours">Horário de Funcionamento</Label>
            <Input
              id="newRestaurantHours"
              value={newRestaurantForm.openingHours}
              onChange={(e) =>
                setNewRestaurantForm({
                  ...newRestaurantForm,
                  openingHours: e.target.value,
                })
              }
              placeholder="Seg-Dom: 18h às 23h"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newRestaurantDescription">Descrição</Label>
            <Textarea
              id="newRestaurantDescription"
              value={newRestaurantForm.description}
              onChange={(e) =>
                setNewRestaurantForm({
                  ...newRestaurantForm,
                  description: e.target.value,
                })
              }
              placeholder="Descreva sua hamburgueria..."
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateRestaurantForm(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Criar Hamburgueria
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// src/components/dashboard/SelectionFlow/TotemSelection.jsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Monitor, ArrowLeft } from "lucide-react";

export default function TotemSelection({
  selectedRestaurant,
  availableTotems,
  handleSelectTotem,
  setShowCreateTotemForm,
  handleBackToRestaurantSelection,
}) {
  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          Selecione o Totem para "{selectedRestaurant.name}"
        </CardTitle>
        <CardDescription className="text-green-100">
          Escolha qual totem você deseja configurar ou adicione um novo.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {availableTotems.length > 0 ? (
          availableTotems.map((totem) => (
            <Button
              key={totem.id}
              variant="outline"
              className="w-full justify-start h-14 text-lg"
              onClick={() => handleSelectTotem(totem.id)}
            >
              <Monitor className="mr-3 h-6 w-6 text-blue-500" />
              {totem.name}
              <Badge
                variant={totem.status === "online" ? "default" : "secondary"}
                className="ml-auto"
              >
                {totem.status === "online" ? "Online" : "Offline"}
              </Badge>
            </Button>
          ))
        ) : (
          <p className="text-center text-gray-600">
            Nenhum totem encontrado para esta hamburgueria.
          </p>
        )}
        <Separator />
        <Button
          variant="default"
          className="w-full"
          onClick={() => setShowCreateTotemForm(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Novo Totem
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleBackToRestaurantSelection}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Seleção de Hamburgueria
        </Button>
      </CardContent>
    </Card>
  );
}

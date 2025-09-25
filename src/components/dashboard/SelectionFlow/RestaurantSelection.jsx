// src/components/dashboard/SelectionFlow/RestaurantSelection.jsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Store, Utensils } from "lucide-react";

export default function RestaurantSelection({
  restaurants,
  handleSelectRestaurant,
  setShowCreateRestaurantForm,
}) {
  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Store className="h-6 w-6" />
          Selecione a Hamburgueria
        </CardTitle>
        <CardDescription className="text-blue-100">
          Escolha qual unidade você deseja gerenciar ou adicione uma nova.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Button
              key={restaurant.id}
              variant="outline"
              className="w-full justify-start h-14 text-lg"
              onClick={() => handleSelectRestaurant(restaurant.id)}
            >
              <Utensils className="mr-3 h-6 w-6 text-orange-500" />
              {restaurant.name}
            </Button>
          ))
        ) : (
          <p className="text-center text-gray-600">
            Nenhuma hamburgueria cadastrada.
          </p>
        )}
        <Separator />
        <Button
          variant="default"
          className="w-full"
          onClick={() => setShowCreateRestaurantForm(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Nova Hamburgueria
        </Button>
      </CardContent>
    </Card>
  );
}

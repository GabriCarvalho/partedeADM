// src/components/dashboard/MainDashboard/Tabs/RestaurantSettingsTab.jsx
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
import { Save } from "lucide-react";

export default function RestaurantSettingsTab({
  restaurantData,
  setRestaurantData,
  handleUpdateRestaurant,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Restaurante</CardTitle>
        <CardDescription>
          Configure as informações básicas que aparecerão no totem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateRestaurant} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome da Hamburgueria *</Label>
              <Input
                id="restaurantName"
                value={restaurantData.name}
                onChange={(e) =>
                  setRestaurantData({
                    ...restaurantData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurantPhone">Telefone</Label>
              <Input
                id="restaurantPhone"
                value={restaurantData.phone}
                onChange={(e) =>
                  setRestaurantData({
                    ...restaurantData,
                    phone: e.target.value,
                  })
                }
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurantAddress">Endereço Completo</Label>
            <Input
              id="restaurantAddress"
              value={restaurantData.address}
              onChange={(e) =>
                setRestaurantData({
                  ...restaurantData,
                  address: e.target.value,
                })
              }
              placeholder="Rua, número, bairro, cidade"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurantDescription">Descrição</Label>
            <Textarea
              id="restaurantDescription"
              value={restaurantData.description}
              onChange={(e) =>
                setRestaurantData({
                  ...restaurantData,
                  description: e.target.value,
                })
              }
              placeholder="Descreva sua hamburgueria..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantHours">Horário de Funcionamento</Label>
              <Input
                id="restaurantHours"
                value={restaurantData.openingHours}
                onChange={(e) =>
                  setRestaurantData({
                    ...restaurantData,
                    openingHours: e.target.value,
                  })
                }
                placeholder="Seg-Dom: 18h às 23h"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurantLogo">Logo do Restaurante</Label>
              <Input
                id="restaurantLogo"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setRestaurantData({
                    ...restaurantData,
                    logo: e.target.files[0],
                  })
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Salvar Informações do Restaurante
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

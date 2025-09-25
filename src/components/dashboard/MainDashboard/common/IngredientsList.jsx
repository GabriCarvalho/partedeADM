// src/components/dashboard/common/IngredientsList.jsx
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function IngredientsList({
  ingredients,
  onRemove,
  editable = false,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ingredients.map((ingredient) => (
        <Badge key={ingredient.id} variant="secondary" className="text-xs">
          {ingredient.name}
          {editable && (
            <button
              onClick={() => onRemove(ingredient.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X size={12} />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
}

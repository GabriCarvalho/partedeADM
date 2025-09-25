// src/components/layout/DatabaseActionModal.jsx
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function DatabaseActionModal({ title, description, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-blue-600">
            Ação do Banco de Dados
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600 mt-2 bg-blue-50 p-3 rounded-md border border-blue-200">
            {description}
          </p>
        </div>
        <div className="mt-6 text-right">
          <Button onClick={onClose}>Entendido</Button>
        </div>
      </div>
    </div>
  );
}

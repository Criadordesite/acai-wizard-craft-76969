import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  basePrice: number;
  onConfirm: (customization: CustomizationData) => void;
}

export interface CustomizationData {
  freeToppings: string[];
  paidToppings: string[];
  syrup: string;
  totalPrice: number;
}

const freeToppingsOptions = [
  "Banana",
  "Morango",
  "Granola",
  "Leite em Pó",
  "Paçoca",
  "Amendoim",
];

const paidToppingsOptions = [
  { name: "Nutella", price: 1.99 },
  { name: "Bis", price: 1.99 },
  { name: "Leite Condensado", price: 1.99 },
];

const syrupOptions = [
  { name: "Morango", price: 1.99 },
  { name: "Chocolate", price: 1.99 },
  { name: "Caramelo", price: 1.99 },
];

export const PersonalizationModal = ({
  isOpen,
  onClose,
  productName,
  basePrice,
  onConfirm,
}: PersonalizationModalProps) => {
  const [freeToppings, setFreeToppings] = useState<string[]>([]);
  const [paidToppings, setPaidToppings] = useState<string[]>([]);
  const [syrup, setSyrup] = useState<string>("");

  const handleFreeToppingToggle = (topping: string) => {
    if (freeToppings.includes(topping)) {
      setFreeToppings(freeToppings.filter((t) => t !== topping));
    } else if (freeToppings.length < 1) {
      setFreeToppings([...freeToppings, topping]);
    } else {
      toast.error("Você pode escolher apenas 1 adicional grátis!");
    }
  };

  const handlePaidToppingToggle = (topping: string) => {
    if (paidToppings.includes(topping)) {
      setPaidToppings(paidToppings.filter((t) => t !== topping));
    } else {
      setPaidToppings([...paidToppings, topping]);
    }
  };

  const handleSyrupSelect = (selectedSyrup: string) => {
    setSyrup(selectedSyrup === syrup ? "" : selectedSyrup);
  };

  const calculateTotal = () => {
    let total = basePrice;
    total += paidToppings.length * 1.99;
    total += syrup ? 1.99 : 0;
    return total;
  };

  const handleConfirm = () => {
    if (freeToppings.length === 0) {
      toast.error("Escolha pelo menos 1 adicional grátis!");
      return;
    }

    const customization: CustomizationData = {
      freeToppings,
      paidToppings,
      syrup,
      totalPrice: calculateTotal(),
    };

    onConfirm(customization);
    
    // Reset
    setFreeToppings([]);
    setPaidToppings([]);
    setSyrup("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Personalize seu {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Adicionais Grátis */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">
              Adicionais Grátis (Escolha 1)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {freeToppingsOptions.map((topping) => (
                <div key={topping} className="flex items-center space-x-2">
                  <Checkbox
                    id={`free-${topping}`}
                    checked={freeToppings.includes(topping)}
                    onCheckedChange={() => handleFreeToppingToggle(topping)}
                  />
                  <Label
                    htmlFor={`free-${topping}`}
                    className="cursor-pointer"
                  >
                    {topping}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Adicionais Pagos */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">
              Adicionais Pagos (R$ 1,99 cada)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {paidToppingsOptions.map((topping) => (
                <div key={topping.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`paid-${topping.name}`}
                    checked={paidToppings.includes(topping.name)}
                    onCheckedChange={() => handlePaidToppingToggle(topping.name)}
                  />
                  <Label
                    htmlFor={`paid-${topping.name}`}
                    className="cursor-pointer"
                  >
                    {topping.name} - R$ {topping.price.toFixed(2)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Caldas */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">
              Calda (Escolha 1 - R$ 1,99)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {syrupOptions.map((option) => (
                <div key={option.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`syrup-${option.name}`}
                    checked={syrup === option.name}
                    onCheckedChange={() => handleSyrupSelect(option.name)}
                  />
                  <Label
                    htmlFor={`syrup-${option.name}`}
                    className="cursor-pointer"
                  >
                    {option.name} - R$ {option.price.toFixed(2)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary">R$ {calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

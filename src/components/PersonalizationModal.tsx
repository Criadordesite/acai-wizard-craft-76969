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
  freeFruits: string[];
  freeConfeitos: string[];
  paidToppings: string[];
  syrup: string;
  totalPrice: number;
}

const freeFruitOptions = [
  "Morango fresco",
  "Pêssego em calda",
  "Manga ou kiwi picado",
  "Frutas cristalizadas",
];

const freeConfeitosOptions = [
  "Granulado colorido ou de chocolate",
  "Confetes tipo M&M",
  "Biscoito triturado (Oreo, cookies)",
  "Marshmallow",
  "Gotas de chocolate",
];

const paidToppingsOptions = [
  { name: "Nutella", price: 1.99 },
  { name: "Bis", price: 1.99 },
  { name: "Leite Condensado", price: 1.99 },
];

const syrupOptions = [
  { name: "Morango", price: 0 },
  { name: "Caramelo", price: 0 },
  { name: "Doce de leite", price: 0 },
  { name: "Maracujá", price: 0 },
  { name: "Menta", price: 0 },
  { name: "Baunilha", price: 0 },
];

export const PersonalizationModal = ({
  isOpen,
  onClose,
  productName,
  basePrice,
  onConfirm,
}: PersonalizationModalProps) => {
  const [freeFruits, setFreeFruits] = useState<string[]>([]);
  const [freeConfeitos, setFreeConfeitos] = useState<string[]>([]);
  const [paidToppings, setPaidToppings] = useState<string[]>([]);
  const [syrup, setSyrup] = useState<string>("");

  const handleFreeFruitToggle = (fruit: string) => {
    if (freeFruits.includes(fruit)) {
      setFreeFruits(freeFruits.filter((t) => t !== fruit));
    } else if (freeFruits.length < 1) {
      setFreeFruits([...freeFruits, fruit]);
    } else {
      toast.error("Você pode escolher apenas 1 fruta grátis!");
    }
  };

  const handleFreeConfeitoToggle = (confeito: string) => {
    if (freeConfeitos.includes(confeito)) {
      setFreeConfeitos(freeConfeitos.filter((t) => t !== confeito));
    } else if (freeConfeitos.length < 1) {
      setFreeConfeitos([...freeConfeitos, confeito]);
    } else {
      toast.error("Você pode escolher apenas 1 confeito/crocante grátis!");
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
    // Caldas agora são grátis
    return total;
  };

  const handleConfirm = () => {
    if (freeFruits.length === 0) {
      toast.error("Escolha pelo menos 1 fruta grátis!");
      return;
    }
    if (freeConfeitos.length === 0) {
      toast.error("Escolha pelo menos 1 confeito/crocante grátis!");
      return;
    }

    const customization: CustomizationData = {
      freeFruits,
      freeConfeitos,
      paidToppings,
      syrup,
      totalPrice: calculateTotal(),
    };

    onConfirm(customization);
    
    // Reset
    setFreeFruits([]);
    setFreeConfeitos([]);
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
          {/* Frutas Grátis */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">
              Frutas (Escolha 1 - Grátis)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {freeFruitOptions.map((fruit) => (
                <div key={fruit} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fruit-${fruit}`}
                    checked={freeFruits.includes(fruit)}
                    onCheckedChange={() => handleFreeFruitToggle(fruit)}
                  />
                  <Label
                    htmlFor={`fruit-${fruit}`}
                    className="cursor-pointer"
                  >
                    {fruit}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Confeitos/Crocantes Grátis */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">
              Confeitos/Crocantes (Escolha 1 - Grátis)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {freeConfeitosOptions.map((confeito) => (
                <div key={confeito} className="flex items-center space-x-2">
                  <Checkbox
                    id={`confeito-${confeito}`}
                    checked={freeConfeitos.includes(confeito)}
                    onCheckedChange={() => handleFreeConfeitoToggle(confeito)}
                  />
                  <Label
                    htmlFor={`confeito-${confeito}`}
                    className="cursor-pointer"
                  >
                    {confeito}
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
              Calda (Escolha 1 - Grátis)
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
                    {option.name} - Grátis
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

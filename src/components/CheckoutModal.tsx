import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CartItem } from "./CartModal";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
}

export const CheckoutModal = ({ isOpen, onClose, items, total }: CheckoutModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    reference: "",
    neighborhood: "",
    city: "",
    payment: "dinheiro",
    troco: "",
  });
  
  const [noNumber, setNoNumber] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.street || !formData.neighborhood) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (!noNumber && !formData.number) {
      alert("Por favor, informe o número do endereço ou marque a opção 'Endereço sem número'");
      return;
    }

    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("%0A");

    const addressNumber = noNumber ? "S/N" : formData.number;
    const complementText = formData.complement ? `Complemento: ${formData.complement}%0A` : "";
    const referenceText = formData.reference ? `Referência: ${formData.reference}%0A` : "";
    const trocoText = formData.payment === "dinheiro" && formData.troco 
      ? `Troco para: R$ ${formData.troco}%0A` 
      : "";

    const message = `*🛍️ NOVO PEDIDO - THE BEST AÇAÍ*%0A%0A` +
      `*Itens:*%0A${itemsList}%0A%0A` +
      `*Total: R$ ${total.toFixed(2)}*%0A%0A` +
      `*👤 Cliente:* ${formData.name}%0A` +
      `*📱 Telefone:* ${formData.phone}%0A%0A` +
      `*📍 Endereço:*%0A` +
      `${formData.street}, ${addressNumber}%0A` +
      `${complementText}` +
      `Bairro: ${formData.neighborhood}%0A` +
      `${formData.city ? `Cidade: ${formData.city}%0A` : ""}` +
      `${referenceText}%0A` +
      `*💳 Pagamento:* ${formData.payment}%0A` +
      `${trocoText}`;

    const whatsappNumber = "5511999999999"; // Substituir pelo número real
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Finalizar Pedido</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Seu nome"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                placeholder="00000-000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Endereço *</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="Rua, Avenida..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Número {!noNumber && "*"}</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="123"
                disabled={noNumber}
                required={!noNumber}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={formData.complement}
                onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                placeholder="Apto, Bloco..."
                disabled={noNumber}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="noNumber"
              checked={noNumber}
              onCheckedChange={(checked) => {
                setNoNumber(checked as boolean);
                if (checked) {
                  setFormData({ ...formData, number: "", complement: "" });
                }
              }}
            />
            <Label htmlFor="noNumber" className="text-sm font-normal cursor-pointer">
              Endereço sem número ou sem complemento
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Ponto de Referência</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="Próximo ao..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                placeholder="Seu bairro"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Sua cidade"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Forma de Pagamento *</Label>
            <RadioGroup value={formData.payment} onValueChange={(value) => setFormData({ ...formData, payment: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dinheiro" id="dinheiro" />
                <Label htmlFor="dinheiro" className="font-normal cursor-pointer">Dinheiro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix" className="font-normal cursor-pointer">PIX</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cartao" id="cartao" />
                <Label htmlFor="cartao" className="font-normal cursor-pointer">Cartão (na entrega)</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.payment === "dinheiro" && (
            <div className="space-y-2">
              <Label htmlFor="troco">Troco para quanto?</Label>
              <Input
                id="troco"
                value={formData.troco}
                onChange={(e) => setFormData({ ...formData, troco: e.target.value })}
                placeholder="R$ 50,00"
              />
            </div>
          )}

          <Button type="submit" className="w-full bg-success hover:bg-success/90 text-success-foreground text-lg py-6">
            Enviar Pedido via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

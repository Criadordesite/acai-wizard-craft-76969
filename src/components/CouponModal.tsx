import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ticket, TruckIcon } from "lucide-react";
import { toast } from "sonner";

interface Coupon {
  code: string;
  title: string;
  description: string;
  minValue: number;
  type: "frete" | "desconto";
  discount?: number;
}

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number;
  onApplyCoupon: (code: string, type: "frete" | "desconto", discount?: number) => void;
}

const coupons: Coupon[] = [
  {
    code: "FRETE159",
    title: "ENTREGA GRÁTIS",
    description: "Para compras acima de R$ 159,90",
    minValue: 159.90,
    type: "frete",
  },
  {
    code: "DESCONTO20",
    title: "R$ 20,00 DE DESCONTO",
    description: "Para compras acima de R$ 170,00",
    minValue: 170.00,
    type: "desconto",
    discount: 20.00,
  },
];

export const CouponModal = ({ isOpen, onClose, cartTotal, onApplyCoupon }: CouponModalProps) => {
  const handleResgate = (coupon: Coupon) => {
    // Salvar cupom no localStorage
    localStorage.setItem('cupomAtivo', coupon.code);
    
    // Verificar se o valor do carrinho atende ao requisito
    if (cartTotal >= coupon.minValue) {
      // Aplicar cupom imediatamente
      onApplyCoupon(coupon.code, coupon.type, coupon.discount);
      
      // Notificação de sucesso
      if (coupon.type === "frete") {
        toast.success(`🎉 Cupom ${coupon.code} aplicado! Você ganhou Entrega Grátis!`, {
          duration: 5000,
        });
      } else {
        toast.success(`🎉 Cupom ${coupon.code} aplicado! Você economizou R$ ${coupon.discount?.toFixed(2)}!`, {
          duration: 5000,
        });
      }
      
      onClose();
    } else {
      // Valor insuficiente - salvar cupom mas não aplicar
      const valorFaltante = coupon.minValue - cartTotal;
      toast.info(`💾 Seu cupom ${coupon.code} foi salvo! Adicione mais R$ ${valorFaltante.toFixed(2)} para ativá-lo.`, {
        duration: 6000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Ticket className="h-6 w-6 text-orange-500" />
            Cupons Disponíveis
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {coupons.map((coupon) => {
            const canApply = cartTotal >= coupon.minValue;
            const valorFaltante = coupon.minValue - cartTotal;
            
            return (
              <Card key={coupon.code} className="p-4 border-2 hover:border-orange-500 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {coupon.type === "frete" ? (
                      <TruckIcon className="h-8 w-8 text-orange-500" />
                    ) : (
                      <Ticket className="h-8 w-8 text-orange-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{coupon.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{coupon.description}</p>
                    <p className="text-xs font-mono bg-muted px-2 py-1 rounded inline-block mb-3">
                      Código: {coupon.code}
                    </p>
                    
                    {!canApply && (
                      <p className="text-xs text-orange-600 font-semibold mb-2">
                        Faltam R$ {valorFaltante.toFixed(2)} para ativar este cupom
                      </p>
                    )}
                    
                    <Button
                      onClick={() => handleResgate(coupon)}
                      className="w-full"
                      variant={canApply ? "default" : "outline"}
                    >
                      {canApply ? "Resgatar Agora" : "Salvar Cupom"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-center">
            <span className="font-semibold">Valor do seu carrinho:</span> R$ {cartTotal.toFixed(2)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

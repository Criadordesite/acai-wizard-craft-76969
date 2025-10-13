import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartModal = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartModalProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Seu Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Seu carrinho está vazio</p>
              <p className="text-sm mt-2">Adicione produtos para continuar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-primary font-bold mt-1">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.quantity === 1 ? (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onRemoveItem(item.id)}
                          className="h-8 w-8 rounded-full hover:bg-destructive hover:text-destructive-foreground border-destructive/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <span className="font-bold text-lg w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="h-8 w-8 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="font-bold text-lg">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">R$ {total.toFixed(2)}</span>
              </div>
              
              <Button
                onClick={onCheckout}
                className="w-full bg-success hover:bg-success/90 text-success-foreground text-lg py-6 shadow-elegant"
              >
                Finalizar Pedido
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

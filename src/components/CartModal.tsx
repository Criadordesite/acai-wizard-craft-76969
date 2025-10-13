import { CartItem } from "@/types";

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal = ({ cart, onClose, onCheckout }: CartModalProps) => {
  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;
  const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-purple-800">Seu Carrinho</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4 block"></i>
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{item.nome}</h4>
                      <span className="font-bold text-green-600">
                        {formatPrice(item.preco * item.quantidade)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Quantidade: {item.quantidade}</p>
                    {item.personalizacao && (
                      <div className="text-sm text-gray-600 mt-2">
                        {Object.entries(item.personalizacao).map(([categoria, ingredientes]) => 
                          ingredientes.length > 0 ? (
                            <p key={categoria}>{categoria}: {ingredientes.join(', ')}</p>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold whitespace-nowrap cursor-pointer"
                >
                  Continuar Comprando
                </button>
                <button 
                  onClick={onCheckout}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap cursor-pointer"
                >
                  Finalizar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;

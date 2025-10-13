import { Product, CartItem } from "@/types";

interface RefrigeranteModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const RefrigeranteModal = ({ product, onClose, onAddToCart }: RefrigeranteModalProps) => {
  const handleAddSize = (tamanho: string, preco: number) => {
    const item: CartItem = {
      id: `${product.id}-${tamanho}`,
      nome: `${product.nome.replace(' 350ml', '')} ${tamanho}`,
      preco: preco,
      quantidade: 1
    };
    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-purple-800">Escolha o Tamanho</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <h4 className="text-lg font-semibold mb-4 text-center">
            {product.nome.replace(' 350ml', '')}
          </h4>

          <div className="space-y-3">
            <button 
              onClick={() => handleAddSize('220ml', 3.99)}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            >
              220ml - R$ 3,99
            </button>
            <button 
              onClick={() => handleAddSize('350ml', 4.99)}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            >
              350ml - R$ 4,99
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefrigeranteModal;

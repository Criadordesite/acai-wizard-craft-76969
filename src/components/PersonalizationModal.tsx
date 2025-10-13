import { useState } from "react";
import { Product, CartItem } from "@/types";
import { INGREDIENTES, GRATIS_POR_CATEGORIA } from "@/data/products";

interface PersonalizationModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const PersonalizationModal = ({ product, onClose, onAddToCart }: PersonalizationModalProps) => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  const toggleIngrediente = (nome: string, categoria: string) => {
    const currentSelection = selected[categoria] || [];
    const isSelected = currentSelection.includes(nome);

    if (isSelected) {
      setSelected({
        ...selected,
        [categoria]: currentSelection.filter(i => i !== nome)
      });
    } else {
      const limite = GRATIS_POR_CATEGORIA[categoria] || 0;
      if (limite === 0 || currentSelection.length < limite) {
        setSelected({
          ...selected,
          [categoria]: [...currentSelection, nome]
        });
      }
    }
  };

  const handleConfirm = () => {
    let finalPrice = product.preco;
    
    Object.values(selected).flat().forEach(ingredienteNome => {
      const ingrediente = INGREDIENTES.find(i => i.nome === ingredienteNome);
      if (ingrediente && ingrediente.regra === 'Pago') {
        finalPrice += ingrediente.preco;
      }
    });

    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      nome: product.nome,
      preco: finalPrice,
      quantidade: 1,
      personalizacao: { ...selected }
    };

    onAddToCart(item);
    onClose();
  };

  const getCategoryEmoji = (categoria: string) => {
    const emojiMap: Record<string, string> = {
      "Frutas": "🍓",
      "Graos": "🌾",
      "Powders": "💪",
      "Toppings": "🥥",
      "Especiais": "💰"
    };
    return emojiMap[categoria] || "";
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-purple-800">
              Personalize seu {product.nome}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="space-y-6">
            {Object.keys(GRATIS_POR_CATEGORIA).map(categoria => {
              const ingredientesDaCategoria = INGREDIENTES.filter(ing => ing.categoria === categoria);
              const limite = GRATIS_POR_CATEGORIA[categoria];

              return (
                <div key={categoria}>
                  <h4 className="text-lg font-semibold mb-3 text-purple-700">
                    {getCategoryEmoji(categoria)} {categoria} {limite > 0 ? `(${limite} GRÁTIS)` : '(PAGOS)'}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {ingredientesDaCategoria.map(ingrediente => {
                      const isSelected = (selected[categoria] || []).includes(ingrediente.nome);
                      return (
                        <button
                          key={ingrediente.nome}
                          onClick={() => toggleIngrediente(ingrediente.nome, categoria)}
                          className={`p-3 rounded-lg border-2 transition-colors whitespace-nowrap cursor-pointer ${
                            isSelected 
                              ? 'border-purple-500 bg-purple-100 text-purple-700'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {ingrediente.nome} {ingrediente.regra === 'Pago' ? `(+${formatPrice(ingrediente.preco)})` : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationModal;

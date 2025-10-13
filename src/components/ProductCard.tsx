import { Product, CartItem } from "@/types";

interface ProductCardProps {
  product: Product;
  onOpenPersonalization: (product: Product) => void;
  onOpenRefrigerante: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

const getProductImage = (productId: number): string => {
  const imageMap: Record<number, string> = {
    1: "https://readdy.ai/api/search-image?query=acai%20bowl%20in%20clear%20plastic%20cup%20with%20lid%20and%20spoon%2C%20purple%20acai%20with%20toppings%2C%20The%20Best%20A%C3%A7a%C3%AD%20brand%20logo%20visible%20on%20cup%2C%20white%20background%2C%20professional%20food%20photography%2C%20fresh%20and%20appetizing%20presentation&width=300&height=300&seq=acai300&orientation=squarish",
    2: "https://readdy.ai/api/search-image?query=acai%20bowl%20in%20clear%20plastic%20cup%20with%20lid%20and%20spoon%2C%20purple%20acai%20with%20toppings%2C%20The%20Best%20A%C3%A7a%C3%AD%20brand%20logo%20visible%20on%20cup%2C%20white%20background%2C%20professional%20food%20photography%2C%20fresh%20and%20appetizing%20presentation&width=300&height=300&seq=acai400&orientation=squarish",
    3: "https://readdy.ai/api/search-image?query=acai%20bowl%20in%20clear%20plastic%20cup%20with%20lid%20and%20spoon%2C%20purple%20acai%20with%20toppings%2C%20The%20Best%20A%C3%A7a%C3%AD%20brand%20logo%20visible%20on%20cup%2C%20white%20background%2C%20professional%20food%20photography%2C%20fresh%20and%20appetizing%20presentation&width=300&height=300&seq=acai500&orientation=squarish",
    4: "https://static.readdy.ai/image/0a1685e22902e5e8eea3f873bad279a5/3c03bf1fecff6f65239fbde73cdd0d89.jpeg",
    10: "https://readdy.ai/api/search-image?query=natural%20fruit%20juice%20in%20clear%20plastic%20cup%20with%20lid%20and%20straw%2C%20orange%20colored%20juice%2C%20white%20background%2C%20professional%20food%20photography%2C%20fresh%20and%20appetizing%20presentation%2C%20healthy%20drink&width=300&height=300&seq=suco1&orientation=squarish",
    11: "https://readdy.ai/api/search-image?query=natural%20fruit%20juice%20in%20large%20clear%20plastic%20cup%20with%20lid%20and%20straw%2C%20green%20colored%20juice%2C%20white%20background%2C%20professional%20food%20photography%2C%20fresh%20and%20appetizing%20presentation%2C%20healthy%20drink&width=300&height=300&seq=suco2&orientation=squarish",
    12: "https://readdy.ai/api/search-image?query=coca%20cola%20aluminum%20can%20350ml%20red%20and%20white%20classic%20logo%2C%20coca%20cola%20can%2C%20white%20background%20professional%20product%20photography&width=300&height=300&seq=coca350&orientation=squarish",
    13: "https://readdy.ai/api/search-image?query=fanta%20orange%20soda%20aluminum%20can%20350ml%20orange%20colored%20with%20fanta%20logo%2C%20fanta%20can%2C%20white%20background%20professional%20product%20photography&width=300&height=300&seq=fanta350&orientation=squarish",
    14: "https://readdy.ai/api/search-image?query=cristal%20mineral%20water%20bottle%20clear%20plastic%20bottle%20with%20blue%20label%2C%20500ml%20water%20bottle%2C%20white%20background%20professional%20product%20photography&width=300&height=300&seq=agua&orientation=squarish",
    15: "https://readdy.ai/api/search-image?query=cristal%20sparkling%20water%20bottle%20clear%20plastic%20bottle%20with%20blue%20label%2C%20500ml%20sparkling%20water%20bottle%2C%20white%20background%20professional%20product%20photography&width=300&height=300&seq=aguagas&orientation=squarish",
    16: "https://readdy.ai/api/search-image?query=fruit%20smoothie%20vitamin%20drink%20in%20clear%20plastic%20cup%20with%20lid%20and%20straw%2C%20pink%20colored%20smoothie%2C%20white%20background%20professional%20food%20photography%2C%20fresh%20fruits%20healthy%20drink&width=300&height=300&seq=vitamina&orientation=squarish",
    17: "https://readdy.ai/api/search-image?query=red%20bull%20energy%20drink%20can%20blue%20and%20silver%20aluminum%20can%2C%20red%20bull%20logo%2C%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=redbull&orientation=squarish",
  };

  return imageMap[productId] || "";
};

const ProductCard = ({ product, onOpenPersonalization, onOpenRefrigerante, onAddToCart }: ProductCardProps) => {
  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  const handleClick = () => {
    if (product.categoria === 'acai') {
      onOpenPersonalization(product);
    } else if (product.categoria === 'refrigerante') {
      onOpenRefrigerante(product);
    } else {
      onAddToCart({
        id: `${product.id}`,
        nome: product.nome,
        preco: product.preco,
        quantidade: 1
      });
    }
  };

  const getButtonConfig = () => {
    if (product.categoria === 'acai') {
      return {
        color: 'bg-purple-600 hover:bg-purple-700',
        text: 'Personalizar e Adicionar'
      };
    } else if (product.categoria === 'refrigerante') {
      return {
        color: 'bg-red-600 hover:bg-red-700',
        text: 'Escolher Tamanho'
      };
    } else {
      return {
        color: 'bg-blue-600 hover:bg-blue-700',
        text: 'Adicionar'
      };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        alt={`${product.nome} ${product.volume}`}
        className="w-full h-48 object-cover object-top" 
        src={getProductImage(product.id)}
      />
      <div className="p-6">
        <h4 className="text-xl font-bold mb-2 text-purple-800">{product.nome}</h4>
        <p className="text-2xl font-bold text-green-600 mb-4">{formatPrice(product.preco)}</p>
        <button 
          onClick={handleClick}
          className={`w-full ${buttonConfig.color} text-white py-3 rounded-lg transition-colors font-semibold whitespace-nowrap cursor-pointer`}
        >
          <i className="ri-add-line mr-2"></i>
          {buttonConfig.text}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

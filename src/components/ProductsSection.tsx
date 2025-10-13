import ProductCard from "./ProductCard";
import { PRODUTOS } from "@/data/products";
import { Product, CartItem } from "@/types";

interface ProductsSectionProps {
  onOpenPersonalization: (product: Product) => void;
  onOpenRefrigerante: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductsSection = ({ onOpenPersonalization, onOpenRefrigerante, onAddToCart }: ProductsSectionProps) => {
  const acais = PRODUTOS.filter(p => p.categoria === 'acai');
  const bebidas = PRODUTOS.filter(p => p.categoria !== 'acai');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-purple-800">
            🍇 Nossos Açaís Personalizáveis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {acais.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onOpenPersonalization={onOpenPersonalization}
                onOpenRefrigerante={onOpenRefrigerante}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-center mb-8 text-purple-800">
            🥤 Nossas Bebidas Refrescantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bebidas.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onOpenPersonalization={onOpenPersonalization}
                onOpenRefrigerante={onOpenRefrigerante}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

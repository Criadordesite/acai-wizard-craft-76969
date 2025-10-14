import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import StoreStatus from "@/components/StoreStatus";
import { PromoBanner } from "@/components/PromoBanner";
import { PopularityPopup } from "@/components/PopularityPopup";
import { ProductCard } from "@/components/ProductCard";
import { PersonalizationModal, CustomizationData } from "@/components/PersonalizationModal";
import { CartModal, CartItem } from "@/components/CartModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isReady: boolean;
  requiresCustomization?: boolean;
  isBestSeller?: boolean;
}

const acaiProducts: Product[] = [
  {
    id: "acai-300",
    name: "Açaí no Copo 300ml",
    description: "Açaí puro e cremoso",
    price: 8.99,
    isReady: false,
    requiresCustomization: true,
  },
  {
    id: "acai-400",
    name: "Açaí no Copo 400ml",
    description: "Tamanho ideal para matar a fome",
    price: 12.99,
    isReady: false,
    requiresCustomization: true,
  },
  {
    id: "acai-500",
    name: "Açaí no Copo 500ml",
    description: "Mais açaí para você aproveitar",
    price: 18.99,
    isReady: false,
    requiresCustomization: true,
  },
  {
    id: "barca",
    name: "Barca de Açaí",
    description: "Nossa famosa barca para compartilhar",
    price: 31.99,
    isReady: false,
    requiresCustomization: true,
    isBestSeller: true,
  },
];

const beverages: Product[] = [
  {
    id: "refri-220",
    name: "Refrigerante 220ml",
    description: "Lata gelada",
    price: 3.99,
    isReady: true,
  },
  {
    id: "refri-350",
    name: "Refrigerante 350ml",
    description: "Garrafa gelada",
    price: 5.99,
    isReady: true,
  },
  {
    id: "redbull",
    name: "Red Bull 355ml",
    description: "Energia para o seu dia",
    price: 8.99,
    isReady: true,
  },
  {
    id: "suco-300",
    name: "Suco Natural 300ml",
    description: "Suco natural fresquinho",
    price: 3.99,
    isReady: true,
  },
  {
    id: "suco-500",
    name: "Suco Natural 500ml",
    description: "Suco natural tamanho grande",
    price: 6.99,
    isReady: true,
  },
  {
    id: "vitamina",
    name: "Vitamina 500ml",
    description: "Vitamina cremosa e nutritiva",
    price: 12.99,
    isReady: true,
  },
  {
    id: "agua-com-gas",
    name: "Água Crystal 500ml com gás",
    description: "Água mineral com gás",
    price: 3.49,
    isReady: true,
  },
  {
    id: "agua-sem-gas",
    name: "Água Crystal 500ml sem gás",
    description: "Água mineral natural",
    price: 2.99,
    isReady: true,
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allProducts = [...acaiProducts, ...beverages];

  const handleProductClick = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
    if (!product) return;

    if (product.requiresCustomization) {
      setSelectedProduct(product);
      setIsPersonalizationOpen(true);
    } else {
      addDirectToCart(product);
    }
  };

  const addDirectToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      let newCart;
      if (existingItem && product.isReady) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      return newCart;
    });

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleCustomizationConfirm = (customization: CustomizationData) => {
    if (!selectedProduct) return;

    const customizedProduct = {
      ...selectedProduct,
      id: `${selectedProduct.id}-${Date.now()}`, // ID único para cada personalização
      name: `${selectedProduct.name} (${[...customization.freeFruits, ...customization.freeConfeitos, ...customization.paidToppings, customization.syrup].filter(Boolean).join(", ")})`,
      price: customization.totalPrice,
    };

    setCart((prevCart) => {
      const newCart = [...prevCart, { ...customizedProduct, quantity: 1 }];

      // Aplicar promoção apenas uma vez
      if (!promoApplied) {
        const barcaCount = newCart.filter((item) => item.id.startsWith("barca")).reduce((acc, item) => acc + item.quantity, 0);
        if (barcaCount >= 2) {
          const freeAcai = newCart.find((item) => item.id === "acai-300-promo");
          if (!freeAcai) {
            newCart.push({
              id: "acai-300-promo",
              name: "Açaí 300ml GRÁTIS (Promoção Barca)",
              price: 0,
              quantity: 1,
            });
            setPromoApplied(true);
            toast.success("🎉 Promoção aplicada! Açaí 300ml grátis adicionado!");
          }
        }
      }

      return newCart;
    });

    toast.success(`${selectedProduct.name} personalizado adicionado ao carrinho!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    
    // Se remover a promoção ou as barcas, resetar flag
    if (id === "acai-300-promo" || id === "barca") {
      setPromoApplied(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartItemsCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Carousel */}
        <Hero />

        {/* Status da Loja */}
        <div className="flex justify-center my-6">
          <StoreStatus />
        </div>

        {/* Banner Promoção */}
        <PromoBanner />

        {/* Açaís */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Açaís
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {acaiProducts.map((product) => (
              <div key={product.id} className="relative">
                {product.isBestSeller && (
                  <Badge className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-lg">
                    🔥 MAIS SAINDO NA SEMANA
                  </Badge>
                )}
                <ProductCard
                  {...product}
                  onAdd={() => handleProductClick(product.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bebidas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Bebidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {beverages.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAdd={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>

        {/* Formas de Pagamento */}
        <div className="bg-card border-2 rounded-lg p-6 shadow-card">
          <h3 className="text-2xl font-bold mb-4 text-center text-foreground">
            Formas de Pagamento
          </h3>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="text-center">
              <div className="text-4xl mb-2">💵</div>
              <p className="font-semibold">Dinheiro</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <p className="font-semibold">PIX</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💳</div>
              <p className="font-semibold">Cartão de Crédito</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💳</div>
              <p className="font-semibold">Cartão de Débito</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Gatilhos Mentais */}
      <PopularityPopup />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        total={total}
      />

      {selectedProduct && (
        <PersonalizationModal
          isOpen={isPersonalizationOpen}
          onClose={() => {
            setIsPersonalizationOpen(false);
            setSelectedProduct(null);
          }}
          productName={selectedProduct.name}
          basePrice={selectedProduct.price}
          onConfirm={handleCustomizationConfirm}
        />
      )}
    </div>
  );
};

export default Index;

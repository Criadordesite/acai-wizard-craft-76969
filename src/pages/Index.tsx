import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { CartModal, CartItem } from "@/components/CartModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Footer } from "@/components/Footer";

const products = [
  {
    id: "acai-300",
    name: "Açaí Tradicional 300ml",
    description: "Açaí puro e cremoso, perfeito para matar a vontade",
    price: 12.90,
    isReady: true,
  },
  {
    id: "acai-500",
    name: "Açaí Tradicional 500ml",
    description: "Mais açaí para você aproveitar",
    price: 18.90,
    isReady: true,
  },
  {
    id: "acai-1000",
    name: "Açaí Tradicional 1L",
    description: "Açaí generoso para compartilhar",
    price: 32.90,
    isReady: true,
  },
  {
    id: "barca",
    name: "Barca de Açaí",
    description: "Nossa famosa barca com 2kg de açaí",
    price: 89.90,
    isReady: true,
  },
  {
    id: "suco-laranja",
    name: "Suco de Laranja 500ml",
    description: "Suco natural de laranja fresquinho",
    price: 8.90,
    isReady: true,
  },
  {
    id: "agua",
    name: "Água Mineral 500ml",
    description: "Água mineral gelada",
    price: 3.50,
    isReady: true,
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  const addToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Aplicar promoção apenas uma vez
      if (!promoApplied) {
        const barcaCount = newCart.find((item) => item.id === "barca")?.quantity || 0;
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

    toast.success(`${product.name} adicionado ao carrinho!`);
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Cardápio
          </h1>
          <p className="text-muted-foreground text-lg">
            Escolha seus produtos favoritos e adicione ao carrinho
          </p>
        </div>

        <div className="mb-8 bg-primary/10 border-2 border-primary rounded-lg p-4">
          <p className="text-center font-semibold text-foreground">
            🎉 PROMOÇÃO: Compre 2 Barcas de Açaí e ganhe 1 Açaí 300ml GRÁTIS!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAdd={() => addToCart(product.id)}
            />
          ))}
        </div>
      </main>

      <Footer />

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
    </div>
  );
};

export default Index;

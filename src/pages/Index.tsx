import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PromoBanner from "@/components/PromoBanner";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";
import PersonalizationModal from "@/components/PersonalizationModal";
import RefrigeranteModal from "@/components/RefrigeranteModal";
import CartModal from "@/components/CartModal";
import CheckoutModal from "@/components/CheckoutModal";
import PopularityPopup from "@/components/PopularityPopup";
import { CartItem, Product } from "@/types";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);
  const [showRefrigeranteModal, setShowRefrigeranteModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleOpenPersonalization = (product: Product) => {
    setCurrentProduct(product);
    setShowPersonalizationModal(true);
  };

  const handleOpenRefrigerante = (product: Product) => {
    setCurrentProduct(product);
    setShowRefrigeranteModal(true);
  };

  const handleAddToCart = (item: CartItem) => {
    const existingItem = cart.find(c => c.id === item.id);
    if (existingItem) {
      setCart(cart.map(c => 
        c.id === item.id 
          ? { ...c, quantidade: c.quantidade + 1 } 
          : c
      ));
    } else {
      setCart([...cart, item]);
    }
  };

  const handleOpenCart = () => {
    setShowCartModal(true);
  };

  const handleOpenCheckout = () => {
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantidade, 0)} onOpenCart={handleOpenCart} />
      <Hero />
      <PromoBanner />
      <ProductsSection 
        onOpenPersonalization={handleOpenPersonalization}
        onOpenRefrigerante={handleOpenRefrigerante}
        onAddToCart={handleAddToCart}
      />
      <Footer />
      <PopularityPopup />

      {showPersonalizationModal && currentProduct && (
        <PersonalizationModal
          product={currentProduct}
          onClose={() => setShowPersonalizationModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showRefrigeranteModal && currentProduct && (
        <RefrigeranteModal
          product={currentProduct}
          onClose={() => setShowRefrigeranteModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCartModal && (
        <CartModal
          cart={cart}
          onClose={() => setShowCartModal(false)}
          onCheckout={handleOpenCheckout}
        />
      )}

      {showCheckoutModal && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckoutModal(false)}
        />
      )}
    </div>
  );
};

export default Index;

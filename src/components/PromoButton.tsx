import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const PromoButton = () => {
  const handlePromoClick = () => {
    // Salvar cupom no localStorage
    localStorage.setItem('cupomAtivo', 'BRINDE_COPO');
    
    // Alertar o cliente
    toast.success("🎁 Promoção ativada! Verifique a Barca de Açaí para resgatar seu brinde!", {
      duration: 5000,
    });
    
    // Scroll suave para a seção de açaís
    const acaiSection = document.querySelector('h2');
    if (acaiSection) {
      acaiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Button
      onClick={handlePromoClick}
      variant="ghost"
      size="icon"
      className="relative hover:bg-primary/10 group"
      aria-label="Resgatar promoção"
    >
      <Gift 
        className="h-6 w-6 text-red-500 animate-pulse group-hover:scale-110 transition-transform" 
      />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
    </Button>
  );
};

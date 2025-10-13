import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.webp";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-secondary sticky top-0 z-50 border-b border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="THE BEST AÇAÍ Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-primary-foreground font-bold text-xl tracking-tight">
                THE BEST
              </span>
              <span className="text-primary font-bold text-2xl -mt-1 italic">
                açaí
              </span>
            </div>
          </div>
          
          <button
            onClick={onCartClick}
            className="relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 transition-all hover:scale-105 shadow-elegant"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground border-2 border-secondary px-2 min-w-[24px] h-6 flex items-center justify-center font-bold">
                {cartItemsCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

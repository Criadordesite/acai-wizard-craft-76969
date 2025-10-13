import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.webp";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="THE BEST AÇAÍ Logo" className="h-12 w-auto" />
          </div>
          
          <button
            onClick={onCartClick}
            className="relative rounded-full p-3 transition-all hover:scale-105 shadow-elegant"
            style={{ backgroundColor: '#FF9900' }}
          >
            <ShoppingCart className="h-6 w-6" style={{ color: '#000000' }} />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-2 min-w-[24px] h-6 flex items-center justify-center font-bold" style={{ backgroundColor: '#FF9900', color: '#000000', border: '2px solid #000' }}>
                {cartItemsCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

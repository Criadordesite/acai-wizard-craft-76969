import StoreStatus from "./StoreStatus";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header = ({ cartCount, onOpenCart }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              alt="The Best Açaí Logo" 
              className="w-12 h-12 rounded-full object-cover" 
              src="https://static.readdy.ai/image/0a1685e22902e5e8eea3f873bad279a5/7d0f4c389871664d6775fdba136f73a5.jpeg"
            />
            <div>
              <h1 className="text-2xl font-bold text-purple-800 font-pacifico">
                The Best Açaí
              </h1>
              <StoreStatus />
            </div>
          </div>
          <button 
            onClick={onOpenCart}
            className="relative bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-shopping-cart-line mr-2"></i>
            Carrinho ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { TrendingUp } from "lucide-react";

export const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg p-4 mb-6 shadow-elegant">
      <div className="flex items-center justify-center gap-3">
        <TrendingUp className="w-6 h-6 animate-bounce" />
        <p className="text-center font-bold text-lg">
          🎉 PROMOÇÃO: Compre 2 Barcas de Açaí e ganhe 1 Açaí 300ml GRÁTIS!
        </p>
        <TrendingUp className="w-6 h-6 animate-bounce" />
      </div>
    </div>
  );
};

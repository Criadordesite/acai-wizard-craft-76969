import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CouponButtonProps {
  onClick: () => void;
}

export const CouponButton = ({ onClick }: CouponButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="relative hover:bg-primary/10 group"
      aria-label="Cupons de desconto"
    >
      <Ticket 
        className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform" 
      />
    </Button>
  );
};

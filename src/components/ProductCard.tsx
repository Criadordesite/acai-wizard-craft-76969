import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  onAdd: () => void;
}

export const ProductCard = ({ name, description, price, image, onAdd }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
      <CardContent className="p-0">
        {image && (
          <div className="aspect-square bg-muted overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 text-foreground">{name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              R$ {price.toFixed(2)}
            </span>
            <Button 
              onClick={onAdd}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-0 w-10 h-10 shadow-lg"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

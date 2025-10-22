import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Restaurant, MenuItem } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Flame, ArrowLeft, ShoppingCart, Plus } from "lucide-react";

interface SearchResult {
  restaurant: Restaurant;
  menu_items: MenuItem[];
}

const Results = () => {
  const location = useLocation();
  const { addToCart, cart } = useCart();
  const finalResults: SearchResult[] = location.state?.results || [];

  return (
    <div
      className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="min-h-screen w-full bg-black/40 backdrop-blur-sm flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <Button asChild variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white">
              <Link to="/search">
                <ArrowLeft className="mr-2 h-4 w-4" />
                New Search
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-white">Results</h1>
            <Button asChild variant="default" className="relative">
              <Link to="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cart.length}
                  </Badge>
                )}
              </Link>
            </Button>
          </header>

          {finalResults.length > 0 ? (
            <div className="space-y-6">
              {finalResults.map(({ restaurant, menu_items }) => (
                <Card
                  key={restaurant._id}
                  className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border-white/20 shadow-lg"
                >
                  <CardHeader>
                    <CardTitle>{restaurant.name}</CardTitle>
                    <CardDescription className="text-foreground/80">
                      {restaurant.city && restaurant.postal_code
                        ? `${restaurant.city}, ${restaurant.postal_code}`
                        : "Unknown Location"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {menu_items.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between items-center p-3 bg-white/50 dark:bg-black/50 rounded-md"
                        >
                          <div>
                            <p>{item.name}</p>
                            <p className="font-bold flex items-center gap-1.5 text-sm">
                              <Flame className="h-4 w-4 text-orange-500" />
                              {item.estimated_calories} kcal - Rs. {item.price}
                            </p>
                          </div>
                          <Button size="sm" onClick={() => addToCart(restaurant, item)}>
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border-white/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <p className="font-semibold">No matches found.</p>
                <p className="text-sm text-muted-foreground">
                  Try increasing your calorie limit or search radius.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;

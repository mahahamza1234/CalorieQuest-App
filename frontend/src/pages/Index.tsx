import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Restaurant, MenuItem } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";

interface SearchResult {
  restaurant: Restaurant;
  menu_items: MenuItem[];
}

const Index = () => {
  const [calories, setCalories] = useState("600");
  const [distance, setDistance] = useState("3");
  const [postalCode, setPostalCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCalorieLimit, clearCart } = useCart();

  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");
    if (!userProfile) {
      navigate("/login");
    }
    clearCart();
  }, [navigate, clearCart]);

  const handleSearch = async () => {
    if (!postalCode) {
      setError("Please provide a postal code to search.");
      return;
    }

    setIsSearching(true);
    setCalorieLimit(parseFloat(calories));
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/restaurants/nearby?postal_code=${postalCode}&radius=${distance}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch restaurant data.");
      }

      const filteredResults: SearchResult[] = data
        .map((result: any) => {
          const filteredMenuItems = result.menu_items.filter(
            (item: MenuItem) =>
              item.estimated_calories &&
              item.estimated_calories <= parseFloat(calories)
          );

          if (filteredMenuItems.length > 0) {
            return {
              restaurant: result.restaurant,
              menu_items: filteredMenuItems,
            };
          }
          return null;
        })
        .filter((r: SearchResult | null): r is SearchResult => r !== null);

      setIsSearching(false);
      navigate("/results", { state: { results: filteredResults } });
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to fetch restaurant data.");
      setIsSearching(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="min-h-screen w-full bg-black/40 backdrop-blur-sm flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border-white/20 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">CalorieQuest</CardTitle>
                <CardDescription className="text-foreground/80">
                  Find meals that fit your goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calories">Max Calories Per Meal</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="e.g., 600"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Distance (miles)</Label>
                  <ToggleGroup
                    type="single"
                    defaultValue="3"
                    variant="outline"
                    className="w-full grid grid-cols-3"
                    onValueChange={(value) => value && setDistance(value)}
                  >
                    <ToggleGroupItem value="1">1</ToggleGroupItem>
                    <ToggleGroupItem value="3">3</ToggleGroupItem>
                    <ToggleGroupItem value="5">5</ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Enter your postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !calories}
                  className="w-full text-lg py-6"
                >
                  {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Find Meals
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

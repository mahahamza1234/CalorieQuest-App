import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Flame, ArrowLeft, Trash2, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, totalCalories, totalPrice, calorieLimit } = useCart();

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
          <div className="flex items-center mb-6 gap-4">
            <Button asChild variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white">
              <Link to="/results">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-white">Your Cart</h1>
          </div>

          <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your items before checkout.</CardDescription>
            </CardHeader>
            <CardContent>
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-white/50 dark:bg-black/50 rounded-md"
                    >
                      <div>
                        <p className="font-semibold">{item.menuItem.name}</p>
                        <p className="text-sm text-muted-foreground">{item.restaurant.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold flex items-center gap-1.5">
                          <Flame className="h-4 w-4 text-orange-500" />
                          {item.menuItem.estimated_calories} kcal - Rs. {item.menuItem.price}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 font-semibold">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">Add some meals from the results page!</p>
                </div>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter className="flex flex-col items-stretch space-y-4 pt-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Calories:</span>
                  <span className={calorieLimit && totalCalories > calorieLimit ? 'text-red-500' : ''}>
                    {totalCalories}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Price:</span>
                  <span>Rs. {totalPrice}</span>
                </div>
                <Button asChild size="lg">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
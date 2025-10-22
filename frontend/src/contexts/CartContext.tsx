import React, { createContext, useContext, useState, ReactNode } from "react";
import { Restaurant, MenuItem } from "@/types";
import { toast } from "sonner";

interface CartItem {
  restaurant: Restaurant;
  menuItem: MenuItem;
  id: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (restaurant: Restaurant, menuItem: MenuItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalCalories: number;
  totalPrice: number;
  calorieLimit: number | null;
  setCalorieLimit: (limit: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [calorieLimit, setCalorieLimit] = useState<number | null>(null);

  const totalCalories = cart.reduce(
    (sum, item) => sum + item.menuItem.estimated_calories,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.menuItem.price,
    0
  );

  const addToCart = (restaurant: Restaurant, menuItem: MenuItem) => {
    const newTotalCalories = totalCalories + menuItem.estimated_calories;
    if (calorieLimit && newTotalCalories > calorieLimit) {
      toast.warning("Your calorie limit is exceeding!", {
        description: "Please remove some items or proceed with caution.",
      });
    }
    const newItem: CartItem = {
      restaurant,
      menuItem,
      id: `${menuItem._id}-${Date.now()}`,
    };
    setCart((prevCart) => [...prevCart, newItem]);
    toast.success(`${menuItem.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  
  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalCalories,
        totalPrice,
        calorieLimit,
        setCalorieLimit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
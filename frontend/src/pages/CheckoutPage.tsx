import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  Footprints,
  CreditCard,
  Banknote,
  Loader2,
  Flame,
} from "lucide-react";

type CheckoutStep = "type" | "address" | "payment" | "confirmation";

const CheckoutPage = () => {
  const { cart, totalCalories, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>("type");
  const [orderType, setOrderType] = useState<"Pickup" | "Delivery" | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    phone: "",
    time: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleOrderTypeSelect = (type: "Pickup" | "Delivery") => {
    setOrderType(type);
    if (type === "Delivery") {
      setStep("address");
    } else {
      setStep("payment");
    }
  };

  const handleAddressSubmit = () => {
    if (!deliveryInfo.name || !deliveryInfo.address || !deliveryInfo.phone) {
      setFormError("Please fill out all required fields.");
      return;
    }
    setFormError(null);
    setStep("payment");
  };

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("confirmation");
    }, 2000); // Simulate processing
  };
  
  const handleGoBack = () => {
    if (step === 'address') setStep('type');
    if (step === 'payment' && orderType === 'Delivery') setStep('address');
    if (step === 'payment' && orderType === 'Pickup') setStep('type');
  }

  const renderStep = () => {
    switch (step) {
      case "type":
        return (
          <>
            <CardHeader>
              <CardTitle>Choose Order Type</CardTitle>
              <CardDescription>How would you like to receive your order?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => handleOrderTypeSelect("Pickup")}>
                <Footprints className="h-8 w-8" />
                <span>Pickup</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => handleOrderTypeSelect("Delivery")}>
                <Truck className="h-8 w-8" />
                <span>Delivery</span>
              </Button>
            </CardContent>
          </>
        );
      case "address":
        return (
          <>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
              <CardDescription>Where should we send your order?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={deliveryInfo.name} onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input id="address" value={deliveryInfo.address} onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})} placeholder="123 Main St, Anytown" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={deliveryInfo.phone} onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})} placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Delivery Time (Optional)</Label>
                <Input id="time" value={deliveryInfo.time} onChange={(e) => setDeliveryInfo({...deliveryInfo, time: e.target.value})} placeholder="e.g., As soon as possible" />
              </div>
              {formError && <p className="text-sm text-red-500">{formError}</p>}
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddressSubmit} className="w-full">Continue to Payment</Button>
            </CardFooter>
          </>
        );
      case "payment":
        return (
          <>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
              <CardDescription>You chose: {orderType}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-muted-foreground">Processing your order...</p>
                </div>
              ) : (
                <>
                  {orderType === "Pickup" ? (
                    <>
                      <Button variant="outline" className="w-full h-16 justify-start p-4 gap-4" onClick={() => handlePaymentSelect("Cash on Arrival")}>
                        <Banknote className="h-6 w-6" /> Cash on Arrival
                      </Button>
                      <Button variant="outline" className="w-full h-16 justify-start p-4 gap-4" onClick={() => handlePaymentSelect("Online Payment")}>
                        <CreditCard className="h-6 w-6" /> Online Payment
                      </Button>
                    </>
                  ) : (
                     <>
                      <Button variant="outline" className="w-full h-16 justify-start p-4 gap-4" onClick={() => handlePaymentSelect("Cash on Delivery")}>
                        <Banknote className="h-6 w-6" /> Cash on Delivery (COD)
                      </Button>
                      <Button variant="outline" className="w-full h-16 justify-start p-4 gap-4" onClick={() => handlePaymentSelect("Online Transfer")}>
                        <CreditCard className="h-6 w-6" /> Online Transfer
                      </Button>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </>
        );
      case "confirmation":
        return (
          <>
            <CardHeader className="text-center bg-green-50/50 dark:bg-green-900/20 p-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-2xl">Thank You, {deliveryInfo.name || 'Valued Customer'}!</CardTitle>
              <CardDescription>Your order from CalorieQuest has been successfully placed.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Order Summary</h3>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.menuItem.name}</span>
                    <span className="flex items-center gap-1"><Flame className="h-4 w-4 text-orange-400" />{item.menuItem.calorie_count}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Calories</span>
                  <span>{totalCalories}</span>
                </div>
              </div>
              {orderType === 'Delivery' && (
                <div className="space-y-2 text-sm">
                  <h3 className="font-semibold">Delivery Details</h3>
                  <p><strong>Address:</strong> {deliveryInfo.address}</p>
                  <p><strong>Payment:</strong> {paymentMethod}</p>
                </div>
              )}
              {orderType === 'Pickup' && (
                 <div className="space-y-2 text-sm">
                  <h3 className="font-semibold">Pickup Details</h3>
                  <p><strong>Payment:</strong> {paymentMethod}</p>
                </div>
              )}
              <div className="text-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                {orderType === 'Delivery' ? (
                  <>
                    <p className="font-semibold">🚴 Your order is on the way!</p>
                    <p className="text-sm text-muted-foreground">Estimated arrival: 25 minutes</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">🏃 Your order is being prepared!</p>
                    <p className="text-sm text-muted-foreground">Ready for pickup in 15 minutes</p>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => { clearCart(); navigate("/"); }}>
                Return to Home
              </Button>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto-format&fit=crop')",
      }}
    >
      <div className="min-h-screen w-full bg-black/40 backdrop-blur-sm flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center mb-6">
            {step === "confirmation" ? null : step === "type" ? (
              <Button asChild variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white">
                <Link to="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cart
                </Link>
              </Button>
            ) : (
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white" onClick={handleGoBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border-white/20 shadow-lg">
            {renderStep()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
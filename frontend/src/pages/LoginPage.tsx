import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    if (name && email && weight) {
      const userProfile = { name, email, weight: parseFloat(weight) };

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfile),
        });

        const data = await response.json();
        console.log(data);

        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        navigate("/search");
      } catch (error) {
        console.error("Error:", error);
      }
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
      <div className="min-h-screen w-full bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/70 dark:bg-black/70 backdrop-blur-lg border-white/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome to CalorieQuest 👋</CardTitle>
            <CardDescription className="text-foreground/80">
              Let's get started on your journey to healthier eating.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="e.g., Hira"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., hira@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Current Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 58"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <Button onClick={handleStart} disabled={!name || !email || !weight} className="w-full text-lg py-6">
              Start My Journey
            </Button>
            <p className="text-center text-xs text-muted-foreground pt-2">
              Track your calories, stay fit, and make smarter dining choices!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

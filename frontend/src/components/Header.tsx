import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Settings } from "lucide-react";

interface UserProfile {
  name: string;
  weight: number;
}

export const Header = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setUserProfile(parsedProfile);
      setNewWeight(parsedProfile.weight.toString());
    }
  }, []);

  const handleWeightUpdate = () => {
    if (newWeight) {
      const updatedProfile = { ...userProfile!, weight: parseFloat(newWeight) };
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      toast.success("Weight updated successfully.");
      setIsModalOpen(false);
    }
  };

  if (!userProfile) {
    return null;
  }

  return (
    <>
      <header className="w-full p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Hi, {userProfile.name} 👋</h1>
        <Button
          variant="ghost"
          className="text-lg font-semibold hover:bg-white/20 hover:text-white p-2 h-auto"
          onClick={() => setIsModalOpen(true)}
        >
          {userProfile.weight} kg
          <Settings className="ml-2 h-4 w-4" />
        </Button>
      </header>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Your Weight</DialogTitle>
            <DialogDescription>
              Keep your weight up to date to track your progress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleWeightUpdate}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
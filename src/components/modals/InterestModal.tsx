import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const interests = [
  'Safety', 'Infrastructure', 'Water Supply', 'Traffic', 'Environment', 
  'Health', 'Education', 'Sanitation', 'Parks', 'Budget', 'Transport',
  'Housing', 'Technology', 'Waste Management', 'Street Lighting'
];

export const InterestModal = ({ isOpen, onClose }: InterestModalProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Safety', 'Infrastructure']);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    // Save interests to localStorage or backend
    localStorage.setItem('userInterests', JSON.stringify(selectedInterests));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Interests</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose topics you care about to get personalized content and notifications.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className="cursor-pointer transition-colors hover:bg-primary/80"
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              Save Interests ({selectedInterests.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
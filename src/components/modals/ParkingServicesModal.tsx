import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ParkingCircle, MapPin, Navigation, IndianRupee, Clock } from "lucide-react";

interface ParkingServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const parkingLocations = [
  {
    name: 'Bandra Kurla Complex',
    status: 'Limited',
    spots: 15,
    total: 300,
    distance: '2.1 km',
    address: 'BKC, Bandra East, Mumbai',
    pricing: { twoWheeler: 20, fourWheeler: 50 },
    hours: '24/7',
    features: ['CCTV Surveillance', 'Covered Parking', 'EV Charging']
  },
  {
    name: 'Linking Road Market',
    status: 'Full',
    spots: 0,
    total: 120,
    distance: '1.2 km',
    address: 'Linking Road, Bandra West, Mumbai',
    pricing: { twoWheeler: 15, fourWheeler: 40 },
    hours: '6 AM - 11 PM',
    features: ['Street Parking', 'Paid Parking']
  },
  {
    name: 'Bandstand Promenade',
    status: 'Available',
    spots: 28,
    total: 85,
    distance: '0.8 km',
    address: 'Bandstand, Bandra West, Mumbai',
    pricing: { twoWheeler: 10, fourWheeler: 30 },
    hours: '24/7',
    features: ['Near Beach', 'CCTV', 'Well Lit']
  },
  {
    name: 'Phoenix Marketcity Mall',
    status: 'Available',
    spots: 125,
    total: 500,
    distance: '3.5 km',
    address: 'LBS Marg, Kurla West, Mumbai',
    pricing: { twoWheeler: 30, fourWheeler: 60 },
    hours: '11 AM - 11 PM',
    features: ['Mall Parking', 'Valet Available', 'EV Charging', 'Covered']
  },
  {
    name: 'Dharavi T-Junction',
    status: 'Available',
    spots: 42,
    total: 100,
    distance: '4.2 km',
    address: '90 Feet Road, Dharavi, Mumbai',
    pricing: { twoWheeler: 10, fourWheeler: 25 },
    hours: '24/7',
    features: ['Multi-level Parking', 'Security Guard']
  }
];

const getParkingStatusColor = (status: string) => {
  switch (status) {
    case 'Available': return 'bg-success text-success-foreground';
    case 'Limited': return 'bg-warning text-warning-foreground';
    case 'Full': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const ParkingServicesModal = ({ isOpen, onClose }: ParkingServicesModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ParkingCircle className="w-5 h-5 text-primary" />
            Parking Services - Real-time Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {parkingLocations.map((parking, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-base">{parking.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {parking.distance} • {parking.address}
                    </p>
                  </div>
                  <Badge className={getParkingStatusColor(parking.status)}>
                    {parking.status}
                  </Badge>
                </div>

                {/* Availability Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Spot Availability</span>
                    <span className="font-medium">{parking.spots} / {parking.total}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((parking.total - parking.spots) / parking.total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-2 rounded bg-accent/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Two Wheeler</p>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      {parking.pricing.twoWheeler}/hr
                    </p>
                  </div>
                  <div className="p-2 rounded bg-accent/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Four Wheeler</p>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      {parking.pricing.fourWheeler}/hr
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="p-2 rounded bg-accent/30 border border-border mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Operating Hours</span>
                    <span className="text-sm text-primary ml-auto">{parking.hours}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {parking.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button variant="outline" size="sm" className="w-full">
                  <Navigation className="w-3 h-3 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

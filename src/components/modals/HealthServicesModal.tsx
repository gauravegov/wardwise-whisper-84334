import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Hospital, 
  Bed, 
  UserCheck, 
  IndianRupee, 
  Activity,
  Phone,
  MapPin,
  Clock,
  Stethoscope,
  Building2,
  Heart,
  Pill
} from "lucide-react";

interface HealthServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const hospitals = [
  {
    name: "KEM Hospital",
    distance: "2.1 km",
    address: "Acharya Donde Marg, Parel, Mumbai",
    contact: "+91-22-2413-6051",
    beds: { available: 23, total: 1800, icu: 5 },
    doctors: { onDuty: 45, total: 312 },
    departments: ["Emergency", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "ICU"],
    waitTime: "45 mins",
    services: [
      { name: "General Consultation", price: 100 },
      { name: "Emergency Services", price: 500 },
      { name: "X-Ray", price: 250 },
      { name: "Blood Test", price: 150 },
      { name: "ICU (per day)", price: 5000 }
    ]
  },
  {
    name: "Lilavati Hospital",
    distance: "3.5 km",
    address: "A-791, Bandra Reclamation, Mumbai",
    contact: "+91-22-2640-5000",
    beds: { available: 8, total: 350, icu: 2 },
    doctors: { onDuty: 28, total: 185 },
    departments: ["Emergency", "Cardiology", "Oncology", "Gastroenterology", "ICU"],
    waitTime: "60 mins",
    services: [
      { name: "General Consultation", price: 500 },
      { name: "Emergency Services", price: 1500 },
      { name: "X-Ray", price: 800 },
      { name: "Blood Test", price: 400 },
      { name: "ICU (per day)", price: 15000 }
    ]
  },
  {
    name: "Sion Hospital",
    distance: "5.2 km",
    address: "Sion, Mumbai",
    contact: "+91-22-2409-6321",
    beds: { available: 45, total: 1500, icu: 12 },
    doctors: { onDuty: 52, total: 280 },
    departments: ["Emergency", "General Medicine", "Surgery", "Maternity", "Pediatrics"],
    waitTime: "30 mins",
    services: [
      { name: "General Consultation", price: 50 },
      { name: "Emergency Services", price: 200 },
      { name: "X-Ray", price: 150 },
      { name: "Blood Test", price: 100 },
      { name: "ICU (per day)", price: 3000 }
    ]
  }
];

const getAvailabilityColor = (available: number, total: number) => {
  const percentage = (available / total) * 100;
  if (percentage > 20) return 'bg-success text-success-foreground';
  if (percentage > 10) return 'bg-warning text-warning-foreground';
  return 'bg-destructive text-destructive-foreground';
};

export const HealthServicesModal = ({ isOpen, onClose }: HealthServicesModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hospital className="w-5 h-5 text-primary" />
            Health Services - Real-time Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {hospitals.map((hospital, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {hospital.distance}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`tel:${hospital.contact}`}>
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="availability" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="departments">Departments</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  </TabsList>

                  <TabsContent value="availability" className="space-y-3 mt-3">
                    {/* Bed Availability */}
                    <div className="p-3 rounded-lg bg-accent/30 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Bed Availability</span>
                        </div>
                        <Badge className={getAvailabilityColor(hospital.beds.available, hospital.beds.total)}>
                          {hospital.beds.available} Available
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Total Beds: {hospital.beds.total}</p>
                        <p>ICU Beds Available: {hospital.beds.icu}</p>
                      </div>
                    </div>

                    {/* Doctor Availability */}
                    <div className="p-3 rounded-lg bg-accent/30 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Doctors on Duty</span>
                        </div>
                        <Badge variant="secondary">
                          {hospital.doctors.onDuty} Active
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Total Staff: {hospital.doctors.total} doctors</p>
                      </div>
                    </div>

                    {/* Wait Time */}
                    <div className="p-3 rounded-lg bg-accent/30 border border-border">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Est. Wait Time</span>
                        <span className="text-sm text-primary ml-auto">{hospital.waitTime}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="departments" className="space-y-2 mt-3">
                    <div className="flex flex-wrap gap-2">
                      {hospital.departments.map((dept, deptIndex) => (
                        <Badge key={deptIndex} variant="outline" className="text-xs">
                          <Building2 className="w-3 h-3 mr-1" />
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-2 mt-3">
                    {hospital.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center justify-between p-2 rounded bg-accent/30">
                        <span className="text-sm">{service.name}</span>
                        <span className="text-sm font-medium flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>

                <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {hospital.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

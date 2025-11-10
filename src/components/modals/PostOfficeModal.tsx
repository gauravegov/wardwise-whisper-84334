import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Clock, MapPin, Users, CheckCircle, Phone, Package, CreditCard } from "lucide-react";

interface PostOfficeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const postOffices = [
  {
    name: 'Bandra Head Post Office',
    area: 'Bandra West',
    address: 'Hill Road, Bandra West, Mumbai - 400050',
    distance: '0.8 km',
    status: 'Open',
    timing: '9:00 AM - 7:00 PM',
    queueStatus: 'Short Wait',
    currentQueue: 8,
    avgWaitTime: '15 mins',
    services: ['Speed Post', 'Registered Post', 'Passport Services', 'Money Order', 'Postal Savings', 'Parcel Booking'],
    contact: '+91-22-2640-5522',
    postalCode: '400050'
  },
  {
    name: 'Khar Post Office',
    area: 'Khar West',
    address: 'Linking Road, Khar West, Mumbai - 400052',
    distance: '1.2 km',
    status: 'Open',
    timing: '9:00 AM - 6:00 PM',
    queueStatus: 'Moderate Wait',
    currentQueue: 15,
    avgWaitTime: '25 mins',
    services: ['Speed Post', 'Registered Post', 'Money Order', 'Postal Savings', 'Parcel Booking'],
    contact: '+91-22-2648-7733',
    postalCode: '400052'
  },
  {
    name: 'Dharavi Post Office',
    area: 'Dharavi',
    address: '90 Feet Road, Dharavi, Mumbai - 400017',
    distance: '3.5 km',
    status: 'Open',
    timing: '10:00 AM - 5:00 PM',
    queueStatus: 'Long Wait',
    currentQueue: 22,
    avgWaitTime: '40 mins',
    services: ['Speed Post', 'Registered Post', 'Money Order', 'Parcel Booking'],
    contact: '+91-22-2400-5544',
    postalCode: '400017'
  },
  {
    name: 'Kurla Post Office',
    area: 'Kurla West',
    address: 'LBS Marg, Kurla West, Mumbai - 400070',
    distance: '4.2 km',
    status: 'Open',
    timing: '9:00 AM - 6:00 PM',
    queueStatus: 'Moderate Wait',
    currentQueue: 12,
    avgWaitTime: '20 mins',
    services: ['Speed Post', 'Registered Post', 'Passport Services', 'Money Order', 'Postal Savings', 'Parcel Booking'],
    contact: '+91-22-2500-8899',
    postalCode: '400070'
  },
  {
    name: 'Parel Post Office',
    area: 'Parel',
    address: 'Dr. Ambedkar Road, Parel, Mumbai - 400012',
    distance: '5.1 km',
    status: 'Closed',
    timing: '9:00 AM - 6:00 PM',
    queueStatus: 'Currently Closed',
    currentQueue: 0,
    avgWaitTime: 'N/A',
    services: ['Speed Post', 'Registered Post', 'Money Order', 'Parcel Booking'],
    contact: '+91-22-2413-7788',
    postalCode: '400012'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-success text-success-foreground';
    case 'Closed': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getQueueColor = (queueStatus: string) => {
  if (queueStatus === 'Short Wait') return 'text-success';
  if (queueStatus === 'Moderate Wait') return 'text-warning';
  if (queueStatus === 'Long Wait') return 'text-destructive';
  return 'text-muted-foreground';
};

export const PostOfficeModal = ({ isOpen, onClose }: PostOfficeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Post Office Services - Real-time Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {postOffices.map((office, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-base">{office.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{office.area}</p>
                      <span className="text-xs text-muted-foreground">• {office.distance}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{office.address}</p>
                  </div>
                  <Badge className={getStatusColor(office.status)}>
                    {office.status}
                  </Badge>
                </div>

                {/* Operating Hours */}
                <div className="p-3 rounded-lg bg-accent/30 border border-border mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Operating Hours</span>
                  </div>
                  <p className="text-xs"><strong>Timing:</strong> {office.timing}</p>
                  <p className="text-xs mt-1"><strong>Postal Code:</strong> {office.postalCode}</p>
                </div>

                {/* Queue Status */}
                {office.status === 'Open' && (
                  <div className="p-3 rounded-lg bg-accent/30 border border-border mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Current Queue Status</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground mb-1">People in Queue</p>
                        <p className="text-sm font-medium">{office.currentQueue} people</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Expected Wait</p>
                        <p className={`text-sm font-medium ${getQueueColor(office.queueStatus)}`}>
                          {office.avgWaitTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Available */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Services Available</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {office.services.map((service, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs" asChild>
                    <a href={`tel:${office.contact}`}>
                      <Phone className="w-3 h-3 mr-2" />
                      Call Office
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" asChild>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="w-3 h-3 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Additional Services Info */}
          <Card className="border-0 shadow-sm bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-2">Online Services Available</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Track your Speed Post & Registered Post online</li>
                    <li>• Book parcels and schedule pickup from home</li>
                    <li>• Apply for new Post Office Savings Account online</li>
                    <li>• Check passport application status</li>
                  </ul>
                  <Button variant="link" size="sm" className="text-xs p-0 mt-2 h-auto" asChild>
                    <a href="https://www.indiapost.gov.in" target="_blank" rel="noopener noreferrer">
                      Visit India Post Website →
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

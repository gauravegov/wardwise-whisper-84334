import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Car, 
  Shield, 
  Hospital, 
  Flame, 
  Building, 
  ParkingCircle, 
  BarChart3,
  MapPin,
  Clock,
  IndianRupee,
  Wrench,
  Calendar,
  Trash2,
  Droplets,
  Zap,
  ExternalLink,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  ChevronRight,
  Mail
} from "lucide-react";
import { HealthServicesModal } from "@/components/modals/HealthServicesModal";
import { ParkingServicesModal } from "@/components/modals/ParkingServicesModal";
import { PostOfficeModal } from "@/components/modals/PostOfficeModal";

const cityStats = {
  airQuality: { value: 178, status: 'Unhealthy', color: 'text-destructive' },
  trafficLevel: { value: 'Heavy', description: 'Peak hours: 7-11 AM, 6-10 PM', color: 'text-destructive' },
  temperature: { value: 32, unit: '°C', feels: 39 },
  humidity: { value: 85, unit: '%' },
  monsoonAlert: { active: true, level: 'Orange', message: 'Heavy rainfall expected. Avoid waterlogged areas.' }
};

const nearbyServices = [
  { name: 'KEM Hospital', type: 'Hospital', distance: '2.1 km', contact: '+91-22-2413-6051', icon: Hospital },
  { name: 'Bandra Police Station', type: 'Police', distance: '1.5 km', contact: '100 / 112', icon: Shield },
  { name: 'Mumbai Fire Brigade - Bandra', type: 'Fire Station', distance: '1.8 km', contact: '101', icon: Flame },
  { name: 'BMC Ward Office H/E', type: 'Government', distance: '0.9 km', contact: '+91-22-2640-3511', icon: Building }
];

const publicServices = [
  { 
    id: 'health',
    name: 'Health Services', 
    icon: Hospital,
    status: 'Active',
    description: '23 beds available • 45 doctors on duty',
    stats: 'Real-time availability across 3 hospitals'
  },
  { 
    id: 'parking',
    name: 'Parking Information', 
    icon: ParkingCircle,
    status: 'Limited',
    description: '43 spots available nearby',
    stats: 'Live updates from 5 locations'
  },
  { 
    id: 'postoffice',
    name: 'Post Office Services', 
    icon: Mail,
    status: 'Open',
    description: '5 locations nearby • Short wait time',
    stats: 'Real-time queue status and service availability'
  }
];

const ongoingProjects = [
  {
    id: 1,
    name: 'Coastal Road Project',
    description: 'Building flood-resilient coastal highway from Marine Drive to Kandivali',
    cost: 120000000,
    contractor: 'Mumbai Metropolitan Development Authority',
    duration: '36 months',
    completion: 78,
    startDate: 'Sep 2021'
  },
  {
    id: 2,
    name: 'Mithi River Cleaning & Flood Prevention',
    description: 'Comprehensive river cleaning and storm water management system',
    cost: 25000000,
    contractor: 'BMC & State Govt',
    duration: '24 months',
    completion: 45,
    startDate: 'Jun 2023'
  },
  {
    id: 3,
    name: 'Metro Line 3 (Colaba-Bandra-SEEPZ)',
    description: 'Underground metro line to reduce traffic congestion',
    cost: 280000000,
    contractor: 'Mumbai Metro Rail Corporation Ltd',
    duration: '60 months',
    completion: 85,
    startDate: 'Feb 2019'
  },
  {
    id: 4,
    name: 'Smart Monsoon Management System',
    description: 'IoT-based flood monitoring and early warning system',
    cost: 5000000,
    contractor: 'Tata Consultancy Services',
    duration: '12 months',
    completion: 60,
    startDate: 'Apr 2024'
  }
];

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
};

const getAQIColor = (value: number) => {
  if (value <= 50) return 'text-success';
  if (value <= 100) return 'text-warning';
  return 'text-destructive';
};

const getServiceStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-success text-success-foreground';
    case 'Limited': return 'bg-warning text-warning-foreground';
    case 'Disruption': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const serviceSchedules = [
  { 
    service: 'Waste Collection', 
    icon: Trash2, 
    nextDate: 'Tomorrow, 5:30 AM', 
    frequency: 'Daily (except Sunday)',
    area: 'Bandra West'
  },
  { 
    service: 'Water Supply', 
    icon: Droplets, 
    nextDate: 'Daily, 6:00 AM - 10:00 AM', 
    frequency: 'BMC regulated supply',
    area: 'All Mumbai wards'
  },
  { 
    service: 'Monsoon Drain Cleaning', 
    icon: Zap, 
    nextDate: 'Today, 3:00 PM - 6:00 PM', 
    frequency: 'Pre-monsoon & During monsoon',
    area: 'Flood-prone areas'
  },
  { 
    service: 'Storm Water Pumping', 
    icon: Droplets, 
    nextDate: 'Active during rainfall', 
    frequency: 'Monsoon season',
    area: 'Low-lying areas like Hindmata, King Circle'
  }
];

const socialMediaHandles = [
  {
    department: 'BMC (Brihanmumbai Municipal Corporation)',
    handles: [
      { platform: 'Twitter', url: 'https://twitter.com/mybmc', icon: Twitter },
      { platform: 'Facebook', url: 'https://facebook.com/mybmcofficial', icon: Facebook },
      { platform: 'Instagram', url: 'https://instagram.com/mybmcofficial', icon: Instagram }
    ]
  },
  {
    department: 'Mumbai Police',
    handles: [
      { platform: 'Twitter', url: 'https://twitter.com/MumbaiPolice', icon: Twitter },
      { platform: 'Facebook', url: 'https://facebook.com/MumbaiPolice', icon: Facebook }
    ]
  },
  {
    department: 'Mumbai Fire Brigade',
    handles: [
      { platform: 'Twitter', url: 'https://twitter.com/MumbaiFire', icon: Twitter },
      { platform: 'YouTube', url: 'https://youtube.com/MumbaiFireBrigade', icon: Youtube }
    ]
  },
  {
    department: 'Disaster Management (BMC)',
    handles: [
      { platform: 'Twitter', url: 'https://twitter.com/DisasterMgmtBMC', icon: Twitter },
      { platform: 'Instagram', url: 'https://instagram.com/mumbaidisastermgmt', icon: Instagram }
    ]
  }
];

export const YourCity = () => {
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isParkingModalOpen, setIsParkingModalOpen] = useState(false);
  const [isPostOfficeModalOpen, setIsPostOfficeModalOpen] = useState(false);

  const handleServiceClick = (serviceId: string) => {
    switch (serviceId) {
      case 'health':
        setIsHealthModalOpen(true);
        break;
      case 'parking':
        setIsParkingModalOpen(true);
        break;
      case 'postoffice':
        setIsPostOfficeModalOpen(true);
        break;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Monsoon Alert */}
      {cityStats.monsoonAlert.active && (
        <Card className="border-warning bg-warning/5 shadow-soft mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-warning" />
              <span className="font-medium text-warning">Monsoon Alert - {cityStats.monsoonAlert.level}</span>
            </div>
            <p className="text-sm text-foreground mb-3">{cityStats.monsoonAlert.message}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button size="sm" variant="outline" className="text-xs">
                Flood-prone Areas
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Emergency Shelters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environmental & Traffic Data */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <Thermometer className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{cityStats.temperature.value}°C</p>
            <p className="text-xs text-muted-foreground">Feels like {cityStats.temperature.feels}°C</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center bg-primary/10 rounded-full">
              <span className="text-sm font-bold text-primary">AQI</span>
            </div>
            <p className={`text-2xl font-bold ${getAQIColor(cityStats.airQuality.value)}`}>
              {cityStats.airQuality.value}
            </p>
            <p className="text-xs text-muted-foreground">{cityStats.airQuality.status}</p>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Status with Map */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Car className="w-5 h-5 text-primary" />
            <span className="font-medium">Traffic Status</span>
          </div>
          
          <div className="relative mb-3">
            <img 
              src="/lovable-uploads/61d51796-049b-4382-bf5b-4bca37b9fa4c.png" 
              alt="Mumbai Traffic & Flood Map - Real-time status of major routes and waterlogged areas" 
              className="w-full h-48 object-cover rounded-lg"
            />
            
            {/* Traffic Overlays */}
            <div className="absolute inset-0 rounded-lg">
              {/* Heavy Traffic Areas */}
              <div className="absolute top-6 left-16 w-3 h-3 bg-destructive rounded-full animate-pulse">
                <div className="absolute -top-1 -left-1 w-5 h-5 bg-destructive/30 rounded-full"></div>
              </div>
              <div className="absolute top-20 right-12 w-3 h-3 bg-destructive rounded-full animate-pulse">
                <div className="absolute -top-1 -left-1 w-5 h-5 bg-destructive/30 rounded-full"></div>
              </div>
              
              {/* Medium Traffic Areas */}
              <div className="absolute bottom-16 left-8 w-2.5 h-2.5 bg-warning rounded-full animate-pulse">
                <div className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 bg-warning/30 rounded-full"></div>
              </div>
              <div className="absolute top-12 left-1/2 w-2.5 h-2.5 bg-warning rounded-full animate-pulse">
                <div className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 bg-warning/30 rounded-full"></div>
              </div>
              
              {/* Traffic & Flood Legend */}
              <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-xs">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span>Heavy Traffic</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>Moderate Traffic</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Waterlogged Areas</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground">Current Status</p>
              <p className="text-lg font-semibold text-destructive">{cityStats.trafficLevel.value}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Peak Hours (Extended due to monsoon)</p>
              <p className="font-medium">{cityStats.trafficLevel.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Schedules */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Service Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {serviceSchedules.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="p-3 rounded-lg bg-accent/30 border border-border">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{service.service}</p>
                    <p className="text-xs text-primary font-medium mt-1">{service.nextDate}</p>
                    <p className="text-xs text-muted-foreground">
                      {service.frequency} • {service.area}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Public Services - Real-time Information */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Public Services - Real-time Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {publicServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="p-4 rounded-lg bg-accent/30 border border-border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-primary font-medium mt-1">{service.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{service.stats}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getServiceStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Ongoing Projects */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" />
            Development Projects Near You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="p-4 rounded-lg bg-gradient-to-r from-accent/20 to-secondary/20 border border-border">
              <h4 className="font-semibold text-sm mb-1">{project.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
              
              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p className="font-medium flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {formatCurrency(project.cost)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.duration}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Contractor</p>
                  <p className="font-medium">{project.contractor}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{project.completion}% Complete</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-civic-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.completion}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Started: {project.startDate}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Social Media Handles */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Follow Service Departments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialMediaHandles.map((dept, index) => (
            <div key={index} className="p-3 rounded-lg bg-accent/30 border border-border">
              <p className="font-medium text-sm mb-3">{dept.department}</p>
              <div className="flex flex-wrap gap-2">
                {dept.handles.map((handle, handleIndex) => {
                  const PlatformIcon = handle.icon;
                  return (
                    <Button
                      key={handleIndex}
                      size="sm"
                      variant="outline"
                      className="text-xs flex items-center gap-2"
                      asChild
                    >
                      <a href={handle.url} target="_blank" rel="noopener noreferrer">
                        <PlatformIcon className="w-3 h-3" />
                        {handle.platform}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Nearby Services */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Nearby Emergency Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {nearbyServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {service.type} • {service.distance}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  {service.contact}
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Modals */}
      <HealthServicesModal 
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />
      <ParkingServicesModal 
        isOpen={isParkingModalOpen}
        onClose={() => setIsParkingModalOpen(false)}
      />
      <PostOfficeModal 
        isOpen={isPostOfficeModalOpen}
        onClose={() => setIsPostOfficeModalOpen(false)}
      />
    </div>
  );
};
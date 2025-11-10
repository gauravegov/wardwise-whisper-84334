import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserCheck, Phone, MessageSquare, Search, MapPin, Mail } from "lucide-react";
import { useState } from "react";

const leaders = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    position: 'Ward Councillor - 12',
    party: 'Independent',
    area: 'Sector 15-18',
    contact: 'Available',
    experience: '2 terms',
    specialization: ['Infrastructure', 'Water Supply'],
    rating: 4.2,
    responseTime: '2-3 hours'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    position: 'Mayor',
    party: 'AAP',
    area: 'City-wide',
    contact: 'Available',
    experience: '1 term',
    specialization: ['Education', 'Women Safety', 'Environment'],
    rating: 4.7,
    responseTime: '24 hours'
  },
  {
    id: 3,
    name: 'Mohammad Aslam',
    position: 'Deputy Mayor',
    party: 'Congress',
    area: 'City-wide',
    contact: 'Limited',
    experience: '3 terms',
    specialization: ['Budget', 'Development'],
    rating: 3.9,
    responseTime: '2-4 days'
  },
  {
    id: 4,
    name: 'Sunita Devi',
    position: 'Ward Councillor - 15',
    party: 'BJP',
    area: 'Sector 12-14',
    contact: 'Available',
    experience: '1 term',
    specialization: ['Health', 'Sanitation'],
    rating: 4.1,
    responseTime: '1-2 hours'
  }
];

export const Leaders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');

  const filteredLeaders = leaders.filter(leader => 
    leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getContactColor = (contact: string) => {
    switch (contact) {
      case 'Available': return 'bg-success text-success-foreground';
      case 'Limited': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-warning">☆</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="text-muted-foreground">☆</span>);
    }
    return stars;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Search and Filters */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, position, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Leaders Directory */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            Your Representatives ({filteredLeaders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredLeaders.map((leader) => (
            <div key={leader.id} className="p-4 rounded-lg bg-gradient-to-r from-accent/30 to-secondary/30 border border-border">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground">{leader.position}</p>
                </div>
                <Badge className={getContactColor(leader.contact)}>
                  {leader.contact}
                </Badge>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Party</p>
                  <p className="font-medium">{leader.party}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">{leader.experience}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Coverage Area</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {leader.area}
                  </p>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {leader.specialization.map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rating and Response Time */}
              <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Community Rating</p>
                  <div className="flex items-center gap-1">
                    {renderStars(leader.rating)}
                    <span className="text-sm font-medium ml-1">{leader.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Avg. Response Time</p>
                  <p className="text-sm font-medium">{leader.responseTime}</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" disabled={leader.contact === 'Limited'}>
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-muted-foreground mt-3 p-2 bg-primary/5 rounded border-l-2 border-primary">
                🔒 Your identity remains anonymous during communication
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
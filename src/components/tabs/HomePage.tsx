import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, BarChart3, Navigation, Heart, Shield, Construction, AlertTriangle, Hospital, Car, Zap, Instagram, Twitter, MessageCircle, Facebook, ExternalLink, CloudRain, Droplets, Waves, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyModal } from "@/components/modals/SurveyModal";

const mapOverlays = [
  { id: 'traffic', label: 'Traffic', icon: Navigation, color: 'bg-warning' },
  { id: 'health', label: 'Health', icon: Heart, color: 'bg-success' },
  { id: 'safety', label: 'Safety', icon: Shield, color: 'bg-destructive' },
];

const mapMarkers = {
  traffic: [
    { id: 1, x: 25, y: 35, icon: Waves, title: 'Waterlogged Area - SV Road', description: 'Heavy waterlogging reported on SV Road near Andheri station. Traffic diverted via Link Road. BMC pumps deployed.' },
    { id: 2, x: 65, y: 60, icon: Car, title: 'Eastern Express Highway Clear', description: 'Traffic moving smoothly on EEH. Alternative route for Western Express Highway commuters during peak hours.' },
    { id: 3, x: 80, y: 25, icon: AlertTriangle, title: 'Sion-Panvel Highway Closure', description: 'Temporary closure due to flooding under railway bridge. Diversion via Kurla-Chembur route. Expected clearance: 2 hours.' },
    { id: 4, x: 45, y: 75, icon: CloudRain, title: 'Heavy Rain Alert - Bandra-Kurla', description: 'BMC advisory: Heavy rainfall in BKC area. Avoid basement parking. Stay updated with weather alerts.' }
  ],
  health: [
    { id: 1, x: 35, y: 45, icon: Hospital, title: 'KEM Hospital', description: 'Multi-specialty hospital with 24/7 emergency services. Flood emergency care available. Contact: +91-22-2413-6051' },
    { id: 2, x: 70, y: 30, icon: Heart, title: 'Monsoon Health Camp', description: 'Free health checkup for flood-affected residents this weekend at Bandra Community Center. Registration open.' },
    { id: 3, x: 20, y: 65, icon: Hospital, title: 'Sion Hospital Emergency Wing', description: 'Dedicated emergency services for monsoon-related injuries and illnesses. 24/7 ambulance service available.' },
    { id: 4, x: 55, y: 80, icon: Heart, title: 'Blood Donation Drive', description: 'Emergency blood donation camp for flood relief operations. All blood types urgently needed at Lilavati Hospital.' }
  ],
  safety: [
    { id: 1, x: 30, y: 20, icon: Shield, title: 'Disaster Response Team', description: 'Mumbai Fire Brigade disaster response team stationed for flood rescue operations. Emergency contact: 101' },
    { id: 2, x: 75, y: 55, icon: Droplets, title: 'BMC Pumping Station', description: 'Active water pumping operations to clear waterlogged areas. 24/7 monitoring during monsoon season.' },
    { id: 3, x: 40, y: 85, icon: AlertTriangle, title: 'Flood Relief Center', description: 'Community relief center active with food, water, and temporary shelter for flood-affected families.' },
    { id: 4, x: 85, y: 40, icon: Shield, title: 'Emergency Control Room', description: 'BMC disaster management control room operational. Report emergencies: 1916 (BMC Helpline)' }
  ]
};

const socialPlatforms = {
  twitter: { icon: Twitter, color: 'text-blue-500', name: 'Twitter' },
  instagram: { icon: Instagram, color: 'text-pink-500', name: 'Instagram' },
  reddit: { icon: MessageCircle, color: 'text-orange-500', name: 'Reddit' },
  facebook: { icon: Facebook, color: 'text-blue-600', name: 'Facebook' }
};

const trendingTopics = [
  {
    id: 1,
    title: 'Mumbai Monsoon Preparedness 2024: BMC Updates Flood Management Plan',
    category: 'Disaster Management',
    sentiment: 'positive',
    platforms: {
      twitter: { engagement: 156, trending: true },
      instagram: { engagement: 78, trending: false },
      reddit: { engagement: 89, trending: true },
      facebook: { engagement: 67, trending: false }
    },
    totalEngagement: 390,
    topPosts: [
      { platform: 'twitter', text: 'BMC unveils new flood-resistant infrastructure for monsoon 2024 🌧️ #MumbaiMonsoon #FloodPreparedness', engagement: 287 },
      { platform: 'reddit', text: 'Comprehensive analysis: Mumbai\'s monsoon readiness vs previous years. Progress is encouraging!', engagement: 198 }
    ]
  },
  {
    id: 2,
    title: 'Mithi River Cleaning Drive Shows Progress - Water Levels Monitored 24/7',
    category: 'Environment',
    sentiment: 'positive',
    platforms: {
      twitter: { engagement: 134, trending: true },
      instagram: { engagement: 89, trending: true },
      reddit: { engagement: 67, trending: false },
      facebook: { engagement: 45, trending: false }
    },
    totalEngagement: 335,
    topPosts: [
      { platform: 'twitter', text: 'Mithi River cleaning making real difference! Water flow improved significantly 🌊 #MithiRiver #MumbaiClean', engagement: 234 },
      { platform: 'instagram', text: 'Before/after photos of Mithi River cleanup are incredible! Great work BMC 📸', engagement: 167 }
    ]
  },
  {
    id: 3,
    title: 'Waterlogging Alert: Real-time Updates from Hindmata, Sion, King Circle',
    category: 'Weather Alert',
    sentiment: 'negative',
    platforms: {
      twitter: { engagement: 289, trending: true },
      instagram: { engagement: 45, trending: false },
      reddit: { engagement: 123, trending: true },
      facebook: { engagement: 78, trending: false }
    },
    totalEngagement: 535,
    topPosts: [
      { platform: 'twitter', text: 'Heavy waterlogging reported at King Circle & Sion. Avoid these routes! Alternative routes in thread 🚨', engagement: 345 },
      { platform: 'reddit', text: 'Live thread: Mumbai waterlogging updates, traffic diversions, and emergency contact numbers', engagement: 267 }
    ]
  },
  {
    id: 4,
    title: 'Mumbai Local Train Services Resume After Brief Suspension Due to Heavy Rain',
    category: 'Transportation',
    sentiment: 'positive',
    platforms: {
      twitter: { engagement: 198, trending: true },
      instagram: { engagement: 34, trending: false },
      reddit: { engagement: 156, trending: true },
      facebook: { engagement: 56, trending: false }
    },
    totalEngagement: 444,
    topPosts: [
      { platform: 'twitter', text: 'Central & Western line services fully restored! Mumbai bounces back 🚂 #MumbaiLocal #MonsoonUpdate', engagement: 289 },
      { platform: 'reddit', text: 'Real-time train schedule updates and platform crowd status for monsoon commuters', engagement: 201 }
    ]
  },
  {
    id: 5,
    title: 'Community Flood Relief Centers Activated Across Mumbai Suburbs',
    category: 'Community Support',
    sentiment: 'positive',
    platforms: {
      twitter: { engagement: 123, trending: false },
      instagram: { engagement: 67, trending: true },
      reddit: { engagement: 89, trending: false },
      facebook: { engagement: 156, trending: true }
    },
    totalEngagement: 435,
    topPosts: [
      { platform: 'facebook', text: 'List of active relief centers in Andheri, Borivali, and Thane with contact details. Share to help others! 🤝', engagement: 234 },
      { platform: 'instagram', text: 'Volunteers needed at flood relief centers. Every helping hand counts! 💪 #MumbaiCares', engagement: 178 }
    ]
  }
];

const surveys = [
  {
    id: 1,
    title: 'Street Lighting Improvement Survey',
    description: 'Help us prioritize street lighting improvements in your area',
    question: 'Which areas need the most urgent street lighting improvements?',
    responses: 342,
    timeLeft: '5 days left',
    options: [
      { id: 'residential', text: 'Residential streets and colonies', votes: 156 },
      { id: 'main-roads', text: 'Main roads and intersections', votes: 98 },
      { id: 'parks', text: 'Parks and recreational areas', votes: 67 },
      { id: 'commercial', text: 'Commercial and market areas', votes: 21 }
    ],
    totalVotes: 342
  },
  {
    id: 2,
    title: 'Public Transport Route Feedback',
    description: 'Share your thoughts on proposed bus route changes',
    question: 'How do you feel about the proposed new bus route connecting Metro stations?',
    responses: 156,
    timeLeft: '12 days left',
    options: [
      { id: 'strongly-support', text: 'Strongly support - Much needed', votes: 89 },
      { id: 'support', text: 'Support with minor modifications', votes: 45 },
      { id: 'neutral', text: 'Neutral - No strong opinion', votes: 15 },
      { id: 'oppose', text: 'Oppose - Will increase traffic', votes: 7 }
    ],
    totalVotes: 156
  }
];

export const HomePage = () => {
  const navigate = useNavigate();
  const [activeOverlay, setActiveOverlay] = useState('traffic');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      {/* Return to BMC Website Button */}
      <div className="flex justify-start">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to BMC Website
        </Button>
      </div>
      {/* Interactive Map Card */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2">
            {mapOverlays.map((overlay) => {
              const Icon = overlay.icon;
              return (
                <Button
                  key={overlay.id}
                  variant={activeOverlay === overlay.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setActiveOverlay(overlay.id);
                    setSelectedMarker(null);
                  }}
                  className="h-8"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {overlay.label}
                </Button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-lg overflow-hidden h-64">
            <img 
              src="/lovable-uploads/a96e3fd0-de77-44fd-93a0-0c5bdf9c40e0.png" 
              alt="Interactive city map showing local area with marked locations" 
              className="w-full h-full object-cover"
            />
            
            {/* User Location Marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30"
              style={{ left: '45%', top: '55%' }}
            >
              <div className="relative">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                <div className="absolute -top-1 -left-1 w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg">
                You are here
              </div>
            </div>

            {/* Interactive Markers */}
            {mapMarkers[activeOverlay].map((marker) => {
              const MarkerIcon = marker.icon;
              return (
                <button
                  key={marker.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-125 border-2 border-white ${
                    selectedMarker?.id === marker.id 
                      ? 'bg-primary text-white scale-125 shadow-2xl' 
                      : 'bg-white text-primary hover:bg-primary hover:text-white shadow-lg'
                  }`}
                  style={{ 
                    left: `${marker.x}%`, 
                    top: `${marker.y}%`,
                    zIndex: selectedMarker?.id === marker.id ? 20 : 10
                  }}
                  onClick={() => setSelectedMarker(selectedMarker?.id === marker.id ? null : marker)}
                >
                  <MarkerIcon className="w-5 h-5" />
                </button>
              );
            })}

            {/* Marker Details Popup */}
            {selectedMarker && (
              <div 
                className="absolute bg-white rounded-lg shadow-xl p-3 border-2 border-primary z-30 max-w-[280px] sm:max-w-64"
                style={{ 
                  left: selectedMarker.x > 50 ? 'auto' : `${Math.max(selectedMarker.x, 5)}%`,
                  right: selectedMarker.x > 50 ? `${Math.max(100 - selectedMarker.x, 5)}%` : 'auto',
                  top: selectedMarker.y > 50 ? 'auto' : `${Math.max(selectedMarker.y + 5, 5)}%`,
                  bottom: selectedMarker.y > 50 ? `${Math.max(100 - selectedMarker.y + 5, 5)}%` : 'auto',
                  transform: 'none'
                }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <selectedMarker.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                  <h4 className="font-semibold text-xs sm:text-sm leading-tight">{selectedMarker.title}</h4>
                </div>
                <p className="text-xs sm:text-xs text-muted-foreground leading-relaxed">{selectedMarker.description}</p>
                <button 
                  className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs hover:bg-primary/80"
                  onClick={() => setSelectedMarker(null)}
                >
                  ×
                </button>
              </div>
            )}

          </div>
        </CardContent>
      </Card>

      {/* Social Media Trending Topics */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending in Your Area
            </CardTitle>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ExternalLink className="w-3 h-3" />
              <span>Social Media Insights</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Real-time conversations from Instagram, Twitter, Reddit, and Facebook about your local area
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="p-4 rounded-lg bg-gradient-to-r from-accent/30 to-accent/10 border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-sm leading-tight mb-1">{topic.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {topic.category}
                    </Badge>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      topic.sentiment === 'positive' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {topic.sentiment}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BarChart3 className="w-3 h-3" />
                    <span className="font-medium">{topic.totalEngagement}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">total mentions</span>
                </div>
              </div>

              {/* Platform Engagement */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {Object.entries(topic.platforms).map(([platformKey, data]) => {
                  const platform = socialPlatforms[platformKey];
                  const Icon = platform.icon;
                  return (
                    <div key={platformKey} className="text-center p-2 rounded bg-background/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon className={`w-3 h-3 ${platform.color}`} />
                        {data.trending && (
                          <TrendingUp className="w-2 h-2 text-success" />
                        )}
                      </div>
                      <div className="text-xs font-medium">{data.engagement}</div>
                      <div className="text-xs text-muted-foreground">{platform.name}</div>
                    </div>
                  );
                })}
              </div>

              {/* Top Posts Preview */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground mb-1">Popular Posts:</div>
                {topic.topPosts.map((post, index) => {
                  const platform = socialPlatforms[post.platform];
                  const Icon = platform.icon;
                  return (
                    <div key={index} className="flex items-start gap-2 p-2 rounded bg-background/30 text-xs">
                      <Icon className={`w-3 h-3 ${platform.color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-relaxed truncate">{post.text}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Heart className="w-2 h-2" />
                          <span>{post.engagement}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Social Media Sources Disclaimer */}
          <div className="text-center pt-2 border-t border-border">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <span className="text-xs">Sources:</span>
              {Object.values(socialPlatforms).map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <div key={index} className="flex items-center gap-1">
                    <Icon className={`w-3 h-3 ${platform.color}`} />
                    <span className="text-xs">{platform.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Surveys */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <CardTitle>Active Surveys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {surveys.map((survey) => (
            <div key={survey.id} className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-civic-accent/5 border border-primary/20">
              <h4 className="font-medium text-sm mb-1">{survey.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{survey.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-primary">{survey.responses}</span> responses • {survey.timeLeft}
                </div>
                <Button 
                  size="sm" 
                  variant="default" 
                  className="h-7 text-xs"
                  onClick={() => {
                    setSelectedSurvey(survey);
                    setIsSurveyModalOpen(true);
                  }}
                >
                  Participate
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Survey Modal */}
      <SurveyModal
        survey={selectedSurvey}
        isOpen={isSurveyModalOpen}
        onClose={() => {
          setIsSurveyModalOpen(false);
          setSelectedSurvey(null);
        }}
      />
    </div>
  );
};
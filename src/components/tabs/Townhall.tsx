import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MessageSquare, TrendingUp, Plus, Clock, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { CalendarModal } from "@/components/modals/CalendarModal";
import { DiscussionDetailModal } from "@/components/modals/DiscussionDetailModal";
import { CreateTownhallModal } from "@/components/modals/CreateTownhallModal";

const upcomingMeets = [
  {
    id: 1,
    title: 'Ward 15 Development Discussion',
    date: 'Dec 15, 2024',
    time: '7:00 PM',
    attendees: 23,
    organizer: 'Councillor Office',
    type: 'Virtual'
  },
  {
    id: 2,
    title: 'Traffic Management Solutions',
    date: 'Dec 18, 2024',
    time: '6:30 PM',
    attendees: 45,
    organizer: 'Citizens Initiative',
    type: 'In-person',
    location: 'Civic Center, Downtown',
    distance: '2.3 km'
  },
  {
    id: 3,
    title: 'Community Safety Forum',
    date: 'Dec 20, 2024',
    time: '5:30 PM',
    attendees: 38,
    organizer: 'Ward Committee',
    type: 'In-person',
    location: 'Community Hall, Sector 15',
    distance: '1.8 km'
  }
];

const discussions = [
  {
    id: 1,
    title: 'Parking Issues Near Metro Station',
    author: 'Anonymous Citizen',
    comments: 34,
    upvotes: 89,
    sentiment: { positive: 45, neutral: 30, negative: 25 },
    timeAgo: '2h ago',
    description: 'The parking situation near the metro station has become increasingly problematic...'
  },
  {
    id: 2,
    title: 'Need for Better Street Lighting',
    author: 'Local Resident',
    comments: 28,
    upvotes: 67,
    sentiment: { positive: 78, neutral: 15, negative: 7 },
    timeAgo: '5h ago',
    description: 'Several areas in our ward lack adequate street lighting, creating safety concerns...'
  },
  {
    id: 3,
    title: 'Waste Collection Schedule Changes',
    author: 'Ward Committee',
    comments: 52,
    upvotes: 156,
    sentiment: { positive: 34, neutral: 40, negative: 26 },
    timeAgo: '1d ago',
    description: 'Proposed changes to the waste collection schedule to improve efficiency...'
  }
];

export const Townhall = () => {
  const [activeView, setActiveView] = useState<'meetings' | 'discussions'>('meetings');
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);

  return (
    <div className="space-y-6 pb-20">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={activeView === 'meetings' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('meetings')}
            className="h-8"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Meetings
          </Button>
          <Button
            variant={activeView === 'discussions' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('discussions')}
            className="h-8"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Discussions
          </Button>
        </div>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-primary to-civic-accent"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </div>

      {activeView === 'meetings' && (
        <>
          {/* Calendar View Button */}
          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <Button 
                variant="outline" 
                className="w-full justify-center"
                onClick={() => setIsCalendarModalOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Full Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card className="border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeets.map((meet) => (
                <div key={meet.id} className="p-4 rounded-lg bg-gradient-to-r from-accent/50 to-secondary/50 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm leading-tight">{meet.title}</h4>
                    <Badge variant="outline">{meet.organizer}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {meet.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meet.time}
                    </span>
                    {meet.type === 'In-person' && meet.location && (
                      <>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {meet.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          {meet.distance}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        <span className="font-medium text-primary">{meet.attendees}</span> interested
                      </span>
                      <Badge variant={meet.type === 'Virtual' ? 'secondary' : 'default'}>
                        {meet.type}
                      </Badge>
                    </div>
                    <Button size="sm" variant="default">
                      Join Meeting
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {activeView === 'discussions' && (
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Active Discussions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {discussions.map((discussion) => (
              <div 
                key={discussion.id} 
                className="p-4 rounded-lg bg-accent/30 border border-border cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => {
                  setSelectedDiscussion(discussion);
                  setIsDiscussionModalOpen(true);
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm leading-tight">{discussion.title}</h4>
                  <span className="text-xs text-muted-foreground">{discussion.timeAgo}</span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">by {discussion.author}</p>
                
                {/* Sentiment Analysis */}
                <div className="mb-3">
                  <p className="text-xs font-medium mb-1">Community Sentiment</p>
                  <div className="flex rounded-full overflow-hidden h-2 bg-muted">
                    <div 
                      className="bg-success" 
                      style={{ width: `${discussion.sentiment.positive}%` }}
                    />
                    <div 
                      className="bg-warning" 
                      style={{ width: `${discussion.sentiment.neutral}%` }}
                    />
                    <div 
                      className="bg-destructive" 
                      style={{ width: `${discussion.sentiment.negative}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-success">{discussion.sentiment.positive}% Positive</span>
                    <span className="text-warning">{discussion.sentiment.neutral}% Neutral</span>
                    <span className="text-destructive">{discussion.sentiment.negative}% Negative</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {discussion.upvotes} upvotes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {discussion.comments} comments
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDiscussion(discussion);
                      setIsDiscussionModalOpen(true);
                    }}
                  >
                    Join Discussion
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
      
      <DiscussionDetailModal
        isOpen={isDiscussionModalOpen}
        onClose={() => setIsDiscussionModalOpen(false)}
        discussion={selectedDiscussion}
      />
      
      <CreateTownhallModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
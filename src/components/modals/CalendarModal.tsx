import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, ExternalLink } from "lucide-react";
import { useState } from "react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const meetingEvents = [
  {
    date: new Date(2024, 11, 15), // December 15, 2024
    meetings: [
      {
        id: 1,
        title: 'Ward 15 Development Discussion',
        time: '7:00 PM',
        attendees: 23,
        type: 'Virtual'
      }
    ]
  },
  {
    date: new Date(2024, 11, 18), // December 18, 2024
    meetings: [
      {
        id: 2,
        title: 'Traffic Management Solutions',
        time: '6:30 PM',
        attendees: 45,
        type: 'In-person'
      }
    ]
  },
  {
    date: new Date(2024, 11, 22), // December 22, 2024
    meetings: [
      {
        id: 3,
        title: 'Budget Planning Session',
        time: '5:00 PM',
        attendees: 67,
        type: 'Hybrid'
      }
    ]
  }
];

export const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const hasEventsOnDate = (date: Date) => {
    return meetingEvents.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventsForDate = (date: Date) => {
    return meetingEvents.find(event => 
      event.date.toDateString() === date.toDateString()
    )?.meetings || [];
  };

  const handleSyncToGoogle = () => {
    // Create Google Calendar event URL
    const events = meetingEvents.map(event => 
      event.meetings.map(meeting => {
        const startDate = new Date(event.date);
        const [hours, period] = meeting.time.split(' ');
        const [hour, minute] = hours.split(':');
        let hourNum = parseInt(hour);
        if (period === 'PM' && hourNum !== 12) hourNum += 12;
        if (period === 'AM' && hourNum === 12) hourNum = 0;
        
        startDate.setHours(hourNum, parseInt(minute || '0'));
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
        
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meeting.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Town Hall Meeting - ${meeting.attendees} attendees expected`)}&location=${encodeURIComponent('Civic Center')}`;
        
        return googleUrl;
      })
    ).flat();
    
    // Open first event (in real app, you'd handle multiple events)
    if (events.length > 0) {
      window.open(events[0], '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Town Hall Meeting Calendar
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <div className="w-full max-w-sm mx-auto">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                  day_range_end: "day-range-end",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
                modifiers={{
                  hasEvents: (date) => hasEventsOnDate(date)
                }}
                modifiersClassNames={{
                  hasEvents: "bg-primary text-primary-foreground font-bold hover:bg-primary/90"
                }}
              />
            </div>
            
            <Button 
              onClick={handleSyncToGoogle}
              className="w-full bg-gradient-to-r from-primary to-civic-accent"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Sync to Google Calendar
            </Button>
          </div>
          
          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {selectedDate ? `Events on ${selectedDate.toLocaleDateString()}` : "All Upcoming Meetings"}
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedDate 
                ? getEventsForDate(selectedDate).map((meeting) => (
                    <div key={meeting.id} className="p-4 rounded-lg bg-accent/50 border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <Badge variant={meeting.type === 'Virtual' ? 'secondary' : meeting.type === 'In-person' ? 'default' : 'outline'}>
                          {meeting.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {meeting.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {meeting.attendees} attending
                        </span>
                      </div>
                    </div>
                  ))
                : meetingEvents.map((event) => (
                    <div key={event.date.toISOString()} className="space-y-2">
                      <h4 className="font-medium text-primary">{event.date.toLocaleDateString()}</h4>
                      {event.meetings.map((meeting) => (
                        <div key={meeting.id} className="p-3 rounded-lg bg-accent/30 border ml-4">
                          <div className="flex items-start justify-between mb-1">
                            <h5 className="font-medium text-sm">{meeting.title}</h5>
                            <Badge variant={meeting.type === 'Virtual' ? 'secondary' : meeting.type === 'In-person' ? 'default' : 'outline'}>
                              {meeting.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {meeting.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {meeting.attendees}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
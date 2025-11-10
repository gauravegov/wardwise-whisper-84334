import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, FileText, AlertCircle, Clock } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'meeting',
    title: 'Townhall Meeting Tomorrow',
    message: 'Ward 15 Development Discussion at 7:00 PM',
    time: '2h ago',
    unread: true,
    icon: Calendar
  },
  {
    id: 2,
    type: 'proposal',
    title: 'New Proposal in Your Area',
    message: 'Speed bumps proposed for School Road - Your input needed',
    time: '5h ago',
    unread: true,
    icon: FileText
  },
  {
    id: 3,
    type: 'infrastructure',
    title: 'Water Supply Maintenance',
    message: 'Scheduled maintenance on Dec 18, 6AM-2PM in Sector 12',
    time: '1d ago',
    unread: false,
    icon: AlertCircle
  },
  {
    id: 4,
    type: 'budget',
    title: 'Budget Proposal Update',
    message: 'Street lighting improvement proposal has been approved',
    time: '2d ago',
    unread: false,
    icon: FileText
  }
];

export const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-primary text-primary-foreground';
      case 'proposal': return 'bg-success text-success-foreground';
      case 'infrastructure': return 'bg-warning text-warning-foreground';
      case 'budget': return 'bg-civic-accent text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div 
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent/50 ${
                  notification.unread ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {notifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No new notifications</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, TrendingUp, ThumbsUp, ThumbsDown, Send, Clock } from "lucide-react";
import { useState } from "react";

interface Discussion {
  id: number;
  title: string;
  author: string;
  comments: number;
  upvotes: number;
  sentiment: { positive: number; neutral: number; negative: number };
  timeAgo: string;
  description: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timeAgo: string;
  upvotes: number;
}

interface DiscussionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  discussion: Discussion | null;
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Sarah M.",
    content: "I completely agree! The parking situation has gotten much worse since the new mall opened. We desperately need more parking spaces or better public transport options.",
    timeAgo: "2h ago",
    upvotes: 23
  },
  {
    id: 2,
    author: "Mike R.",
    content: "Has anyone considered implementing a time-based parking system? This could help with the turnover and make spots available more frequently.",
    timeAgo: "4h ago",
    upvotes: 15
  },
  {
    id: 3,
    author: "Local Business Owner",
    content: "As a business owner in the area, I've noticed many customers mention the parking issue. It's definitely affecting foot traffic to local shops.",
    timeAgo: "6h ago",
    upvotes: 31
  },
  {
    id: 4,
    author: "City Planner",
    content: "Thank you all for the feedback. We're currently reviewing proposals for additional parking structures and improved bus routes to the metro station.",
    timeAgo: "1d ago",
    upvotes: 45
  }
];

export const DiscussionDetailModal = ({ isOpen, onClose, discussion }: DiscussionDetailModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);

  if (!discussion) return null;

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // In a real app, this would submit to backend
      console.log("Submitting comment:", newComment);
      setNewComment("");
      // Show success feedback
    }
  };

  const handleUpvote = () => {
    if (hasVoted !== 'up') {
      setHasVoted('up');
      // In a real app, this would update backend
    }
  };

  const handleDownvote = () => {
    if (hasVoted !== 'down') {
      setHasVoted('down');
      // In a real app, this would update backend
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            {discussion.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Discussion Header */}
          <div className="p-4 rounded-lg bg-accent/30 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Started by <span className="font-medium">{discussion.author}</span> • {discussion.timeAgo}
                </p>
                <p className="text-sm leading-relaxed">
                  The parking situation near the metro station has become increasingly problematic. With the recent increase in ridership and new developments in the area, finding parking has become nearly impossible during peak hours. Citizens are requesting immediate action to address this issue.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={hasVoted === 'up' ? "default" : "outline"}
                  size="sm"
                  onClick={handleUpvote}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {hasVoted === 'up' ? discussion.upvotes + 1 : discussion.upvotes}
                </Button>
                <Button
                  variant={hasVoted === 'down' ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleDownvote}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {hasVoted === 'down' ? '12' : '11'}
                </Button>
              </div>
            </div>
            
            {/* Sentiment Analysis */}
            <div className="space-y-2">
              <p className="text-xs font-medium">Community Sentiment</p>
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
              <div className="flex justify-between text-xs">
                <span className="text-success">{discussion.sentiment.positive}% Positive</span>
                <span className="text-warning">{discussion.sentiment.neutral}% Neutral</span>
                <span className="text-destructive">{discussion.sentiment.negative}% Negative</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Comments ({mockComments.length})
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockComments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-lg bg-card border">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                        {comment.author === "City Planner" && (
                          <Badge variant="secondary" className="text-xs">Official</Badge>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed mb-3">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {comment.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsDown className="w-3 h-3 mr-1" />
                          {Math.floor(comment.upvotes * 0.3)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment */}
          <div className="space-y-3">
            <h4 className="font-medium">Add your comment</h4>
            <div className="space-y-3">
              <Textarea
                placeholder="Share your thoughts on this issue..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-gradient-to-r from-primary to-civic-accent"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
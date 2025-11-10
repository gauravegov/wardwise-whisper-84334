import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, ThumbsUp, ThumbsDown, Send, MapPin, Users, Building2 } from "lucide-react";
import { useState } from "react";

interface Proposal {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  location: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  submittedBy: string;
  submittedDate: string;
  image: boolean;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timeAgo: string;
  upvotes: number;
  isCouncillor?: boolean;
}

interface ProposalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal | null;
}

const mockCitizenComments: Comment[] = [
  {
    id: 1,
    author: "Sarah M.",
    content: "This is absolutely necessary! My kids walk to school daily and the traffic on Main Road is getting worse every day. Speed bumps would make such a difference.",
    timeAgo: "2h ago",
    upvotes: 23
  },
  {
    id: 2,
    author: "Mike R.",
    content: "I support this proposal. As a driver, I've noticed many cars speeding through this area. Safety should be our top priority.",
    timeAgo: "4h ago",
    upvotes: 15
  },
  {
    id: 3,
    author: "Local Teacher",
    content: "As someone who works at the school, I witness near-miss incidents almost daily. This proposal has my full support.",
    timeAgo: "6h ago",
    upvotes: 31
  }
];

const mockCouncillorComments: Comment[] = [
  {
    id: 1,
    author: "Councillor John Smith",
    content: "Thank you for bringing this important safety concern to our attention. We have reviewed the proposal and are coordinating with the traffic department for a site assessment. We expect to have preliminary results within 2 weeks.",
    timeAgo: "1d ago",
    upvotes: 45,
    isCouncillor: true
  },
  {
    id: 2,
    author: "Traffic Commissioner",
    content: "Initial assessment shows this location meets our criteria for traffic calming measures. Budget allocation discussions are underway for Q1 implementation.",
    timeAgo: "3d ago",
    upvotes: 38,
    isCouncillor: true
  }
];

export const ProposalDetailModal = ({ isOpen, onClose, proposal }: ProposalDetailModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);

  if (!proposal) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-success-foreground';
      case 'Under Review': return 'bg-warning text-warning-foreground';
      case 'Pending': return 'bg-muted text-muted-foreground';
      case 'Rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log("Submitting comment:", newComment);
      setNewComment("");
    }
  };

  const handleUpvote = () => {
    if (hasVoted !== 'up') {
      setHasVoted('up');
    }
  };

  const handleDownvote = () => {
    if (hasVoted !== 'down') {
      setHasVoted('down');
    }
  };

  const supportPercentage = Math.round((proposal.upvotes / (proposal.upvotes + proposal.downvotes)) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {proposal.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Proposal Details */}
          <div className="space-y-6">
            {/* Proposal Header */}
            <div className="p-4 rounded-lg bg-accent/30 border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getStatusColor(proposal.status)}>
                      {proposal.status}
                    </Badge>
                    <Badge variant="outline">{proposal.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    {proposal.location}
                  </div>
                  <p className="text-sm leading-relaxed mb-4">
                    {proposal.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Submitted by {proposal.submittedBy} on {proposal.submittedDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={hasVoted === 'up' ? "default" : "outline"}
                    size="sm"
                    onClick={handleUpvote}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {hasVoted === 'up' ? proposal.upvotes + 1 : proposal.upvotes}
                  </Button>
                  <Button
                    variant={hasVoted === 'down' ? "destructive" : "outline"}
                    size="sm"
                    onClick={handleDownvote}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    {hasVoted === 'down' ? proposal.downvotes + 1 : proposal.downvotes}
                  </Button>
                </div>
              </div>

              {/* Support Heatmap */}
              <div className="space-y-2">
                <p className="text-xs font-medium">Community Support</p>
                <div className="bg-gradient-to-r from-destructive/20 via-warning/20 to-success/20 rounded h-4 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {supportPercentage}% support
                  </span>
                </div>
              </div>
            </div>

            {/* Proposal Image */}
            {proposal.image && (
              <div className="bg-gradient-to-br from-accent to-secondary rounded-lg h-48 flex items-center justify-center">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
            )}

            {/* Administrative Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="w-4 h-4" />
                  Administrative Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Review Status:</span>
                  <Badge className={getStatusColor(proposal.status)}>
                    {proposal.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Department:</span>
                  <span className="text-sm text-muted-foreground">Traffic & Safety</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Expected Timeline:</span>
                  <span className="text-sm text-muted-foreground">2-4 weeks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Budget Required:</span>
                  <span className="text-sm text-muted-foreground">₹2,50,000</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map and Comments */}
          <div className="space-y-6">
            {/* Area Sentiment Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Area Sentiment Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden h-64">
                  {/* Base Map */}
                  <img 
                    src="/lovable-uploads/6b130242-0e10-4c77-bd78-b29a2f49ffb1.png" 
                    alt="Area map showing street layout and locations" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Sentiment Overlay Areas */}
                  {/* Support areas (green) */}
                  <div className="absolute top-8 left-8 w-20 h-16 bg-success/40 rounded-xl border-2 border-success/60"></div>
                  <div className="absolute bottom-12 right-12 w-16 h-20 bg-success/35 rounded-xl border-2 border-success/55"></div>
                  
                  {/* Neutral areas (yellow) */}
                  <div className="absolute top-16 right-8 w-18 h-14 bg-warning/40 rounded-xl border-2 border-warning/60"></div>
                  <div className="absolute bottom-8 left-16 w-14 h-16 bg-warning/35 rounded-xl border-2 border-warning/55"></div>
                  
                  {/* Opposition areas (red) */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-destructive/40 rounded-xl border-2 border-destructive/60"></div>
                  <div className="absolute bottom-16 left-1/3 w-12 h-14 bg-destructive/35 rounded-xl border-2 border-destructive/55"></div>
                  
                  {/* Proposal Location Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 bg-primary border-4 border-white rounded-full shadow-lg"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Proposal Site
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg">
                    <div className="font-medium mb-2">Community Sentiment</div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-success/60 rounded border border-success"></div>
                      <span>Support (67%)</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-warning/60 rounded border border-warning"></div>
                      <span>Neutral (23%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive/60 rounded border border-destructive"></div>
                      <span>Opposition (10%)</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>High Support</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>Neutral</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Opposition</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Sections */}
            <div className="space-y-4">
              {/* Councillor Comments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="w-4 h-4 text-primary" />
                    Official Response ({mockCouncillorComments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-48 overflow-y-auto">
                  {mockCouncillorComments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg bg-primary/5 border-l-4 border-primary">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {comment.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <Badge variant="default" className="text-xs">Official</Badge>
                            <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                          </div>
                          <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {comment.upvotes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Citizen Comments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="w-4 h-4" />
                    Citizen Comments ({mockCitizenComments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-64 overflow-y-auto">
                  {mockCitizenComments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg bg-card border">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                          </div>
                          <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {comment.upvotes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsDown className="w-3 h-3 mr-1" />
                              {Math.floor(comment.upvotes * 0.2)}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Add Comment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Add Your Comment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts on this proposal..."
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
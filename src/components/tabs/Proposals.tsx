import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ThumbsUp, ThumbsDown, MapPin, Filter, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { ProposalDetailModal } from "@/components/modals/ProposalDetailModal";
import { SubmitProposalModal } from "@/components/modals/SubmitProposalModal";
import { ShareProposalModal } from "@/components/modals/ShareProposalModal";

const proposals = [
  {
    id: 1,
    title: 'Speed Bumps Near Schools',
    description: 'Install speed bumps on Main Road near Government School to ensure child safety',
    category: 'Safety',
    status: 'Under Review',
    location: 'Main Road, Ward 12',
    upvotes: 234,
    downvotes: 12,
    comments: 45,
    submittedBy: 'Local Parent Group',
    submittedDate: '2024-12-10',
    image: true,
    isYourProposal: false
  },
  {
    id: 2,
    title: 'Community Park Development',
    description: 'Convert vacant lot into community park with playground and walking path',
    category: 'Environment',
    status: 'Approved',
    location: 'Sector 15, Plot 23',
    upvotes: 189,
    downvotes: 8,
    comments: 67,
    submittedBy: 'Residents Association',
    submittedDate: '2024-12-08',
    image: false,
    isYourProposal: false
  },
  {
    id: 3,
    title: 'Better Street Lighting',
    description: 'Upgrade street lighting along the commercial area for better visibility',
    category: 'Infrastructure',
    status: 'Pending',
    location: 'Commercial Street',
    upvotes: 156,
    downvotes: 23,
    comments: 34,
    submittedBy: 'Shop Owners Association',
    submittedDate: '2024-12-05',
    image: true,
    isYourProposal: false
  },
  {
    id: 4,
    title: 'Public WiFi Hotspots in Parks',
    description: 'Install free public WiFi access points in all major parks to promote digital connectivity',
    category: 'Infrastructure',
    status: 'Under Review',
    location: 'City Parks, Various Locations',
    upvotes: 87,
    downvotes: 5,
    comments: 12,
    submittedBy: 'You',
    submittedDate: '2024-12-12',
    image: false,
    isYourProposal: true
  }
];

const filters = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];
const categories = ['All', 'Your Proposal', 'Safety', 'Infrastructure', 'Environment', 'Water', 'Transport'];

export const Proposals = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProposal, setSelectedProposal] = useState<typeof proposals[0] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [proposalToShare, setProposalToShare] = useState<typeof proposals[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-success-foreground';
      case 'Under Review': return 'bg-warning text-warning-foreground';
      case 'Pending': return 'bg-muted text-muted-foreground';
      case 'Rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredProposals = proposals.filter((proposal) => {
    const matchesStatus = activeFilter === 'All' || proposal.status === activeFilter;
    const matchesCategory = activeCategory === 'All' || 
                           (activeCategory === 'Your Proposal' && proposal.isYourProposal) ||
                           (activeCategory !== 'Your Proposal' && proposal.category === activeCategory);
    return matchesStatus && matchesCategory;
  });

  const handleViewDetails = (proposal: typeof proposals[0]) => {
    setSelectedProposal(proposal);
    setIsDetailModalOpen(true);
  };

  const handleShare = (proposal: typeof proposals[0]) => {
    setProposalToShare(proposal);
    setIsShareModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Community Proposals</h2>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-primary to-civic-accent"
          onClick={() => setIsSubmitModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Submit Proposal
        </Button>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-2">Status</p>
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="whitespace-nowrap h-8"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Category</p>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap h-8"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <Card key={proposal.id} className="border-0 shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-base mb-1">{proposal.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {proposal.description}
                  </p>
                </div>
              </div>

              {/* Image placeholder if exists */}
              {proposal.image && (
                <div className="bg-gradient-to-br from-accent to-secondary rounded-lg h-32 mb-3 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
              )}

              {/* Location and Category */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {proposal.location}
                </div>
                <Badge variant="outline">{proposal.category}</Badge>
                <Badge className={getStatusColor(proposal.status)}>
                  {proposal.status}
                </Badge>
              </div>

              {/* Voting and Comments */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-success hover:text-success/80 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    {proposal.upvotes}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-destructive hover:text-destructive/80 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    {proposal.downvotes}
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {proposal.comments} comments
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {proposal.isYourProposal && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleShare(proposal)}
                      className="gap-1"
                    >
                      <Share2 className="w-3 h-3" />
                      Share
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewDetails(proposal)}
                  >
                    View Details
                  </Button>
                </div>
              </div>

              {/* Heat Map Section */}
              <div className="mt-4 p-3 bg-accent/30 rounded-lg">
                <p className="text-xs font-medium mb-2">Community Support Heatmap</p>
                <div className="bg-gradient-to-r from-destructive/20 via-warning/20 to-success/20 rounded h-4 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    {Math.round((proposal.upvotes / (proposal.upvotes + proposal.downvotes)) * 100)}% support
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                Submitted by {proposal.submittedBy} on {proposal.submittedDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProposalDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        proposal={selectedProposal}
      />
      
      <SubmitProposalModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      <ShareProposalModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        proposal={proposalToShare}
      />
    </div>
  );
};
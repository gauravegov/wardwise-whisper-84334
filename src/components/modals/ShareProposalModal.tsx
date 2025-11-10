import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, MessageCircle, Mail, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: {
    title: string;
    description: string;
    upvotes: number;
    downvotes: number;
    comments: number;
    location: string;
  } | null;
}

type ShareType = 'proposal' | 'stats' | null;

export const ShareProposalModal = ({ isOpen, onClose, proposal }: ShareProposalModalProps) => {
  const [shareType, setShareType] = useState<ShareType>(null);
  const { toast } = useToast();

  if (!proposal) return null;

  const handleReset = () => {
    setShareType(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const getShareContent = () => {
    if (shareType === 'proposal') {
      return {
        title: `Check out my proposal: ${proposal.title}`,
        text: `${proposal.title}\n\n${proposal.description}\n\nLocation: ${proposal.location}\n\nSupport this proposal on our civic engagement platform!`,
        hashtags: 'CivicEngagement,CommunityProposal'
      };
    } else {
      const supportPercentage = Math.round((proposal.upvotes / (proposal.upvotes + proposal.downvotes)) * 100);
      return {
        title: `Engagement Stats for: ${proposal.title}`,
        text: `📊 My proposal "${proposal.title}" has received:\n\n👍 ${proposal.upvotes} upvotes\n👎 ${proposal.downvotes} downvotes\n💬 ${proposal.comments} comments\n✨ ${supportPercentage}% community support\n\nJoin the discussion on our civic engagement platform!`,
        hashtags: 'CivicEngagement,CommunityImpact'
      };
    }
  };

  const shareToFacebook = () => {
    const content = getShareContent();
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(content.text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    toast({
      title: "Opening Facebook",
      description: "Share window opened in new tab"
    });
  };

  const shareToTwitter = () => {
    const content = getShareContent();
    const text = encodeURIComponent(content.text);
    const hashtags = encodeURIComponent(content.hashtags);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    toast({
      title: "Opening Twitter",
      description: "Share window opened in new tab"
    });
  };

  const shareToLinkedIn = () => {
    const content = getShareContent();
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(content.title);
    const summary = encodeURIComponent(content.text);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    toast({
      title: "Opening LinkedIn",
      description: "Share window opened in new tab"
    });
  };

  const shareToWhatsApp = () => {
    const content = getShareContent();
    const text = encodeURIComponent(content.text);
    const shareUrl = `https://wa.me/?text=${text}`;
    window.open(shareUrl, '_blank');
    toast({
      title: "Opening WhatsApp",
      description: "Share window opened"
    });
  };

  const shareViaEmail = () => {
    const content = getShareContent();
    const subject = encodeURIComponent(content.title);
    const body = encodeURIComponent(content.text);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    toast({
      title: "Opening Email Client",
      description: "Composing email..."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Proposal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!shareType ? (
            // Step 1: Choose what to share
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">What would you like to share?</p>
              
              <Button
                onClick={() => setShareType('proposal')}
                variant="outline"
                className="w-full justify-start h-auto py-4 px-4"
              >
                <div className="text-left">
                  <div className="font-semibold mb-1">Share the Proposal</div>
                  <div className="text-xs text-muted-foreground">
                    Share your proposal details and encourage others to support it
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => setShareType('stats')}
                variant="outline"
                className="w-full justify-start h-auto py-4 px-4"
              >
                <div className="text-left">
                  <div className="font-semibold mb-1">Share Engagement Stats</div>
                  <div className="text-xs text-muted-foreground">
                    Share the impact and community support your proposal has received
                  </div>
                </div>
              </Button>
            </div>
          ) : (
            // Step 2: Choose platform
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Sharing: {shareType === 'proposal' ? 'Proposal Details' : 'Engagement Stats'}
                </p>
                <Button 
                  onClick={handleReset} 
                  variant="ghost" 
                  size="sm"
                  className="text-xs"
                >
                  Change
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={shareToFacebook}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </Button>

                <Button
                  onClick={shareToTwitter}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <Twitter className="w-6 h-6 text-sky-500" />
                  <span className="text-sm">Twitter</span>
                </Button>

                <Button
                  onClick={shareToLinkedIn}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <Linkedin className="w-6 h-6 text-blue-700" />
                  <span className="text-sm">LinkedIn</span>
                </Button>

                <Button
                  onClick={shareToWhatsApp}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <span className="text-sm">WhatsApp</span>
                </Button>

                <Button
                  onClick={shareViaEmail}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 col-span-2"
                >
                  <Mail className="w-6 h-6 text-gray-600" />
                  <span className="text-sm">Email</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

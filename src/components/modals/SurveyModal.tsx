import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SurveyOption {
  id: string;
  text: string;
  votes: number;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  question: string;
  options: SurveyOption[];
  totalVotes: number;
  timeLeft: string;
  responses: number;
}

interface SurveyModalProps {
  survey: Survey | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SurveyModal = ({ survey, isOpen, onClose }: SurveyModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  if (!survey) return null;

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    
    toast({
      title: "Vote Recorded!",
      description: "Thank you for participating in this survey.",
    });
  };

  const resetModal = () => {
    setSelectedOption(null);
    setHasVoted(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const getOptionPercentage = (votes: number) => {
    return survey.totalVotes > 0 ? Math.round((votes / survey.totalVotes) * 100) : 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold leading-tight">
            {survey.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Survey Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{survey.responses} responses</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{survey.timeLeft}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {survey.description}
          </p>

          {/* Question */}
          <div className="bg-accent/30 p-4 rounded-lg">
            <h3 className="font-medium text-sm mb-3">{survey.question}</h3>
            
            {!hasVoted ? (
              /* Voting Options */
              <div className="space-y-2">
                {survey.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleVote(option.id)}
                  >
                    <span className="text-sm">{option.text}</span>
                  </Button>
                ))}
              </div>
            ) : (
              /* Results View */
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">Your vote has been recorded</span>
                </div>
                
                {survey.options.map((option) => {
                  const percentage = getOptionPercentage(option.votes);
                  const isSelected = selectedOption === option.id;
                  
                  return (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{option.text}</span>
                          {isSelected && (
                            <Badge variant="secondary" className="text-xs">Your choice</Badge>
                          )}
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${isSelected ? 'bg-primary/20' : ''}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{option.votes} votes</span>
                      </div>
                    </div>
                  );
                })}
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Total participants: <span className="font-medium">{survey.totalVotes}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              Close
            </Button>
            {hasVoted && (
              <Button 
                variant="secondary" 
                onClick={resetModal}
                className="flex-1"
              >
                Vote Again
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
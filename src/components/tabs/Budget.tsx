import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, TrendingUp, TrendingDown, AlertCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const budgetData = [
  {
    category: 'Infrastructure Development',
    allocated: 15000000,
    spent: 8500000,
    percentage: 56.7,
    projects: 12,
    status: 'On Track'
  },
  {
    category: 'Water Supply & Sanitation',
    allocated: 8500000,
    spent: 7200000,
    percentage: 84.7,
    projects: 8,
    status: 'High Usage'
  },
  {
    category: 'Road Maintenance',
    allocated: 6200000,
    spent: 2100000,
    percentage: 33.9,
    projects: 15,
    status: 'Delayed'
  },
  {
    category: 'Public Safety',
    allocated: 4500000,
    spent: 3200000,
    percentage: 71.1,
    projects: 6,
    status: 'On Track'
  },
  {
    category: 'Parks & Recreation',
    allocated: 3800000,
    spent: 1900000,
    percentage: 50.0,
    projects: 9,
    status: 'On Track'
  }
];

const proposals = [
  {
    id: 1,
    title: 'Increase Street Lighting Budget',
    description: 'Allocate additional ₹2.5 lakhs for LED street light installation',
    amount: 250000,
    supportVotes: 145,
    opposeVotes: 23,
    status: 'Under Review'
  },
  {
    id: 2,
    title: 'Reduce Parks Maintenance Cost',
    description: 'Optimize park maintenance by 15% through community participation',
    amount: -570000,
    supportVotes: 89,
    opposeVotes: 67,
    status: 'Active Discussion'
  }
];

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'On Track': return 'bg-success text-success-foreground';
    case 'High Usage': return 'bg-warning text-warning-foreground';
    case 'Delayed': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const Budget = () => {
  const [satisfactionRating, setSatisfactionRating] = useState<number | null>(null);
  const [hasSubmittedSurvey, setHasSubmittedSurvey] = useState(false);
  
  const totalBudget = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  const satisfactionEmojis = [
    { value: 1, emoji: '😢', label: 'Very Sad' },
    { value: 2, emoji: '😞', label: 'Sad' },
    { value: 3, emoji: '😐', label: 'Neutral' },
    { value: 4, emoji: '😊', label: 'Happy' },
    { value: 5, emoji: '😍', label: 'Very Happy' }
  ];

  const handleSurveySubmit = () => {
    if (satisfactionRating) {
      setHasSubmittedSurvey(true);
      // Here you would typically send the rating to your backend
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Overall Budget Summary */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-primary" />
            Ward Budget Overview 2024-25
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Allocated</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Utilization</span>
              <span className="font-medium">{overallPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-civic-accent h-3 rounded-full transition-all duration-300"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Satisfaction Survey */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="text-center">
            How satisfied are you with budget utilization?
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!hasSubmittedSurvey ? (
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                {satisfactionEmojis.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSatisfactionRating(item.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                      satisfactionRating === item.value 
                        ? 'bg-primary/20 scale-110 border-2 border-primary' 
                        : 'bg-accent/30 hover:bg-accent/50'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              
              {satisfactionRating && (
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    You selected: {satisfactionEmojis.find(e => e.value === satisfactionRating)?.label}
                  </p>
                  <Button 
                    onClick={handleSurveySubmit}
                    className="bg-gradient-to-r from-primary to-civic-accent"
                  >
                    Submit Feedback
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="text-4xl">
                {satisfactionEmojis.find(e => e.value === satisfactionRating)?.emoji}
              </div>
              <p className="text-sm font-medium">Thank you for your feedback!</p>
              <p className="text-xs text-muted-foreground">
                Your opinion helps us improve budget allocation and utilization.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category-wise Budget */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Department-wise Allocation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgetData.map((item, index) => (
            <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-accent/20 to-secondary/20 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{item.category}</h4>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Allocated</p>
                  <p className="font-medium">{formatCurrency(item.allocated)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Spent</p>
                  <p className="font-medium">{formatCurrency(item.spent)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Projects</p>
                  <p className="font-medium">{item.projects}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Utilization</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.percentage > 80 ? 'bg-warning' : 
                      item.percentage > 60 ? 'bg-primary' : 'bg-success'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Budget Feedback Section */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Budget Proposals & Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="p-4 rounded-lg bg-accent/30 border border-border">
              <h4 className="font-medium text-sm mb-1">{proposal.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{proposal.description}</p>
              
              <div className="flex items-center gap-4 mb-3">
                <div className={`flex items-center gap-1 font-medium ${
                  proposal.amount > 0 ? 'text-destructive' : 'text-success'
                }`}>
                  {proposal.amount > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {proposal.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(proposal.amount))}
                </div>
                <Badge variant="outline">{proposal.status}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-success hover:text-success/80 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    {proposal.supportVotes}
                  </button>
                  <button className="flex items-center gap-1 text-destructive hover:text-destructive/80 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    {proposal.opposeVotes}
                  </button>
                </div>
                <Button size="sm" variant="outline">
                  Provide Feedback
                </Button>
              </div>
            </div>
          ))}

          <Button className="w-full mt-4 bg-gradient-to-r from-primary to-civic-accent">
            Submit Budget Suggestion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Globe } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onNotificationClick: () => void;
  onInterestClick: () => void;
  onLanguageClick: () => void;
  onProfileClick: () => void;
}

export const Header = ({ 
  onNotificationClick, 
  onInterestClick, 
  onLanguageClick, 
  onProfileClick 
}: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-primary to-civic-accent text-primary-foreground px-4 py-3 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          Citizen Engagement Services
        </h1>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onInterestClick}
            className="text-primary-foreground hover:bg-white/20 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLanguageClick}
            className="text-primary-foreground hover:bg-white/20 transition-colors"
          >
            <Globe className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNotificationClick}
            className="text-primary-foreground hover:bg-white/20 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full border border-primary-foreground"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onProfileClick}
            className="text-primary-foreground hover:bg-white/20 transition-colors"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
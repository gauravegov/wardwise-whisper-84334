import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { HomePage } from '@/components/tabs/HomePage';
import { Townhall } from '@/components/tabs/Townhall';
import { Proposals } from '@/components/tabs/Proposals';
import { Budget } from '@/components/tabs/Budget';
import { Leaders } from '@/components/tabs/Leaders';
import { YourCity } from '@/components/tabs/YourCity';
import { InterestModal } from '@/components/modals/InterestModal';
import { NotificationModal } from '@/components/modals/NotificationModal';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const languages = ['English', 'Hindi', 'Punjabi', 'Urdu'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'townhall':
        return <Townhall />;
      case 'proposals':
        return <Proposals />;
      case 'budget':
        return <Budget />;
      case 'leaders':
        return <Leaders />;
      case 'city':
        return <YourCity />;
      default:
        return <HomePage />;
    }
  };

  const handleLanguageChange = () => {
    const currentIndex = languages.indexOf(selectedLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setSelectedLanguage(languages[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onNotificationClick={() => setIsNotificationModalOpen(true)}
        onInterestClick={() => setIsInterestModalOpen(true)}
        onLanguageClick={handleLanguageChange}
        onProfileClick={() => {/* Handle profile click */}}
      />

      {/* Main Content */}
      <main className="px-4 py-6">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Modals */}
      <InterestModal
        isOpen={isInterestModalOpen}
        onClose={() => setIsInterestModalOpen(false)}
      />
      
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />

      {/* Language Indicator */}
      {selectedLanguage !== 'English' && (
        <div className="fixed top-20 right-4 z-30 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          {selectedLanguage}
        </div>
      )}
    </div>
  );
};

export default Index;

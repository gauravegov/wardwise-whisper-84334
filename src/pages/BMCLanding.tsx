import { Button } from "@/components/ui/button";
import { Search, Users, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bmcLogo from "@/assets/bmc-official-logo.png";

export const BMCLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        {/* Top Bar with Social Icons */}
        <div className="bg-blue-100 py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-amber-600">
              <span>Help</span>
              <span>Content</span>
              <span>मराठी</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-600 text-sm font-medium">The Brihanmumbai Municipal Corporation (BMC)</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <img 
                src={bmcLogo} 
                alt="Brihanmumbai Municipal Corporation Logo" 
                className="w-20 h-20 object-contain"
              />
              <div className="text-sm text-gray-700 font-medium">
                बृहन्मुंबई महानगरपालिका<br />
                <span className="text-xs text-blue-600">Brihanmumbai Municipal Corporation</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-blue-600">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 text-amber-300 text-xs sm:text-sm font-medium">
                <span className="hover:text-yellow-100 cursor-pointer">About BMC</span>
                <span className="hover:text-yellow-100 cursor-pointer hidden sm:inline">Maps & Reports</span>
                <span className="hover:text-yellow-100 cursor-pointer">For Citizens</span>
                <span className="hover:text-yellow-100 cursor-pointer hidden md:inline">For Businesses</span>
                <span className="hover:text-yellow-100 cursor-pointer hidden lg:inline">Services</span>
              </div>
              <Button
                onClick={() => navigate('/platform')}
                size="sm"
                className="bg-amber-400 text-blue-800 hover:bg-amber-300 font-semibold px-2 sm:px-4 py-2 text-xs sm:text-sm shadow-md border border-amber-500 flex-shrink-0"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Citizen Engagement</span>
                <span className="sm:hidden">Engage</span>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 min-h-[500px] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 w-1/3 h-full">
            <div className="w-full h-full bg-gradient-to-l from-black/30 to-transparent"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 flex items-center justify-between">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={bmcLogo} 
                alt="Brihanmumbai Municipal Corporation Logo" 
                className="w-16 h-16 object-contain bg-white/10 rounded-full p-2"
              />
              <span className="text-lg text-white">बृहन्मुंबई महानगरपालिका</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              मुंबईचा सांस्कृतिक<br />
              मानविनू श्रीगणेशोत्सव
            </h1>
            
            <p className="text-xl mb-6 opacity-90">
              सार्वजनिक श्रीगणेशोत्सवाला महाराष्ट्र शासनाकडून<br />
              'महाराष्ट्र राज्य उत्सव' दर्जा...
            </p>
          </div>

          {/* Right Content - Maharashtra State Festival Logo */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              {/* Main Badge */}
              <div className="w-64 h-64 bg-gradient-to-br from-amber-300 to-yellow-400 transform rotate-12 rounded-lg flex items-center justify-center shadow-2xl border-4 border-white">
                <div className="text-center text-blue-800">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="font-bold text-2xl">महाराष्ट्राचा</div>
                  <div className="font-bold text-xl">राज्य उत्सव</div>
                </div>
              </div>
              
              {/* Flag */}
              <div className="absolute -top-8 -right-4 w-16 h-12 bg-gradient-to-r from-blue-600 to-blue-500 transform rotate-12 rounded-sm shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="absolute bottom-0 left-0 right-0 bg-blue-800/80 text-white py-3 overflow-hidden">
          <div className="flex items-center space-x-8 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-sm">मूर्तिचे विसर्जन कृपया तळावामध्ये करा.</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-sm">तळावाची यादी पाहण्यासाठी 'क्यूआर कोड' स्कॅन करा.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">NOTIFICATIONS & UPDATES</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Latest Announcements</h3>
              <p className="text-gray-600 text-sm">Stay updated with the latest BMC announcements and public notices.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Service Updates</h3>
              <p className="text-gray-600 text-sm">Get real-time updates on municipal services and maintenance schedules.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Emergency Alerts</h3>
              <p className="text-gray-600 text-sm">Receive important alerts about weather conditions and emergency situations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Brihanmumbai Municipal Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
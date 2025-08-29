import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Logo from "@/assets/mapple_logo.svg";
import {
  MapPin,
  Phone,
  Share2,
  AlertCircle,
  Navigation,
  Clock,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Loader component with a neutral background
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
      {/* Style tag for the image animation */}
      <style>
        {`
                @keyframes zoomInOut {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                }
                .animate-zoomInOut {
                    animation: zoomInOut 2.5s ease-in-out infinite;
                }
            `}
      </style>
      <img
        src={Logo}
        alt="Ambulance Loader"
        className="w-40 h-40 animate-zoomInOut"
      />
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Effect for the loader timeout
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Loader will be visible for 3 seconds

    return () => clearTimeout(loadingTimer);
  }, []);

  // Effect for the clock
  useEffect(() => {
    if (!isLoading) {
      const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(clockTimer);
    }
  }, [isLoading]);

  const emergencyActions = [
    {
      icon: "🚑",
      title: "Ambulance",
      subtitle: "Medical Emergency",
      action: () => (window.location.href = "tel:911"),
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: "🚓",
      title: "Police",
      subtitle: "Safety Emergency",
      action: () => (window.location.href = "tel:911"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🚒",
      title: "Fire Dept",
      subtitle: "Fire Emergency",
      action: () => (window.location.href = "tel:911"),
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const quickActions = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Share Location",
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: "Emergency Location",
            text: "I need help at my current location",
            url: window.location.href,
          });
        }
      },
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Medical Info",
      action: () =>
        alert(
          "Medical information feature - would store emergency contacts and medical conditions"
        ),
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Safe Check-in",
      action: () =>
        alert(
          "Safe check-in feature - would notify emergency contacts you're safe"
        ),
    },
  ];

  // Conditionally render the loader
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen hero-gradient animate-fadeIn">
      {/* Style for the fade-in animation */}
      <style>{`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fadeIn {
                animation: fadeIn 1s ease-in-out;
            }
        `}</style>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20">
          <div className="text-center text-white mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mr-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl sm:text-5xl font-bold">
                  Emergency Response
                </h1>
                <p className="text-xl sm:text-2xl font-light">Optimizer</p>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get instant access to emergency services with optimized routing
              and live traffic updates
            </p>

            <div className="flex items-center justify-center space-x-4 text-sm text-white/80 mb-8">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Location Ready</span>
              </div>
            </div>

            <Button
              size="lg"
              className="btn-emergency text-xl px-8 py-6 glow-emergency animate-emergency-pulse"
              onClick={() => navigate("/map")}
            >
              <AlertCircle className="h-6 w-6 mr-3" />
              Need Help Now
            </Button>
          </div>

          {/* Emergency Actions Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {emergencyActions.map((action, index) => (
              <Card
                key={index}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={action.action}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {action.subtitle}
                  </p>
                  <Button size="sm" className="btn-emergency w-full">
                    Call Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="relative glass-card p-8 rounded-2xl shadow-lg group overflow-hidden">
            {/* cursor glow effect */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 blur-2xl" />

            <h3 className="text-2xl font-semibold text-secondary mb-8 text-center tracking-wide">
              Quick Actions
            </h3>

            <div className="grid sm:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-6 px-4 flex flex-col items-center justify-center rounded-xl border border-primary/30 bg-white/5 hover:bg-primary/15 hover:scale-105 transition-transform duration-300 shadow-sm"
                  onClick={action.action}
                >
                  <div className="text-primary text-2xl">{action.icon}</div>
                  <span className="text-sm font-medium text-gray-700">
                    {action.title}
                  </span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, fast, life-saving technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Location Detection
              </h3>
              <p className="text-muted-foreground">
                Automatically detects your current location for fastest
                emergency response
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Smart Routing
              </h3>
              <p className="text-muted-foreground">
                Finds nearest services with optimized routes using live traffic
                data
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Instant Connect
              </h3>
              <p className="text-muted-foreground">
                One-tap calling and location sharing with emergency services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-secondary text-white p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="destructive" className="animate-pulse">
              EMERGENCY READY
            </Badge>
            <span className="text-sm">Services available 24/7</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/map")}
          >
            View Services
          </Button>
        </div>
      </div>

      {/* Emergency FAB */}
      <div className="fab animate-glow">
        <Phone className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Index;

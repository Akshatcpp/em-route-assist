import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Share2, 
  AlertTriangle,
  Route as RouteIcon,
  Car,
  Zap
} from "lucide-react";

const Route = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");
  const [loading, setLoading] = useState(true);
  const [routeData, setRouteData] = useState<any>(null);

  // Mock route data
  const mockRouteData = {
    "hospital-1": {
      destination: "City General Hospital",
      address: "123 Medical Center Dr",
      phone: "+1-555-0123",
      distance: "0.8 km",
      duration: "4 min",
      trafficStatus: "moderate",
      eta: "4:23 PM",
      route: [
        { step: "Head north on Main St", distance: "0.2 km", duration: "1 min" },
        { step: "Turn right on Medical Center Dr", distance: "0.4 km", duration: "2 min" },
        { step: "Arrive at City General Hospital", distance: "0.2 km", duration: "1 min" }
      ],
      alternatives: [
        { name: "Via Highway 101", duration: "6 min", distance: "1.2 km", traffic: "heavy" },
        { name: "Via City Center", duration: "5 min", distance: "0.9 km", traffic: "light" }
      ]
    },
    "ambulance-1": {
      destination: "Rapid Response Unit 7",
      address: "Mobile Unit - En Route",
      phone: "+1-555-AMBU",
      distance: "0.5 km",
      duration: "2 min",
      trafficStatus: "light",
      eta: "4:19 PM",
      route: [
        { step: "Head east on Current St", distance: "0.3 km", duration: "1 min" },
        { step: "Turn left on Emergency Ave", distance: "0.2 km", duration: "1 min" }
      ],
      alternatives: []
    }
  };

  useEffect(() => {
    // Simulate route calculation
    setTimeout(() => {
      setRouteData(mockRouteData[serviceId as keyof typeof mockRouteData] || mockRouteData["hospital-1"]);
      setLoading(false);
    }, 1500);
  }, [serviceId]);

  const getTrafficColor = (status: string) => {
    switch (status) {
      case "light":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "heavy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleStartNavigation = () => {
    // This would integrate with mapping service
    alert("Navigation started! This would integrate with your preferred maps app.");
  };

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: "Emergency Route",
        text: `I'm heading to ${routeData?.destination}. ETA: ${routeData?.eta}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`Emergency: Heading to ${routeData?.destination}. ETA: ${routeData?.eta}`);
      alert("Location shared to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Calculating optimal route...</p>
          <p className="text-sm opacity-80 mt-2">Finding fastest path with live traffic</p>
        </div>
      </div>
    );
  }

  if (!routeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-secondary mb-2">Route Not Found</h2>
          <p className="text-muted-foreground mb-4">Unable to calculate route to selected service.</p>
          <Button onClick={() => navigate("/map")}>Back to Map</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/map")}
                className="text-secondary hover:text-primary"
              >
                ← Back to Map
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-secondary">Emergency Route</h1>
                <p className="text-sm text-muted-foreground">
                  <RouteIcon className="inline h-4 w-4 mr-1" />
                  Optimized with live traffic
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleShareLocation}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Location
              </Button>
              <Button 
                size="sm" 
                className="btn-emergency"
                onClick={() => window.location.href = `tel:${routeData.phone}`}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Route Visualization */}
          <Card className="h-[500px] glass-card">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary">Live Route Map</h3>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getTrafficColor(routeData.trafficStatus)}`}></div>
                  <span className="capitalize">{routeData.trafficStatus} Traffic</span>
                </Badge>
              </div>
              
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg">
                <div className="text-center">
                  <Navigation className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="text-lg font-semibold text-secondary">Interactive Route Map</p>
                  <p className="text-sm text-muted-foreground">Mappls routing integration ready</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold">ETA: {routeData.eta}</span>
                  </div>
                  <Button 
                    className="btn-emergency"
                    onClick={handleStartNavigation}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Start Navigation
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Route Details */}
          <div className="space-y-6">
            {/* Destination Info */}
            <Card className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl">
                  🏥
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-secondary">{routeData.destination}</h3>
                  <p className="text-muted-foreground">{routeData.address}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{routeData.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="font-medium">{routeData.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Turn-by-Turn Directions */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-secondary mb-4">Turn-by-Turn Directions</h3>
              <div className="space-y-3">
                {routeData.route.map((step: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-secondary">{step.step}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.distance} • {step.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alternative Routes */}
            {routeData.alternatives.length > 0 && (
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Alternative Routes</h3>
                <div className="space-y-3">
                  {routeData.alternatives.map((alt: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Car className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{alt.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {alt.distance} • {alt.duration}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getTrafficColor(alt.traffic)}`}></div>
                        <span>{alt.traffic}</span>
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Actions FAB */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <Button 
          size="lg" 
          className="fab bg-accent hover:bg-accent/90"
          onClick={handleShareLocation}
        >
          <Share2 className="h-6 w-6" />
        </Button>
        <Button 
          size="lg" 
          className="fab"
          onClick={() => window.location.href = `tel:${routeData.phone}`}
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Route;
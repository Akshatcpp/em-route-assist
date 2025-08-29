import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Phone, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Mock nearby services data
  const nearbyServices = [
    {
      id: "hospital-1",
      type: "hospital",
      name: "City General Hospital",
      distance: "0.8 km",
      eta: "4 min",
      address: "123 Medical Center Dr",
      phone: "+1-555-0123",
      available: true
    },
    {
      id: "hospital-2", 
      type: "hospital",
      name: "Emergency Medical Center",
      distance: "1.2 km",
      eta: "6 min",
      address: "456 Healthcare Ave",
      phone: "+1-555-0456",
      available: true
    },
    {
      id: "ambulance-1",
      type: "ambulance",
      name: "Rapid Response Unit 7",
      distance: "0.5 km",
      eta: "2 min",
      address: "Mobile Unit",
      phone: "+1-555-AMBU",
      available: true
    },
    {
      id: "police-1",
      type: "police",
      name: "Police Station 14",
      distance: "1.5 km", 
      eta: "8 min",
      address: "789 Safety Blvd",
      phone: "+1-555-POLICE",
      available: true
    }
  ];

  useEffect(() => {
    // Simulate location detection
    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLoading(false);
          },
          (error) => {
            console.error("Error getting location:", error);
            // Default to demo location
            setUserLocation({ lat: 40.7128, lng: -74.0060 });
            setLoading(false);
          }
        );
      } else {
        // Default to demo location
        setUserLocation({ lat: 40.7128, lng: -74.0060 });
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return "🏥";
      case "ambulance":
        return "🚑";
      case "police":
        return "🚓";
      case "fire":
        return "🚒";
      default:
        return "📍";
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    navigate(`/route?service=${serviceId}`);
  };

  const handleEmergencyCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Detecting your location...</p>
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
                onClick={() => navigate("/")}
                className="text-secondary hover:text-primary"
              >
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-secondary">Emergency Services</h1>
                <p className="text-sm text-muted-foreground">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location detected
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="btn-emergency"
              onClick={() => window.location.href = "tel:911"}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 911
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <Card className="h-[500px] glass-card flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">Interactive Map</h3>
              <p className="text-muted-foreground mb-4">
                Map integration ready for Mappls API
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Navigation className="h-4 w-4" />
                <span>Your location: {userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)}</span>
              </div>
            </div>
          </Card>

          {/* Services List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary">Nearby Emergency Services</h2>
              <Button variant="outline" size="sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-3">
              {nearbyServices.map((service) => (
                <Card 
                  key={service.id} 
                  className="p-4 glass-card hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-primary"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getServiceIcon(service.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.address}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-sm">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span>{service.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="h-3 w-3 text-accent" />
                            <span className="font-medium">{service.eta}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        size="sm" 
                        className="btn-emergency"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceSelect(service.id);
                        }}
                      >
                        Get Route
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmergencyCall(service.phone);
                        }}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency FAB */}
      <div className="fab animate-float">
        <Phone className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Map;
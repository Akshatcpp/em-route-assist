import { Button } from "@/components/ui/button";
import { Phone, MapPin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  variant?: "call" | "location" | "share";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const EmergencyButton = ({ 
  variant = "call", 
  size = "md", 
  className,
  onClick,
  children 
}: EmergencyButtonProps) => {
  const getIcon = () => {
    switch (variant) {
      case "call":
        return <Phone className="h-5 w-5" />;
      case "location":
        return <MapPin className="h-5 w-5" />;
      case "share":
        return <Share2 className="h-5 w-5" />;
      default:
        return <Phone className="h-5 w-5" />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-10 w-10";
      case "md":
        return "h-12 w-12";
      case "lg":
        return "h-16 w-16";
      default:
        return "h-12 w-12";
    }
  };

  return (
    <Button
      className={cn(
        "btn-emergency rounded-full transition-all duration-300",
        "hover:scale-110 active:scale-95",
        "shadow-2xl hover:shadow-3xl",
        getSizeClasses(),
        className
      )}
      onClick={onClick}
    >
      {children || getIcon()}
    </Button>
  );
};

export default EmergencyButton;
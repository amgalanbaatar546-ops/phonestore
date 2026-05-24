import { useLocation } from "wouter";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Phone } from "@workspace/api-client-react";
import { Button } from "./ui/button";

interface PhoneCardProps {
  phone: Phone;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const [, setLocation] = useLocation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setLocation(`/phone/${phone.id}`)}
      className="relative w-full h-[400px] rounded-xl bg-card border border-white/10 p-6 cursor-pointer group"
    >
      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ transform: "translateZ(-50px)" }}
      />
      
      <div className="flex flex-col h-full relative" style={{ transform: "translateZ(30px)" }}>
        <div className="flex-1 flex items-center justify-center p-4">
          <img 
            src={phone.imageUrl} 
            alt={phone.name} 
            className="max-h-[200px] object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-transform duration-500 group-hover:scale-110"
            style={{ transform: "translateZ(50px)" }}
          />
        </div>
        
        <div className="mt-4" style={{ transform: "translateZ(20px)" }}>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{phone.brand}</p>
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">{phone.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">₮{phone.price.toLocaleString()}</span>
            {phone.originalPrice && (
              <span className="text-sm line-through text-muted-foreground">₮{phone.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

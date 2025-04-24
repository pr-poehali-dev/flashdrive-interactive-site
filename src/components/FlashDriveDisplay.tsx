import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FlashDriveDisplayProps {
  onCodeSubmit: (code: string) => void;
}

const FlashDriveDisplay = ({ onCodeSubmit }: FlashDriveDisplayProps) => {
  const [code, setCode] = useState("");
  const [isLedActive, setIsLedActive] = useState(false);

  useEffect(() => {
    if (code.length > 0) {
      setIsLedActive(true);
    } else {
      setIsLedActive(false);
    }
  }, [code]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCodeSubmit(code);
    setCode("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Flash Drive SVG */}
      <div className="mb-6">
        <svg 
          viewBox="0 0 400 200" 
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Body */}
          <rect x="100" y="60" width="200" height="80" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" className="metal-texture" />
          
          {/* USB Connector */}
          <rect x="50" y="75" width="50" height="50" fill="#94a3b8" stroke="#64748b" strokeWidth="2" className="usb-connector" />
          
          {/* Cap */}
          <rect x="300" y="60" width="30" height="80" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
          
          {/* LED Light */}
          <circle 
            cx="280" 
            cy="100" 
            r="8" 
            fill={isLedActive ? "#f00" : "#3f0d0d"} 
            className={isLedActive ? "led-active" : ""} 
          />
          
          {/* Input Area */}
          <rect x="130" y="80" width="140" height="40" rx="4" fill="#0f172a" stroke="#1e40af" strokeWidth="1" className="input-area" />
          
          {/* Input Text Display */}
          <text 
            x="200" 
            y="106" 
            fontSize="20" 
            fill="#0ea5e9" 
            textAnchor="middle" 
            className="font-mono glow-text"
          >
            {code || "ENTER CODE"}
          </text>
        </svg>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Введите код"
          className="text-center font-mono text-lg bg-slate-800 border-slate-700 text-blue-400"
          maxLength={4}
        />
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Активировать
        </Button>
      </form>
    </div>
  );
};

export default FlashDriveDisplay;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FlashDriveDisplayProps {
  onCodeSubmit: (code: string) => void;
}

const FlashDriveDisplay = ({ onCodeSubmit }: FlashDriveDisplayProps) => {
  const [code, setCode] = useState("");

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
          <rect x="100" y="60" width="200" height="80" rx="8" fill="#333" />
          
          {/* USB Connector */}
          <rect x="50" y="75" width="50" height="50" fill="#888" />
          
          {/* Cap */}
          <rect x="300" y="60" width="30" height="80" rx="4" fill="#555" />
          
          {/* LED Light */}
          <circle cx="280" cy="100" r="8" fill="#f00" />
          
          {/* Input Area */}
          <rect x="130" y="80" width="140" height="40" rx="4" fill="#222" className="input-area" />
          
          {/* Input Text Display */}
          <text x="200" y="106" 
            fontSize="20" 
            fill="#0FA0CE" 
            textAnchor="middle" 
            className="font-mono"
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
          className="text-center font-mono text-lg"
          maxLength={4}
        />
        <Button type="submit" className="w-full">Активировать</Button>
      </form>
    </div>
  );
};

export default FlashDriveDisplay;

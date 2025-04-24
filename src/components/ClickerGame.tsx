
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Download } from "lucide-react";

interface ClickerGameProps {
  onClose: () => void;
}

const ClickerGame = ({ onClose }: ClickerGameProps) => {
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClickerCount, setAutoClickerCount] = useState(0);

  const autoClickerCost = 50 * Math.pow(1.15, autoClickerCount);
  const multiplierCost = 100 * Math.pow(1.5, multiplier - 1);

  const handleClick = () => {
    setScore(prev => prev + multiplier);
  };

  const buyAutoClicker = () => {
    if (score >= autoClickerCost) {
      setScore(prev => prev - autoClickerCost);
      setAutoClickerCount(prev => prev + 1);
    }
  };

  const buyMultiplier = () => {
    if (score >= multiplierCost) {
      setScore(prev => prev - multiplierCost);
      setMultiplier(prev => prev + 1);
    }
  };

  // Auto-clicker effect
  useState(() => {
    const interval = setInterval(() => {
      if (autoClickerCount > 0) {
        setScore(prev => prev + autoClickerCount * multiplier);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  });

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">Кликер</h3>
          <p className="text-gray-500 text-sm">Код 4</p>
          <div className="text-3xl font-bold mt-2">{Math.floor(score)}</div>
        </div>
        
        <div className="grid gap-4">
          <Button 
            size="lg"
            className="h-24 text-xl"
            onClick={handleClick}
          >
            <Plus size={24} className="mr-2" />
            Клик (+{multiplier})
          </Button>
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button
              variant="outline"
              onClick={buyAutoClicker}
              disabled={score < autoClickerCost}
              className="flex flex-col items-center h-24"
            >
              <Download size={20} />
              <span className="text-sm mt-1">Авто-кликер</span>
              <span className="text-xs mt-1">Стоимость: {Math.floor(autoClickerCost)}</span>
              <span className="text-xs">У вас: {autoClickerCount}</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={buyMultiplier}
              disabled={score < multiplierCost}
              className="flex flex-col items-center h-24"
            >
              <Plus size={20} />
              <span className="text-sm mt-1">Множитель</span>
              <span className="text-xs mt-1">Стоимость: {Math.floor(multiplierCost)}</span>
              <span className="text-xs">Уровень: {multiplier}x</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickerGame;

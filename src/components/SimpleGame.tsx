
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SimpleGameProps {
  onClose: () => void;
}

const SimpleGame = ({ onClose }: SimpleGameProps) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = () => {
    setScore(score + 1);
    // Random position within container bounds
    setPosition({
      x: Math.random() * 90,
      y: Math.random() * 85,
    });
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setPosition({ x: 50, y: 50 });
  };

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

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
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">Поймай точку</h3>
          <p className="text-gray-500 text-sm">Код 5</p>
          <div className="flex justify-between mt-2">
            <div>Счёт: {score}</div>
            <div>Время: {timeLeft}с</div>
          </div>
        </div>
        
        <div 
          className="relative bg-gray-100 h-64 rounded-lg overflow-hidden mb-4"
          style={{ touchAction: "none" }}
        >
          {!gameOver ? (
            <button
              className="absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white"
              style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={handleClick}
            >
              +1
            </button>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
              <div className="text-xl font-bold mb-2">Игра окончена!</div>
              <div className="mb-4">Итоговый счёт: {score}</div>
              <Button onClick={resetGame}>Играть снова</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleGame;

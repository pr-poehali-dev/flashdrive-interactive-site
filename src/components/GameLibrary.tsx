import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BaseGameProps {
  onClose: () => void;
  code: string;
  title: string;
}

// Arcade Game Component
export const ArcadeGame = ({ onClose, code, title }: BaseGameProps) => {
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<{id: number, x: number, y: number}[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Generate initial targets
    generateTargets();
    
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 3; i++) {
      newTargets.push({
        id: Math.random(),
        x: Math.random() * 90,
        y: Math.random() * 80
      });
    }
    setTargets(newTargets);
  };

  const handleTargetClick = (id: number) => {
    setScore(prev => prev + 10);
    setTargets(prev => {
      const filtered = prev.filter(t => t.id !== id);
      if (filtered.length === 0) {
        generateTargets();
      }
      return filtered;
    });
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setTimeLeft(30);
    generateTargets();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-800 p-6 rounded-lg border border-slate-700">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-blue-400">{title}</h3>
          <p className="text-slate-500 text-sm">Код {code}</p>
          <div className="flex justify-between mt-2 text-slate-300">
            <div>Счёт: {score}</div>
            <div>Время: {timeLeft}с</div>
          </div>
        </div>
        
        <div className="relative bg-slate-900 h-64 rounded-lg overflow-hidden mb-4">
          {!gameOver ? (
            <>
              {targets.map(target => (
                <button
                  key={target.id}
                  className="absolute w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white"
                  style={{ 
                    left: `${target.x}%`, 
                    top: `${target.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleTargetClick(target.id)}
                >
                  +10
                </button>
              ))}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
              <div className="text-xl font-bold mb-2 text-blue-400">Игра окончена!</div>
              <div className="mb-4 text-slate-300">Итоговый счёт: {score}</div>
              <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">Играть снова</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Puzzle Game Component
export const PuzzleGame = ({ onClose, code, title }: BaseGameProps) => {
  const [grid, setGrid] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  
  // Initialize the puzzle
  useEffect(() => {
    resetPuzzle();
  }, []);
  
  const resetPuzzle = () => {
    // Create solved grid first
    const newGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    
    // Shuffle the grid (make sure it's solvable)
    let shuffled = [...newGrid];
    for (let i = 0; i < 100; i++) {
      const empty = shuffled.indexOf(0);
      const possibleMoves = [];
      
      // Check possible moves (up, down, left, right)
      if (empty >= 3) possibleMoves.push(empty - 3); // up
      if (empty < 6) possibleMoves.push(empty + 3); // down
      if (empty % 3 !== 0) possibleMoves.push(empty - 1); // left
      if (empty % 3 !== 2) possibleMoves.push(empty + 1); // right
      
      // Select random move
      const newEmpty = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      
      // Swap
      [shuffled[empty], shuffled[newEmpty]] = [shuffled[newEmpty], shuffled[empty]];
    }
    
    setGrid(shuffled);
    setEmptyIndex(shuffled.indexOf(0));
    setMoves(0);
    setSolved(false);
  };
  
  const handleTileClick = (index: number) => {
    if (solved) return;
    
    // Check if move is valid
    const isValid = (
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / 3) === Math.floor(emptyIndex / 3)) || // same row
      (Math.abs(index - emptyIndex) === 3) // same column
    );
    
    if (isValid) {
      // Swap the tile with empty space
      const newGrid = [...grid];
      [newGrid[index], newGrid[emptyIndex]] = [newGrid[emptyIndex], newGrid[index]];
      setGrid(newGrid);
      setEmptyIndex(index);
      setMoves(moves + 1);
      
      // Check if puzzle is solved
      const solvedGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
      if (newGrid.every((val, idx) => val === solvedGrid[idx])) {
        setSolved(true);
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-800 p-6 rounded-lg border border-slate-700">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-blue-400">{title}</h3>
          <p className="text-slate-500 text-sm">Код {code}</p>
          <div className="mt-2 text-slate-300">
            Ходов: {moves}
          </div>
        </div>
        
        <div className="bg-slate-900 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
            {grid.map((num, index) => (
              <button
                key={index}
                className={`${num === 0 ? 'invisible' : 'bg-blue-600 hover:bg-blue-700'} rounded-md flex items-center justify-center text-white text-2xl font-bold`}
                onClick={() => handleTileClick(index)}
              >
                {num !== 0 && num}
              </button>
            ))}
          </div>
        </div>
        
        {solved && (
          <div className="text-center p-3 bg-blue-900/40 rounded-lg mb-4">
            <div className="text-lg font-bold text-blue-400">Головоломка решена!</div>
            <div className="text-slate-300">Количество ходов: {moves}</div>
          </div>
        )}
        
        <Button 
          onClick={resetPuzzle} 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Перемешать
        </Button>
      </div>
    </div>
  );
};

// Horror Game Component
export const HorrorGame = ({ onClose, code, title }: BaseGameProps) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'jumpscare' | 'ending'>('intro');
  const [darkness, setDarkness] = useState(60);
  const [batteryLife, setBatteryLife] = useState(100);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [monsterDistance, setMonsterDistance] = useState(100);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (gameState === 'playing') {
      interval = window.setInterval(() => {
        // Drain battery if flashlight is on
        if (flashlightOn) {
          setBatteryLife(prev => Math.max(0, prev - 2));
          if (batteryLife <= 0) {
            setFlashlightOn(false);
          }
        }
        
        // Monster approaches randomly
        const approaching = Math.random() < 0.3;
        if (approaching) {
          setMonsterDistance(prev => {
            const newDistance = prev - (flashlightOn ? 1 : 3);
            if (newDistance <= 0) {
              setGameState('jumpscare');
              return 0;
            }
            return newDistance;
          });
        }
      }, 1000);
    }
    
    // Jumpscare timeout
    if (gameState === 'jumpscare') {
      setTimeout(() => {
        setGameState('ending');
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, flashlightOn, batteryLife]);
  
  const startGame = () => {
    setGameState('playing');
    setDarkness(60);
    setBatteryLife(100);
    setFlashlightOn(false);
    setMonsterDistance(100);
  };
  
  const toggleFlashlight = () => {
    if (batteryLife > 0) {
      setFlashlightOn(!flashlightOn);
      setDarkness(flashlightOn ? 60 : 30);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 p-6 rounded-lg border border-slate-800">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-700 z-10"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-red-500">{title}</h3>
          <p className="text-slate-500 text-sm">Код {code}</p>
        </div>
        
        {gameState === 'intro' && (
          <div className="text-center space-y-4">
            <p className="text-slate-300">Вы находитесь в заброшенном доме. Темно и страшно. У вас есть только фонарик с ограниченным зарядом.</p>
            <p className="text-red-400">Что-то преследует вас в темноте...</p>
            <Button 
              onClick={startGame} 
              className="mt-4 w-full bg-red-900 hover:bg-red-800 text-white"
            >
              Начать
            </Button>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div>
            <div 
              className="relative h-64 bg-slate-950 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
              style={{ filter: `brightness(${flashlightOn ? 0.7 : 0.4})` }}
            >
              {/* Dark overlay */}
              <div 
                className="absolute inset-0 bg-black pointer-events-none" 
                style={{ opacity: darkness / 100 }}
              />
              
              {/* Monster indicator */}
              <div className="text-red-500 opacity-50 absolute bottom-2 right-2 text-xs">
                {monsterDistance > 70 ? "Тишина..." : 
                 monsterDistance > 40 ? "Слышны шаги..." : 
                 monsterDistance > 20 ? "Оно приближается!" : 
                 "ОНО РЯДОМ!"}
              </div>
              
              {/* Dark hallway background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-700 text-2xl font-bold">
                  {flashlightOn ? "●●●" : "●●●●●●"}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <div>Заряд: {batteryLife}%</div>
              <div className="text-red-400">Опасность: {100 - monsterDistance}%</div>
            </div>
            
            <Button 
              onClick={toggleFlashlight} 
              className={`w-full ${flashlightOn ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-slate-700 hover:bg-slate-600'}`}
              disabled={batteryLife <= 0}
            >
              {flashlightOn ? "Выключить фонарик" : "Включить фонарик"}
            </Button>
          </div>
        )}
        
        {gameState === 'jumpscare' && (
          <div className="text-center">
            <div className="h-64 bg-red-900 rounded-lg flex items-center justify-center animate-pulse mb-4">
              <div className="text-6xl">👹</div>
            </div>
            <p className="text-red-500 text-2xl font-bold">ОНО НАШЛО ВАС!</p>
          </div>
        )}
        
        {gameState === 'ending' && (
          <div className="text-center space-y-4">
            <p className="text-red-500 text-xl font-bold">Вы не выжили</p>
            <p className="text-slate-400">Существо из темноты настигло вас...</p>
            <Button 
              onClick={startGame} 
              className="mt-4 w-full bg-red-900 hover:bg-red-800 text-white"
            >
              Попробовать снова
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// 3D Effect Game
export const Effect3D = ({ onClose, code, title }: BaseGameProps) => {
  const [rotation, setRotation] = useState({ x: 15, y: 15 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to -20 to 20 range
    const rotX = ((y / rect.height) * 40) - 20;
    const rotY = ((x / rect.width) * 40) - 20;
    
    setRotation({ x: rotX, y: rotY });
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-800 p-6 rounded-lg border border-slate-700">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
          <p className="text-slate-500 text-sm">Код {code}</p>
          <p className="text-slate-400 text-sm mt-1">Двигайте мышью для 3D эффекта</p>
        </div>
        
        <div 
          className="h-64 bg-slate-900 rounded-lg mb-4 perspective-1000 relative overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setRotation({ x: 15, y: 15 })}
        >
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
            style={{ 
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="relative w-40 h-40">
              {/* Cube faces */}
              <div className="absolute inset-0 bg-blue-500/80 transform translate-z-20 flex items-center justify-center text-white font-bold">
                Front
              </div>
              <div className="absolute inset-0 bg-red-500/80 transform rotateY(180deg) translate-z-20 flex items-center justify-center text-white font-bold">
                Back
              </div>
              <div className="absolute inset-0 bg-green-500/80 transform rotateY(90deg) translate-z-20 flex items-center justify-center text-white font-bold">
                Right
              </div>
              <div className="absolute inset-0 bg-yellow-500/80 transform rotateY(-90deg) translate-z-20 flex items-center justify-center text-white font-bold">
                Left
              </div>
              <div className="absolute inset-0 bg-purple-500/80 transform rotateX(90deg) translate-z-20 flex items-center justify-center text-white font-bold">
                Top
              </div>
              <div className="absolute inset-0 bg-pink-500/80 transform rotateX(-90deg) translate-z-20 flex items-center justify-center text-white font-bold">
                Bottom
              </div>
            </div>
          </div>
          
          {/* Gradients for depth effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
        </div>
        
        <p className="text-slate-300 text-sm">
          Это интерактивный 3D куб с эффектом параллакса. Куб меняет ориентацию в зависимости от положения курсора.
        </p>
      </div>
    </div>
  );
};

// Secret Decoder Game
export const SecretDecoder = ({ onClose, code, title }: BaseGameProps) => {
  const [message, setMessage] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [key, setKey] = useState(3); // Caesar cipher shift
  
  const handleEncode = () => {
    if (!message) return;
    
    const result = message.split('').map(char => {
      // Only encode letters
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        let shiftedCode;
        
        if (/[A-Z]/.test(char)) {
          // For uppercase letters
          shiftedCode = ((code - 65 + key) % 26) + 65;
        } else {
          // For lowercase letters
          shiftedCode = ((code - 97 + key) % 26) + 97;
        }
        
        return String.fromCharCode(shiftedCode);
      }
      // Return non-letter characters unchanged
      return char;
    }).join('');
    
    setEncoded(result);
  };
  
  const handleDecode = () => {
    if (!encoded) return;
    
    const result = encoded.split('').map(char => {
      // Only decode letters
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        let shiftedCode;
        
        if (/[A-Z]/.test(char)) {
          // For uppercase letters (with proper modulo for negative numbers)
          shiftedCode = ((code - 65 - key + 26) % 26) + 65;
        } else {
          // For lowercase letters (with proper modulo for negative numbers)
          shiftedCode = ((code - 97 - key + 26) % 26) + 97;
        }
        
        return String.fromCharCode(shiftedCode);
      }
      // Return non-letter characters unchanged
      return char;
    }).join('');
    
    setDecoded(result);
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-800 p-6 rounded-lg border border-slate-700">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-amber-400">{title}</h3>
          <p className="text-slate-500 text-sm">Код {code}</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Ваше сообщение:</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 text-slate-200 border border-slate-700"
              rows={2}
              placeholder="Введите текст для шифрования"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="space-y-1 flex-1">
              <label className="text-xs text-slate-400">Ключ шифрования:</label>
              <input 
                type="number" 
                min="1" 
                max="25" 
                value={key}
                onChange={(e) => setKey(parseInt(e.target.value) || 1)}
                className="w-full p-2 rounded bg-slate-900 text-slate-200 border border-slate-700"
              />
            </div>
            <Button 
              onClick={handleEncode}
              className="bg-amber-600 hover:bg-amber-700 self-end"
              disabled={!message}
            >
              Зашифровать
            </Button>
          </div>
          
          {encoded && (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Зашифрованное сообщение:</label>
              <div className="p-2 rounded bg-slate-900 text-amber-400 border border-slate-700 font-mono break-all">
                {encoded}
              </div>
              <Button 
                onClick={handleDecode}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Расшифровать
              </Button>
            </div>
          )}
          
          {decoded && (
            <div className="space-y-1">
              <label className="text-sm text-slate-400">Расшифрованное сообщение:</label>
              <div className="p-2 rounded bg-slate-900 text-green-400 border border-slate-700 font-mono break-all">
                {decoded}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

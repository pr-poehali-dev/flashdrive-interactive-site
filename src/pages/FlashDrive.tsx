
import { useState } from "react";
import FlashDriveDisplay from "@/components/FlashDriveDisplay";
import VideoPlayer from "@/components/VideoPlayer";
import MusicPlayer from "@/components/MusicPlayer";
import MainMenu from "@/components/MainMenu";
import ClickerGame from "@/components/ClickerGame";
import SimpleGame from "@/components/SimpleGame";

const FlashDrive = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [lastCode, setLastCode] = useState<string>("");
  const [recentCodes, setRecentCodes] = useState<string[]>([]);

  const handleCodeSubmit = (code: string) => {
    setLastCode(code);
    
    // Add to recent codes list (max 5 items)
    setRecentCodes(prev => {
      const newCodes = [code, ...prev.filter(c => c !== code)].slice(0, 5);
      return newCodes;
    });

    // Handle different codes
    switch (code) {
      case "1":
        setActiveComponent("video");
        break;
      case "2":
        setActiveComponent("music");
        break;
      case "3":
        setActiveComponent("menu");
        break;
      case "4":
        setActiveComponent("clicker");
        break;
      case "5":
        setActiveComponent("game");
        break;
      default:
        // Random code from 6 to 2736
        const codeNum = parseInt(code);
        if (!isNaN(codeNum) && codeNum >= 6 && codeNum <= 2736) {
          // Show a message for unimplemented codes
          alert(`Код ${code} распознан! Функция будет добавлена позже.`);
        } else {
          alert(`Неизвестный код: ${code}`);
        }
    }
  };

  const handleCloseComponent = () => {
    setActiveComponent(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Интерактивная USB-флешка</h1>
        <p className="text-center text-gray-600 mb-8">
          Введите код от 1 до 2736 для доступа к различным функциям
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <FlashDriveDisplay onCodeSubmit={handleCodeSubmit} />
        </div>
        
        {lastCode && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Коды для тестирования:</h2>
            <ul className="grid grid-cols-5 gap-2">
              <li className="bg-gray-100 p-2 rounded text-center">1 - Видео</li>
              <li className="bg-gray-100 p-2 rounded text-center">2 - Музыка</li>
              <li className="bg-gray-100 p-2 rounded text-center">3 - Меню</li>
              <li className="bg-gray-100 p-2 rounded text-center">4 - Кликер</li>
              <li className="bg-gray-100 p-2 rounded text-center">5 - Игра</li>
            </ul>
            
            {recentCodes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-1">Недавние коды:</h3>
                <div className="flex flex-wrap gap-2">
                  {recentCodes.map((code, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Display the appropriate component based on code */}
      {activeComponent === "video" && <VideoPlayer onClose={handleCloseComponent} />}
      {activeComponent === "music" && <MusicPlayer onClose={handleCloseComponent} />}
      {activeComponent === "menu" && <MainMenu onClose={handleCloseComponent} />}
      {activeComponent === "clicker" && <ClickerGame onClose={handleCloseComponent} />}
      {activeComponent === "game" && <SimpleGame onClose={handleCloseComponent} />}
    </div>
  );
};

export default FlashDrive;

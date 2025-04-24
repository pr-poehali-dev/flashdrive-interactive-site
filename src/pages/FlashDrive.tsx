import { useState, useEffect } from "react";
import FlashDriveDisplay from "@/components/FlashDriveDisplay";
import VideoPlayer from "@/components/VideoPlayer";
import MusicPlayer from "@/components/MusicPlayer";
import MainMenu from "@/components/MainMenu";
import ClickerGame from "@/components/ClickerGame";
import SimpleGame from "@/components/SimpleGame";
import CodeInfoCard from "@/components/CodeInfoCard";
import { contentCategories, getCodeInfo } from "@/components/ContentLibrary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArcadeGame, 
  PuzzleGame, 
  HorrorGame, 
  Effect3D,
  SecretDecoder 
} from "@/components/GameLibrary";

const FlashDrive = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [lastCode, setLastCode] = useState<string>("");
  const [recentCodes, setRecentCodes] = useState<string[]>([]);
  const [codeInfoVisible, setCodeInfoVisible] = useState<boolean>(false);
  const [currentCodeInfo, setCurrentCodeInfo] = useState<any>(null);

  useEffect(() => {
    // Load recent codes from localStorage
    const savedCodes = localStorage.getItem("recentCodes");
    if (savedCodes) {
      setRecentCodes(JSON.parse(savedCodes));
    }
  }, []);

  useEffect(() => {
    // Save recent codes to localStorage
    if (recentCodes.length > 0) {
      localStorage.setItem("recentCodes", JSON.stringify(recentCodes));
    }
  }, [recentCodes]);

  const handleCodeSubmit = (code: string) => {
    setLastCode(code);
    
    // Add to recent codes list (max 5 items)
    setRecentCodes(prev => {
      const newCodes = [code, ...prev.filter(c => c !== code)].slice(0, 5);
      return newCodes;
    });

    // Get code info for display
    const codeInfo = getCodeInfo(code);
    setCurrentCodeInfo(codeInfo);
    setCodeInfoVisible(true);

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
        // Handle various types of content based on code info
        const codeNum = parseInt(code);
        if (!isNaN(codeNum) && codeNum >= 6 && codeNum <= 2736) {
          const codeInfo = getCodeInfo(code);
          
          if (codeInfo.category === 'games') {
            if (codeNum % 3 === 0) {
              setActiveComponent("arcadeGame");
            } else if (codeNum % 3 === 1) {
              setActiveComponent("puzzleGame");
            } else {
              setActiveComponent("game");
            }
          } else if (codeInfo.category === 'horror') {
            setActiveComponent("horrorGame");
          } else if (codeInfo.category === '3d') {
            setActiveComponent("3dEffect");
          } else if (codeInfo.category === 'secret') {
            setActiveComponent("secretDecoder");
          } else if (codeInfo.category === 'videos') {
            setActiveComponent("video");
          } else if (codeInfo.category === 'music') {
            setActiveComponent("music");
          } else {
            // Default fallback
            setActiveComponent("arcadeGame");
          }
          
          setCurrentCodeInfo(codeInfo);
        } else {
          alert(`Неизвестный код: ${code}`);
          setCodeInfoVisible(false);
        }
    }
  };

  const handleCloseComponent = () => {
    setActiveComponent(null);
  };
  
  return (
    <div className="min-h-screen gradient-dark py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-400">Интерактивная USB-флешка</h1>
        <p className="text-center text-slate-400 mb-8">
          Введите код от 1 до 2736 для доступа к различным функциям
        </p>
        
        <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-700 mb-6">
          <FlashDriveDisplay onCodeSubmit={handleCodeSubmit} />
        </div>
        
        {codeInfoVisible && currentCodeInfo && (
          <div className="mb-6 animate-fade-in">
            <CodeInfoCard 
              code={lastCode}
              title={currentCodeInfo.title} 
              description={currentCodeInfo.description}
              category={currentCodeInfo.category}
              type={currentCodeInfo.type}
            />
          </div>
        )}

        <Tabs defaultValue="codes" className="bg-slate-900 rounded-lg shadow-lg border border-slate-700 p-4">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="codes">Коды</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
          </TabsList>

          <TabsContent value="codes" className="mt-0">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-slate-300">Основные коды:</h2>
              <div className="grid grid-cols-5 gap-2">
                <div className="bg-slate-800 p-2 rounded text-center text-sm text-blue-300">1 - Видео</div>
                <div className="bg-slate-800 p-2 rounded text-center text-sm text-blue-300">2 - Музыка</div>
                <div className="bg-slate-800 p-2 rounded text-center text-sm text-blue-300">3 - Меню</div>
                <div className="bg-slate-800 p-2 rounded text-center text-sm text-blue-300">4 - Кликер</div>
                <div className="bg-slate-800 p-2 rounded text-center text-sm text-blue-300">5 - Игра</div>
              </div>
            </div>
            
            {recentCodes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-slate-400">Недавние коды:</h3>
                <div className="flex flex-wrap gap-2">
                  {recentCodes.map((code, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm"
                      className="text-xs bg-blue-900/30 border-blue-800 hover:bg-blue-800 text-blue-300"
                      onClick={() => handleCodeSubmit(code)}
                    >
                      {code}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categories" className="mt-0">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold mb-2 text-slate-300">Категории контента:</h2>
              <div className="grid gap-2">
                {contentCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="flex justify-between items-center bg-slate-800 p-2 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-slate-200">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        {category.startRange}-{category.endRange}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                        {category.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Всего доступно 2736 различных кодов с уникальным контентом
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Display the appropriate component based on code */}
      {activeComponent === "video" && <VideoPlayer onClose={handleCloseComponent} />}
      {activeComponent === "music" && <MusicPlayer onClose={handleCloseComponent} />}
      {activeComponent === "menu" && <MainMenu onClose={handleCloseComponent} />}
      {activeComponent === "clicker" && <ClickerGame onClose={handleCloseComponent} />}
      {activeComponent === "game" && <SimpleGame onClose={handleCloseComponent} />}
      {activeComponent === "arcadeGame" && (
        <ArcadeGame 
          onClose={handleCloseComponent} 
          code={lastCode} 
          title={currentCodeInfo?.title || "Аркадная игра"} 
        />
      )}
      {activeComponent === "puzzleGame" && (
        <PuzzleGame 
          onClose={handleCloseComponent} 
          code={lastCode} 
          title={currentCodeInfo?.title || "Головоломка"} 
        />
      )}
      {activeComponent === "horrorGame" && (
        <HorrorGame 
          onClose={handleCloseComponent} 
          code={lastCode} 
          title={currentCodeInfo?.title || "Хоррор"} 
        />
      )}
      {activeComponent === "3dEffect" && (
        <Effect3D 
          onClose={handleCloseComponent} 
          code={lastCode} 
          title={currentCodeInfo?.title || "3D Эффект"} 
        />
      )}
      {activeComponent === "secretDecoder" && (
        <SecretDecoder 
          onClose={handleCloseComponent} 
          code={lastCode} 
          title={currentCodeInfo?.title || "Секретный декодер"} 
        />
      )}
    </div>
  );
};

export default FlashDrive;

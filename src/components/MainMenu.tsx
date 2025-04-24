
import { Button } from "@/components/ui/button";
import { X, Home, Settings, Info, User, FileText } from "lucide-react";

interface MainMenuProps {
  onClose: () => void;
}

const MainMenu = ({ onClose }: MainMenuProps) => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Главная" },
    { icon: <User size={20} />, label: "Профиль" },
    { icon: <FileText size={20} />, label: "Документы" },
    { icon: <Info size={20} />, label: "О нас" },
    { icon: <Settings size={20} />, label: "Настройки" },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-xs bg-white p-6 rounded-lg">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">Главное меню</h3>
          <p className="text-gray-500 text-sm">Код 3</p>
        </div>
        
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="w-full justify-start"
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;

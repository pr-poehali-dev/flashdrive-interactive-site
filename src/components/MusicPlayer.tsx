
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface MusicPlayerProps {
  onClose: () => void;
}

const MusicPlayer = ({ onClose }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([50]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Ошибка воспроизведения:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md bg-gray-900 p-6 rounded-lg">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:bg-white/20"
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white">Музыкальный плеер</h3>
          <p className="text-gray-400">Демонстрационная музыка (код 2)</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" onClick={togglePlayPause} className="text-white">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            
            <div className="flex items-center">
              <Button variant="ghost" onClick={toggleMute} className="text-white">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              <div className="w-24">
                <Slider
                  value={volume}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                />
              </div>
            </div>
          </div>
        </div>
        
        <audio 
          ref={audioRef}
          loop
          className="hidden"
        >
          <source src="https://dl.dropbox.com/s/0c2a5sw5xsph5st/sample-3s.mp3" type="audio/mpeg" />
          Ваш браузер не поддерживает аудио элемент.
        </audio>
      </div>
    </div>
  );
};

export default MusicPlayer;

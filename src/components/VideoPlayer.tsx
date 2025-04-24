
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoPlayerProps {
  onClose: () => void;
}

const VideoPlayer = ({ onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => console.error("Ошибка воспроизведения:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:bg-white/20"
        >
          <X size={24} />
        </Button>
        
        <div className="bg-black rounded-lg overflow-hidden">
          <video 
            ref={videoRef} 
            onClick={togglePlayPause}
            className="w-full h-auto"
            controls
          >
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео тег.
          </video>
        </div>
        
        <div className="mt-4 text-center text-white">
          <p>Демонстрационное видео (код 1)</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

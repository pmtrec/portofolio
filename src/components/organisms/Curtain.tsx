import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

interface CurtainProps {
  onComplete?: () => void;
}

const Curtain: React.FC<CurtainProps> = ({ onComplete }) => {
  const [sound, setSound] = useState<Howl | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const howlSound = new Howl({
      src: ['https://www.soundjay.com/misc/sounds/door-open-1.wav'],
      volume: 1,
      onloaderror: () => {
        console.log('Audio failed to load');
      },
      onplayerror: () => {
        console.log('Audio play blocked by browser autoplay policy');
      }
    });

    setSound(howlSound);

    return () => {
      howlSound.unload();
    };
  }, []);

  const handleCurtainClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Play sound on user interaction when opening
      if (sound) {
        sound.play();
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex cursor-pointer px-[200px]" onClick={handleCurtainClick}>
        <motion.div
          className="w-1/2 h-full bg-cover bg-center shadow-2xl border-r-4 border-yellow-600"
          style={{ backgroundImage: 'url(/uploads/Image%20collée.png)' }}
          initial={{ x: 0 }}
          animate={isOpen ? { x: '-100%' } : { x: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        <motion.div
          className="w-1/2 h-full bg-cover bg-center shadow-2xl border-l-4 border-yellow-600"
          style={{ backgroundImage: 'url(/uploads/Image%20collée.png)' }}
          initial={{ x: 0 }}
          animate={isOpen ? { x: '100%' } : { x: 0 }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
          onAnimationComplete={isOpen ? onComplete : undefined}
        >
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 1, scale: 1 }}
          animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Portfolio Fermer</h1>
            <p className="text-xl text-yellow-300 mt-2">Cliquer pour l'ouvrir</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Curtain;
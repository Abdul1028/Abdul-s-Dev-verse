'use client';

import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

interface Phrase {
  text: string;
  icon?: React.ReactNode;
}

interface LoopingPhrasesProps {
  phrases: Phrase[];
  textClassName?: string;      // This class will be applied to the div wrapping the typewriter text
  iconSpanClassName?: string;  // ClassName for the span wrapping the icon
  containerClassName?: string; // ClassName for the main div holding icon + typewriter (for min-width, height etc.)
  typingDelay?: number;
  pauseDuration?: number;
  deleteDelay?: number;
}

const LoopingPhrases: React.FC<LoopingPhrasesProps> = ({
  phrases,
  textClassName = 'font-bold text-lg', // Default to prominent styling
  iconSpanClassName,
  containerClassName,
  typingDelay = 70,
  pauseDuration = 2000,
  deleteDelay = 40,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState<React.ReactNode | undefined>(
    phrases.length > 0 ? phrases[0].icon : undefined
  );

  useEffect(() => {
    if (phrases.length > 0) {
      setCurrentIcon(phrases[currentIndex % phrases.length].icon);
    }
  }, [currentIndex, phrases]);

  if (!phrases || phrases.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center ${containerClassName || ''}`}>
      {currentIcon && (
        <span className={`flex items-center ${iconSpanClassName || ''}`}>
          {currentIcon}
        </span>
      )}
      <div className={textClassName}>
        <Typewriter
          key={currentIndex} 
          options={{
            delay: typingDelay,
            deleteSpeed: deleteDelay,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(phrases[currentIndex % phrases.length].text)
              .pauseFor(pauseDuration)
              .deleteAll()
              .callFunction(() => {
                setCurrentIndex((prevIndex) => prevIndex + 1);
              })
              .start();
          }}
        />
      </div>
    </div>
  );
};

export default LoopingPhrases; 
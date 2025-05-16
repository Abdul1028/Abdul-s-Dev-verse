'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

interface TypewriterTitleProps {
  text: string;
  className?: string;
}

const TypewriterTitle: React.FC<TypewriterTitleProps> = ({ text, className }) => {
  return (
    <div className={className}>
      <Typewriter
        options={{
          strings: [text],
          autoStart: true,
          loop: false, // Set to true if you want it to loop
          delay: 75, // Speed of typing
          deleteSpeed: Infinity, // Don't delete the text once typed
          cursorClassName: 'text-inherit', // Make cursor inherit text color
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .callFunction(() => {
              // Hide cursor after typing is complete by finding and hiding it
              const cursorElement = document.querySelector('.Typewriter__cursor');
              if (cursorElement && cursorElement instanceof HTMLElement) {
                cursorElement.style.display = 'none';
              }
            })
            .start();
        }}
      />
    </div>
  );
};

export default TypewriterTitle; 
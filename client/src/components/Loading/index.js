import React from 'react';
import { LoadingContainer, LoadingText } from '../../themes/themeLoadingSCSS';

function LoadingAnimation() {
  const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];
  return (
    <LoadingContainer>
      <LoadingText>
        {letters.map((letter, index) => (
          <span
            key={letter}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
            {letter}
          </span>
        ))}
      </LoadingText>
    </LoadingContainer>
  );
}

export default LoadingAnimation;

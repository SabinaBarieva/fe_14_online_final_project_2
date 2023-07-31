/* eslint-disable react/prop-types */
import React from 'react';
import { StyledAnimationText } from '../../themes/themeOrder';

function AnimatedText({ text }) {
  return (
    <StyledAnimationText className="loading">
      {text.split('').map((character, index) =>
        character === ' ' ? (
          <span key={`space_${Math.random()}`} style={{ margin: '0.5ch' }}>
            {character}
          </span>
        ) : (
          <span
            key={`space_${Math.random()}`}
            style={{ animationDelay: `${index * 0.1}s` }}>
            {character}
          </span>
        )
      )}
    </StyledAnimationText>
  );
}

export default AnimatedText;

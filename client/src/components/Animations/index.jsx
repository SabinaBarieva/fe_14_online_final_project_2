import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';

function PulseAnimation({ children, scaleTo, config, loop }) {
  const pulseAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: `scale(${scaleTo})` },
    config,
    loop,
  });

  return <animated.div style={pulseAnimation}>{children}</animated.div>;
}

PulseAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  scaleTo: PropTypes.number,
  config: PropTypes.shape({
    duration: PropTypes.number,
    tension: PropTypes.number,
    friction: PropTypes.number,
  }),
  loop: PropTypes.bool,
};

PulseAnimation.defaultProps = {
  scaleTo: 1.1,
  config: {},
  loop: true,
};

export default PulseAnimation;

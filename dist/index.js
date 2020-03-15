import React, { useRef, useEffect, useState, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';
import * as lottieConstants from './lottieConstants';
const propTypes = {
  id: PropTypes.string,
  options: PropTypes.object,
  className: PropTypes.string,
  eventListeners: PropTypes.arrayOf(PropTypes.object),
  playingState: PropTypes.oneOf([lottieConstants.PLAY, lottieConstants.PAUSE, lottieConstants.STOP]),
  direction: PropTypes.oneOf([lottieConstants.directionForward, lottieConstants.directionReverse]),
  speed: PropTypes.number,
  goToAndPlay: PropTypes.object,
  playSegments: PropTypes.object
};

function Lottie(props) {
  const {
    id,
    options,
    eventListeners,
    playingState,
    className,
    direction,
    speed,
    goToAndPlay,
    playSegments
  } = props;
  const [lottieInstance, setLottieInstance] = useState(null);
  const [lottieConfig, setLottieConfig] = useState(null);
  const lottieContainer = useRef(null);
  const [isAnimationMissing, setAnimationMissing] = useState(false);
  const [lottieOptions, dispatch] = useReducer(setLottieOptions, {});

  function setLottieOptions(state, action) {
    //useReducer is required to compare incoming props with previous props
    //useEffect is rendered with every state change and compares changes in props by both reference and value
    //We need to update lottieOptions only when the options have changed by value so that we can can create a lottie instance only when there is a change in options
    let isOptionsChanged = !lottieConstants.checkObjectsEqualByValue(action.newOptions, state);

    if (isOptionsChanged) {
      if (!action.newOptions.path && !action.newOptions.animationData) {
        setAnimationMissing(true);
      } else {
        setAnimationMissing(false);
      }

      if ((state.path || state.animationData) && lottieInstance) {
        //Before returning options for new instance destroy the previous instance
        lottieInstance.destroy();
      }

      return action.newOptions;
    } else {
      return state;
    }
  }

  useEffect(() => {
    dispatch({
      newOptions: options
    });
  }, [options]);
  useEffect(() => {
    if (lottieOptions && (lottieOptions.animationData || lottieOptions.path)) {
      let newConfig = { ...lottieOptions,
        container: lottieContainer.current
      };

      if (newConfig.path) {
        //If path defined then ignore animationData provided
        delete newConfig.animationData;
      }

      setLottieConfig(newConfig);
    }
  }, [lottieOptions]); //Initialise animation

  useEffect(() => {
    if (lottieConfig && lottieConfig.container) {
      const newInstance = lottie.loadAnimation(lottieConfig);
      setLottieInstance(newInstance);
    }
  }, [lottieConfig]); // Remove listeners if any added when initialised

  const removeEventListeners = useCallback(() => {
    if (lottieInstance) {
      eventListeners.forEach(eventListener => {
        lottieInstance.removeEventListener(eventListener.eventName, eventListener.callback);
      }); //Destroy lottieInstance once all listeners have been removed

      return () => lottieInstance.destroy();
    }
  }, [lottieInstance, eventListeners]); // Add listeners if any passed to props

  const addEventListeners = useCallback(() => {
    if (lottieInstance && eventListeners) {
      eventListeners.forEach(eventListener => {
        lottieInstance.addEventListener(eventListener.eventName, eventListener.callback);
      });
    }
  }, [eventListeners, lottieInstance]);
  useEffect(() => {
    addEventListeners(); //Equivalent to component will unmount.

    return () => removeEventListeners();
  }); //Watch for state change of animation

  useEffect(() => {
    if (lottieInstance) {
      if (playingState === lottieConstants.PLAY) {
        lottieInstance.play();
      } else if (playingState === lottieConstants.PAUSE) {
        lottieInstance.pause();
      } else if (playingState === lottieConstants.STOP) {
        lottieInstance.stop();
      }
    }
  }, [playingState, lottieInstance]); //Watch direction change

  useEffect(() => {
    if (lottieInstance && direction && (direction === lottieConstants.directionForward || lottieConstants.directionReverse)) {
      lottieInstance.setDirection(direction);
    }
  }, [direction, lottieInstance]); //Watch speed change

  useEffect(() => {
    if (lottieInstance && speed) {
      lottieInstance.setSpeed(speed);
    }
  }, [speed, lottieInstance]); //Jump to play from specific time/segment

  useEffect(() => {
    if (lottieInstance && goToAndPlay && goToAndPlay.value && goToAndPlay.isFrame) {
      lottieInstance.goToAndPlay(goToAndPlay.value, goToAndPlay.isFrame);
    }
  }, [goToAndPlay, lottieInstance]); //Play specific segments

  useEffect(() => {
    if (lottieInstance && playSegments && playSegments.segments && playSegments.forceFlag) {
      lottieInstance.playSegments(playSegments.segments, playSegments.forceFlag);
    }
  }, [playSegments, lottieInstance]); //Container for animation

  return React.createElement("div", {
    id: id,
    ref: lottieContainer,
    className: className
  }, isAnimationMissing && React.createElement("p", null, lottieConstants.animationMissing));
}

const defaultOptions = {
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: lottieConstants.examplePath,
  // the animation data
  rendererSettings: {
    preserveAspectRatio: 'xMinYMin slice' // Supports the same options as the svg element's preserveAspectRatio property

  }
};
Lottie.propTypes = propTypes;
Lottie.defaultProps = {
  id: 'lottie-web-react',
  options: defaultOptions,
  eventListeners: [],
  playingState: lottieConstants.STOP,
  direction: 1,
  speed: 1,
  goToAndPlay: null,
  playSegments: null
};
export default Lottie;
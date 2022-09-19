import { TextComponent } from '../../../common/TextComponent';
import { animated, useSpring } from 'react-spring';

interface ITimerDisplayProps {
  addClass?: string;
  currentTime: string;
}

export function TimerDisplay({ addClass, currentTime }: ITimerDisplayProps) {
  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
    reset: true,
  });
  return (
    <animated.div style={animatedProps}>
      <TextComponent
        size={150}
        As={'div'}
        children={currentTime}
        addClass={addClass}
      />
    </animated.div>
  );
}

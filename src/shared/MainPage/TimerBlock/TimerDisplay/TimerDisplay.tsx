import { TextComponent } from '../../../utils-components/TextComponent';

interface ITimerDisplayProps {
  addClass?: string;
  currentTime: string;
}

export function TimerDisplay({ addClass, currentTime }: ITimerDisplayProps) {
  return (
    <TextComponent
      size={150}
      As={'div'}
      children={currentTime}
      addClass={addClass}
    />
  );
}

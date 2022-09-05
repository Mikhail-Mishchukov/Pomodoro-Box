import { useEffect, useRef } from 'react';
import { EIcons, Icon } from '../Icon';
import styles from './modal.module.css';

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: IModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  function handleClick(event: MouseEvent) {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      console.log('close');
      onClose();
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={ref}>
        <button className={styles.close} onClick={onClose}>
          <Icon name={EIcons.cross} widthSize={16} heightSize={16} />
        </button>
        {children}
      </div>
    </div>
  );
}

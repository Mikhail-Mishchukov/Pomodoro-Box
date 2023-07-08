import { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./Modal.module.css";
import { Icon, IconsType } from "../Icons";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onWillClose: (arg: boolean) => void;
  willClose: boolean;
}

export function Modal({
  children,
  onClose,
  onWillClose,
  willClose,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reverse: willClose,
    onRest: () => {
      if (willClose) {
        onClose();
        setTimeout(() => {
          onWillClose(false);
        }, 400);
      }
    },
  });

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);
  function onClick(event: MouseEvent) {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      onWillClose(true);
    }
  }

  return (
    <animated.div className={styles.wrapper} style={animatedProps}>
      <div className={styles.modal} ref={ref}>
        <button
          className={styles.close}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onWillClose(true);
          }}
        >
          <Icon name={IconsType.cross} width={16} height={16} />
        </button>
        {children}
      </div>
    </animated.div>
  );
}

import { motion } from 'framer-motion';
import {
  Dispatch,
  PointerEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import isMobileDevice from '../../utils/DetectMobile';
import styles from './Modal.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  triggerModalStateTimer: (obj: {
    newState: boolean;
    setModalState: Dispatch<SetStateAction<boolean>>;
    callBack?: () => void;
    transitionTime: number;
  }) => void;
}
let startHeight = 0;

function Modal({ children, setIsOpen, triggerModalStateTimer }: ModalProps) {
  const root = document.getElementById('root') as HTMLDivElement;
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();
  const TRANSITION_TIME = 0.1;

  let startY = 0;
  let distranceY = 0;
  let closeFromDraggin = false;

  useEffect(() => {
    startHeight = modalRef.current?.clientHeight || 0;
  }, []);

  function handleDragStart(event: PointerEvent<HTMLDivElement>) {
    startY = event.clientY;
  }

  function handleDragging(event: PointerEvent<HTMLDivElement>) {
    distranceY = Math.round(event.clientY - startY);

    if (distranceY > 0 && modalRef.current) {
      const newHeightInPixels = startHeight - distranceY;
      const oldHeightInPixels = startHeight;

      const percentageChanged =
        ((newHeightInPixels - oldHeightInPixels) / oldHeightInPixels) * 100;

      const newModalOpacity = (percentageChanged + 100) / 100;
      const newRootTranslateY = Math.round((percentageChanged + 100) / 10);
      const newRootScaleAmout = Math.min(
        Math.max(1 - (percentageChanged + 100) / 1000 + 0.05, 0),
        1,
      );

      modalRef.current.style.transform = `translateY(${distranceY}px)`;
      modalRef.current.style.opacity = `${newModalOpacity.toFixed(2)}`;
      setStyle(root, {
        transform: `translateY(${newRootTranslateY}px) scale(${newRootScaleAmout})`,
      });

      if (percentageChanged + 100 < 50) {
        if (!closeFromDraggin) {
          handleTimeoutTransitionTransform({
            elementRef: modalRef,
            time: TRANSITION_TIME,
            multiplier: 1000,
          });
        }
        closeFromDraggin = true;
        modalRef.current.style.transform = `translateY(${distranceY + 100}px)`;
      } else {
        if (closeFromDraggin) {
          handleTimeoutTransitionTransform({
            elementRef: modalRef,
            time: TRANSITION_TIME,
            multiplier: 1000,
          });
        }
        closeFromDraggin = false;
      }
    }
  }

  function handleDragEnd() {
    if (!modalRef.current) return;
    if (closeFromDraggin) {
      setIsOpen(false);
    } else {
      modalRef.current.style.removeProperty('transform');
      modalRef.current.style.removeProperty('opacity');
      handleTimeoutTransitionTransform({
        elementRef: modalRef,
        time: TRANSITION_TIME,
        multiplier: 1000,
      });
      setRootStyles();
    }
  }

  function handleTimeoutTransitionTransform({
    time,
    multiplier,
    elementRef,
  }: {
    elementRef: RefObject<HTMLElement>;
    time: number;
    multiplier: number;
  }) {
    if (!elementRef.current) return;
    elementRef.current.style.transition = `transform ${time}s linear`;
    setTimeout(() => {
      if (!elementRef.current) return;
      elementRef.current.style.removeProperty('transition');
    }, time * multiplier);
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
  };
  const modalVariants = {
    closed: {
      y: '100%',
      opacity: 0.5,
    },
    open: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <motion.div
        onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        key="overlay"
        className={styles.overlay}
        variants={overlayVariants}
        initial="closed"
        animate="open"
        exit="closed"
        transition={{ duration: 0.1 }}
      >
        <motion.div
          ref={modalRef}
          className={styles.container}
          variants={modalVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.1, ease: 'linear' }}
          onAnimationStart={(variant) => {
            if (variant === 'open' && isMobile) {
              setRootStyles();
              setStyle(document.body, {
                backgroundColor: 'var(--bg-additive-5x)',
                overflowY: 'hidden',
              });
            } else {
              reset(document.body, ['backgroundColor', 'overflowY']);
              reset(root, [
                'transform',
                'borderTopLeftRadius',
                'borderTopRightRadius',
              ]);
            }
          }}
          onAnimationComplete={(variant) => {
            if (variant === 'closed' && isMobile) {
              reset(root);
              reset(document.body, ['backgroundColor', 'overflowY']);
              root.attributes.removeNamedItem('style');
            }
          }}
        >
          <motion.span
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onPointerMove={handleDragging}
            className={styles.dragBar}
          />
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}
export default Modal;

function setRootStyles(styles?: Styles) {
  const root = document.getElementById('root') as HTMLDivElement;

  setStyle(root, {
    overflowY: 'hidden',
    transition: 'transform 0.1s linear',
    transform: 'translateY(10px) scale(0.95)',
    minHeight: '100vh',
    borderTopLeftRadius: '1.5rem',
    borderTopRightRadius: '1.5rem',
    boxShadow: '0 -15px 50px -12px rgb(0 0 0 / 0.25)',
    ...styles,
  });
}

const cache = new Map();

type Styles = {
  [key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[key];
};

function setStyle(el: HTMLElement, styles: Styles) {
  const originalStyles = {};

  Object.entries(styles).forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    originalStyles[key] = el.style[key];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el.style[key] = value;
  });

  cache.set(el, originalStyles);
}

function reset(el: HTMLElement, prop?: (keyof CSSStyleDeclaration)[]) {
  const originalStyles = cache.get(el);

  if (prop) {
    prop.forEach((p) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      el.style[p] = originalStyles[p];
    });
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      el.style[key] = value;
    });
  }
}

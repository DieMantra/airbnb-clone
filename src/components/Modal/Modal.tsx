import {
  Dispatch,
  SetStateAction,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import isMobileDevice from '../../utils/DetectMobile';
import styles from './Modal.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dragToClose?: boolean;
}

function Modal({
  children,
  isOpen,
  setIsOpen,
  dragToClose = true,
}: ModalProps) {
  // const [modalState, setModalState] = useState<boolean>();
  const [currentTransition, setCurrentTransition] = useState<
    'closing' | 'opening' | 'closed' | 'opened'
  >('closed');
  const root = document.getElementById('root') as HTMLDivElement;
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();

  const TRANSITION_TIME_IN_OUT = 300;

  let startY = 0;
  let distanceY = 0;
  let closeFromDraggin = false;

  const handleTriggerModalState = useCallback(
    ({
      newState,
      transitionTime,
      callback,
      cleanUp,
    }: {
      newState: boolean;
      transitionTime: number;
      callback: () => void;
      cleanUp?: () => void;
    }): number => {
      callback && callback();
      let timer: number;

      if (newState) {
        // setCurrentTransition('opening');
        // setModalState(newState);
        timer = setTimeout(() => {
          cleanUp && cleanUp();
          setCurrentTransition('opened');
        }, transitionTime);
      } else {
        timer = setTimeout(() => {
          cleanUp && cleanUp();
          // setModalState(newState);
          // setCurrentTransition('closed');
        }, transitionTime);
      }

      return timer;
    },
    [],
  );

  // CONDENSE THE HANDLETRIGGERMODALSTATE FUNCTION INTO THE USEEFFECT...
  useEffect(() => {
    const timer = handleTriggerModalState({
      newState: isOpen,
      transitionTime: TRANSITION_TIME_IN_OUT,
      callback: () => {
        if (isOpen) {
          setCurrentTransition('opening');
          setRootStyles();
          setStyle(document.body, {
            overflowY: 'hidden',
            backgroundColor: 'var(--bg-inverted)',
          });
        } else {
          setCurrentTransition('closing');
          [
            'overflow-y',
            'transform',
            'min-height',
            'border-top-left-radius',
            'border-top-right-radius',
            'box-shadow',
          ].forEach((str) => {
            root.style.removeProperty(str);
          });
        }
      },
      cleanUp: () => {
        !isOpen && root.style.removeProperty('transition');
        !isOpen && setCurrentTransition('closed');
        isOpen && setCurrentTransition('opened');
      },
    });

    return () => clearTimeout(timer);
  }, [isOpen, handleTriggerModalState, root]);

  // DRAG EVENT HANDLERS

  function handleDragStart(event: TouchEvent<HTMLSpanElement>) {
    startY = event.targetTouches[0].clientY;
  }

  function handleDragging(event: TouchEvent<HTMLSpanElement>) {
    distanceY = Math.round(event.targetTouches[0].clientY - startY);

    if (distanceY > 0 && modalRef.current) {
      const percentageChanged =
        ((modalRef.current?.clientHeight - distanceY) /
          modalRef.current?.clientHeight) *
        100;

      const newRootTranslateY = Math.round(percentageChanged / 10);
      const newRootScaleAmout = +Math.min(
        1 - percentageChanged / 1000 + 0.05,
        1,
      ).toFixed(4);

      modalRef.current.style.transform = `translate(-50%, ${distanceY}px)`;
      setStyle(root, {
        transform: `translateY(${newRootTranslateY}px) scale(${newRootScaleAmout})`,
        borderTopLeftRadius: `${percentageChanged / 100 + 0.5}rem`,
        borderTopRightRadius: `${percentageChanged / 100 + 0.5}rem`,
      });

      if (percentageChanged < 50) {
        modalRef.current.style.transform = `translate(-50%, 90%)`;
        modalRef.current.style.opacity = `0.5`;
        closeFromDraggin = true;
      } else {
        modalRef.current.style.opacity = `1`;
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

      setRootStyles();
    }
  }

  return ReactDOM.createPortal(
    currentTransition !== 'closed' ? (
      <>
        <div
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          key="overlay"
          className={`${styles.overlay} ${styles[currentTransition]}`}
        ></div>
        <div
          ref={modalRef}
          className={`${styles.container} ${styles[currentTransition]}`}
        >
          {dragToClose && isMobile && (
            <span
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              onTouchMove={handleDragging}
              className={styles.dragBar}
            />
          )}
          {children}
        </div>
      </>
    ) : null,
    document.getElementById('modal') as HTMLDivElement,
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

// function reset(el: HTMLElement, prop?: (keyof CSSStyleDeclaration)[]) {
//   const originalStyles = cache.get(el);

//   if (prop) {
//     prop.forEach((p) => {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       el.style[p] = originalStyles[p];
//     });
//   } else {
//     Object.entries(originalStyles).forEach(([key, value]) => {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       el.style[key] = value;
//     });
//   }
// }

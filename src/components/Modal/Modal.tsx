import { motion } from 'framer-motion';
import { PointerEvent, useEffect, useRef } from 'react';
import isMobileDevice from '../../utils/DetectMobile';
import styles from './Modal.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}
let startHeight = 0;

function Modal({ children, setIsOpen }: ModalProps) {
  const html = document.documentElement;
  const root = document.getElementById('root') as HTMLDivElement;
  const dragRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();
  const MODAL_HEIGHT = 92;

  let startY = 0;
  let distranceY = 0;
  let closeFromDraggin = false;

  useEffect(() => {
    startHeight = dragRef.current?.clientHeight || 0;
  }, []);

  function handleDragStart(event: PointerEvent<HTMLDivElement>) {
    startY = event.clientY;
  }

  function handleDragging(event: PointerEvent<HTMLDivElement>) {
    distranceY = Math.round(event.clientY - startY);
    if (distranceY > 0 && dragRef.current) {
      const newHeightInPixels = startHeight - distranceY;
      const oldHeightInPixels = startHeight;

      const percentageChanged =
        ((newHeightInPixels - oldHeightInPixels) / oldHeightInPixels) * 100;
      const newHeightInPercentage = MODAL_HEIGHT + percentageChanged;
      dragRef.current.style.height = `${newHeightInPercentage}%`;

      const newRootTranslateY = Math.round((percentageChanged + 100) / 10);

      const newRootScaleAmout = Math.min(
        Math.max(1 - (percentageChanged + 100) / 1000 + 0.05, 0),
        1,
      );
      setStyle(root, {
        transform: `translateY(${newRootTranslateY}px) scale(${newRootScaleAmout})`,
      });
      if (percentageChanged + 100 < 50) {
        closeFromDraggin = true;
      } else {
        closeFromDraggin = false;
      }
    }
  }

  function handleDragEnd() {
    if (closeFromDraggin) {
      setIsOpen(false);
    } else {
      dragRef.current?.style.removeProperty('height');
      setHtmlStyle();
      setRootStyles();
    }
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
      y: '100vh',
    },
    open: {
      y: 0,
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
          ref={dragRef}
          className={styles.container}
          variants={modalVariants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{
            transition: 'height 0.2s linear',
            height: `${MODAL_HEIGHT}%`,
          }}
          transition={{ duration: 0.25, ease: 'linear' }}
          onAnimationStart={(variant) => {
            if (variant === 'open' && isMobile) {
              setHtmlStyle();
              setRootStyles();
            } else {
              reset(html);
              reset(root, ['transform']);
              reset(root, ['borderTopLeftRadius', 'borderTopRightRadius']);
            }
          }}
          onAnimationComplete={(variant) => {
            if (variant === 'closed' && isMobile) {
              reset(html);
              reset(root);
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

function setHtmlStyle(styles?: Styles) {
  const html = document.documentElement;

  setStyle(html, {
    transition: 'none',
    backgroundColor: 'var(--bg-additive-5x)',
    ...styles,
  });
}
function setRootStyles(styles?: Styles) {
  const root = document.getElementById('root') as HTMLDivElement;

  setStyle(root, {
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

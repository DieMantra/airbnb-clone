import { motion, useDragControls } from 'framer-motion';
import { PointerEvent, useRef } from 'react';
import isMobileDevice from '../../utils/DetectMobile';
import styles from './Modal.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

function Modal({ children, setIsOpen }: ModalProps) {
  const html = document.documentElement;
  const root = document.getElementById('root') as HTMLDivElement;
  const dragRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();
  const dragControls = useDragControls();

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    dragControls.start(event, { snapToCursor: false });
  }
  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    if (
      dragRef.current?.clientHeight &&
      event.clientY > dragRef.current?.clientHeight - 100
    ) {
      setIsOpen(false);
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
          drag="y"
          onPointerDown={startDrag}
          onPointerUp={stopDrag}
          dragControls={dragControls}
          dragSnapToOrigin
          className={styles.container}
          variants={modalVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          onAnimationStart={(variant) => {
            if (variant === 'open' && isMobile) {
              setStyle(html, {
                transition: 'none',
                backgroundColor: 'var(--bg-additive-5x)',
              });
              setStyle(root, {
                transition: 'transform 0.3s ease-in-out',
                transform: 'translateY(1%) scale(0.95)',
                minHeight: '100vh',
                borderTopLeftRadius: '1.5rem',
                borderTopRightRadius: '1.5rem',
                boxShadow: '0 -15px 50px -12px rgb(0 0 0 / 0.25)',
              });
            }
            if (variant !== 'open' && isMobile) {
              reset(html);
              reset(root, ['transform']);
              reset(root, ['borderTopLeftRadius', 'borderTopRightRadius']);
            }
          }}
          onAnimationComplete={(variant) => {
            if (variant === 'closed' && isMobile) {
              reset(html);
              reset(root);
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}
export default Modal;

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

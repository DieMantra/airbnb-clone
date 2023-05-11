import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import isMobileDevice from '../../../../utils/DetectMobile';
import Modal from './Modal';
import ModalOverlay from './ModalOverlay';

function Index() {
  const ModalNode = document.getElementById('modal') as HTMLElement;
  const PageRoot = document.getElementById('root') as HTMLDivElement;
  const Body = document.querySelector('body') as HTMLBodyElement;
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    let timer: number;
    const isMobile = isMobileDevice();
    const bodyStyles = {
      transform: 'translateY(20px)',
      transition: 'all .2s ease',
      borderRadius: '15px',
      boxShadow: '0 -15px 25px -10px rgb(0 0 0 / 0.25)',
    } as Styles;
    const pageRootStyles = {
      transition: 'all .2s ease',
      transform: 'translateY(20px) scale(0.93)',
    };

    if (isOpen && isOpen !== undefined) {
      setStyle(Body, {
        overflow: 'hidden',
        ...(isMobile ? bodyStyles : {}),
      });
      setStyle(PageRoot, {
        minHeight: '100vh',
        minWidth: '100vw',
        ...(isMobile ? pageRootStyles : {}),
      });
      setStyle(document.documentElement, {
        overflow: 'hidden',
      });
    }
    if (!isOpen && isOpen !== undefined) {
      reset(document.documentElement);
      reset(Body, 'transform');
      reset(Body, 'borderRadius');
      reset(Body, 'boxShadow');
      reset(PageRoot, 'transform');
      reset(PageRoot, 'minHeight');
      reset(PageRoot, 'minWidth');

      if (isMobile) {
        timer = setTimeout(() => {
          reset(Body, 'transition');
          reset(PageRoot, 'transition');
        }, 200);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, Body, PageRoot]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen &&
        ReactDOM.createPortal(
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                opacity: 1,
              },
              closed: {
                opacity: 0,
              },
            }}
          >
            <ModalOverlay setIsOpen={setIsOpen} />
            <Modal>
              <button onClick={() => setIsOpen(false)}>close</button>
            </Modal>
          </motion.div>,
          ModalNode,
        )}
    </>
  );
}
export default Index;

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

function reset(el: HTMLElement, prop?: keyof CSSStyleDeclaration) {
  const originalStyles = cache.get(el);

  if (prop) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el.style[prop] = originalStyles[prop];
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      el.style[key] = value;
    });
  }
}

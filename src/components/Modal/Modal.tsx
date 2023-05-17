import {
  DialogHTMLAttributes,
  Dispatch,
  SetStateAction,
  TouchEvent,
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
  strechty?: boolean;
  dragToClose?: boolean;
  rootContentId?: string;
  dialogProps?: DialogHTMLAttributes<HTMLDialogElement>;
}

function Modal({
  children,
  isOpen,
  setIsOpen,
  dragToClose = true,
  strechty = true,
  rootContentId = 'root',
  dialogProps,
}: ModalProps) {
  const [currentTransition, setCurrentTransition] = useState<
    'closing' | 'opening' | 'closed' | 'opened'
  >('closed');
  const root = document.getElementById(rootContentId) as HTMLElement;
  const modalRef = useRef<HTMLDialogElement>(null);
  const isMobile = isMobileDevice();

  const TRANSITION_TIME_IN_OUT = 400;
  const TRANSFORM_Y_AMOUNT = 25;
  const TRANSFORM_SCALE_AMOUNT = 0.94;

  let startY = 0;
  let distanceY = 0;
  let closeFromDraggin = false;
  let initialHeight = 0;

  useEffect(() => {
    let timer: number;
    if (isOpen) {
      setCurrentTransition('opening');
      setStyle(
        root,
        {
          overflowY: 'hidden',
          transition: 'transform 0.1s linear',
          transform: `translateY(${TRANSFORM_Y_AMOUNT}px) scale(${TRANSFORM_SCALE_AMOUNT})`,
          transformOrigin: 'top',
          borderRadius: '1.5rem',
          boxShadow: '0 -15px 50px -12px rgb(0 0 0 / 0.25)',
        },
        true,
      );
      setStyle(
        document.body,
        {
          overflow: 'hidden',
          backgroundColor: 'var(--bg-inverted)',
        },
        true,
      );
      setStyle(
        document.documentElement,
        {
          overflow: 'hidden',
          backgroundColor: 'var(--bg-inverted)',
        },
        true,
      );

      // CLEAN UP
      timer = setTimeout(() => {
        setCurrentTransition('opened');
      }, TRANSITION_TIME_IN_OUT);

      // ELSE RUN WHEN CLOSING
    } else {
      setCurrentTransition('closing');

      reset(root, ['transform', 'borderRadius', 'boxShadow']);

      // CLEAN UP
      timer = setTimeout(() => {
        reset(root);
        reset(document.body);
        reset(document.documentElement);
        setCurrentTransition('closed');
      }, TRANSITION_TIME_IN_OUT);
    }

    return () => clearTimeout(timer);
  }, [isOpen, root]);

  useEffect(() => {
    setCurrentTransition('closed');
  }, []);

  // DRAG EVENT HANDLERS
  function handleDragStart(event: TouchEvent<HTMLSpanElement>) {
    startY = event.targetTouches[0].clientY;
    initialHeight = modalRef.current?.clientHeight || 0;
  }

  function handleDragging(event: TouchEvent<HTMLSpanElement>) {
    distanceY = event.targetTouches[0].clientY - startY;
    if (
      distanceY < 0 &&
      distanceY > -120 &&
      modalRef.current &&
      strechty &&
      +((initialHeight / window.innerHeight) * 100).toFixed() < 94
    ) {
      const y = Math.abs(distanceY / 2);
      modalRef.current.style.height = `${initialHeight + y}px`;
    }

    if (distanceY > 0 && modalRef.current) {
      const percentageChanged =
        ((modalRef.current?.clientHeight - distanceY) /
          modalRef.current?.clientHeight) *
        100;

      const newRootTranslateY = 0.25 * percentageChanged;
      const newRootScaleAmout = Math.min(
        1 - percentageChanged / 1000 + 0.04,
        1,
      );

      modalRef.current.style.transform = `translate(-50%, ${distanceY}px)`;
      setStyle(
        root,
        {
          transform: `translateY(${newRootTranslateY}px) scale(${newRootScaleAmout})`,
          borderTopLeftRadius: `${percentageChanged / 100 + 0.5}rem`,
          borderTopRightRadius: `${percentageChanged / 100 + 0.5}rem`,
        },
        false,
      );

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
      modalRef.current.style.removeProperty('height');
      modalRef.current.style.removeProperty('transform');
      modalRef.current.style.removeProperty('opacity');
      setStyle(
        root,
        {
          overflowY: 'hidden',
          transition: 'transform 0.1s linear',
          transform: `translateY(${TRANSFORM_Y_AMOUNT}px) scale(${TRANSFORM_SCALE_AMOUNT})`,
          borderRadius: '1.5rem',
          boxShadow: '0 -15px 50px -12px rgb(0 0 0 / 0.25)',
        },
        false,
      );
    }
  }

  function handleFocus() {
    // on mobile when the keyboard opens to type into a input, it shifts the layout of the modal.
    // then when you leave the focus of one of the inputs the modal is in the wrong position.
    // this is a hacky fix to reset the modal position when the keyboard is closed.
    if (isMobile) {
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.bottom = '0';
        }
      }, 500);
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
        <dialog
          ref={modalRef}
          role="dialog"
          className={`${styles.container} ${styles[currentTransition]}`}
          {...dialogProps}
        >
          {dragToClose && isMobile && (
            <span
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              onTouchMove={handleDragging}
              className={styles.dragBar}
            />
          )}
          <div onFocus={handleFocus}>{children}</div>
        </dialog>
      </>
    ) : null,
    document.body,
  );
}
export default Modal;

const originalStylesCache = new Map();

type Styles = {
  [key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[key];
};

function setStyle(el: HTMLElement, styles: Styles, initialRender: boolean) {
  const originalStyles = {};
  Object.entries(styles).forEach(([key, value]) => {
    if (initialRender) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      originalStyles[key] = el.style[key];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el.style[key] = value;
  });
  if (initialRender) {
    originalStylesCache.set(el, originalStyles);
  }
}

function reset(el: HTMLElement, prop?: (keyof CSSStyleDeclaration)[]) {
  const originalStyles = originalStylesCache.get(el);
  if (!originalStyles) return;

  if (prop) {
    prop.forEach((p) => {
      if (el.style[p]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        el.style[p] = originalStyles[p];
      }
    });
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      el.style[key] = value;
    });
  }
}

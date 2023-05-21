import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import {
  FocusScope,
  useButton,
  useFocus,
  useFocusManager,
  useFocusWithin,
  useHover,
} from 'react-aria';
import { FaUserCircle } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';
import Modal from '../../../../components/Modal/Modal';
import styles from './UserControls.module.scss';

function UserSection() {
  return (
    <div className={styles.container}>
      <a href="/host/homes" className={styles.hostYourHomeLink}>
        Airbnb your home
      </a>
      <LanguageSelectionModal />
      <UserLogin />
    </div>
  );
}

export default UserSection;

function LanguageSelectionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: setIsOpen.bind(null, true),
    },
    buttonRef,
  );

  return (
    <>
      <button
        ref={buttonRef}
        {...buttonProps}
        className={`${styles.languageOpenBtn} ${isOpen ? styles.isOpen : ''}`}
      >
        <FiGlobe />
      </button>
      <Modal {...{ isOpen, setIsOpen }}>
        <div>
          <h1>Language Selection</h1>
          <p>Choose your language</p>
        </div>
        <button onClick={setIsOpen.bind(null, false)}>close</button>
      </Modal>
    </>
  );
}

function UserLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { focusProps } = useFocus({
    onFocusChange: (focuse) => setIsFocused(focuse),
  });
  const { isHovered, hoverProps } = useHover({});
  const { buttonProps } = useButton(
    {
      onPress: () => setIsOpen((prev) => !prev),
    },
    buttonRef,
  );

  return (
    <div className={styles.userLoginContainer}>
      <button
        className={`${styles.userLoginButton} ${
          isOpen || isHovered ? styles.open : ''
        } ${isFocused ? styles.active : ''}`}
        ref={buttonRef}
        {...buttonProps}
        {...hoverProps}
        {...focusProps}
        tabIndex={0}
      >
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <FaUserCircle />
      </button>
      {isOpen ? <Controls setIsOpen={setIsOpen} /> : ''}
    </div>
  );
}
function Controls({ setIsOpen }: { setIsOpen: (e: boolean) => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnClick = (e: MouseEvent) => {
      if (modalRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    document.addEventListener('click', handleOnClick);
    return () => document.removeEventListener('click', handleOnClick);
  }, [setIsOpen]);

  const Link = ({
    children,
    isBold,
  }: {
    children: ReactNode;
    isBold?: boolean;
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const { isHovered, hoverProps } = useHover({});
    const focusManager = useFocusManager();
    const { focusWithinProps } = useFocusWithin({
      onFocusWithinChange: (isFocusWithin) => setIsFocused(isFocusWithin),
    });

    const onKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === 'ArrowRight') {
        focusManager.focusNext({ wrap: true });
        return;
      }
      if (e.key === 'ArrowLeft') {
        focusManager.focusPrevious({ wrap: true });
        return;
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
    };

    return (
      <a
        {...focusWithinProps}
        {...hoverProps}
        className={`${isBold ? styles.bold : ''} ${styles.link} ${
          isHovered ? styles.hovered : ''
        } ${isFocused ? styles.focused : ''}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {children}
      </a>
    );
  };

  return (
    <FocusScope contain>
      <div ref={modalRef} className={styles.userLoginModalContaienr}>
        <div className={styles.buttonWrapper}>
          <Link isBold>Sign up</Link>
          <Link>Log in</Link>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.buttonWrapper}>
          <Link>Airbnb your home</Link>
          <Link>Help</Link>
        </div>
      </div>
    </FocusScope>
  );
}

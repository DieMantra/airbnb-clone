import { useRef, useState } from 'react';
import { useButton } from 'react-aria';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: handleOnClick,
    },
    buttonRef,
  );

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <button
      className={styles.userLoginContainer}
      ref={buttonRef}
      {...buttonProps}
    >
      <div className={styles.hamburger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <FaUserCircle />
      {isOpen ? <Controls /> : ''}
    </button>
  );
}
function Controls() {
  return (
    <div className={styles.userLoginModalContaienr}>
      <div className={styles.buttonWrapper}>
        <button className={styles.signupInModalButton}>Sign up</button>
        <button>Log in</button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.buttonWrapper}>
        <button>Airbnb your home</button>
        <button>Help</button>
      </div>
    </div>
  );
}

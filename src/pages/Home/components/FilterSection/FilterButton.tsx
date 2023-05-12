import { useRef } from 'react';
import { useButton } from 'react-aria';
import { CiSliderHorizontal } from 'react-icons/ci';
import Modal from '../FilterModal/Index';
import styles from './FilterButton.module.scss';

interface FilterButtonProps {
  modalIsOpen: boolean;
  setModalIsOpen: (e: boolean) => void;
}

function FilterButton({ modalIsOpen, setModalIsOpen }: FilterButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton({ onPress: handleClick }, ref);

  function handleClick() {
    setTimeout(setModalIsOpen.bind(null, true), 50);
  }

  const thing = {
    backgroundColor: 'var(--bg-additive)',
  };
  return (
    <>
      <button
        ref={ref}
        {...buttonProps}
        className={`${styles.btn} ${isPressed ? styles.isPressed : ''}}`}
        aria-label="Open filter options"
        style={{
          ...(isPressed ? thing : {}),
        }}
      >
        <CiSliderHorizontal strokeWidth="1" />
        <span>Filters</span>
      </button>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
}
export default FilterButton;

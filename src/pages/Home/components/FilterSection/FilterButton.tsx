import { Dispatch, SetStateAction, useRef } from 'react';
import { useButton } from 'react-aria';
import { CiSliderHorizontal } from 'react-icons/ci';
import styles from './FilterButton.module.scss';
import Modal from './FilterModal/Index';

interface FilterButtonProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
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

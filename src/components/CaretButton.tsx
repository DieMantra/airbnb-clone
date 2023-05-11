import { useRef } from 'react';
import { AriaButtonProps, useButton, useHover } from 'react-aria';
import { RxCaretLeft } from 'react-icons/rx';
import styles from './CaretButton.module.scss';

interface CaretButtonProps extends AriaButtonProps {
  right?: boolean;
  left?: boolean;
}

function CaretButton(props: CaretButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover({});

  return (
    <button
      {...hoverProps}
      className={`${isHovered ? styles.isHovered : ''} ${
        isPressed ? styles.isPressed : ''
      } ${styles.btn}`}
      {...buttonProps}
      ref={ref}
    >
      <RxCaretLeft
        className={`${props.right ? styles.right : styles.left} ${
          styles.caret
        }`}
      />
    </button>
  );
}

export default CaretButton;

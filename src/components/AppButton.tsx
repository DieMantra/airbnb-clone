import { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

function AppButton(props: AriaButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}

export default AppButton;

import { useTheme } from 'mantra-theme-switcher';
import { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

function AppButton(props: AriaButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { toggleTheme } = useTheme();
  toggleTheme('light');

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}

export default AppButton;

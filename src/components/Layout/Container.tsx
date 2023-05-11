import type { ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  marginInlineAuto?: boolean;
  marginBlockAuto?: boolean;
  marginAuto?: boolean;
  children: ReactNode;
}

export default function Container({
  children,
  marginAuto,
  marginInlineAuto,
  marginBlockAuto,
}: ContainerProps) {
  const marginClass = marginAuto
    ? styles.marginAuto
    : marginBlockAuto
    ? styles.marginBlockAuto
    : marginInlineAuto
    ? styles.marginInlineAuto
    : '';

  return <div className={`${styles.container} ${marginClass}`}>{children}</div>;
}

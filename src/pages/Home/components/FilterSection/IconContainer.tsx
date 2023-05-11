import { useRef, useState } from 'react';
import { RadioGroup } from 'react-aria-components';
import CaretButton from '../../../../components/CaretButton';
import FilterButton from './FilterButton';
import styles from './IconContainer.module.scss';
interface IconContainerProps {
  children: React.ReactNode;
  setActiveId: (e: string) => void;
}

function IconContainer({ children, setActiveId }: IconContainerProps) {
  const [isLeft, setIsLeft] = useState(true);
  const [isRight, setIsRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setIsLeft(e.currentTarget.scrollLeft === 0);
    setIsRight(
      e.currentTarget.scrollLeft + 0.5 ===
        e.currentTarget.scrollWidth - e.currentTarget.clientWidth,
    );
  };

  const handleMoveScrollPosition = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    let amount = 0;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const subtractAmount = scrollContainerRef.current.clientWidth / 2;
    amount =
      direction === 'left'
        ? scrollLeft - subtractAmount
        : scrollLeft + subtractAmount;

    scrollContainerRef.current.scrollTo({
      left: amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.topLevel}>
      <div className={styles.relative}>
        <div
          ref={scrollContainerRef}
          className={styles.scrollContainer}
          onScroll={handleOnScroll}
        >
          <RadioGroup
            className={styles.container}
            onChange={setActiveId}
            aria-label="Filter destiniation"
            orientation="horizontal"
          >
            {!isLeft && (
              <div className={`${styles.carets} ${styles.caretLeft}`}>
                <CaretButton onPress={() => handleMoveScrollPosition('left')} />
              </div>
            )}
            {children}
            {!isRight && (
              <div className={`${styles.carets} ${styles.caretRight}`}>
                <CaretButton
                  onPress={() => handleMoveScrollPosition('right')}
                  right
                />
              </div>
            )}
          </RadioGroup>
        </div>
      </div>
      <FilterButton />
    </div>
  );
}
export default IconContainer;

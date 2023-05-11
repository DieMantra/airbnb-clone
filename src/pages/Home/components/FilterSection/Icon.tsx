import { useRef, useState } from 'react';
import { Radio } from 'react-aria-components';
import styles from './Icon.module.scss';

interface IconProps {
  dataId: string;
  src: string;
  title: string;
  activeId: string;
  setActiveId: (e: string) => void;
}

function Icon(props: IconProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkImageLoaded = () => {
    setIsLoading(!imgRef.current?.complete);
  };

  // ADD A LOADING CLASS DIRECTLY TO THE IMG AND SPAN
  // THIS IS WHERE THE YOU WILL ADD THE STYLING FOR THE LOADING STATE IF THE IMAGE IS NOT LOADED
  const title = (
    props.title[0].toUpperCase() + props.title.slice(1)
  ).replaceAll('-', ' ');

  return (
    <Radio
      className={`${styles.wrapper}`}
      value={props.dataId}
      aria-label={props.dataId}
    >
      <img
        onLoad={checkImageLoaded}
        className={isLoading ? styles.loading : ''}
        ref={imgRef}
        src={props.src}
      />
      <span className={isLoading ? styles.loading : ''}>{title}</span>
    </Radio>
  );
}
export default Icon;

import { CiSliderHorizontal } from 'react-icons/ci';
import styles from './FilterButton.module.scss';

function FilterButton() {
  return (
    <button className={styles.btn}>
      <CiSliderHorizontal strokeWidth="1" />
      <span>Filters</span>
    </button>
  );
}
export default FilterButton;

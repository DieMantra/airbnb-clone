import styles from './ModalOverlay.module.scss';

function ModalOverlay({ setIsOpen }: { setIsOpen: (e: boolean) => void }) {
  return (
    <div
      onClick={(e) => setIsOpen(e.target !== e.currentTarget)}
      className={styles.overlay}
    ></div>
  );
}
export default ModalOverlay;

import { Dispatch, SetStateAction } from 'react';
import Modal from '../../../../components/Modal/Modal';
import styles from './FilterModal.module.scss';
interface IndexProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Index({ modalIsOpen, setModalIsOpen }: IndexProps) {
  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <div className={styles.container}>
        <h1>Sign up</h1>
        <p>Sign up to get access to the latest news and updates</p>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Email" />
        <button className={styles.submitbtn}>Sign up</button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
      </div>
    </Modal>
  );
}
export default Index;

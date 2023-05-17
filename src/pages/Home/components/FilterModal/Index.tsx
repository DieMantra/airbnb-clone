import { Dispatch, SetStateAction, useState } from 'react';
import Modal from '../../../../components/Modal/Modal';
import styles from './FilterModal.module.scss';
interface IndexProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Index({ modalIsOpen, setModalIsOpen }: IndexProps) {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const isDisabled = Object.values(inputs).some((value) => value.length < 3);

  return (
    <Modal
      dialogProps={{
        'aria-label': 'Sign up',
      }}
      isOpen={modalIsOpen}
      setIsOpen={setModalIsOpen}
    >
      <div className={styles.container}>
        <h1>Sign up</h1>
        <p>Sign up to get access to the latest news and updates</p>
        <input
          onChange={handleInput}
          name="firstname"
          type="text"
          placeholder="First Name"
        />
        <input
          onChange={handleInput}
          name="lastname"
          type="text"
          placeholder="Last Name"
        />
        <input
          onChange={handleInput}
          name="email"
          type="text"
          placeholder="Email"
        />

        <button disabled={isDisabled} className={styles.submitbtn}>
          Sign up
        </button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
        <button
          className={styles.cancelBtn}
          onClick={setModalIsOpen.bind(null, false)}
        >
          Cancle
        </button>
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

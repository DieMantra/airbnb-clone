import { Dispatch, SetStateAction } from 'react';
import Modal from '../../../../components/Modal/Modal';

interface IndexProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Index({ modalIsOpen, setModalIsOpen }: IndexProps) {
  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      Modal
      <button onClick={setModalIsOpen.bind(null, false)}>close</button>
    </Modal>
  );
}
export default Index;

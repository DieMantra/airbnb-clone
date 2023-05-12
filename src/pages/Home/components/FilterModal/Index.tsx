import Modal from '../../../../components/Modal/Index';

interface IndexProps {
  modalIsOpen: boolean;
  setModalIsOpen: (e: boolean) => void;
}

function Index({ modalIsOpen, setModalIsOpen }: IndexProps) {
  return (
    <>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        Modal
        <button onClick={setModalIsOpen.bind(null, false)}>close</button>
      </Modal>
    </>
  );
}
export default Index;

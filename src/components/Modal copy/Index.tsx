import { AnimatePresence } from 'framer-motion';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

function Index({ children, isOpen, setIsOpen }: ModalProps) {
  const ModalNode = document.getElementById('modal') as HTMLElement;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          triggerModalStateTimer={handleTriggerModalState}
        >
          {children}
        </Modal>
      )}
    </AnimatePresence>,
    ModalNode,
  );
}
export default Index;

function handleTriggerModalState({
  newState,
  setModalState,
  transitionTime,
  callBack,
}: {
  newState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  transitionTime: number;
  callBack?: () => void;
}): void {
  setTimeout(() => {
    callBack && callBack();
    newState ? setModalState(newState) : setModalState((prev) => !prev);
  }, transitionTime);
}

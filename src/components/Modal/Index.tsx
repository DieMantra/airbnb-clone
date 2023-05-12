import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
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
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          {children}
        </Modal>
      )}
    </AnimatePresence>,
    ModalNode,
  );
}
export default Index;

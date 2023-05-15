// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useEffect,
//   useState,
// } from 'react';
// import ReactDOM from 'react-dom';
// import Modal from './Modal';

// interface ModalProps {
//   children?: ReactNode;
//   isOpen: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// }

// function Index({ children, isOpen, setIsOpen }: ModalProps) {
//   const ModalNode = document.getElementById('modal') as HTMLElement;

//   return ReactDOM.createPortal(
//     <Modal
//       isOpen={isOpen}
//       setIsOpen={setIsOpen}
//       triggerModalStateTimer={handleTriggerModalState}
//     >
//       {children}
//     </Modal>,
//     ModalNode,
//   );
// }
// export default Index;

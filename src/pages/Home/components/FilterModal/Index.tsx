import { Dispatch, SetStateAction } from 'react';
import Modal from '../../../../components/Modal/Modal';

interface IndexProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Index({ modalIsOpen, setModalIsOpen }: IndexProps) {
  const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '3rem',
    color: 'var(--text-primary)',
  } as const;

  const inputs = {
    width: '100%',
    borderRadius: '0px',
    border: '1px solid var(--bg-additive)',
    boxShadow: '0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06)',
    padding: '1rem 1rem',
    marginBottom: '1.4rem',
    fontSize: '1.6rem',
    color: 'var(--text-primary)',
  } as const;

  const submitbtn = {
    width: '100%',
    borderRadius: '9999px',
    backgroundColor: 'var(--clr-blue-90)',
    padding: '1rem',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontSize: '1.6rem',
    boxShadow: '0 4px 3px rgb(0 0 0 / 0.07), 0 2px 2px rgb(0 0 0 / 0.06)',
  } as const;

  const cancelBtn = {
    width: '100%',
    borderRadius: '9999px',
    border: '1px solid var(--bg-additive-2x)',
    padding: '1rem',
    marginBottom: '1rem',
    fontSize: '1.6rem',
  } as const;

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <div style={divStyle}>
        <h1
          style={{
            marginTop: '5rem',
            marginBottom: '2.8rem',
            fontSize: '4rem',
          }}
        >
          Sign up
        </h1>
        <p
          style={{
            marginBottom: '5rem',
            fontSize: '1.4rem',
          }}
        >
          Sign up to get access to the latest news and updates
        </p>
        <input style={inputs} type="text" placeholder="First Name" />
        <input style={inputs} type="text" placeholder="Last Name" />
        <input style={inputs} type="text" placeholder="Email" />
        <button style={submitbtn}>Sign up</button>
        <button style={cancelBtn} onClick={setModalIsOpen.bind(null, false)}>
          Cancle
        </button>
      </div>
    </Modal>
  );
}
export default Index;

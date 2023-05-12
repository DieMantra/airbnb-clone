import styles from './Modal.module.scss';

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.container}>
        <h1>Modal</h1>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="email" id="email" />
      </div>
      {children}
    </>
  );
}
export default Modal;

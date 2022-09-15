import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

const modalRoot = document.querySelector('#root');

const Modal = ({ modalOption, closeModal }) => {
  useEffect(() => {
    const onBtnClose = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onBtnClose);

    return () => {
      window.removeEventListener('keydown', onBtnClose);
    };
  }, [closeModal]);

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={onOverlayClick}>
      <div className="Modal">
        <img src={modalOption.largeImageURL} alt={modalOption.tags} />
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalOption: PropTypes.object.isRequired,
};

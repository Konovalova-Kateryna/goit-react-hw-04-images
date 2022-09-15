import { useState } from 'react';
import Modal from './Modal';
import { PropTypes } from 'prop-types';

const ImageGalleryItem = ({ option }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <img
        onClick={openModal}
        className="ImageGalleryItem-image"
        src={option.webformatURL}
        alt={option.tags}
      />
      {isModalOpen && <Modal modalOption={option} closeModal={closeModal} />}
    </>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  option: PropTypes.object.isRequired,
};

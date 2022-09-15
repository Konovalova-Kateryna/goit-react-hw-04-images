import { useEffect, useState } from 'react';
import { getGallery } from 'services/api';
import ImageGalleryItem from './ImageGalleryItem';
import { Spinner } from './Loader';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

// status: {
//   idle - спокойный,
//   resolved - +результат,
//   rejected - ошибка,
//   pending - поиск(загрузка);}

const ImageGallery = ({ search, page, loadMore }) => {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (!search) {
      return;
    }

    async function getItems() {
      try {
        setStatus('pending');
        const newGallery = await getGallery(search, page);

        console.log(newGallery);
        if (newGallery.total === 0 || newGallery.hits.length === 0) {
          setStatus('rejected');
          return;
        }
        if (page === 1) {
          setGallery([]);
        }
        setGallery(prevGallery => [...prevGallery, ...newGallery.hits]);
        setStatus('resolved');
        setTotalPage(Math.ceil(newGallery.totalHits / 12));
      } catch (error) {
        console.log(error);
        this.setState({ status: 'rejected' });
      }
    }
    getItems();
  }, [search, page]);

  return (
    <div className="GalleryContainer">
      {status === 'idle'}
      {status === 'rejected' &&
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        )}
      {gallery.length > 0 && (
        <ul key={search} className="ImageGallery">
          {gallery.map(item => {
            return (
              <li className="ImageGalleryItem" key={item.id}>
                <ImageGalleryItem option={item} />
              </li>
            );
          })}
        </ul>
      )}
      {(status === 'pending' && <Spinner />) ||
        (gallery.length > 1 && page < totalPage && (
          <button className="Button" type="button" onClick={loadMore}>
            Load more
          </button>
        ))}
    </div>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  search: PropTypes.string,
  page: PropTypes.number,
  loadMore: PropTypes.func,
};

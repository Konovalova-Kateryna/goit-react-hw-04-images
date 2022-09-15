import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [prevGallery, setPrevGallery] = useState([]);

  const createGallery = pictureName => {
    if (search !== pictureName) {
      setPage(1);
      setPrevGallery([]);
    }
    console.log(pictureName);

    setSearch(pictureName);
  };
  const onLoadMore = e => {
    e.preventDefault();
    setPage(prevPage => prevPage + 1);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={createGallery} />
      <ImageGallery
        search={search}
        page={page}
        loadMore={onLoadMore}
        prevGallery={prevGallery}
      />
      <ToastContainer />
    </div>
  );
};

export default App;

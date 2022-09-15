import { Field, Form, Formik } from 'formik';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

const initialValues = { searchParam: '' };

const Searchbar = ({ onSubmit, searchParam }) => {
  const handleSubmit = (value, { resetForm }) => {
    console.log(value.searchParam);

    if (value.searchParam.trim() === '') {
      toast.error('Please specify your search query.');
      resetForm();
      return;
    }
    onSubmit(value.searchParam);
    resetForm();
  };
  return (
    <header className="Searchbar">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <ImSearch className="SearchForm-button-label" />
          </button>
          <Field
            className="SearchForm-input"
            type="text"
            name="searchParam"
            autoComplete="off"
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  searchParam: PropTypes.string,
};

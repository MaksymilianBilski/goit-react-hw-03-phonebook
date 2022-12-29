import css from './SearchForm.module.css';
import PropTypes from 'prop-types';

export const SearchForm = ({ value, onChange }) => (
  <label className={css.label}>
    Find contacts by name:
    <input
      className={css.input}
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

SearchForm.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

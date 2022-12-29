import css from './Form.module.css';
import PropTypes from 'prop-types';
export const AddContacts = ({ onSubmit }) => {
  return (
    <>
      <form className={css.form} onSubmit={onSubmit}>
        <label>Name</label>
        <input
          className={css.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label>Number</label>
        <input
          className={css.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.button}>Add contact</button>
      </form>
    </>
  );
};

AddContacts.propTypes = {
  onSubmit: PropTypes.func,
};

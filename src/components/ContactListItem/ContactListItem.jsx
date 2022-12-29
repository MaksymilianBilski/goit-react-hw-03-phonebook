import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ contact, onDelete }) => {
  return (
    <>
      <li className={css.listItem}>
        {' '}
        {contact.name}: {contact.number}{' '}
        <button
          className={css.button}
          type="button"
          onClick={() => onDelete(contact.id)}
        >
          DELETE
        </button>
      </li>{' '}
    </>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object,
  onDelete: PropTypes.func,
};

function ContactItem({ contact, onDelete }) {
  return (
    <li>
      <div>
        <strong>{contact.name}</strong>
        <span>{contact.email}</span>
        {contact.phone && <span>{contact.phone}</span>}
      </div>
      <button
        type="button"
        onClick={() => onDelete(contact.id)}
        aria-label={`Delete contact ${contact.name}`}
      >
        Delete
      </button>
    </li>
  );
}

export default ContactItem;

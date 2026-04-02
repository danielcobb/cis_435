import { useState } from "react";

const EMPTY_FORM = { name: "", email: "", phone: "" };

function ContactForm({ onAddContact }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      //clear the error when it's fixed
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate() {
    //function to check and return errors
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault(); //don't refresh the page

    const validationErrors = validate();

    //if there are errors, display them
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    //if there are no errors, create the new contact
    const newContact = {
      id: Date.now().toString(),
      name: formData.name.trim(), //.trim() removes any whitespace the user may enter
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    //send the contact to App.jsx
    onAddContact(newContact);

    //clear the form
    setFormData(EMPTY_FORM);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Add a contact</h2>

      <div>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        {errors.name && <span role="alert">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
        />
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(optional)"
        />
      </div>

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;

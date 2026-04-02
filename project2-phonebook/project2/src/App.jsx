import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";

function App() {
  const [contacts, setContacts] = useState([]); //initial contact list is just an empty list

  const [filterText, setFilterText] = useState(""); //initial search text is just an empty string

  function handleAddcontact(newContact) {
    setContacts((prev) => [...prev, newContact]); //copy the old array and then add the new contact
  }

  function handleDeleteContact(id) {
    setContacts((prev) => prev.filter((c) => c.id != id)); //deletes the contact and updates the state
  }

  return (
    <div>
      <header>
        <h1>Contact Book</h1>
      </header>

      <main>
        <section>
          <ContactForm onAddContact={handleAddcontact} />
        </section>

        <section>
          <h2>Contacts ({contacts.length})</h2>
          <SearchBar filterText={filterText} onFilterChange={setFilterText} />
          <ContactList
            contacts={contacts}
            filterText={filterText}
            onDelete={handleDeleteContact}
          />
        </section>
      </main>
    </div>
  );
}

export default App;

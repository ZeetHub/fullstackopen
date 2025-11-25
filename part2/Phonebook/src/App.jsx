import { useEffect, useState } from "react";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const PersonForm = ({
  addPhone,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPhone}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ newFilter, handleSearchName }) => {
  return (
    <div>
      filter shown with
      <input value={newFilter} onChange={handleSearchName} />
    </div>
  );
};

const Persons = ({ person, deleteContact }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deleteContact(person.id)}>delete</button>
    </li>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");
  const [message, setMessage] = useState({text: null, type:null});

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const deleteContact = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      contactService.deleteContact(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleSearchName = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPhone = (e) => {
    e.preventDefault();
    const exists = persons.some((person) => person.name === newName);
    if (exists) {
      const person = persons.find((p) => p.name === newName);
      if (
        window.confirm(
          `${person.name} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const changedContact = { ...person, number: newNumber };
        contactService
          .update(person.id, changedContact)
          .then((returnedContact) => {
            setPersons(
              persons.map((person) =>
                person.name === newName ? returnedContact : person
              )
            );
            setMessage({text:`Updated ${person.name}`, type:`success`});
            setTimeout(() => {
              setMessage({ text: null, type: null });
            }, 3000);
          })
          .catch((error) => {
            setMessage(
              {text:`Information of ${person.name} has already been removed from server`, type:`failure`}
            );
            setPersons(persons.filter((p) => p.name !== newName));
            setTimeout(() => {
              setMessage({ text: null, type: null });
            }, 3000);
          });
      }
    } else {
      const contactOb = {
        name: newName,
        number: newNumber,
      };
      contactService.create(contactOb).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setMessage({text:`Added ${returnedContact.name}`, type:`success`});
        setTimeout(() => {
          setMessage({ text: null, type: null });
        }, 3000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const numsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(newFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
      <h2>Phonebook</h2>
      <Notification message={message.text} type={message.type} />
      <Filter newFilter={newFilter} handleSearchName={handleSearchName} />
      <h2>Add a new</h2>
      <PersonForm
        addPhone={addPhone}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {numsToShow.map((person) => (
          <Persons
            key={person.id}
            person={person}
            deleteContact={deleteContact}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

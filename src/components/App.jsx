import { AddContacts } from './Form/Form';
import { Section } from './Section/Section';
import { SearchForm } from './SearchByName/SearchForm';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import React, { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  componentDidMount() {
    if (
      JSON.parse(localStorage.getItem('contacts')) === undefined ||
      JSON.parse(localStorage.getItem('contacts')) === null
    ) {
      return;
    }
    const localUsers = JSON.parse(localStorage.getItem('contacts'));
    this.setState({
      contacts: [...localUsers],
    });
  }
  onFormSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name;
    const number = form.elements.number;

    if (
      this.state.contacts.find(
        contact =>
          contact.name === name.value && contact.number === number.value
      )
    ) {
      alert(`${name.value} is already in contacts`);
      return;
    }

    const contact = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    };
    //add single contact to local storage
    const newContacts = [...this.state.contacts, contact];
    this.setState({
      contacts: newContacts,
    });
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    form.reset();
  };

  onFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  onContactDelete = id => {
    const deletedContacts = [
      this.state.contacts.filter(contact => contact.id !== id),
    ];
    localStorage.setItem('deletedContacts', JSON.stringify(deletedContacts));
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <Section title="Phonebook">
          <AddContacts onSubmit={this.onFormSubmit} />
        </Section>
        <SearchForm value={this.state.filter} onChange={this.onFilterChange} />
        <ContactsList
          bookArray={this.state.contacts}
          filter={this.state.filter}
          onDelete={this.onContactDelete}
        />
      </div>
    );
  }
}

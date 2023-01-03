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
      JSON.parse(localStorage.getItem('localUsers')) === undefined ||
      JSON.parse(localStorage.getItem('localUsers')) === null
    ) {
      return;
    }
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    this.setState({
      contacts: localUsers,
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
    localStorage.setItem('localContact', JSON.stringify(contact));
    const localContact = JSON.parse(localStorage.getItem('localContact'));
    this.setState(prevState => ({
      contacts: [...prevState.contacts, localContact],
    }));
    form.reset();
  };

  onFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  onContactDelete = id => {
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

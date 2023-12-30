import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilterChange = event => {
    const value = event.target.value;
    this.setState({ filter: value });
  };

  handleAddContact = formData => {
    const { contacts } = this.state;
    const hasDuplicates = contacts.some(
      contact => contact.name === formData.name
    );
    if (hasDuplicates) {
      alert(`Profile with name ${formData.name} already exists!`);
      return;
    }
    const finalContacts = {
      ...formData,
      id: nanoid(),
    };

    this.setState({
      contacts: [...contacts, finalContacts],
      name: '',
      number: '',
    });
  };


  handleDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  componentDidMount() {
    const parseContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(parseContacts) ?? [];
    this.setState({contacts});
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts)
      localStorage.setItem('contacts', stringifiedContacts)
  }};

  render() {
    const filteredContacts = this.state.contacts.filter(profile =>
      profile.name
        .toLowerCase()
        .includes(this.state.filter.trim().toLowerCase())
    );

    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Phonebook</h2>
        <AddContactForm handleAddContact={this.handleAddContact} />

        <h2 style={{ textAlign: 'center' }}>Contacts</h2>
        <SearchFilter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactsList
          contacts={filteredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }}


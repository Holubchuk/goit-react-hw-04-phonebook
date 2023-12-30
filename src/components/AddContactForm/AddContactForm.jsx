import css from './AddContactForm.module.css';
import React, { Component } from 'react';

export class AddContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;

    const formData = {
      name: name.toLowerCase(),
      number,
    };

    this.props.handleAddContact(formData);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label>
          <span className={css.formLabel}>Name:</span>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Alex" 
            onChange={this.handleFormChange} 
            className={css.formInput}
            required
          />
        </label>
        <label>
          <span className={css.formLabel}>Number:</span>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
            max="7"
            name="number"
            value={this.state.number}
            onChange={this.handleFormChange}
            placeholder="111-11-11"
            className={css.formInput}
            required
          />
        </label>
        <button type="submit" className={css.formButton}>
          Add Contact
        </button>
      </form>
    );
  }
}

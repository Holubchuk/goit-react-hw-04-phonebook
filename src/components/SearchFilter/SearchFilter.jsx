import React, { Component } from 'react';
import css from './SearchFilter.module.css';

export class SearchFilter extends Component {
  render() {
    return (
      <div className={css.filterContainer}>
        <p className={css.filterTitle}>Find Profile:</p>
        <input
          value={this.props.filter}
          onChange={this.props.handleFilterChange}
          type="text"
          name="filter"
          className={css.filterInput} 
        />
      </div>
    );
  }
}


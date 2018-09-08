import React, { Component } from 'react';
import CompanyList from './components/companies/CompanyList'
import ContactList from './components/contacts/ContactList'
import DealList from './components/deals/DealList'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Main from './components/main/Main'

class App extends React.Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
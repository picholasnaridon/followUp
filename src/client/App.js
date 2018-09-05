import React, { Component } from 'react';
import CompanyList from './components/companies/CompanyList'
import ContactList from './components/contacts/ContactList'
import DealList from './components/deals/DealList'
import Login from './components/auth/Login'

class App extends React.Component {
  render() {
    return (
      <div>
        <CompanyList />
        <ContactList />
        <DealList />
        <Login />
      </div>
    );
  }
}

export default App;
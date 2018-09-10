import React, { Component } from 'react';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null
    }

  }

  componentDidMount() {
    fetch(`/api/contacts/${this.props.match.params.id}`, {
      method: "GET"
    }).then((response) => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({ contact: json })
    })
  }


  render() {
    if (this.state.contact) {
      return (
        <div>
          <h2>{this.state.contact.firstName} {this.state.contact.lastName}</h2>
          <h2><a href={`#/companies/${this.state.contact.Company.id}`}>{this.state.contact.Company.name}</a></h2>
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
}

export default Contact;
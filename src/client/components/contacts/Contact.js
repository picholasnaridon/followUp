import React, { Component } from 'react';

class Contact extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <h2>{this.props.match.params.id}</h2>
      </div>
    );
  }
}

export default Contact;
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <Panel>
          <Panel.Heading>9/20/2018</Panel.Heading>
          <Panel.Body>{this.props.body}</Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Note;
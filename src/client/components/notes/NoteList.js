import React, { Component } from 'react';
import Note from './Note'
import { ListGroup, ListGroupItem, Row, Grid, Col, Button } from 'react-bootstrap'

class NoteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        { id: 1, body: "ABC" },
        { id: 2, body: "CDE" },
        { id: 3, body: "RFG" }
      ]
    }
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={11}>
          </Col>
          <Col md={1}>
            <Button bsStyle="primary">+ Note</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.notes.map(function (note) {
              return (
                <Note key={note.id}
                  body={note.body} />
              )
            })}
          </Col>
        </Row>
      </Grid>


    );
  }
}

export default NoteList;
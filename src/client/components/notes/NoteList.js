import React, { Component } from 'react';
import Note from './Note'
import { FormGroup, ControlLabel, FormControl, Row, Grid, Col, Button } from 'react-bootstrap'

class NoteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: '',
      notes: [
        { id: 1, body: "ABC" },
        { id: 2, body: "CDE" },
        { id: 3, body: "RFG" }
      ]
    }
    this.addNote = this.addNote.bind(this)
    this.handleNoteChange = this.handleNoteChange.bind(this)
  }
  handleNoteChange(e) {
    console.log(e.target.value)
    this.setState({ note: e.target.value });

  }
  addNote(e) {
    console.log(this.state.note)
    // API call
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={11}>
          </Col>
          <Col md={1}>
            <Button bsStyle="primary" onClick={this.addNote}>+ Note</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Note</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="textarea"
                value={this.state.selectStatus}
                onChange={this.handleNoteChange.bind(this)}
              />
            </FormGroup>
          </Col>
        </Row>
        <hr></hr>
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
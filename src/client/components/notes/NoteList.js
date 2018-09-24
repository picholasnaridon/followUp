import React, { Component } from 'react';
import { Note } from '../components';
import { FormGroup, ControlLabel, FormControl, Row, Grid, Col, Button } from 'react-bootstrap';
import axios from 'axios';

class NoteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: '',
			notes: []
		};
		this.addNote = this.addNote.bind(this);
		this.handleNoteChange = this.handleNoteChange.bind(this);
	}
	componentDidMount() {
		axios(`/api/comments/${this.props.type}/${this.props.parentId}`, {})
			.then((response) => {
				console.log('NOTES', response);
				this.setState({ notes: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}
	handleNoteChange(e) {
		console.log(e.target.value);
		this.setState({ note: e.target.value });
	}
	addNote(e) {
		console.log('fired');
		axios
			.post(`/api/comments/${this.props.type}/add`, {
				id: this.props.parentId,
				body: this.state.note,
				userId: this.props.userId
			})
			.then((result) => {
				console.log(result);
				this.componentDidMount();
				this.setState({
					note: ''
				});
			})
			.catch((error) => {});
	}
	render() {
		return (
			<Grid>
				<Row>
					<Col md={11} />
					<Col md={1}>
						<Button bsStyle="primary" onClick={this.addNote}>
							+ Note
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Note</ControlLabel>
							<FormControl
								componentClass="textarea"
								placeholder="add note..."
								value={this.state.note}
								onChange={this.handleNoteChange.bind(this)}
							/>
						</FormGroup>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						{this.state.notes.map(function(note) {
							return <Note key={note.id} note={note} />;
						})}
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default NoteList;

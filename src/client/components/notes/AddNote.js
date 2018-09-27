import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';

class AddNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: ''
		};
		this.addNote = this.addNote.bind(this);
		this.handleNoteChange = this.handleNoteChange.bind(this);
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
				this.props.addNote();
				this.setState({
					note: ''
				});
			})
			.catch((error) => {});
	}
	render() {
		return (
			<div>
				<FormGroup controlId="formControlsTextarea" style={{ width: '90%', textAlign: 'center' }}>
					<FormControl
						componentClass="textarea"
						placeholder="add note..."
						value={this.state.note}
						onChange={this.handleNoteChange.bind(this)}
					/>
				</FormGroup>
				<Button onClick={this.addNote}>Submit </Button>
			</div>
		);
	}
}

export default AddNote;

import React, { Component } from 'react';
import { Note, AddNote, MyModal } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, ControlLabel, FormControl, Row, Grid, Col, Button, Label, ListGroup } from 'react-bootstrap';
import axios from 'axios';

class NoteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: '',
			notes: []
		};
		this.addNote = this.addNote.bind(this);
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

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};
	addNote() {
		this.componentDidMount();
		this.hideModal();
	}

	render() {
		return (
			<div>
				<MyModal show={this.state.show} title="Edit Contact" close={this.hideModal} onHide={this.hideModal}>
					<AddNote
						type={this.props.type}
						addNote={this.addNote}
						parentId={this.props.parentId}
						closeModal={this.hideModal}
						userId={this.props.userId}
						contact={this.state.contact}
					/>
				</MyModal>
				<FontAwesomeIcon icon={faPlus} onClick={this.showModal} size="lg" color="#337ab7" />
				<hr />
				<ListGroup>
					{this.state.notes.map(function(note) {
						return <Note key={note.id} note={note} />;
					})}
				</ListGroup>
			</div>
		);
	}
}

export default NoteList;

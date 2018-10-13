import React, { Component } from 'react';
import { Button, Grid, Row, Col, Modal } from 'react-bootstrap';

class MyModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false
		};
	}
	handleClose() {
		this.props.close();
	}

	handleShow() {
		this.setState({ show: true });
	}
	render() {
		return (
			<Modal show={this.props.show} onHide={this.handleClose} bsSize={this.props.size}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{this.props.children}</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default MyModal;

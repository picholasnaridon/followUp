import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageURL: ''
		};

		this.handleUploadImage = this.handleUploadImage.bind(this);
	}

	handleUploadImage(ev) {
		ev.preventDefault();

		const data = new FormData();
		data.append('avatar', this.uploadInput.files[0]);

		fetch(`/api/contacts/${this.props.id}/addPhoto`, {
			method: 'POST',
			body: data
		}).then((response) => {
			response.json().then((body) => {
				this.props.refresh();
			});
		});
	}

	render() {
		return (
			<form onSubmit={this.handleUploadImage}>
				<FormControl
					id="formControlsFile"
					type="file"
					inputRef={(input) => (this.uploadInput = input)}
					label="File"
				/>
				<Button type="submit">Upload</Button>
			</form>
		);
	}
}

export default Upload;

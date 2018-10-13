import React, { Component } from 'react';
import { Upload } from '../components';
import { Thumbnail } from 'react-bootstrap';
import userPhoto from '../../assets/images/userPlaceholder.png';

class Profile extends Component {
	render() {
		return (
			<div>
				<Thumbnail href="#" alt="171x180" src={userPhoto} />
				<Upload endpoint={``} id={this.props.userId} />
			</div>
		);
	}
}

export default Profile;

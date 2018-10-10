import React, { Component } from 'react';
import { MyModal, AddContact, SimpleContactList } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Table, Button } from 'react-bootstrap';

class DealContacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	render() {
		if (this.props.contacts) {
			return (
				<div>
					<FontAwesomeIcon
						icon={faUserPlus}
						onClick={this.showModal}
						size="lg"
						style={{ float: 'right', marginBottom: '2%' }}
						color="#337ab7"
					/>
					<br />
					<SimpleContactList contacts={this.props.contacts} />
					<MyModal show={this.state.show} title="Add Contact" bsSize="lg" close={this.hideModal}>
						<AddContact
							dealId={this.props.dealId}
							close={this.hideModal}
							userId={this.props.userId}
							refresh={this.props.refresh}
						/>
					</MyModal>
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default DealContacts;

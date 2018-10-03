import React, { Component } from 'react';
import { MyModal, AddContact } from '../components';
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
						style={{ float: 'right', marginRight: '5%', marginBottom: '2%' }}
						color="#337ab7"
					/>
					<br />
					<Table>
						<tbody>
							{this.props.contacts.map(function(contact) {
								console.log(contact);
								return (
									<tr key={contact.id}>
										<td>
											<a href={`#/contacts/${contact.id}`}>
												{contact.firstName} {contact.lastName}
											</a>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<MyModal
						show={this.state.show}
						title="Add Contact"
						bsSize="lg"
						close={this.hideModal}
						style={{ margin: '3%' }}
					>
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

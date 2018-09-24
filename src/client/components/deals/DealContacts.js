import React, { Component } from 'react';
import { MyModal, AddContact } from '../components';
import { Table, Button } from 'react-bootstrap';

class DealContacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showModal() {
		this.setState({ show: true });
	}

	hideModal() {
		this.setState({ show: false });
	}

	render() {
		if (this.props.contacts) {
			return (
				<div>
					<Button bsStyle="primary" onClick={this.showModal} style={{ float: 'right' }}>
						+ Contact
					</Button>
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

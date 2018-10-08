import React, { Component } from 'react';
import { NoteList, EditContact, MyModal, ContactInfo, WarningBanner, SimpleDealList } from '../components';
import { Grid, Row, Col, Panel, Thumbnail, Button, Well } from 'react-bootstrap';

class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: null
		};
	}

	componentDidMount() {
		fetch(`/api/contacts/${this.props.match.params.id}`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				this.setState({ contact: json });
			});
	}

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	refresh = () => {
		fetch(`/api/contacts/${this.props.match.params.id}`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				this.setState({ contact: json });
			});
	};

	render() {
		if (this.state.contact) {
			return (
				<Grid>
					<Button bsStyle="success" onClick={this.showModal}>
						Edit Contact
					</Button>
					<Row>
						<Col md={3}>
							<Thumbnail
								href="#"
								alt="171x180"
								src="http://www.nickparidon.com/static/media/me.b920f956.png"
							/>
						</Col>
						<Col md={9}>
							<Well>
								<div>
									<h2>
										{this.state.contact.firstName} {this.state.contact.lastName}
									</h2>
									<MyModal
										show={this.state.show}
										title="Edit Contact"
										close={this.hideModal}
										onHide={this.hideModal}
									>
										<EditContact
											closeModal={this.hideModal}
											contact={this.state.contact}
											refresh={this.refresh}
										/>
									</MyModal>
									<h3>
										<a href={`#/companies/${this.state.contact.Company.id}`}>
											{this.state.contact.Company.name}
										</a>
									</h3>
								</div>
							</Well>
							<Well>
								<ContactInfo contact={this.state.contact} style={{ background: 'grey' }} />
							</Well>
						</Col>
					</Row>
					<Row />
					<Row>
						<Col>
							<Well>
								<h2>Deals</h2>
								<SimpleDealList deals={this.state.contact.Deals} />
							</Well>
						</Col>
					</Row>
					<Row>
						<Col>
							<Well>
								<NoteList
									type="contacts"
									parentId={this.state.contact.id}
									userId={this.state.contact.UserId}
								/>
							</Well>
						</Col>
					</Row>
				</Grid>
			);
		} else {
			return <WarningBanner />;
		}
	}
}

export default Contact;

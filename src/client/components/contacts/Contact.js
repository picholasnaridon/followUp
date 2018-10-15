import React, { Component } from 'react';
import { NoteList, EditContact, MyModal, ContactInfo, LoadingBanner, SimpleDealList } from '../components';
import { Grid, Row, Col, Panel, Thumbnail, Button, Well } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEdit, faHandshake, faUser } from '@fortawesome/free-solid-svg-icons';
import userPhoto from '../../assets/images/userPlaceholder.png';
import Upload from '../file/Upload';

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
					<br />
					<Row>
						<Col md={3}>
							<Thumbnail
								href="#"
								alt="171x180"
								src={this.state.contact.imageUrl ? this.state.contact.imageUrl : userPhoto}
							/>
							<Upload
								endpoint={`/api/contacts/${this.state.contact.id}/addPhoto`}
								id={this.state.contact.id}
								refresh={this.refresh}
							/>
						</Col>
						<Col md={9}>
							<Well>
								<div>
									<h2>
										<FontAwesomeIcon icon={faUser} size={'lg'} /> {this.state.contact.firstName}{' '}
										{this.state.contact.lastName}{' '}
										<span onClick={this.showModal} style={{ float: 'right' }}>
											<FontAwesomeIcon icon={faPencilAlt} size={'xs'} color="#337ab7" />
										</span>
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
							<h4>
								<FontAwesomeIcon icon={faHandshake} size={'lg'} />
							</h4>
							<Well>
								<SimpleDealList deals={this.state.contact.Deals} />
							</Well>
						</Col>
					</Row>
					<Row>
						<Col>
							<h4>
								<FontAwesomeIcon icon={faEdit} size={'lg'} />
							</h4>
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
			return <LoadingBanner />;
		}
	}
}

export default Contact;

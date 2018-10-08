import React, { Component } from 'react';
import { Button, Grid, Row, Col, Well } from 'react-bootstrap';
import { SimpleDealList, SimpleContactList, CompanyInfo, MyModal, EditCompany } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class Company extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: null
		};
	}

	componentDidMount() {
		fetch(`/api/companies/${this.props.match.params.id}`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				this.setState({ company: json });
			});
	}
	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	refresh = () => {
		fetch(`/api/companies/${this.props.match.params.id}`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				this.setState({ company: json });
			});
	};

	render() {
		console.log(this.state.company);
		if (this.state.company) {
			return (
				<div>
					<h2>
						{this.state.company.name}{' '}
						<span onClick={this.showModal}>
							<FontAwesomeIcon icon={faPencilAlt} size={'xs'} color="#337ab7" />
						</span>
					</h2>
					<MyModal
						show={this.state.show}
						title={this.state.company.name}
						close={this.hideModal}
						onHide={this.hideModal}
					>
						<EditCompany close={this.hideModal} company={this.state.company} refresh={this.refresh} />
					</MyModal>
					<CompanyInfo company={this.state.company} />
					<h3>Deals</h3>
					<SimpleDealList deals={this.state.company.Deals} />
					<h3>Contacts</h3>
					<SimpleContactList contacts={this.state.company.Contacts} />
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default Company;

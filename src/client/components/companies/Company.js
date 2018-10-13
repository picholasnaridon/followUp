import React, { Component } from 'react';
import { Button, Grid, Row, Col, Well } from 'react-bootstrap';
import {
	SimpleDealList,
	SimpleContactList,
	CompanyInfo,
	MyModal,
	EditCompany,
	CompanySalesInfo,
	LoadingBanner
} from '../components';
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
		if (this.state.company) {
			return (
				<div>
					<MyModal
						show={this.state.show}
						title={this.state.company.name}
						close={this.hideModal}
						onHide={this.hideModal}
					>
						<EditCompany close={this.hideModal} company={this.state.company} refresh={this.refresh} />
					</MyModal>
					<Grid>
						<Row>
							<Col md={12}>
								<Well>
									<h2>
										{this.state.company.name}{' '}
										<span onClick={this.showModal}>
											<FontAwesomeIcon icon={faPencilAlt} size={'xs'} color="#337ab7" />
										</span>
									</h2>
									<CompanyInfo company={this.state.company} />
								</Well>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Well>
									<h3>Deals</h3>
									<SimpleDealList deals={this.state.company.Deals} />
								</Well>
							</Col>
							<Col md={6}>
								<Well>
									<h3>Contacts</h3>
									<SimpleContactList contacts={this.state.company.Contacts} />
								</Well>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<Well>
									<CompanySalesInfo />
								</Well>
							</Col>
						</Row>
					</Grid>
				</div>
			);
		} else {
			return <LoadingBanner />;
		}
	}
}

export default Company;

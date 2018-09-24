import React, { Component } from 'react';

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

	render() {
		if (this.state.company) {
			return (
				<div>
					<h2>{this.state.company.name}</h2>
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default Company;

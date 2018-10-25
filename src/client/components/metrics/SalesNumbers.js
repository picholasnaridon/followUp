import React, { Component } from 'react';
import { DollarFormat } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

class SalesNumbers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deals: [],
			updates: []
		};
	}
	componentDidMount() {
		fetch(`/api/users/${this.props.userId}/deals`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				this.setState({ deals: json.Deals });
			});

		fetch(`/api/updates/getAll/#{this.props.userId}`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				this.setState({ updates: json.Deals });
			});
	}

	calcDaysToClose() {}

	render() {
		return (
			<div style={{ textAlign: 'right', paddingRight: '20%' }}>
				<FontAwesomeIcon icon={faChartLine} size="4x" color="#777" />
				<div>
					<h3>
						Won (Total): <DollarFormat value={1250} color={true} />
					</h3>
					<h3>
						Lost (Total): <DollarFormat value={-500} color={true} />
					</h3>
					<h3>
						Won (MTD): <DollarFormat value={400} color={true} />
					</h3>
					<h3>
						Won (YTD): <DollarFormat value={1250} color={true} />
					</h3>
					<h3>Average Days to Close: 7</h3>
				</div>
			</div>
		);
	}
}

export default SalesNumbers;

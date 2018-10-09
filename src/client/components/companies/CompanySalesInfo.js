import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { DollarFormat } from '../components';

class CompanySalesInfo extends Component {
	render() {
		return (
			<div>
				<FontAwesomeIcon icon={faChartLine} size={'lg'} />
				<hr />
				<p>
					Sales Won: <DollarFormat color={true} value={200} />
				</p>
				<p>
					Sales lost: <DollarFormat color={true} value={-200} />
				</p>
				<p>
					Sales in Funnel: <DollarFormat color={true} value={3500} />
				</p>
			</div>
		);
	}
}

export default CompanySalesInfo;

import React, { Component } from 'react';

import { DollarFormat } from '../components';

class CompanySalesInfo extends Component {
	render() {
		return (
			<div>
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

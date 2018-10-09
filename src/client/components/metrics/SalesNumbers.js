import React, { Component } from 'react';
import { DollarFormat } from '../components';
class SalesNumbers extends Component {
	render() {
		return (
			<div>
				<h1>KPIs</h1>
				<hr />
				<div style={{ textAlign: 'right' }}>
					<h3>
						Won (Total): <DollarFormat value={500} color={true} />
					</h3>
					<h3>
						Lost (Total): <DollarFormat value={-500} color={true} />
					</h3>
					<h3>
						Won (MTD): <DollarFormat value={500} color={true} />
					</h3>
					<h3>
						Won (YTD): <DollarFormat value={500} color={true} />
					</h3>
					<h3>Average Days to Close: 7</h3>
				</div>
			</div>
		);
	}
}

export default SalesNumbers;

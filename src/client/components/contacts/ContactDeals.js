import React, { Component } from 'react';

class ContactDeals extends Component {
	render() {
		return (
			<div>
				{this.props.deals.map(function(deal) {
					return (
						<div key={deal.id}>
							<a href={`#/deals/${deal.id}`}>{deal.name}</a>
						</div>
					);
				})}
			</div>
		);
	}
}

export default ContactDeals;

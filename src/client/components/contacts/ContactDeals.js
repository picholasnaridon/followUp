import React, { Component } from 'react';

const ContactDeals = (props) => {
	return (
		<div>
			{props.deals.map(function(deal) {
				return (
					<div key={deal.id}>
						<a href={`#/deals/${deal.id}`}>{deal.name}</a>
					</div>
				);
			})}
		</div>
	);
};

export default ContactDeals;

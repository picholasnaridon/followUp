import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactDeals = (props) => {
	return (
		<div>
			{props.contacts.map(function(contact) {
				return (
					<div key={contact.id}>
						<a href={`#/contacts/${contact.id}`}>
							{contact.firstName} {contact.lastName}
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default ContactDeals;

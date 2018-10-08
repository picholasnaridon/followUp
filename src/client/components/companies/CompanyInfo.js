import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';

// ADD COUNTRY
const CompanyInfo = ({ company: { name, phone, fax, email, address1, address2, city, state, zip, country } }) => {
	return (
		<div>
			<h2>Company Info</h2>
			<Table>
				<tbody>
					<tr>
						<td>
							<strong>Phone</strong>
						</td>
						<td>
							<a href={`tel:${phone}`}>{phone}</a>
						</td>
						<td>
							<strong>Mobile</strong>
						</td>
						<td>
							<a href={`tel:${fax}`}>{fax}</a>
						</td>
						<td>
							<strong>Email</strong>
						</td>
						<td>
							<a href={`mailto:${email}`}>{email}</a>
						</td>
					</tr>
					<tr>
						<td>
							<strong>Address 1</strong>
						</td>
						<td>{address1}</td>
						<td>
							<strong>Address 2</strong>
						</td>
						<td>{address2}</td>
						<td>
							<strong>City</strong>
						</td>
						<td>{city}</td>
					</tr>
					<tr>
						<td>
							<strong>State</strong>
						</td>
						<td>{state}</td>
						<td>
							<strong>Zip</strong>
						</td>
						<td>{zip}</td>
						<td>
							<strong>Country</strong>
						</td>
						<td>{country}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};

export default CompanyInfo;

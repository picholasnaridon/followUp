import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';

class ContactInfo extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Panel>
				<h2>Contact Info</h2>
				<Table>
					<tbody>
						<tr>
							<td>
								<strong>Phone</strong>
							</td>
							<td>
								<a href={`tel:${this.props.contact.phone}`}>{this.props.contact.phone}</a>
							</td>
							<td>
								<strong>Mobile</strong>
							</td>
							<td>
								<a href={`tel:${this.props.contact.mobile}`}>{this.props.contact.mobile}</a>
							</td>
							<td>
								<strong>Email</strong>
							</td>
							<td>
								<a href={`mailto:${this.props.contact.email}`}>{this.props.contact.email}</a>
							</td>
						</tr>
						<tr>
							<td>
								<strong>Address 1</strong>
							</td>
							<td>{this.props.contact.address1}</td>
							<td>
								<strong>Address 2</strong>
							</td>
							<td>{this.props.contact.address2}</td>
							<td>
								<strong>City</strong>
							</td>
							<td>{this.props.contact.city}</td>
						</tr>
						<tr>
							<td>
								<strong>State</strong>
							</td>
							<td>{this.props.contact.state}</td>
							<td>
								<strong>Zip</strong>
							</td>
							<td>{this.props.contact.zip}</td>
							<td>
								<strong>Country</strong>
							</td>
							<td>{this.props.contact.country}</td>
						</tr>
					</tbody>
				</Table>
			</Panel>
		);
	}
}

export default ContactInfo;

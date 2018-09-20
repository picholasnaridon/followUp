import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Row, Grid, Col } from 'react-bootstrap';
import ReactTable from 'react-table';
import axios from 'axios';

const columns = [
	{
		Header: 'Name',
		columns: [
			{
				Header: 'Full Name',
				id: 'fullName',
				Cell: (props) => (
					<span className="">
						<a href={'#/contacts/' + props.original.id}>
							{props.original.firstName} {props.original.lastName}
						</a>
					</span>
				)
			},
			{
				Header: 'First Name',
				accessor: 'firstName'
			},
			{
				Header: 'Last Name',
				accessor: 'lastName'
			}
		]
	},
	{
		Header: 'Company',
		columns: [
			{
				Header: 'Company',
				id: 'company',
				Cell: (props) => (
					<span className="">
						<a href={'#/companies/' + props.original.Company.id}>{props.original.Company.name}</a>
					</span>
				)
			}
		]
	},
	{
		Header: 'Address',
		columns: [
			{
				Header: 'Address 1',
				accessor: 'address1'
			},
			{
				Header: 'Address 2',
				accessor: 'address2'
			},
			{
				Header: 'City',
				accessor: 'city'
			},
			{
				Header: 'State',
				accessor: 'state'
			},
			{
				Header: 'Zip',
				accessor: 'zip'
			}
		]
	},
	{
		Header: 'Contact',
		columns: [
			{
				Header: 'Phone',
				accessor: 'phone'
			},
			{
				Header: 'Email',
				accessor: 'email'
			},

			{
				Header: 'Mobile',
				accessor: 'mobile'
			}
		]
	},
	{
		Header: 'Deal Count',
		columns: [
			{
				Header: 'Deal Count',
				accessor: 'Deals',
				Cell: function(props) {
					var total = 0;
					props.original.Deals.forEach(function(deal) {
						total += 1;
					});
					return <span>{total}</span>;
				}
			}
		]
	}
];

class ContactList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: []
		};
	}
	componentDidMount() {
		axios(`/api/contacts`, {
			params: {
				userId: this.props.userId
			}
		}).then((response) => {
			console.log(response);
			this.setState({ contacts: response.data });
		});
	}
	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<h1>Contacts</h1>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<ReactTable
							pageSize={10}
							data={this.state.contacts}
							columns={columns}
							filterable
							defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default ContactList;

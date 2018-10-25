import React, { Component } from 'react';
import axios from 'axios';
import './Map.css';
import { MyModal } from '../components';
import USAMap from 'react-usa-map';
import _ from 'lodash';

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stateMap: [],
			show: false,
			deals: []
		};
	}
	componentDidMount = () => {
		var that = this;
		var dealsByState = {};
		var stateMap = {};
		axios(`/api/contacts`, {
			params: {
				userId: this.props.userId
			}
		}).then((response) => {
			response.data.forEach((contact) => {
				if (_.has(dealsByState, contact.state)) {
					dealsByState[contact.state].push(contact.Deals);
				} else {
					dealsByState[contact.state] = [ contact.Deals ];
				}
			});
			_.forOwn(dealsByState, function(value, key) {
				var green = value.length * 20;
				var blue = value.length * 40;
				stateMap[key] = {
					fill: `rgb(0,${green},${blue})`,
					clickHandler: (event) => that.setDeals(value)
				};
			});
			that.setState({ stateMap: stateMap });
		});
	};
	setDeals = (deals) => {
		var dealList = [];
		deals.forEach((ele) => {
			dealList.push(ele[0]);
		});
		var uniqDealList = _.uniqBy(dealList, 'id');
		this.setState(
			{
				deals: uniqDealList
			},
			function() {
				this.showModal();
			}
		);
	};
	showModal = () => {
		this.setState({
			show: true
		});
	};
	hideModal = () => {
		this.setState({
			show: false,
			deals: []
		});
	};

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<USAMap customize={this.state.stateMap} title="Deals by State" />
				<MyModal
					show={this.state.show}
					title="Deals in this state"
					close={this.hideModal}
					onHide={this.hideModal}
					size="small"
				>
					{this.state.deals.map(function(deal) {
						return (
							<a key={deal.id} href={`/#/deals/${deal.id}`}>
								<div>{deal.name}</div>
							</a>
						);
					})}
				</MyModal>
			</div>
		);
	}
}

export default Map;

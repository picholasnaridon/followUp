import React, { Component } from 'react';
import Stepper from 'react-stepper-horizontal';
import axios from 'axios';

const StageMap = [
	'Closed Lost',
	'Discovery',
	'Initial Meeting',
	'Proposal Sent',
	'Contract Signed',
	'Final Review',
	'Closed Won'
];
class StageStepper extends Component {
	constructor() {
		super();
		this.state = {
			steps: [
				{
					title: 'Closed Lost',
					onClick: (e) => {
						e.preventDefault();
						this.goBack(0);
					}
				},
				{
					title: 'Discovery',
					onClick: (e) => {
						e.preventDefault();
						this.goBack(1);
					}
				},
				{
					title: 'Initial Meeting',
					onClick: (e) => {
						e.preventDefault();
						this.goBack(2);
					}
				},
				{
					title: 'Proposal Sent',
					onClick: (e) => {
						e.preventDefault();
						this.goBack(3);
					}
				},
				{
					title: 'Contract Signed',
					onClick: (e) => {
						e.preventDefault();
						this.goBack(4);
					}
				},
				{
					title: 'Final Review',
					onClick: (e) => {
						e.preventDefault();
						this.goBack(5);
					}
				},
				{
					title: 'Closed Won',
					onClick: (e) => {
						e.preventDefault();
						this.goBack(6);
					}
				}
			],
			currentStep: null
		};
		this.onClickNext = this.onClickNext.bind(this);
	}

	onClickNext = () => {
		this.setState(
			{
				currentStep: this.state.currentStep + 1
			},
			function() {
				this.changeStage(this.state.currentStep);
			}
		);
	};
	goBack(stage) {
		this.setState({
			currentStep: stage
		});
		this.changeStage(stage);
	}
	componentDidMount = () => {
		this.setState({
			currentStep: StageMap.indexOf(this.props.deal.stage)
		});
	};

	changeStage = (stage) => {
		var updatedStage = StageMap[stage];
		console.log(updatedStage);
		var payload = {
			stage: updatedStage
		};
		axios.post('/api/updates/deal/add', {
			updateType: 'stage',
			startingVal: this.props.deal.stage,
			endingVal: updatedStage,
			dealId: this.props.deal.id,
			userId: this.props.deal.UserId,
			creationDate: this.props.deal.createdAt
		});
		fetch(`/api/deals/${this.props.deal.id}/changeStage`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(payload)
		}).then((response) => {
			if (response.ok) {
				response.json().then((json) => {
					this.props.refresh();
				});
			}
		});
	};

	renderNext = () => {
		const buttonStyle = {
			background: '#E0E0E0',
			width: 200,
			padding: 16,
			textAlign: 'center',
			margin: '0 auto',
			marginTop: 32
		};
		if (this.state.currentStep != 6) {
			return (
				<div style={buttonStyle} onClick={this.onClickNext}>
					Next Stage
				</div>
			);
		} else {
			return <div />;
		}
	};
	render() {
		return (
			<div>
				<Stepper steps={this.state.steps} activeStep={this.state.currentStep} />
				{this.renderNext()}
			</div>
		);
	}
}

export default StageStepper;

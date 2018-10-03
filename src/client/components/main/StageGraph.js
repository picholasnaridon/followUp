import React from 'react';
import { Bar } from 'react-chartjs-2';

const funnelOptions = {
	onClick: function(event, bar) {
		location.href = '/#/deals';
	},
	scales: {
		xAxes: [
			{
				gridLines: {
					drawOnChartArea: false
				}
			}
		],
		yAxes: [
			{
				ticks: {
					beginAtZero: true
				},
				gridLines: {
					drawOnChartArea: false
				}
			}
		]
	}
};

const StageGraph = ({ discovery, initialMeeting, proposalSent, contractSigned, finalReview }) => {
	return (
		<div>
			<Bar
				height={500}
				width={700}
				data={{
					datasets: [
						{
							data: [ discovery, initialMeeting, proposalSent, contractSigned, finalReview ],
							backgroundColor: [ '#f4d83a', '#1ee861', '#1abfe0', '#3b50ed', '#dc34e5' ],
							label: 'My Funnel'
						}
					],
					labels: [ 'Discovery', 'Initial Meeting', 'Proposal Sent', 'Contract Signed', 'Final Review' ]
				}}
				options={funnelOptions}
			/>
		</div>
	);
};

export default StageGraph;

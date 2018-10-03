import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const RatioGraph = ({ closedLost, closedWon }) => {
	return (
		<Doughnut
			data={{
				datasets: [
					{
						data: [ closedLost, closedWon ],
						backgroundColor: [ '#f4443a', '#1be246' ]
					}
				],
				labels: [ 'Lost', 'Won' ]
			}}
		/>
	);
};

export default RatioGraph;

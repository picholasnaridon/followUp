import React from 'react';

const DealProgress = (props) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#dadada',
				borderRadius: '2px'
			}}
		>
			<div
				style={{
					width: `${props.progress}%`,
					height: '100%',
					backgroundColor:
						props.progress > 90
							? '#00ff11'
							: props.progress > 66 ? '#85cc00' : props.progress > 33 ? '#ffbf00' : '#ff2e00',
					borderRadius: '2px',
					transition: 'all .2s ease-out'
				}}
			/>
		</div>
	);
};

export default DealProgress;

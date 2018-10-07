import React from 'react';

const DealStatus = (props) => {
	return (
		<span>
			<span
				style={{
					color:
						props.status === 'In Danger' ? '#ff2e00' : props.status === 'Follow Up' ? '#ffbf00' : '#57d500',
					transition: 'all .3s ease'
				}}
			>
				&#x25cf;
			</span>{' '}
			{props.status === 'In Danger' ? 'Danger' : props.status === 'Follow Up' ? `Follow Up` : 'Good'}
		</span>
	);
};

export default DealStatus;

import React from 'react';
import ReactLoading from 'react-loading';
import { Grid, Row, Col } from 'react-bootstrap';

const LoadingBanner = () => {
	return (
		<div
			style={{
				position: 'relative'
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: '51%',
					margin: '-70px 0 0 -170px',
					top: '50%',
					padding: '50px',
					color: 'rgb(53, 126, 221)'
				}}
			>
				<ReactLoading type={'bars'} color={'rgb(53, 126, 221)'} height={340} width={190} />;
			</div>
		</div>
	);
};
export default LoadingBanner;

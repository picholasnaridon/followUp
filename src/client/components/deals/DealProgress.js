import React, { Component } from 'react';

class DealProgress extends Component {
	render() {
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
						width: `${this.props.progress}%`,
						height: '100%',
						backgroundColor:
							this.props.progress > 90
								? '#00ff11'
								: this.props.progress > 66
									? '#85cc00'
									: this.props.progress > 33 ? '#ffbf00' : '#ff2e00',
						borderRadius: '2px',
						transition: 'all .2s ease-out'
					}}
				/>
			</div>
		);
	}
}

export default DealProgress;

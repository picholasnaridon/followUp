import React, { Component } from 'react';

class DollarFormat extends Component {
	render() {
		if (this.props.color) {
			if (this.props.value >= 0) {
				return (
					<span style={{ color: '#1ee861' }}>
						{' '}
						${this.props.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
					</span>
				);
			} else {
				return (
					<span style={{ color: '#c12e2a' }}>
						{' '}
						${this.props.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
					</span>
				);
			}
		} else {
			return <span> ${this.props.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>;
		}
	}
}

export default DollarFormat;

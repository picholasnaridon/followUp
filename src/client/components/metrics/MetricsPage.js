import React, { Component } from 'react';
import { Map, RatioGraph, StageGraph, SourceGraph, SalesNumbers } from '../components';
import { Row, Grid, Col } from 'react-bootstrap';

class MetricsPage extends Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col md={12}>
						<Map userId={this.props.userId} />
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={6} style={{ borderRight: '1px solid rgba(86,61,124,.2)' }}>
						<h4 style={{ textAlign: 'center' }}>Funnel</h4>
						<StageGraph userId={this.props.userId} />
					</Col>
					<Col md={6}>
						<h4 style={{ textAlign: 'center' }}>Close Ratio</h4>
						<RatioGraph userId={this.props.userId} />
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={6} style={{ borderRight: '1px solid rgba(86,61,124,.2)' }}>
						<h4 style={{ textAlign: 'center' }}>Deals by Source</h4>
						<SourceGraph userId={this.props.userId} />
					</Col>
					<Col md={6}>
						<SalesNumbers />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default MetricsPage;

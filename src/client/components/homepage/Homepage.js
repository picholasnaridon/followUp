import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Button, Label, Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profile from '../../assets/images/profile.png';
import deals from '../../assets/images/deals.png';
import metrics from '../../assets/images/metrics.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import philly from '../../assets/images/philly.png';

const styles = {
	textAlign: 'center'
};
const insideStyles = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%,-50%)'
};

class Homepage extends Component {
	render() {
		return (
			<div style={styles}>
				<Parallax>
					<Navbar>
						<Navbar.Header>
							<Navbar.Brand>
								<Link to="/">Follow Up</Link>
							</Navbar.Brand>
						</Navbar.Header>
						<Nav className="pull-right" pullRight>
							<NavItem>
								<Link to="/login">Login</Link>
							</NavItem>
							<NavItem>
								<Link to="/register">Register</Link>
							</NavItem>
						</Nav>
					</Navbar>
				</Parallax>
				<Parallax bgImage={philly} strength={500} style={{ opacity: '1' }}>
					<div style={{ height: 850 }}>
						<div style={insideStyles}>
							<h1
								style={{
									fontSize: '100px',
									color: 'white',
									fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, sans-serif'"
								}}
							>
								<Label bsStyle="primary">Follow Up </Label>
							</h1>
							<br />
							<Link to="/login">
								<Button
									style={{
										margin: '5px'
									}}
									bsStyle="success"
									bsSize="large"
								>
									Login
								</Button>
							</Link>
							<Link to="/register">
								<Button
									style={{
										margin: '5px'
									}}
									bsSize="large"
								>
									Register
								</Button>
							</Link>
						</div>
					</div>
				</Parallax>
				<hr />
				<Parallax style={{ backgroundColor: '#f7f7f7', padding: '5%' }}>
					<Grid>
						<Row>
							<Col md={9}>
								<div style={{ margin: '2%' }}>
									<FontAwesomeIcon icon={faUsers} size="5x" color="#777" />
									<h2 style={{ color: '#777' }}>All your contacts in one place</h2>
									<p style={{ color: '#777' }}>
										Information rich pages for all your important contacts and deals!
									</p>
								</div>
							</Col>
							<Col md={3}>
								<img
									style={{
										width: '300px',
										height: '175px',
										boxShadow: '10px 10px 5px #777'
									}}
									src={profile}
								/>
							</Col>
						</Row>
					</Grid>
				</Parallax>
				<Parallax style={{ backgroundColor: '#ffff', padding: '5%', color: 'white' }}>
					<Grid>
						<Row>
							<Col md={3} mdPush={0}>
								<img
									style={{
										width: '300px',
										height: '175px',
										boxShadow: '10px 10px 5px #777',
										marginBottom: '20px'
									}}
									src={deals}
								/>
							</Col>
							<Col md={9} mdPull={0}>
								<div style={{ margin: '2%' }}>
									<FontAwesomeIcon icon={faSortAmountUp} style={{ color: '#777' }} size="5x" />
									<h2 style={{ color: '#777' }}>Powerful Filters and Sorting</h2>
									<p style={{ color: '#777' }}>
										View your deals, contacts and companies like never before! Filter and sort based
										on anything you want!
									</p>
								</div>
							</Col>
						</Row>
					</Grid>
				</Parallax>
				<Parallax style={{ backgroundColor: '#f7f7f7', padding: '5%' }}>
					<Grid>
						<Row>
							<Col md={9}>
								<div style={{ margin: '2%' }}>
									<FontAwesomeIcon icon={faChartLine} size="5x" style={{ color: '#777' }} />
									<h2 style={{ color: '#777' }}>In Depth Analytics</h2>
									<p style={{ color: '#777' }}>
										Close ratio, revenue, source metrics and more, all your reporting needs at your
										fingertips!
									</p>
								</div>
							</Col>
							<Col md={3}>
								<img
									style={{
										width: '280px',
										height: '175px',
										boxShadow: '10px 10px 5px #777'
									}}
									src={metrics}
								/>
							</Col>
						</Row>
					</Grid>
				</Parallax>
				<h2>{'\u2728'}</h2>
			</div>
		);
	}
}

export default Homepage;

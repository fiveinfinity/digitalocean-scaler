import React, { Component } from 'react';
import { Grid, Button, Row, Col, Jumbotron, Modal } from 'react-bootstrap';
import { Route } from 'react-router';
import { Link, Switch } from 'react-router-dom';

import { Login } from './';

class Boom extends Component {
	constructor (props) {
		super(props);

		this.state = {
			open: false
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick () {
		this.setState({
			open: !this.state.open
		});
	}

	render () {
		const { open } = this.state;

		return <div>
			<Button onClick={this.onClick}>BOOM!</Button>
			<Modal show={open} onHide={this.onClick}>
				<Modal.Header closeButton/>
				<Modal.Body>
					<img src="https://media.giphy.com/media/1vRlMcPvrYMY8/giphy.gif"/>
				</Modal.Body>
			</Modal>
		</div>;
	}
}

class Zen extends Component {
	constructor (props) {
		super(props);
		this.state = {
			message: ''
		};
	}

	componentDidMount () {
		fetch('http://api.github.com/zen')
			.then(res => res.text())
			.then(message => {
				this.setState({
					message
				});
			});
	}

	render () {
		const { message } = this.state;
		return <p>{message}</p>;
	}
}

const Application = () => {
	return <Grid>
		<Row>
			<Col lg={12}>
				<Jumbotron>
					<Row>
						<Col lg={4}>
							<h1>Scaler</h1>
							<Zen/>
							<Boom/>
						</Col>
						<Col lg={8}>
							<iframe id="ls_embed_1504672951" src="https://livestream.com/accounts/1538473/events/1578216/player?width=560&height=315&autoPlay=true&mute=false" width="560" height="315" frameBorder="0" scrolling="no" allowFullScreen></iframe>
						</Col>
					</Row>
				</Jumbotron>
			</Col>
		</Row>
		<Row>
			<Col lg={12}>
				<Switch>
					<Route strict exact path="/">
						<Link to="/login">Login</Link>
					</Route>
					<Route path="/login" component={Login}/>
				</Switch>
			</Col>
		</Row>
	</Grid>;
};

export { Application };
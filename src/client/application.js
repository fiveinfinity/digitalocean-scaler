import React, { Component } from 'react';
import { Grid, Button, Row, Col, Jumbotron, Modal } from 'react-bootstrap';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

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

		const boom = 'https://media.giphy.com/media/1vRlMcPvrYMY8/giphy.gif';

		return <Button key="button" onClick={this.onClick}>
			BOOM!
			<Modal key="modal" show={open} onHide={this.onClick}>
				<Modal.Header closeButton/>
				<Modal.Body>
					<img src={boom}/>
				</Modal.Body>
			</Modal>
		</Button>;
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
	const digitalOceanLoginUrl = 'https://cloud.digitalocean.com/v1/oauth/authorize?client_id=d9e58bd7aee40a8defbcfe169f549d4f7fa642d41909ef6859c851541d0410fc&redirect_uri=http://127.0.0.1:3000/auth/digitalocean/callback&response_type=code'; //eslint-disable-line

	const eagleCam = <iframe
		id="ls_embed_1504672951"
		src="https://livestream.com/accounts/1538473/events/1578216/player?width=560&height=315&autoPlay=true&mute=false" //eslint-disable-line
		width="560"
		height="315"
		frameBorder="0"
		scrolling="no"
		allowFullScreen
	/>;

	return <Grid>
		<Row>
			<Col lg={12}>
				<Jumbotron>
					<Row>
						<Col lg={4}>
							<h1>Scaler</h1>
							<Zen/>
							<Boom/>
							<a href={digitalOceanLoginUrl}>
								<Button>Login</Button>
							</a>
						</Col>
						<Col lg={8} >
							{eagleCam}
						</Col>
					</Row>
				</Jumbotron>
			</Col>
		</Row>
		<Row>
			<Col lg={12}>
				<Switch>
					<Route path="/login" component={Login}/>
				</Switch>
			</Col>
		</Row>
	</Grid>;
};

export { Application };
import React from 'react';
import { Grid, Button, Row, Col } from 'react-bootstrap';

const Application = () => {
	const onClick = () => console.log('BOOM');

	return <Grid>
		<Row>
			<Col lg={12}>
				<Button onClick={onClick}>BOOM!</Button>
			</Col>
		</Row>
	</Grid>;
};

export { Application };
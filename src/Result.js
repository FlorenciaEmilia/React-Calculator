import React, { Component } from 'react';
import './Result.css';

class Result extends Component {
	render() {
		return (
			<div className="nes-container is-rounded display-background">
				<div id="display" className="Result">
					{this.props.input}
				</div>
			</div>
		);
	}
}

export default Result;

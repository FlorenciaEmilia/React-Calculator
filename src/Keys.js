import React, { Component } from 'react';
import Result from './Result';
import './Keys.css';

const math = require('mathjs');

class Keys extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: 0,
			result: 0,
			isButtonDisabled: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleResult = this.handleResult.bind(this);
		this.handleDecimal = this.handleDecimal.bind(this);
		this.handleZeros = this.handleZeros.bind(this);
		this.handleOperation = this.handleOperation.bind(this);
		this.handleANS = this.handleANS.bind(this);
	}

	handleANS(event) {
		//se le suma result al input

		let ANS = '' + this.state.input + this.state.result;

		this.setState({
			input: ANS
		});
	}

	handleOperation(event) {
		this.setState({
			isButtonDisabled: false
		});

		let prevResult = this.state.result + event.target.dataset.value;

		if (this.state.input === '') {
			this.setState({
				input: prevResult
			});
		} else {
			let operations = [ '-', '*', '+', '/' ];
			let nextState;
			let testing = '' + this.state.input + event.target.dataset.value;
			testing = testing.split('');

			if (operations.includes(testing[testing.length - 3]) && operations.includes(testing[testing.length - 2])) {
				nextState = testing.slice(0, -3) + event.target.dataset.value;
			} else if (operations.includes(testing[testing.length - 2]) && testing[testing.length - 1] !== '-') {
				nextState = testing.slice(0, -2).join('') + event.target.dataset.value;
			} else if (operations.includes(testing[testing.length - 2]) && testing[testing.length - 1] === '-') {
				//Si la anteultima letra del estado mas input es una operacion e input es -
				nextState = testing.slice(0, -1).join('') + event.target.dataset.value;
			} else {
				nextState = testing.join('');
			}

			this.setState({
				input: nextState
			});
		}
	}

	handleZeros(event) {
		let valWithZeros = '' + this.state.input + event.target.dataset.value;
		let zeroTrimming = valWithZeros.replace(/^[0]+/, '');
		this.setState({
			input: zeroTrimming
		});
	}

	handleDecimal(event) {
		let decimalVal = '' + this.state.input + event.target.dataset.value;
		this.setState({
			input: decimalVal,
			isButtonDisabled: true
		});
	}

	handleChange(event) {
		//show display, but if it has a bunch of zeros don't display it
		//Dont display any value that starts with 0

		let nextVal = '' + this.state.input + event.target.dataset.value;
		let noZero = nextVal.replace(/^[0]/, '');

		this.setState({
			input: noZero
		});
	}

	handleDelete(event) {
		this.setState({
			input: 0,
			result: 0,
			isButtonDisabled: false
		});
	}

	handleResult(event) {
		let result;
		try {
			result = math.evaluate(this.state.input);
		} catch (err) {
			result = 'Syntax Error';
		}

		this.setState({
			input: '',
			result: result,
			isButtonDisabled: false
		});
	}

	render() {
		let display = this.state.input !== '' ? this.state.input : this.state.result;
		return (
			<div className="nes-container with-title" id="calc-container">
				<Result input={display} />

				<div id="calc-body">
					<div className="row" id="first-row">
						<button id="seven" className="nes-btn" data-value={7} onClick={this.handleChange}>
							7
						</button>
						<button id="eight" className="nes-btn" data-value={8} onClick={this.handleChange}>
							8
						</button>
						<button id="nine" className="nes-btn" data-value={9} onClick={this.handleChange}>
							9
						</button>
						<button id="clear" className="nes-btn is-warning" onClick={this.handleDelete}>
							AC
						</button>
					</div>

					<div className="row">
						<button id="four" className="nes-btn" data-value={4} onClick={this.handleChange}>
							4
						</button>
						<button id="five" className="nes-btn" data-value={5} onClick={this.handleChange}>
							5
						</button>
						<button id="six" className="nes-btn" data-value={6} onClick={this.handleChange}>
							6
						</button>
						<button id="multiply" className="nes-btn" data-value={'*'} onClick={this.handleOperation}>
							x
						</button>
						<button id="divide" className="nes-btn" data-value={'/'} onClick={this.handleOperation}>
							/
						</button>
					</div>

					<div className="row">
						<button id="one" className="nes-btn" data-value={1} onClick={this.handleChange}>
							1
						</button>
						<button id="two" className="nes-btn" data-value={2} onClick={this.handleChange}>
							2
						</button>
						<button id="three" className="nes-btn" data-value={3} onClick={this.handleChange}>
							3
						</button>
						<button id="add" className="nes-btn" data-value={'+'} onClick={this.handleOperation}>
							+
						</button>
						<button id="subtract" className="nes-btn" data-value={'-'} onClick={this.handleOperation}>
							-
						</button>
					</div>

					<div className="row" id="last-row">
						<button id="zero" className="nes-btn" data-value={0} onClick={this.handleZeros}>
							0
						</button>
						<button
							id="decimal"
							className={this.state.isButtonDisabled ? 'nes-btn is-disabled' : 'nes-btn'}
							data-value={'.'}
							onClick={this.handleDecimal}
							disabled={this.state.isButtonDisabled}
						>
							.
						</button>
						<button id="equals" className="nes-btn" onClick={this.handleResult}>
							=
						</button>
						<button id="ANS" className="nes-btn" onClick={this.handleANS}>
							ANS
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Keys;

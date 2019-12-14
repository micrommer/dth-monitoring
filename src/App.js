import React, { Component } from 'react';
import './App.css';
import CanvasJSReact from './assets/canvasjs.react';
import './assets/canvasjs.min.js';
import axios from 'axios';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [
	{ x: 1, y: 10, lineColor: '#f8b195' }
	// { x: 2, y: 13, lineColor: "#f8b195" },
	// { x: 3, y: 18, lineColor: "#f8b195" },
	// { x: 4, y: 20, lineColor: "#f8b195" },
	// { x: 5, y: 17, lineColor: "#f8b195" },
	// { x: 6, y: 10, lineColor: "#f8b195" },
	// { x: 7, y: 13, lineColor: "#f8b195" },
	// { x: 8, y: 18, lineColor: "#f8b195" },
	// { x: 9, y: 20, lineColor: "#f8b195" },
	// { x: 10, y: 17, lineColor: "#f8b195" }
]; //dataPoints.
var xVal = 50;
var updateInterval = 1000;

class App extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		let value = '';
		axios
			.get('http://192.168.43.42:5000/dth')
			.then(function(response) {
				value = response.data;
			})
			.catch(function(error) {
				console.log(error);
			})
			.finally(() => {
				console.log(value);
				value = value.split(',');
				console.log(value[0]);
				dps.push({ x: xVal, y: Number(value[1]), lineColor: '#f8b195' });
				xVal++;
				if (dps.length > 10) {
					dps.shift();
				}
				this.chart.render();
			});
	}
	render() {
		const options = {
			backgroundColor: '#435055',
			theme: 'dark1',
			title: {
				text: 'humidity',
				fontColor: '#f8b195'
			},
			data: [
				{
					markerColor: '#f8b195',
					type: 'line',
					dataPoints: dps
				}
			]
		};

		return (
			<div className="back">
				<div className="container">
					<h2 className="title">DTH Sensor Monitoring</h2>
					<div className="row">
						<div className="col">
							<CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
							{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default App;

import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';

const Chart = ({ data, country }) => {
	const [dailyData, setDailyData] = useState({});

	useEffect(() => {
		const getDailyData = async () => {
			setDailyData(await fetchDailyData());
		};
		getDailyData();
	}, []);

	const lineChart = dailyData.length ? (
		<Line
			data={{
				labels: dailyData.map(({ date }) => date),
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed),
						label: 'Infected',
						borderColor: '#cf4f4f',
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths),
						label: 'Deaths',
						borderColor: '#363636',
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = data.confirmed ? (
		<Bar
			data={{
				labels: ['Infected', 'Recovered', 'Deaths'],
				datasets: [
					{
						label: 'People',
						backgroundColor: ['#cf4f4f', '#469d89', '#363636'],
						data: [
							data.confirmed.value,
							data.recovered.value,
							data.deaths.value,
						],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current state in ${country}` },
			}}
		/>
	) : null;

	return <div className="chart">{country ? barChart : lineChart}</div>;
};

export default Chart;

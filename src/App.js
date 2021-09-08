import React, { useEffect, useState } from 'react';
import './scss/Style.scss';
import Header from './components/Header/Header';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData } from './api';

const App = () => {
	const [data, setData] = useState({});
	const [country, setCountry] = useState('');

	useEffect(() => {
		const getData = async () => {
			setData(await fetchData());
		};
		getData();

		// fetchData().then((data) => {
		// 	setData(data);
		// });
	}, []);

	const handleCountryChange = async (country) => {
		const fetchedCountryData = await fetchData(country);
		setData(fetchedCountryData);
		setCountry(country);
	};

	return (
		<div className="virus-tracker">
			<Header />
			<Cards data={data} />
			<CountryPicker handleCountryChange={handleCountryChange} />
			<Chart data={data} country={country} />
		</div>
	);
};

export default App;

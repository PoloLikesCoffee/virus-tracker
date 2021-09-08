import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const getCountries = async () => {
			setCountries(await fetchCountries());
		};

		getCountries();
	}, [setCountries]);

	return (
		<FormControl className="form-control">
			<NativeSelect
				defaultValue=""
				onChange={(event) => handleCountryChange(event.target.value)}
			>
				<option value="">Global</option>
				{countries.map((country, index) => (
					<option key={index} value={country}>
						{country}
					</option>
				))}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;

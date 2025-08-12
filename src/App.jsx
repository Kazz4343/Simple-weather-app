import React, {use, useEffect, useState} from 'react'

export default function App() {

	const [selectedPage, setSelectedPage] = useState(0)

	const pages = {
		
	}

	const aipKey = `83501566da718b69f323c976141cf54b`

	const [weatherData, setWeatherData] = useState(null);
	const [location, setLocation] = useState('London');
	const [loading, setLoading] = useState(false);
	const [newLocation, setNewLocation] = useState('')

	// const {name, main:{temp, humidity}, weather:{description, id}} = weatherData;

	useEffect(() => {

		
		setLoading(true);
		async function fetchData() {
			try {
				const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${aipKey}`);
				const data = await res.json();
				console.log(data)
				setWeatherData(data);
			} catch(e){
				console.log(e.message)
			} finally {
				setLoading(false);
			}
		}

		fetchData()
	},[location])

	const handleLocationChange = () => {
		setLocation(newLocation);

		
	}

	if (loading || !weatherData) {
		return (
			<div>
				{loading && <p>Loading...</p>}
				{!weatherData && <p>No data available.</p>}
			</div>
		)
	}

	const { name, main, weather, wind } = weatherData;
	const { temp, humidity } = main;
	const { description, id } = weather[0];
	const {speed} = wind;
	let tempC = temp - 273.15;
	return (
		<div>
			<div className='search'>
				<input className='search-input' placeholder={'Enter any City Name...'} type='text' value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
				<button className='search-btn' onClick={handleLocationChange}>Forecast</button>
			</div>
			<div>
				<div className={'container'}>
					<div className={'city-name'}>
						<h3>{name}</h3>
					</div>

					<div className={'temperature'}>
						<i class="fa-solid fa-sun"></i>
						<h1>{tempC.toFixed(2)} C˚</h1>
					</div>

					<div className={'temp-icon'}>
					</div>
				
					<div className='humidity'>
						<p>Today humidity level is {humidity}</p>
						
						
					</div>

					<div className='desc'>
						<p>Today is a {description} day</p>
					</div>

					<div className='wind-speed'>
					<p>Today wind speed is {speed}</p>
					</div>

				</div>
			</div>
		</div>
	)
}

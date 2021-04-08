import React, { useState, useEffect} from 'react';
import './TodayTab.css';
import axios from 'axios';
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

function TodayTab( {coordinates}) {
	const [ forecasts, setForecasts] = useState(null)
	const [ error, setError] = useState(false)
	const [loading, toggleLoading] = useState(false)

	useEffect(()=>{
		async function fetchData(){
			setError(false)
			toggleLoading(true)
			try{
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,daily&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
				console.log(result.data)
				setForecasts([result.data.hourly[3],
					result.data.hourly[5],
					result.data.hourly[7],])
				console.log('hi')

			} catch(e) {
				setError(true)
				console.error(e)
			}
			toggleLoading(false)
		}
		if (coordinates) {
			fetchData();
		}
	},[coordinates])

	return(
		<div className="tab-wrapper">
			{forecasts &&
			<>
				<div className="chart">
					{forecasts.map((forecast) => {
					return <WeatherDetail
					temp={forecast.temp}
					type={forecast.weather[0].main}
					description={forecast.weather[0].description}
					key={forecast.dt}
					wind={forecast.wind_speed}
					/>

				})}
				</div>

				<div className="legend">
					{forecasts && forecasts.map((forecast) => {
						return <span key={forecast.dt}>{createTimeString(forecast.dt)}
						</span>
					})}
				</div>
			</>
			}
				{error && <span>Er is iets misgegaan met het ophalen van de data.</span>}
				{loading && (<span>Loading...</span>)}
		</div>
  );
};

export default TodayTab;

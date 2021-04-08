import React, {useEffect, useState, useContext} from 'react';
import './ForecastTab.css';
import axios from 'axios';
import createDateString from "../../helpers/createDateString";
import { TempContext } from "../../context/TempProvider";
import metricToBeaufort from "../../helpers/metricToBeaufort";



function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState(null);
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { kelvinToMetric } = useContext(TempContext)

    useEffect(() => {
        async function fetchData() {
            toggleLoading(true)
            setError(false)
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);

                console.log(result.data);
                setForecasts(result.data.daily.slice(1, 6))
                console.log(coordinates)

            } catch (e) {
                console.error(e);
                setError(true);
            }
            toggleLoading(false)
        }

        if (coordinates) {
            fetchData();
        }
    }, [coordinates]);

    return (

        <div className="tab-wrapper">

            {forecasts && forecasts.map((forecast) => {
                return (
                    <article className="forecast-day" key={forecast.dt}>
                        <p className="day-description">
                            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="icon"/>
                            {createDateString(forecast.dt)}
                        </p>

                        <section className="forecast-weather">
                            <span>
                                {kelvinToMetric(forecast.temp.day)}
                            </span>
                            <span className="weather-description">
                                {forecast.weather[0].description}
                            </span>
                            <span className="weather-description">
                            windkracht
                                {metricToBeaufort(forecast.wind_speed)}
                            </span>
                        </section>
                    </article>
                )
            })}
            {loading && (<span>
                Loading...
            </span>)}
            {!forecasts && !error && (
                <span className="no-forecast">
                     Zoek eerst een locatie om het weer voor deze week te bekijken
                </span>
            )}
            {error && (
                <span>
                    Er is iets misgegaan met het ophalen van de data.
                </span>
            )}
        </div>
    );
};

export default ForecastTab;

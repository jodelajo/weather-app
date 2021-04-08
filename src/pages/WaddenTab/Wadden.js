import React, { useEffect, useState, useContext }from 'react';
import axios from "axios";
import './Wadden.css';
import { TempContext } from "../../context/TempProvider";
import metricToBeaufort from "../../helpers/metricToBeaufort";

function Wadden (){
    const [weatherData, setWeatherData] = useState(null);
    const [locations, setLocations] = useState('');
    const [error, setError] = useState(false)

    const { kelvinToMetric } = useContext(TempContext)
    const id = 'id=2749334,2744608,2753887,2750417,2759757'
    const urlGroup = `https://api.openweathermap.org/data/2.5/group?${id}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`


    useEffect(() => {
        async function fetchData() {
            setError(false)
            try {
                const result = await axios.get(urlGroup);
                setWeatherData(result.data);
                console.log(result.data);
                setLocations(result.data.list)
                console.log(result.data.list[0].wind.speed)



            } catch (e) {
                console.error(e);
                setError(true);
            }
            // console.log(weatherData.list[0].weather[0].icon)
        }


            fetchData();

    }, []);
    return (
        <div className="tab-wrapper">
            {locations &&
            locations.sort((a, b)=> {
                return a.main.temp > b.main.temp && a.clouds.all > b.clouds.all && a.wind.speed < b.wind.speed ? 1 : -1;
            })
                .map((location) =>{
                return <article className="forecast-day" key={location.name}>
                    <p className="day-description-wadden">
                        <img src={`https://openweathermap.org/img/wn/${location.weather[0].icon}.png`} alt="icon"/>
                        {location.name}
                    </p>

                    <section className="forecast-weather">
                            <span>
                                {kelvinToMetric(location.main.temp)}


                            </span>
                        <span className="weather-description">
                            {location.clouds.all}% bewolkt
                            </span>
                        <span className="weather-description">
                            windkracht
                            {metricToBeaufort(location.wind.speed)}
                            </span>
                    </section>
                </article>
            })}
        </div>
    )
}

export default Wadden
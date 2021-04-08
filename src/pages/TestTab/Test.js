import React, { useEffect, useState, useContext }from 'react';
import axios from "axios";
import './Test.css';
import { TempContext } from "../../context/TempProvider";
import createDateString from "../../helpers/createDateString";

function Test (){
    const [weatherData, setWeatherData] = useState(null);
    const [locations, setLocations] = useState('');
    const [error, setError] = useState(false)

    const { kelvinToMetric } = useContext(TempContext)
    const id = 'id=3383329,184745,524901,5128581,1621177'
    // const cityname = 'Yogyakarta'
    const urlGroup = `https://api.openweathermap.org/data/2.5/group?${id}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`


    useEffect(() => {
        async function fetchData() {
            setError(false)
            try {
                const result = await axios.get(urlGroup);
                setWeatherData(result.data);
                setLocations(result.data.list)
                console.log(result.data)



            } catch (e) {
                console.error(e);
                setError(true);
            }
        }


            fetchData();

    }, []);

    // inventors.sort((a, b) => {
    //     const livedA = a.passed - a.year;
    //     const livedB = b.passed - b.year;
    //     return livedB - livedA;
    // });
    // console.log(inventors);

    return (
        <div className="tab-wrapper">
            {locations &&
            locations.sort((a, b)=> {
                // const
                return a.main.temp > b.main.temp && a.clouds.all > b.clouds.all ? 1 : -1;
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
                    </section>
                </article>
            })}
        </div>
    )
}

export default Test
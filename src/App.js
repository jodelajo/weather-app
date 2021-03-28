import React, {useState, useEffect} from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from 'axios';

const apiKey = 'f43f621257e31de7eef782c9083ce214';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
                setWeatherData(result.data);
                console.log(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        if (location) {
            fetchData();
        }
    }, [location]);

    return (
        <>

            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>
                    <span className="location-details">
                {weatherData &&
                <>
                    <h2>{weatherData.weather[0].description}</h2>
                    <h3>{weatherData.name}</h3>
                    <h1>{weatherData.main.temp}</h1>
                </>
                }
          </span>
                </div>


                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        Alle inhoud van de tabbladen komt hier!
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;

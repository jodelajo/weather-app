import React, {useState, useEffect, useContext} from 'react';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import { TempContext} from "./context/TempProvider";
import Wadden from "./pages/WaddenTab/Wadden";
import ZuidOost from "./pages/ZuidOostTab/ZuidOost";
import Test from "./pages/TestTab/Test";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [error, setError] = useState(false)
    const { kelvinToMetric } = useContext(TempContext)

    useEffect(() => {
        async function fetchData() {
            setError(false)
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
                setWeatherData(result.data);
                console.log(result.data);
                console.log(result.data.name)
            } catch (e) {
                console.error(e);
                setError(true);
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
                    {error && (
                        <span className="wrong-location-error">
                        Oeps! Deze locatie bestaat niet
                        </span>)}
                    <span className="location-details">
                    {weatherData &&
                    <>
                        <h2>{weatherData.weather[0].description}</h2>
                        <h3>{weatherData.name}</h3>
                        <h1>{kelvinToMetric(weatherData.main.temp)}</h1>

                    </>
                    }
                        </span>
                </div>


                {/*CONTENT ------------------ */}
                <Router>
                    <div className="weather-content">
                        <TabBarMenu/>
                        <div className="tab-wrapper">
                            <Switch>
                                <Route exact path="/">
                                    <TodayTab coordinates={weatherData && weatherData.coord}/>
                                </Route>
                                <Route path="/komende-week">
                                    <ForecastTab coordinates={weatherData && weatherData.coord}/>
                                </Route>
                                <Route path="/wadden">
                                    <Wadden />
                                </Route>
                                <Route exact path="/zuidoost">
                                    <ZuidOost />
                                </Route>
                                <Route path="/test">
                                    <Test />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
                <MetricSlider/>
            </div>
        </>
    );
}

export default App;

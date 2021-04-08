import React, { useContext} from 'react';
import './WeatherDetail.css';
import iconMapper from "../../helpers/iconMapper";
import { TempContext} from "../../context/TempProvider";
import metricToBeaufort from "../../helpers/metricToBeaufort";



function WeatherDetail({description, temp, type, wind}) {
    const { kelvinToMetric } = useContext(TempContext);


  return (
    <section className="day-part">
      <span className="icon-wrapper">
          {iconMapper(type)}

      </span>
      <p className="description">{description}</p>
      <p>{kelvinToMetric(temp)}</p>
        <p className="windkracht">{`Windkracht ${metricToBeaufort(wind)}`}</p>
    </section>
  );
};

export default WeatherDetail;

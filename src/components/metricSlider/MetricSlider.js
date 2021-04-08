import React, {useState, useContext, useEffect} from 'react';
import './MetricSlider.css';
import { TempContext} from "../../context/TempProvider";

const MetricSlider = () => {
    const [checked, toggleChecked] = useState(false);
    const { toggleTemp } = useContext(TempContext);

    useEffect(() =>{
      toggleTemp();
    },[checked])

  return (
    <div className="weather-container-extention">
      Weergeven in

      <p className="switch-label">
        C &deg;
      </p>

      <span className="switch-wrapper">
        <input
          type="checkbox"
          className="switch"
          id="metric-system"
          checked={checked}
          onClick={() => toggleChecked(!checked)}
        />

        <label
          htmlFor="metric-system"
          className="switch-btn"
        />
      </span>

      <p className="switch-label">
        &deg; F
      </p>
    </div>
  );
};

export default MetricSlider;

import React, { useEffect, useState } from 'react';
import WeatherDay from './WeatherDay/WeatherDay';
import './style.css';
import Location from './Location.js/Location';

function App() {

  const apikey = '5nisfJq8Ap05rOkcJz0Gksw7CoHWAtTO';
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [locationkey, setlocationkey] = useState();
  const [location, setLocation] = useState('');

  const padNum = (num) => {
    const stringNum = num + '';
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return '0' + stringNum;
    } else {
      return stringNum;
    }
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {

    if (locationkey) {
      fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationkey}?apikey=${apikey}`)
        .then(res => res.json())
        .then(res => {
          console.log(daysOfWeek[new Date(res.DailyForecasts[0].Date).getDay()]);
          if (res.DailyForecasts && res.DailyForecasts.length > 0) {
            setWeatherInfo(res.DailyForecasts.map(df => ({
              min: df.Temperature.Minimum.Value,
              max: df.Temperature.Maximum.Value,
              weatherType: df.Day.IconPhrase,
              weatherKey: padNum(df.Day.Icon),
              dayOfWeek: new Date(df.Date).getDay(),
            })));
          }
        })
    }
  }, [locationkey]);

  return (
    <div>
      <Location
        onCityFound={cityInfo => {
          setlocationkey(cityInfo.key);
          setLocation(cityInfo.name + ', ' + cityInfo.state);
        }}
      />
      <p>{location}</p>
      <div className="main">
        {weatherInfo.map((weatherDay, index) => (
          <div className='day'>
            <WeatherDay
              key={index}
              min={weatherDay.min}
              max={weatherDay.max}
              weatherType={weatherDay.weatherType}
              weatherKey={weatherDay.weatherKey}
              dayOfWeek={daysOfWeek[weatherDay.dayOfWeek]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

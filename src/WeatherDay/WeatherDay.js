import React from 'react'

const WeatherDay = ({min,max,weatherType,weatherKey,dayOfWeek}) => {

    
console.log("day",dayOfWeek)

const imgUrl=`http://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`
console.log(imgUrl) 
return (
    <div>
 
 <h1>{dayOfWeek}</h1>
        <img 
        src={imgUrl} 
            alt='weather-type'
        />
    <div>Min:{min} Max:{max}</div>
    </div>
  )
}

export default WeatherDay
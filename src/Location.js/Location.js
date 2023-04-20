import React, { useState } from 'react'

const Location = ({onCityFound}) => {

const[zipcode,setZipcode]=useState('')
const api_key='5nisfJq8Ap05rOkcJz0Gksw7CoHWAtTO';
// const zipCode=30301;

const getLocation = (zip) => {
    console.log(zip);
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/us/search?apikey=${api_key}&q=${zip}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const result = data[0];
          onCityFound({
            name: result.LocalizedName,
            key: result.Key,
            state: result.AdministrativeArea.ID,
          });
        }
      })
      .catch(err => console.log(err));
  };
  
  

  return (
    <div className='main-1'>
        <input
        placeholder='zip code'
            value={zipcode}
            onChange={e=>setZipcode(e.target.value)}
        />
        <button onClick={getLocation(zipcode)}>Search</button>
    </div>
  )
}

export default Location
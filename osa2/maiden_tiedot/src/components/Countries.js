import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = ({country}) => {
  const [weatherState, setWeatherState] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
      //console.log(response.data)
      setWeatherState(response.data.current)
      })
    }, [country, api_key])
  
  if (weatherState===null) {
    return null
  }
  //console.log(weatherState)
  return (
    <div>
      <span><b>Temperature:</b> {weatherState.temperature}</span>
      <div>
        <img src={weatherState.weather_icons[0]} width="150" height="100" alt="" />
      </div>
      <span><b>Wind:</b> {weatherState.wind_speed} mph direction {weatherState.wind_dir}</span>
    </div>
  )
}

const CountryDetails = ( {country}) => {
  //console.log(country.name)
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="150" height="100" alt="" />
      <Weather country={country} />
    </div>
  )
}

const Countries = ({ countries, filter, detailHandler} ) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  //console.log(filteredCountries.length)
  if (filteredCountries.length === 1) {
    return <CountryDetails country = {filteredCountries[0]} />
  }
  return (
    <div>
      {filteredCountries.slice(0, 10).map(country => (
        <div key={country.name}>
          <br />
          <label key={country.name}>{country.name} </label>
          <button onClick={() => detailHandler(country.name)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries
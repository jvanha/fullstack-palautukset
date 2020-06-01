import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [findState, setFindState] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    //console.log('use effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }, [])
  
  return (
    
    <div>
      <input value={findState} onChange={(event) => (setFindState(event.target.value))} />
      <Countries countries={countries} filter={findState} detailHandler={(x) => {setFindState(x)}}/>
    </div>
  );
}

export default App;

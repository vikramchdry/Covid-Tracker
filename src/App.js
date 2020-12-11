
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';


//useEffect = Runs a piece of code

//based on a given Condition 

function App() {
  const [country, setCountry] = useState(["WorldWide"]);
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    // the code inside here will run once when the component loads and not again
    //async -> send a request , wait for it , do something with  the info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())

        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }
          ));
          setCountries(countries);
        })

    };
    getCountriesData();

  }, []);
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

      })
  };
  console.log(countryInfo)

  return (

    <div className="app" >
      <div className="app__left">

        {/*Header */}
        {/*Title + select input drrop down menu */}
        {/*info boxes*/}
        {/*Tables */}
        {/*Graph*/}
        {/*map*/}
        <div className="app__header">

          <h1>COVID-19 TRACKER 🚀 </h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              { /*<MenuItem>WorldWide</MenuItem>
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
           <MenuItem>Option 3</MenuItem>*/}
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>

          </FormControl>

        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={2000} />
          <InfoBox title="Recoverd cases" cases={countryInfo.todayRecovered} total={3000} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={4000} />
          {/*info boxes*/}
        </div>
        {/*---------------------------------------------------------------------------------------------*/}

        <div>
          <Map />
        </div>
      </div>
      {/*table */}
      {/*graph*/}
      <Card className="app__right">
        <CardContent>
          <h3> Live cases by country</h3>
          <h3> Worldwide new cases</h3>
        </CardContent>

      </Card>

    </div >

  );
}

export default App;

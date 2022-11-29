import React, { useEffect, useState } from 'react';
import "./App.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem, Button, FormControl, Select, Card, CardContent} from '@mui/material';
import InfoBox from "./InfoBox"
import LineGraph from './LineGraph';
import Map from "./Map"
import Table from "./Table"
import { prettyPrintStat} from "./util";



const theme = createTheme({
  palette: {
    glass: {
      main: '#ffffff2e',
      contrastText: '#1976d2',
    },
  },
});

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  
  useEffect(() => { 
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response =>  response.json())
    .then(data => {
      setCountryInfo(data)
    })
  },[])

  useEffect(() => {
    const getCountriesData = async () => {
       await fetch('https://disease.sh/v3/covid-19/countries')
       .then((response) => response.json())
       .then(data => {
         const countries = data.map(country => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
         ));
        
          setTableData(data)
          setMapCountries(data)
         setCountries(countries);
        })
    }
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    
    const url = countryCode === "worldwide" 
    ? 'https://disease.sh/v3/covid-19/all'
    :  `https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
     
      setCountryInfo(data);
     countryCode === "worldwide" ? setMapCenter([34.80746, -40.4796]) : setMapCenter( [data.countryInfo.lat, data.countryInfo.long]);
      
      countryCode === "worldwide" ? setMapZoom(3) : setMapZoom(4);
    })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
       
          <FormControl className="app__dropdown">
            <Select 
            variant="outlined"
            onChange={onCountryChange}
            value={country}
            >
            <MenuItem value="worldwide">WorldWide</MenuItem>
            { countries.map(country =><MenuItem value={country.value}>{country.name}</MenuItem> )}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox isRed active={casesType === "cases"} onClick={() => setCasesType("cases")} title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>
          <InfoBox active={casesType === "recovered"} onClick={()=> setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
          <InfoBox isRed active={casesType === "deaths"} onClick={() => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>
          
        </div>
        <Map
         countries={mapCountries}
         casesType={casesType}
         center={mapCenter}
         zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries = {tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType= {casesType} />
        </CardContent>
      </Card>
     

  
  
    </div>
  );
}

export default App;

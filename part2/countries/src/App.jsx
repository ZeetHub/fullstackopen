import { useState, useEffect } from "react";
import axios from "axios";

const Print = ({ country, weather }) => {
  const languages = country.languages ? Object.values(country.languages) : [];

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        style={{ width: "150px", border: "1px solid #ccc" }}
      />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather?.main?.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
      />
      <p>Wind {weather?.wind?.speed} m/s</p>
    </div>
  );
};

const Country = ({ commonNames, value, showCountry }) => {
  const names = commonNames.filter((common) =>
    common.toLowerCase().includes(value.toLowerCase())
  );

  if (!commonNames.length) {
    return <h2>Loading Countries. Please Wait</h2>;
  }

  if (commonNames.length && value) {
    if (names.length >= 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (names.length >= 1 && names.length < 10) {
      return (
        <ul>
          {names.map((n) => (
            <li key={n}>
              {n}
              <button onClick={() => showCountry(n)}>Show</button>
            </li>
          ))}
        </ul>
      );
    } else {
      return <h3>Country Not Found</h3>;
    }
  }
};

const App = () => {
  const [value, setvalue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [commonNames, setCommonNames] = useState([]);
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);

  const api_key = import.meta.env.VITE_WEATHER_KEY;

  const showCountry = (chosenCountry) => {
    const country = allCountries.find((c) => c.name.common === chosenCountry);
    setSelected(country);
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const countries = response.data;
        setAllCountries(countries);
        const cNames = countries.map((c) => c.name.common);
        setCommonNames(cNames);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const city = selected ? selected.capital[0] : null;

    if (!city) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        const cityWeather = response.data;
        setWeather(cityWeather);
      })
      .catch((err) => console.error(err));
  }, [selected]);

  const onChange = (event) => {
    setvalue(event.target.value);
    setSelected(null);
  };

  return (
    <div>
      find countries: <input value={value} onChange={onChange} />
      {value ? (
        <Country
          commonNames={commonNames}
          value={value}
          showCountry={showCountry}
        />
      ) : null}
      {selected ? <Print country={selected} weather={weather} /> : null}
    </div>
  );
};

export default App;

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let api_key = "0a54443f47461f28d07a6674da213192";
  let api_url = "http://api.openweathermap.org/data/2.5/weather?q=";
  const [city, setCity] = useState("paveh");
  const [data, setData] = useState({});

  const fetchData = (e) => {
    if (e.key == "Enter") {
      axios.get(`${api_url}${city}&appid=${api_key}`).then((res) => {
        setData(res.data);
      });
    }
  };

  const dateBuilder = () => {
    let d = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  useEffect(() => {
    fetchData({ key: "Enter" });
  }, []);

  return (
    <div className="App">
      <div className={data.main && data.main.temp - 273.15 > 16 ? 'bg-warm container' : 'container'}>
        <div className="main">
          <input
            type="text"
            className="searchbar"
            label="Search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyUp={(e) => fetchData(e)}
          ></input>
          <div className="information text-center">
            <div className="location">
              {data.name}, {data.sys && data.sys.country}
            </div>
            <div className="date">{dateBuilder()}</div>
          </div>

          <div className="weather-temp text-center">
            <div className="temp">
              {data.main && Math.round(data.main.temp - 273.15)}°C
            </div>
            <div className="weather">
              {data.weather && data.weather[0].main}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import axios from 'axios';
import React, {useState, useEffect} from 'react'
import '../App.css';




function Weather() {
    const [cityName, setCityName] = useState('Permite al navegador usar tu ubicación')
    const [weather, setWheather] =  useState('')
    const [temp, setTemp] = useState('')
    const [icon, setIcon] = useState('')
    
    
    const getCoords = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let long =position.coords.longitude;
            /* console.log(lat, long); */
            getQuotesFromGit(lat, long)
        });
    }
    
      const getQuotesFromGit = (lat, long) => {
          /* console.log(long); */
          const url23 =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=affd83b755bcb8082582ba5850494c13`
          console.log(url23);
          const promise = axios(url23);
           promise.then((res) => {
              console.log(res.data)
              setCityName(`${res.data.name}, ${res.data.sys.country}`)
              setWheather(res.data.weather[0].description)
              setTemp(Math.round(res.data.main.temp - 273.15))
              setIcon(res.data.weather[0].icon)
          })
        };



    const effectCallback = () => {
        getCoords()
      };
    
    useEffect(effectCallback);

    
    return(
        <div>
            <div className="wrapper">
                <div>
                    <h2>{cityName}</h2>
                    <p className="temp">{temp}°</p>
                </div>
                <div className="data">
                    <img src={`/images/${icon}.png`}/>
                    <p>{weather}</p>
                </div>
            </div>
        </div>
    )
}

export default Weather
import React, { Component } from 'react';
import './mainPage.css';
import Chart from '../../components/chart/chart';
import ForcastBox from '../../components/forcastBox/forcastBox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

const API_KEY = 'c0a2d9288f452c1bc032007e2a3bd662';

class MainPage extends Component {
    state={
        backgrounds : {
            sun : "URL('https://images.unsplash.com/photo-1543772204-2cc21eb14509?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80')",
            rain : "URL('https://images.unsplash.com/photo-1503429134808-fdf0cd4e1bfa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80')",
            snow : "URL('https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80')",
        },
        moreBtnStatus: true,
        temperature: undefined,
        min: undefined,
        max: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        weatherMain: undefined,
        description: undefined,
        pressure:undefined,
        sunrise: undefined,
        sunset: undefined,
        windSpeed: undefined,
        error: undefined,
        forecastTemp: [],
        forecastTempHigh: [],
        forecastTempLow: [],
        futureWeather: [],
      }

      componentDidMount() {
          this.getWeather();
          this.getForecast();


      }



      getWeather = async () => {

        const city = "New York";
        const country = "US";
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        if (city && country) {
          this.setState({
            temperature: parseInt(data.main.temp),
            min: parseInt(data.main.temp_min),
            max: parseInt(data.main.temp_max),
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            pressure:parseInt(data.main.pressure),
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            windSpeed: data.wind.speed,
            description: data.weather[0].description,
            weatherMain: data.weather[0].main,
            error: ""
          });
        } else {
          this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            min: undefined,
            max: undefined,
            pressure:undefined,
            sunrise: undefined,
            sunset: undefined,
            windSpeed: undefined,
            error: "Error"
          });
        }
      }

      getForecast = async () => { 
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=40.71&lon=-74.01&exclude=current&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        let futureTemps = [];
        let futureTempsMin = [];
        let futureTempsMax = [];
        let futureWeather = [];
        data.daily.map(el => futureTemps.push(parseInt(el.temp.day)));
        data.daily.map(el => futureTempsMin.push(parseInt(el.temp.min)));
        data.daily.map(el => futureTempsMax.push(parseInt(el.temp.max)));
        data.daily.map((el, index) => futureWeather.push(el.weather[0].main));
        this.setState({forecastTemp : futureTemps, forecastTempHigh: futureTempsMax, forecastTempLow: futureTempsMin, futureWeather : futureWeather});
        
      }
    
    moreBtnHandler = () => { 
        this.state.moreBtnStatus === true ? this.setState({moreBtnStatus : false}) : this.setState({moreBtnStatus : true});
    }

    convertTimestamp = (timestamp) => {
        var d = new Date(timestamp * 1000),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'am',
            hour;
                
        if (hh > 12) {
            h = hh - 12;
            ampm = 'pm';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }
    
        hour = h + ':' + min + ' ' + ampm
		
	return hour;
}




    render() { 

        return (
            <div className="MainPage" style={{backgroundImage: this.state.weatherMain === 'Rain' ? this.state.backgrounds.rain : this.state.weatherMain === 'Snow' ? this.state.backgrounds.snow : this.state.backgrounds.sun }}>
                {/* main box - current status  */}
                <div className="currentStatus">
                    <div className="cityName">{this.state.city}, {this.state.country}</div>
                    <div className="Temperature">{this.state.temperature}°</div>
                    <div className="status">{this.state.description}</div>
                    <div className="highLow">H: {this.state.max}°  L: {this.state.min}°</div>
                </div>

                {/* 7days forcast chart */}
                <div className="sevendaysTable">
                    {this.state.forecastTemp.map((el, index) =>
                        <ForcastBox temp={el} weather={this.state.futureWeather[index]} key={index}/>
                    )}
                </div>
                <div className="sevenDaysChart">
                    <Chart dataMax={this.state.forecastTempHigh} dataMin={this.state.forecastTempLow} />
                </div>

                {/* Extra detail - wind speed / humidity / pressure / sunrise and sunset time */}
                <div className="moreBtn">
                    <button className="more" onClick={this.moreBtnHandler} style={{display : this.state.moreBtnStatus ? 'block' : 'none'}}>See More <br /><FontAwesomeIcon icon={faSortDown} /></button>
                </div>
                <div className="moreInfo">
                    <div className="extraInfo" style={{display : this.state.moreBtnStatus ? 'none' : 'flex'}}>
                            <div className="extraBox">
                                <p className='extraBoxTitle'>Wind Speed</p>
                                <p className="extraBoxDetail">{this.state.windSpeed} <span className="unit">Km</span></p>
                            </div>
                            <div className="extraBox">
                                <p className='extraBoxTitle'>Humidity</p>
                                <p className="extraBoxDetail">{this.state.humidity}%</p>
                            </div>
                    </div>
                    <div className="extraInfo" style={{display : this.state.moreBtnStatus ? 'none' : 'flex'}}>
                            <div className="extraBox">
                                <p className='extraBoxTitle'>Pressure</p>
                                <p className="extraBoxDetail">{this.state.pressure} <span className="unit">hPa</span></p>
                            </div>
                            <div className="extraBox">
                                <p className='extraBoxTitle'>Sunrise-Sunset</p>
                                <p className="extraBoxDetail" style={{marginTop: 0, fontSize: '2rem'}}>{this.convertTimestamp(this.state.sunrise)}<br /> {this.convertTimestamp(this.state.sunset)}</p>
                            </div>
                    </div>
                    <button className="more" onClick={this.moreBtnHandler} style={{display : this.state.moreBtnStatus ? 'none' : 'block'}}><FontAwesomeIcon icon={faSortUp} /><br />See Less </button>
                </div>

            </div>
        );
    }
}
 
export default MainPage;
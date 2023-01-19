import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0.0,
            longitude: 0.0,
            city: '',
            weather: '',
            temperature: 0,
        };
    }

    componentDidMount() {
        this.getWeatherInfo();
    }

    getWeatherInfo = async () => {
        const location = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { coords } = await location;

        this.setState({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.169392&lon=71.449074&appid=5341ad12e6797845d66359640cb3c82e&units=metric`);

        const data = await res.json();

        this.setState({
            weather: data.weather[0].description,
            temperature: data.main.temp,
            city: data.name,
        });
    }


    render() {
        const { temperature } = this.state;
        let warning = 'The weather is ' + this.state.weather + '. Current temperature in ' + this.state.city + ' is ' + temperature + '°C. ';
        if (temperature < 10) {
            warning += 'It is freezing outside. It is recommended to exercise home or in gym.';
        } else if(temperature >= 10 && temperature < 20) {
            warning += 'It is cold outside. Consider wearing a warm clothes outside.';
        } else if(temperature >= 20) {
            warning += 'It is warm outside. Nice weather for exercising outside.';
        } else {
            warning += 'It is raining outside. Consider wearing a warm clothes outside.';
        }
        warning += " Stay healthy!";

        return (
            <div className='homepage' >
                <p className='title'>Hello, World!</p>
                <p>
                    SportPlus<b>+</b> is a simple web-application that allows you to log your daily exercises.
                </p>
                <p><b>Available Functions:</b></p>
                <Link to='/create'><button id='createlog'>Create a new exercise log</button></Link>
                <Link to='/exercises'><button id='exlog' >View your exercise logs</button></Link>
                <p id='weather'>{warning}</p>
            </div>
        );
    }
}
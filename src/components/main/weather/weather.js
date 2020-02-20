import React from 'react';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {},            // информация о погоде
            visibleBtn : true       // видимость кнопки погоды
        }        
    }    

    message = async (lat, lon) => {           
        let info = {}
        // запрос погоды по координатам
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fe8e6afa1048f31c27cad99df09ca475&lang=ru&units=metric`); 
        if (response.ok) {  
            // ответ 
            let data = await response.json();
            
            let img = data.weather[0].icon; 
            // запрос изображения           
            let responseImg = await fetch(`http://openweathermap.org/img/wn/${img}@2x.png`);
            // ответ 
            let blob = await responseImg.blob();
            let src = URL.createObjectURL(blob);
            // информация о погоде 
            info = {
                city: data.name,                                            // название города
                temp: data.main.temp,                                       // температура в градусах цельсия
                description: data.weather[0].description,                   // описание погоды 
                humidity: data.main.humidity,                               // влажность, %
                pressure: Math.floor((data.main.pressure*100)/133.3224),    // давление, мм.рт.ст
                wind: data.wind.speed,                                      // скорость ветра, м/с
                imgSrc: src                                                 // ссылка на изображение
            }   
            
            // обновление состояния        
            this.setState({
                weather: info,
                visibleBtn: false
            })
            
        } else {            
            this.setState({
                weather: {
                    error: 'Ошибка ' + response.status
                }
            })            
        }
    }

    // получение информации о погоде в вашем городе
    getWeather = () => {        
        // создаём промис 
        let getPosition = function() {
            return new Promise(function (resolve, reject) {
                // получаем координаты
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        }
          
        getPosition()
        .then((position) => {
            // получаем координаты
            let lat = position.coords.latitude;
            let lon = position.coords.longitude; 
            // запрос погоды по координатам  
            this.message(lat, lon);
        })
        .catch((err) => {
            console.error(err.message);
        });

    }

    // первую букву описания погоды делаем заглавной 
    description() {        
        if (Object.keys(this.state.weather).length !== 0) {
            return this.state.weather.description[0].toUpperCase() + this.state.weather.description.slice(1);
        }
    }

    render() {
        const weather = this.state.weather;
        // установка знака "+" при положительных температурах
        const sign = weather.temp > 0 ? '+' : '';
        const description = this.description();
        return(
            <div>
                Неплохо было бы прогуляться!)
                <br />
                {this.state.visibleBtn && 
                    <button 
                        className="button"
                        onClick={this.getWeather}>
                        Узнать погоду в вашем городе!
                    </button>
                }
                
                {Object.keys(this.state.weather).length !== 0 &&
                    <div className="weather__info">
                        <div className="weather__city">{weather.city}</div>
                        <div className="weather__flex">
                            <div className="weather__temp">{sign}{weather.temp} </div>
                            <div className="weather__img"><img src={weather.imgSrc} /></div>
                        </div>
                        <div className="weather__description">{description}</div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Скорость ветра</td>
                                    <td>{weather.wind} м/с</td>
                                </tr>
                                <tr>
                                    <td>Давление</td>
                                    <td>{weather.pressure} мм.рт.ст</td>
                                </tr>
                                <tr>
                                    <td>Влажность</td>
                                    <td> {weather.humidity} %</td>
                                </tr>
                            </thead>
                        </table>
                        {weather.error}
                    </div>
                }
            </div>
        ); 
    }
}
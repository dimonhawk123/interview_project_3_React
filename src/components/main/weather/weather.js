import React from 'react';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {},
            visibleBtn : true
            // imgSrc: ''
        }
        // this.error = '';
        // this.data = '';
        // this.lat = 0;
        // this.lon = 0;
    }

    // async searchPos() {      
    //     let myLocation = function(position) {
    //         let lat = position.coords.latitude;
    //         let lon = position.coords.longitude;        
    //         console.log(lat, lon);
    //         return [lat,lon];
            
    //     }   

    //     let promise = new Promise((resolve, reject) => {
    //         resolve(navigator.geolocation.getCurrentPosition(myLocation));
    //     })

    //     let result = await promise;    
    //     console.log(result);
    // }

    
    // var getPosition = function (options) {
    //     return new Promise(function (resolve, reject) {
    //       navigator.geolocation.getCurrentPosition(resolve, reject, options);
    //     });
    //   }
      
    //   getPosition()
    //     .then((position) => {
    //       console.log(position);
    //     })
    //     .catch((err) => {
    //       console.error(err.message);
    //     });

    

    message = async (lat, lon) => {           
        let info = {}
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fe8e6afa1048f31c27cad99df09ca475&lang=ru&units=metric`); 
        if (response.ok) {   
            let data = await response.json();
            console.log(data);
            let img = data.weather[0].icon;
            // console.log(img);
            let responseImg = await fetch(`http://openweathermap.org/img/wn/${img}@2x.png`);
            let blob = await responseImg.blob();
            let src = URL.createObjectURL(blob);
            // console.log(src);
            // this.setState({
            //     imgSrc: src
            // });
            info = {
                city: data.name,
                temp: data.main.temp,
                description: data.weather.description,
                humidity: data.main.humidity,
                pressure: Math.floor((data.main.pressure*100)/133.3224),
                wind: data.wind.speed,
                imgSrc: src
            }          
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
            // this.error = 'Ошибка ' + response.status;
        }
    }

    getWeather = () => {
        
        // this.getPosition();
        // this.message;
        // console.log(this.lat);
        let getPosition = function() {
            return new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        }
          
          getPosition()
            .then((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;        
                console.log(lat, lon);
                this.message(lat, lon);
            })
            .catch((err) => {
                console.error(err.message);
            });

    }

    render() {
        const weather = this.state.weather;
        return(
            <div>
                Неплохо было бы прогуляться!)
                <br />
                {this.state.visibleBtn && 
                    <button onClick={this.getWeather}>
                        Узнать погоду в вашем городе!
                    </button>
                }
                
                <div>
                    <img src={weather.imgSrc} />
                    {weather.temp} <br />
                    {weather.pressure}
                    {weather.error}
                </div>
            </div>
        ); 
    }
}
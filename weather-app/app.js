import request from 'request'
import * as weather from './utils/weather.js'
import * as geocode from './utils/geocode.js'
import chalk from 'chalk';

geocode.getGeocode('Smolenice', (error, data) =>{
    if(error){
        console.log(chalk.red('Error: ' + error))
    }else{
        console.log(chalk.blue('Location: ') + data.location)
        weather.getWeather(data.latitude, data.longitude, (error, weatherData) => {
            if(error){
                console.log(chalk.red('Error: ' + error))
            }else{
                console.log(weatherData.forecast)
            }
        })
    }  
})
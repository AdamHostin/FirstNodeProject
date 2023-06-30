import * as weather from './utils/weather.js'
import * as geocode from './utils/geocode.js'
import chalk from 'chalk';

geocode.getGeocode(process.argv[2], (error, {latitude, longitude, location} = {}) =>{
    if(error){
        return console.log(chalk.red('Error: ' + error))
    }
    weather.getWeather(latitude, longitude, (error, {forecast} = {}) => {
        if(error){
            return console.log(chalk.red('Error: ' + error))
        }
        console.log(chalk.blue('Location: ') + location)
        console.log(forecast)
    })
      
})
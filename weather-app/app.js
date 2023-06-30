import * as weather from './utils/weather.js'
import * as geocode from './utils/geocode.js'
import chalk from 'chalk';

export const getWeatherByLocation = (location, callback) =>{
    geocode.getGeocode(location, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            callback(chalk.red('Error: ' + error), undefined)
            return 
        }
        weather.getWeather(latitude, longitude, (error, {forecast} = {}) => {
            if(error){
                callback(chalk.red('Error: ' + error), undefined)
                return
            }
            const data = {
                location:  location,
                forecast
            }
            callback(undefined, data)
            return
        })
    })
}

getWeatherByLocation(process.argv[2], (error, data) =>{
    if(error){
        console.log(error)
        return
    }
    console.log(chalk.blue('Location: ') + data.location + '\n' + chalk.blue('Weather: ') + data.forecast)
})
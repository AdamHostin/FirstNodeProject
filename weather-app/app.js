import * as weather from './utils/weather.js'
import * as geocode from './utils/geocode.js'
import chalk from 'chalk';

getWeatherByLocation(process.argv[2], (error, data) =>{
    if(error){
        console.log(chalk.red(error))
        return
    }
    console.log(chalk.blue('Location: ') + data.location + '\n' + chalk.blue('Weather: ') + data.forecast)
})
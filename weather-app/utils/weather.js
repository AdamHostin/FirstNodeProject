import request from 'request'
import chalk from 'chalk';

export const getWeather = (latitude, longitude, callback) =>{
    const WeatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true&hourly=temperature_2m,precipitation'
    let date = new Date();
    request({url: WeatherUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather API', undefined)
        }else if(response.body.error){
            callback(response.body.reason, undefined)
        }else{
            const Data = {
                forecast: chalk.blue('Weather: ') + 'Current temperature ' + response.body.current_weather.temperature + 
                    ' degrees celsius and precipitation in the past hour were ' + response.body.hourly.precipitation[date.getHours()] + ' mm'
            }
            callback(undefined, Data)
        }
    })
}
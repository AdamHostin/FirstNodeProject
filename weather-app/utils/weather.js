import request from 'request'
import chalk from 'chalk';

export const getWeather = (latitude, longitude, callback) =>{
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true&hourly=temperature_2m,precipitation'
    let date = new Date();
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather API', undefined)
            return
        } 
        if(body.error){
            callback(body.reason, undefined)
            return
        }
        const Data = {
            forecast: chalk.blue('Weather: ') + 'Current temperature ' + body.current_weather.temperature + 
                ' degrees celsius and precipitation in the past hour were ' + body.hourly.precipitation[date.getHours()] + ' mm'
        }
        callback(undefined, Data)
    })
}
import request from 'request'
import * as geocode from './geocode.js'

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
            forecast: 'Current temperature ' + body.current_weather.temperature + 
                ' degrees celsius, precipitation in the past hour were ' + body.hourly.precipitation[date.getHours()] + 
                ' mm and windspeed is ' + body.current_weather.windspeed + ' km/h'
        }
        callback(undefined, Data)
    })
}

export const getWeatherByLocation = (location, callback) =>{
    geocode.getGeocode(location, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            callback(getErrorMessage(error), undefined)
            return 
        }
        getWeather(latitude, longitude, (error, {forecast} = {}) => {
            if(error){
                callback(getErrorMessage(error), undefined)
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

const getErrorMessage = (error) => {
    return {
        error: 'Error: ' + error
    }
}
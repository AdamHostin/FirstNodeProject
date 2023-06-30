import express from 'express'
import chalk from 'chalk'
import * as weather from './../../weather-app/app.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public')

const app = express()
app.use(express.static(publicDir))

app.get('/weather', (req, res) => {
    weather.getWeatherByLocation('Smolenice', (error,data) => {
        if(error){
            console.log(error)
            res.send('Error occurred')
        }
        //res.send(data.location + '<br>' + data.forecast)
        res.send(data)
    }) 
})

app.listen(3000, () =>{
    console.log(chalk.green('Server is up on port 3000'))
})
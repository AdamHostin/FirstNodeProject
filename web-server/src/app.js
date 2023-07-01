import express from 'express'
import chalk from 'chalk'
import * as weather from './../../weather-app/utils/weather.js'
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

const app = express()
//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)
//setup static dir
app.use(express.static(publicDir))
const port = process.env.PORT || 3000

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hostinko'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hostinko'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'Help yourself',
        name: 'Hostinko'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'missing address parameter'
        })
    } 

    weather.getWeatherByLocation( req.query.address, (error,data) => {
        if(error){
            console.log(error)
            res.send(error)
            return
        }
        data['queryedAddress'] = req.query.address
        res.send(data)
    }) 
}) 

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        message: 'help page not found',
        name: 'Hostinko'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        message: 'Page not found',
        name: 'Hostinko'
    })
})

app.listen(port, () =>{ 
    console.log(chalk.green('Server is up on port ' + port))
}) 
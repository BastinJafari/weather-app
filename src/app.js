const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname);

const app = express()
const port = process.env.PORT || 3000

//Define paths for Epress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bastin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'The about page',
        name: 'Bastin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'The help page',
        helpText: 'This page is supposed to help you',
        name: 'Bastin'
    })
})


app.get('/weather', (req, res) => { 

    const address = req.query.address

    if (!address) {
        return res.send('You must require an address')
    }

    
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        
        if (error){
           return res.send({ error })
        }


        forecast(latitude,longitude, (error, weatherPrediction) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: weatherPrediction,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Bastin',
        error: 'Help page article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search);
    res.send({
        prodcuts: []
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Bastin',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
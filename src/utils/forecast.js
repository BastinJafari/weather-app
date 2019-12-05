request = require('request')
getGeoCode = require('./geocode')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



const forecast = (latitude, longitude, callback) => {



            const url = 'https://api.darksky.net/forecast/912ea046f8634842a16528a0308ce938/'+ latitude + ','+longitude +'?units=si&lang=de'


            request({url, json: true }, (error, {body}) => {
        
                if(error) {
                    callback('Unable to connect to weather service', undefined)
                }
            
                else if (body.error) {
                    callback('Unable to find location', undefined)
                }
                else {
                    const temperature = body.currently.temperature
                    const rainProb = body.currently.precipProbability
                    callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out. There is a ' + rainProb+ '% chance of rain.')
                
                } 
             })
        }
        
    


module.exports = forecast

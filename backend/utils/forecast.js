const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=1f5ad93cccfc4c6ab49200536221906&q='+latitude+','+longitude


    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.condition.text + '. It is currently ' + response.body.current.temp_c + ' degrees celcius out.')
        }
    })
}

module.exports = forecast
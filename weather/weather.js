const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: 'https://api.darksky.net/forecast/2f88b64e2a42886b64a9b21febcac2b7/' + latitude + ',' + longitude,
        json: true
    },(error, response, body) => {
        if(error){
            callback('Unable to connect to Forecast.uo servers. ');
        }else if(response.statusCode === 400){
            callback('Unable to fetch Weather');
        }else if(response.statusCode == 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }else {
            callback('Unable to connect the server');
        }
    });
};

module.exports.getWeather = getWeather;


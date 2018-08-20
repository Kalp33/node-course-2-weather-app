const request = require('request');

/*var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        //var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=AIzaSyC3Z7bh45G6mPgU6tHsGcKkuhKEFzPNlTY';

        //console.log(url);
        request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=AIzaSyC3Z7bh45G6mPgU6tHsGcKkuhKEFzPNlTY',
            json: true
        },(error, response, body)=>{
            if(error){
                reject('Unable to connect to Google servers.');
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find the address.');
            }else if(body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('1301').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});*/

var getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.darksky.net/forecast/2f88b64e2a42886b64a9b21febcac2b7/' + latitude + ',' + longitude,
            json: true
        },(error, response, body) => {
            if(error){
                reject('Unable to connect to Forecast.uo servers. ');
            }else if(response.statusCode === 400){
                reject('Unable to fetch Weather');
            }else if(response.statusCode == 200){
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }else {
                reject('Unable to connect the server');
            }
        });
    });
};

getWeather(39, -75).then((weather) => {
    console.log(JSON.stringify(weather, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});
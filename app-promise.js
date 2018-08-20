const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
        a:{
            demand:true,
            alias:'address',
            describe:'Address to fetch weather for',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=AIzaSyB2xwqjHDl3Rt3Hmg8AYgxbm5SsNBfe6iw';

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    debugger;
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = url = 'https://api.darksky.net/forecast/2f88b64e2a42886b64a9b21febcac2b7/' + latitude + ',' + longitude;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log('It is currently' + temperature + '. ' + 'It feels like ' + apparentTemperature + '.' );
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.')
    }else {
        console.log(e.message);
    }
});

/*
var latitude = 39;
var longitude = -7500;
var weatherUrl = url = 'https://api.darksky.net/forecast/2f88b64e2a42886b64a9b21febcac2b7/' + latitude + ',' + longitude;
axios.get(weatherUrl).then((response) => {
    console.log(response.data);
}).catch((e) => {
    console.log(e);
});*/
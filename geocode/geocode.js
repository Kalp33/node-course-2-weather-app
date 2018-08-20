const request = require('request');

var geocodeAddress = (address, callback)=>{
    var encodedAddress = encodeURIComponent(address);
    //var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=AIzaSyC3Z7bh45G6mPgU6tHsGcKkuhKEFzPNlTY';

    //console.log(url);
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=AIzaSyB2xwqjHDl3Rt3Hmg8AYgxbm5SsNBfe6iw',
        json: true
    },(error, response, body)=>{
        if(error){
            callback('Unable to connect to Google servers.');
        }else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find the address.');
        }else if(body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }else {
            callback('Something went wrong...');
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;
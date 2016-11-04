import { Meteor } from 'meteor/meteor';
//import { GeoIp } from 'meteor/servicelocale:geoip';
import { IPGeocoder } from 'meteor/thebakery:ipgeocoder';

Meteor.startup(() => {
 IPGeocoder.load();
});

Meteor.onConnection(function(conn) {
    console.log(conn.clientAddress);

IPGeocoder.geocode('82.124.236.10', function(error, result){
    if(!error){
        // good to go
    }
    else
    {
    	console.log("result ip: "+error.message);
    }
});


    //var geoip = require('geoip-lite');

var ip = conn.clientAddress;
//var geo = GeoIp.lookup(ip);

//console.log("geolocation" ,geo);
// { range: [ 3479299040, 3479299071 ],
//   country: 'US',
//   region: 'CA',
//   city: 'San Francisco',
//   ll: [37.7484, -122.4156] }
});

import { Meteor } from 'meteor/meteor';
//import { GeoIp } from 'meteor/servicelocale:geoip';
import { IPGeocoder } from 'meteor/thebakery:ipgeocoder';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
 IPGeocoder.load();

  Accounts.emailTemplates.siteName = "LeBonCampingCar";
 Accounts.emailTemplates.from = "LeBonCampingCar <leboncampingcar@gmail.com>";
 //console.log("email template: "+Accounts.emailTemplates.verifyEmail.subject);
 Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "LeBonCampingCar Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( 'http://localhost:3000/#/', 'http://82.245.202.35:4444/#/' ),
        supportEmail   = "leboncampingcar@gmail.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
 Accounts.emailTemplates.enrollAccount.subject = function (user) {
     return "Welcome to LeBonCampingCar, " + user.profile.name;
 };

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

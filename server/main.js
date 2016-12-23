import { Meteor } from 'meteor/meteor';
//import { GeoIp } from 'meteor/servicelocale:geoip';
//import { IPGeocoder } from 'meteor/thebakery:ipgeocoder';
import { Accounts } from 'meteor/accounts-base';
import { Connections } from '../imports/api/connections.js';

  var nbrconn = 0;
Meteor.startup(() => {

 //IPGeocoder.load();

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
    //console.log("connection client address: "+conn.clientAddress);
    //console.log("connection client id: "+conn.id);
//nbrconn = nbrconn+1;
//console.log("nbr de client connect: "+nbrconn);
//       Connections.insert({
//               connection_id: conn.id,
//               clientaddress: conn.clientAddress,
//               totalconnections: nbrconn,
//               createdAt: new Date()
//           }, function( error, result) { 
//      if ( error ) console.log ( error ); //info about what went wrong
//      if ( result )
//  {
//   console.log("insert bdd connection ok: "+result);
//  }
if(conn.clientaddress=="127.0.0.1"){
  //conn.close();
//Meteor.disconnect();
}

 });

//if(conn.onClose)
    //console.log("connection client onclose: "+conn.onClose);
//     conn.onClose(function(){
//       nbrconn = nbrconn-1;
//                 //console.log("Close : ");
//                 //console.log("nbr de client connect: "+nbrconn);
//                       Connections.insert({
//               totalconnections: nbrconn,
//               createdAt: new Date()
//           }, function( error, result) { 
//      if ( error ) console.log ( error ); //info about what went wrong
//      if ( result )
//  {
//   console.log("insert bdd connection ok: "+result);
//  }
// });
//       });
      //console.log("connection conn onclose: "+);

       // },

// IPGeocoder.geocode('82.124.236.10', function(error, result){
//     if(!error){
//         // good to go
//     }
//     else
//     {
//     	console.log("result ip: "+error.message);
//     }
// });


    //var geoip = require('geoip-lite');

//var ip = conn.clientAddress;
//var geo = GeoIp.lookup(ip);

//console.log("geolocation" ,geo);
// { range: [ 3479299040, 3479299071 ],
//   country: 'US',
//   region: 'CA',
//   city: 'San Francisco',
//   ll: [37.7484, -122.4156] }
//});

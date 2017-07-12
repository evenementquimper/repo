import { Meteor } from 'meteor/meteor';
//import { GeoIp } from 'meteor/servicelocale:geoip';
//import { IPGeocoder } from 'meteor/thebakery:ipgeocoder';
import { Accounts } from 'meteor/accounts-base';
import { Connections } from '../imports/api/connections.js';
import { UsersData } from '../imports/api/usersdata.js';

  var nbrconn = 0;
Meteor.startup(() => {
 
 moment.locale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});


Roles.addUsersToRoles(Meteor.settings.admin.ADM_ID, 'admin', Roles.GLOBAL_GROUP);

moment.locale('fr');

// il y a une heure

//Roles.addUsersToRoles("tbGqSYj2CncNDo8Fn", 'admin', Roles.GLOBAL_GROUP);
//Roles.addUsersToRoles("tbGqSYj2CncNDo8Fn", 'admin', Roles.GLOBAL_GROUP);
  //Return early if URL isn't HTTPS (or if it isn't set).
  // var isHttps = parse(Meteor.settings.private.cdnPrefix).protocol === 'https:';
  // if (!isHttps)
  //   return;

  // Add CDN awesomeness - this is the critical line.
  // WebAppInternals.setBundledJsCssPrefix(Meteor.settings.private.cdnPrefix);
  // // Trust the URL in our browser policy (if it's available).
  //  try {
  //    return BrowserPolicy.content.allowOriginForAll(Meteor.settings.private.cdnPrefix);
  //  } catch (undefined) {}

 //IPGeocoder.load();
Meteor.absoluteUrl(['http://leboncampingcar.fr']);
  Accounts.emailTemplates.siteName = "leboncampingcar.fr";
 Accounts.emailTemplates.from = "LeBonCampingCar <leboncampingcar@leboncampingcar.fr>";
 //console.log("email template: "+Accounts.emailTemplates.verifyEmail.subject);
 Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Le Bon Camping Car Verification Email";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( 'http://leboncampingcar.fr/#/', 'http://leboncampingcar.fr/authentication/#/' ),
        supportEmail   = "contact@leboncampingcar.fr",
        emailBody      = `Ce mail vous a été envoyer afin de vérifier votre email: (${emailAddress}) cliquer sur ce lien:\n\n${url}\n\n Si vous n'êtes pas inscrits sur le site leboncampingcar.fr, merci d'ignorer ce mail. Si vous avez un problème technique, merci d'écrire au support: ${supportEmail}.`;

    return emailBody;
  }
};

 Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Le Bon Camping Car Nouveau Mot de Passe";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        //urlWithoutHash = url.replace( 'http://leboncampingcar.fr/#/', 'http://leboncampingcar.fr/authentication/#/' ),
        supportEmail   = "contact@leboncampingcar.fr",
        emailBody      = `Ce mail vous a été envoyer afin de changer votre mot de passe: cliquer sur ce lien pour vous définir un nouveau mot de passe :\n\n${url}\n\n Si vous n'êtes pas inscrits sur le site leboncampingcar.fr, merci d'ignorer ce mail. Si vous avez un problème technique, merci d'écrire au support: ${supportEmail}.`;

    return emailBody;
  }
};

 Accounts.emailTemplates.enrollAccount.subject = function (user) {
     return "Bienvenue chez Le Bon CampingCar, " + user.profile.name;
 };

 // Validate username, sending a specific error message on failure. +JSON.stringify(user)+JSON.stringify(attempt)
Accounts.validateNewUser((attempt) => {
  // if (attempt.services && attempt.services.facebook && attempt.services.facebook.email == "uxvhoewvlw_1498664278@tfbnw.net"){
  //   console.log("new facebook user attempt: "+JSON.stringify(attempt));
  //   return true;
  // }
  // if (attempt.emails[0].address == "ftpokerdeal@gmail.com" || attempt.emails[0].address == "test2@gmail.com" || attempt.emails[0].address == "test1@gmail.com" || attempt.emails[0].address == "anne.dupont@gmail.com" || attempt.emails[0].address == "celine.dubois@gmail.com" || attempt.emails[0].address == "valerie.dufoin@gmail.com" || attempt.emails[0].address == "claire.ken@gmail.com" || attempt.emails[0].address == "gaetan.berree@gmail.com" || attempt.emails[0].address == "donniougigi@gmail.com" || attempt.emails[0].address == "antoine.donniou@gmail.com" || attempt.emails[0].address == "bernard.silva@gmail.com" || attempt.emails[0].address == "helene.laville@gmail.com" || attempt.emails[0].address == "tony.lagare@gmail.com" || attempt.emails[0].address == "ntahraoui@lemonway.com" || attempt.emails[0].address == "damien.leroi@gmail.com" || attempt.emails[0].address == "florian.dubois@gmail.com" || attempt.emails[0].address == "benoit.marchant@gmail.com" || attempt.emails[0].address == "julien.cali@gmail.com" || attempt.emails[0].address == "gwenn.donniou@gmail.com" || attempt.emails[0].address == "contact.amopok@gmail.com" || attempt.emails[0].address == "lclavijo@lemonway.com") {

    return true;
  // } else {
  //   throw new Meteor.Error(403, 'Acces interdit: ');
  // }

});
//.username && attempt.username.length >= 3
// && attempt.user.services.facebook.email == "jckhpshcru_1483526647@tfbnw.net"  && attempt.user.services && attempt.user.services.facebook && attempt.user.services.facebook.email == "jckhpshcru_1483526647@tfbnw.net"
Accounts.validateLoginAttempt((attempt) => {

//   if(attempt.type == "facebook"){
// console.log("facebook welcome login attemp: "+JSON.stringify(attempt.user.services.facebook));

//     return true;
//   }
//   if (attempt) {
//     console.log("user connection: "+JSON.stringify(attempt));
    return true;
  // } else {
  //   throw new Meteor.Error(403, 'Login Acces interdit: ');
  // }
});

});

Meteor.onConnection(function(conn) {
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

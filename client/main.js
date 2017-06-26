import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { DDP } from 'meteor/ddp-client';
import { request } from "meteor/froatsnook:request";

//import './main.html';
import '../imports/ui/footer.html';
import '../imports/ui/mentionslegales.html';
import '../imports/ui/cgv.html';
import '../imports/ui/pagetitle.html';
import '../imports/ui/body.js';
import '../imports/ui/nav.js';
import '../imports/ui/navcon.html';
import '../imports/ui/naverror.html';
import '../imports/ui/inwork.html';
import '../imports/ui/app.html';
import '../imports/ui/homepage.js';
import '../imports/ui/maplistings_lit.js';
import '../imports/ui/maplistings.js';

import '../imports/ui/leftnavuser.js';

import '../imports/ui/profilesection.js';
import '../imports/ui/basicsform.html';
import '../imports/ui/userlayout.js';

import '../imports/ui/mylistingLayout.js';
import '../imports/ui/listingsLayout.js';
import '../imports/ui/mylisting.js';
import '../imports/ui/userbooking.js';

import '../imports/ui/reservationslisting.js';
import '../imports/ui/login.js';
import '../imports/ui/dashboard.js';
import '../imports/ui/dashboard.html';
import '../imports/ui/lemonway2.html';

import '../imports/ui/topnavmylisting.js';

import '../imports/ui/managelisting.html';
import '../imports/ui/managelisting.js';
import '../imports/ui/mlsectionright.js';
import '../imports/ui/mlsectioncontent.html';
import '../imports/ui/mlsectionbuttons.html';

import '../imports/ui/mlsectioncontentloc.js';
import '../imports/ui/mlsectioncontentbasics.js';
import '../imports/ui/mlsectioncontentdetails.js';
import '../imports/ui/mlsectioncontentimages.js';
import '../imports/ui/sectionbooking.js';
import '../imports/ui/mlsectioncontentavailability.js';

import '../imports/ui/listing.js';
import '../imports/ui/book.js';

import '../imports/ui/admin.js';
import '../imports/ui/admin.html';
//import '../accounts/config.js';
import '../imports/ui/appLayout.html';
import '../imports/ui/_header.html';
import '../imports/ui/_header.js';
import '../imports/ui/_footer.html';

import '../imports/ui/override-atPwdFormBtn.js';
import '../imports/ui/authentication.js';
import '../imports/ui/loginLayout.js';

import '../imports/ui/campingcarsLayout.js';
import '../imports/ui/campingcar.js';
import '../imports/ui/campingcarbooking.js';

import '../imports/ui/validpay.js';
import '../imports/ui/cancelpay.js';
import '../imports/ui/validpaytest.html';
import '../imports/ui/validpaytest.js';
import '../imports/ui/errorpay.js';

if (Meteor.isClient) {
  Meteor.startup(function () {
    //Session.set("showLoadingIndicator", true);
//DDP.connect('http://leboncampingcar.fr');
    TAPi18n.setLanguage("fr")
      .done(function () {
        //Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });

 moment.updateLocale('fr', {
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

 moment.locale('fr');
var m = moment(1316116057189);
console.log("moment :"+m.fromNow());

  });
}

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  // counter() {
  //   return Template.instance().counter.get();
  // },
});

Template.hello.events({
  // 'click button'(event, instance) {
  //   // increment the counter when button is clicked
  //   instance.counter.set(instance.counter.get() + 1);
  // },
});

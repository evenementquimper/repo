

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

//import { Tasks } from '../api/tasks.js'; 

//import './task.js';
//import './indexdash.html';
import './body.html';
import './nav.js';
import './app.html';
import './homepage.js';
import './maplistings.js';


import './leftnavuser.js';

import './profilesection.js';
import './basicsform.html';
import './userlayout.html';

import './mylistingLayout.js';
import './listingsLayout.js';
import './mylisting.js';
import './userbooking.js';

import './reservationslisting.js';
import './login.js';
import './dashboard.js';
import './dashboard.html';

import './topnavmylisting.js';

import './managelisting.html';
import './managelisting.js';
import './mlsectionright.js';
import './mlsectioncontent.html';
import './mlsectionbuttons.html';

import './mlsectioncontentloc.js';
import './mlsectioncontentbasics.js';
import './mlsectioncontentdetails.js';
import './mlsectioncontentimages.js';
import './sectionbooking.js';
import './mlsectioncontentavailability.js';

import './listing.js';
import './book.js';

import './admin.js';
import './admin.html';
//import '../accounts/config.js';
import './appLayout.html';
import './_header.html';
import './_header.js';
import './_footer.html';

import './override-atPwdFormBtn.js';
import './authentication.js';
import './loginLayout.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
// if ("geolocation" in navigator) {
//   /* géolocalisation possible */
//   navigator.geolocation.getCurrentPosition(function(position) {
//   	console.log("lat: "+position.coords.latitude);
//   	console.log("lng: "+position.coords.longitude);
//   //do_something(position.coords.latitude, position.coords.longitude);
// });
// } else {
//   //alert("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
// }
}); 

Template.body.helpers({

});

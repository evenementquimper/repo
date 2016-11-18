

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
import './userlisting.js';
import './userbooking.js';

import './reservationslisting.js';
import './login.js';
import './dashboard.js';
import './dashboard.html';

import './topnavmylisting.js';

import './managelisting.html';
import './managelisting.js';
import './mlsectionright.html';
import './mlsectioncontent.html';
import './mlsectionbuttons.html';

import './mlsectioncontentloc.js';
import './mlsectioncontentbasics.js';
import './mlsectioncontentdetails.js';
import './mlsectioncontentimages.js';
import './sectionbooking.js';
import './mlsectioncontentavailability.js';

import './listing.js';
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

}); 

Template.body.helpers({

  // tasks: function() {

  //   return Tasks.find({});

  // },

});

// Template.body.events({

//   'submit .new-task'(event) {

//     // Prevent default browser form submit

//     event.preventDefault();

 

//     // Get value from form element

//     const target = event.target;

//     const text = target.text.value;

 

//     // Insert a task into the collection

//     Tasks.insert({

//       text,

//       createdAt: new Date(), // current time

//     });

 

//     // Clear form

//     target.text.value = '';

//   },

// });

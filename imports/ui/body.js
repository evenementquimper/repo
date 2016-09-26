

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

//import { Tasks } from '../api/tasks.js'; 

//import './task.js';
//import './indexdash.html';
import './body.html';
import './nav.html';
import './app.html';


import './leftnavuser.html';
import './profilesection.html';
import './basicsform.html';
import './userlayout.html';

import './mylistingLayout.js';
import './listingsLayout.js';
import './login.js';
import './dashboard.js';
import './dashboard.html';

import './topnavmylisting.html';
import './managelisting.html';
import './managelisting.js';
import './mlsectionright.html';
import './mlsectioncontent.html';
import './mlsectionbuttons.html';

//import './mlsectioncontentbasics.html';
import './mlsectioncontentbasics.js';
import './mlsectioncontentdetails.js';
import './mlsectioncontentavailability.html';

import './listing';

import './appLayout.html';
import './_header.html';
import './_header.js';
import './_footer.html';



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

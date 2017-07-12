import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import { Session } from 'meteor/session';
 

import './campingcarsLayout.html';
 
 Template.campingcarsLayout.onCreated(function() {
});

  Template.campingcarsLayout.events({

      'click button#about': function(event, template) {

    // Prevent default browser
      event.preventDefault();


      var Resdetails = template.find('.listingdetails');
      var Resabout = template.find('.listingabout');
      var Resaddons = template.find('.listingaddons');
      var stlbar = template.find('#stlbar');
stlbar.style.left= '0%';
stlbar.style.width= '33.3333%';

      Resdetails.style.display = "none";
      Resabout.style.display = "inherit";
     Resaddons.style.display = "none";

  },

        'click button#details': function(event, template) {

    // Prevent default browser
      event.preventDefault();


      var Resdetails = template.find('.listingdetails');
      var Resabout = template.find('.listingabout');
      var Resaddons = template.find('.listingaddons');
var stlbar = template.find('#stlbar');
stlbar.style.left= '33.3333%';
stlbar.style.width= '33.3333%';
      Resdetails.style.display = "inherit";
      Resabout.style.display = "none";
     Resaddons.style.display = "none";

  },

          'click button#addons': function(event, template) {

    // Prevent default browser
      event.preventDefault();


      var Resdetails = template.find('.listingdetails');
      var Resabout = template.find('.listingabout');
      var Resaddons = template.find('.listingaddons');
var stlbar = template.find('#stlbar');
stlbar.style.left= '66.6667%';
stlbar.style.width= '33.3333%';

      Resdetails.style.display = "none";
      Resabout.style.display = "none";
     Resaddons.style.display = "inherit";

  },
   });
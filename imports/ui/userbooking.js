import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
 

import './userbooking.html';

 Template.userbooking.onCreated(function() {

  Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('Images');
    Meteor.subscribe('addons');
    Meteor.subscribe('reservations');
    Meteor.subscribe('usersdata');
});

});


 Template.userbooking.helpers({

 reservations(){
return Reservations.find({"user_id": Meteor.userId(),"status" : { $in: ["newbooking", "submitted_for_settlement", "owner_valid"] }});
  },

 campingcars(){
    //const instance = Template.instance();
    //console.log("helper route id : "+FlowRouter.getParam("_id")); "userid": Meteor.userId()
    //console.log("campingcar find! vue nombre: "+CampingCars.find({}).count());
return CampingCars.find({"userid": Meteor.userId()});
  },

});
  Template.userbooking.events({


  'click .user-listing-item':function(event, template){

//console.log("click user id : "+Meteor.userId());
//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag id: "+event.currentTarget.id);
 FlowRouter.go('book', { _id: event.currentTarget.id });
  }

   });
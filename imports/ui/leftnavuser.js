import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
 import { UsersData } from '../api/usersdata.js';

import './leftnavuser.html';

 Template.leftnavuser.onCreated(function() {
  
    Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
});

});


 Template.leftnavuser.helpers({

  userdata:function(){
  if(Meteor.userId() && UsersData.find({}))
  {
    //console.log("User ID: "+UsersData.find({_id:Meteor.userId()}).fetch()[0].firstname);
    return UsersData.find({_id:Meteor.userId()}).fetch()[0];
  }
  else
  {
    return false;
  }
}

});
  Template.leftnavuser.events({

  'click .logout':function(event, template){
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go("index");
  },

  'click .mydetails':function(event, template){
    event.preventDefault();
    FlowRouter.go("user");
  },
    'click .rentmotorhome':function(event, template){
    event.preventDefault();
    FlowRouter.go("userbasics",{_id:FlowRouter.getParam("_id")});
  },

  'click .mybooking':function(event, template){
    event.preventDefault();
    FlowRouter.go("userbooking");
  },
    'click .mylisting':function(event, template){
    event.preventDefault();
    FlowRouter.go("mylisting");
  },
   });
import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
 

import './leftnavuser.html';

 Template.leftnavuser.onCreated(function() {
console.log("Star userlisting.js");

  this.autorun(() => {
    //this.subscribe('users');
    this.subscribe('campingcars');
  });

});


 Template.leftnavuser.helpers({


 campingcars(){
    //const instance = Template.instance();
    //console.log("helper route id : "+FlowRouter.getParam("_id")); "userid": Meteor.userId()
    //console.log("campingcar find! vue nombre: "+CampingCars.find({}).count());
return CampingCars.find({"userid": Meteor.userId()});
  }

});
  Template.leftnavuser.events({

  'click .logout':function(event, template){
    event.preventDefault();
    Meteor.logout();
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
    FlowRouter.go("userbasics",{_id:FlowRouter.getParam("_id")});
  },
    'click .mylisting':function(event, template){
    event.preventDefault();
    FlowRouter.go("userlisting");
  },
   });
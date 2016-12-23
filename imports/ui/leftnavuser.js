import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
 import { UsersData } from '../api/usersdata.js';

import './leftnavuser.html';

 Template.leftnavuser.onCreated(function() {
  
  this.autorun(() => {
    //this.subscribe('users');
    this.subscribe('campingcars');
    this.subscribe('usersdata');
  });

});


 Template.leftnavuser.helpers({


 campingcars(){
return CampingCars.find({"userid": Meteor.userId()});
  },
  userdata:function(){
  if(Meteor.userId())
  {
    console.log("User ID: "+UsersData.find({_id:Meteor.userId()}).fetch()[0].firstname);
    return UsersData.find({_id:Meteor.userId()}).fetch()[0];
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
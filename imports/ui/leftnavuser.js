import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
 

import './leftnavuser.html';

 Template.leftnavuser.onCreated(function() {
  
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
        //Meteor.loggingIn();
        //       Meteor.loginWithFacebook({}, function(err){
        //     if (err) {
        //         throw new Meteor.Error("Facebook login failed");
        //     }
        // });
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
    FlowRouter.go("reservationslisting");
  },
    'click .mylisting':function(event, template){
    event.preventDefault();
    FlowRouter.go("userlisting");
  },
   });
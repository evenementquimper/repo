import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
 

import './authentication.html';

 Template.authentication.onCreated(function() {
        //   Meteor.loginWithFacebook({}, function(err){
        //     if (err) {
        //         throw new Meteor.Error("Facebook login failed");
        //     }
        // });

  Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
});

    //titre de la page
  DocHead.setTitle("Inscription, Connection|Le Bon Camping-car");

});


 Template.authentication.helpers({


 //campingcars(){
    //const instance = Template.instance();
    //console.log("helper route id : "+FlowRouter.getParam("_id")); "userid": Meteor.userId()
    //console.log("campingcar find! vue nombre: "+CampingCars.find({}).count());
//return CampingCars.find({"userid": Meteor.userId()});
 // }

});
  Template.authentication.events({

  'click .logout':function(event, template){
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go("authentication");
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
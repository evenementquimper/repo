import { Template } from 'meteor/templating';


import './nav.html';
 
 Template.nav.onCreated(function() {
    //console.log("oncreate top nav");
});

 Template.nav.helpers({
  //console.log()
});
  Template.nav.events({
    'click .top-nav-logout':function(event, template){
    //console.log("click top nav logout");
    event.preventDefault();
    Meteor.logout();
  },
   });
import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
 

import './mylisting.html';

 Template.mylisting.onCreated(function() {
    Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('usersdata');
});

});

 Template.mylisting.helpers({

 campingcars(){
  
  if(Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP))
  {
return CampingCars.find({});
  }
  else
  {
return CampingCars.find({"userid": Meteor.userId()});
  }

  },

});
  Template.mylisting.events({

  'click .user-listings-add':function(event, template){
    event.preventDefault();
    var resId = null;
    var userimg = false;

    if(UsersData.find({_id:Meteor.userId()}))
    {
    var userdat = UsersData.find({_id:Meteor.userId()}).fetch()[0];
    userimg = userdat.images;
    }
else
{

}


      CampingCars.insert({
              userid: Meteor.userId(),
              userimage:userimg,
              daysfull : [],
              //planyo_resource_id: resId,
              createdAt: new Date()
          }, function( error, result) { 
     if ( error ) console.log ( error ); //info about what went wrong
     if ( result )
 {
  FlowRouter.go('userbasics', { _id: result });
 }
});

  },

  'click .user-listing-item':function(event, template){
 FlowRouter.go('userbasics', { _id: event.currentTarget.id });
  }

   });
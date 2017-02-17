import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
 

import './mylisting.html';

 Template.mylisting.onCreated(function() {
console.log("Star mylisting.js");

    Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('usersdata');
});

});


 Template.mylisting.helpers({


 campingcars(){
    //const instance = Template.instance();
    //console.log("helper route id : "+FlowRouter.getParam("_id")); "userid": Meteor.userId()
    //console.log("campingcar find! vue nombre: "+CampingCars.find({}).count());
return CampingCars.find({"userid": Meteor.userId()});
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

//console.log("click input nameœ: "+event.target.name);
//console.log("click input value: "+event.target.value);
//console.log("click tag name: "+event.target.tagName);
//Meteor.call("Planyotest");

//Meteor.call("AddResource", null, "newcampingcarResII", "1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, function(error, result){
  //if(!error){
    //console.log("CallBack result: "+JSON.stringify(result));
    //if(result.data.data.new_resource_id)
    //{
    //console.log("CallBack data id: "+JSON.stringify(result.data.data.new_resource_id));
    //resId = result.data.data.new_resource_id;

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

  //}
  //else
  //{

  //}
  //}
  //else
  //{
    //console.log("CallBack error: "+JSON.stringify(error));
    //resId = null;
  //}
//});

//if(resId!=null)
//{

//}

//else
//{
  
//}
  },

  'click .user-listing-item':function(event, template){

//console.log("click user id : "+Meteor.userId());
console.log("click current value: "+event.currentTarget.value);
console.log("click current tag id: "+event.currentTarget.id);
 FlowRouter.go('userbasics', { _id: event.currentTarget.id });
  }

   });
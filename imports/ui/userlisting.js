import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
 

import './userlisting.html';

 Template.userlisting.onCreated(function() {
console.log("Star userlisting.js");

  this.autorun(() => {
    this.subscribe('tasks');
    this.subscribe('campingcars');
  });

});


 Template.userlisting.helpers({


 campingcars(){
    //const instance = Template.instance();
    //console.log("helper route id : "+FlowRouter.getParam("_id")); "userid": Meteor.userId()
    //console.log("campingcar find! vue nombre: "+CampingCars.find({}).count());
return CampingCars.find({"userid": Meteor.userId()});
  },

});
  Template.userlisting.events({

  'click .user-listings-add':function(event, template){
    event.preventDefault();
    var resId = null;
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
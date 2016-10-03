import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
 

import './userlisting.html';
 
//Markers = new Mongo.Collection('markers');  

 Template.userlisting.onCreated(function() {


});


 Template.userlisting.helpers({

// function(){
//   GoogleMaps.load({key:"AIzaSyCFo3iJe21DtIo3wkHNXrTOBmT9DQz_6C0"});
// },

todoArgs(todo){


},
  tasks: function() {

    var category = FlowRouter.getParam("id");
    console.log("Parametre: "+category);
    //var o_id = new ObjectID(id);  _id:category
//db.test.find({_id:o_id}) _id: 'category'

    console.log("BDD: "+Tasks.find({}).fetch()[0]);
    var bdd = Tasks.find({}).fetch();
    //console.log("BDD: "+Tasks.find({}).fetch());
    
    //return Tasks.find({}).fetch()[0];
    return bdd;
  },

    campingcars: function(){
    //const instance = Template.instance();
    //console.log("helper route id : "+FlowRouter.getParam("_id"));
    //console.log("campingcar find! vue nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).count());
//return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },


// ways:function(){
// return Way_Coll.find({}).fetch();
// },

// errors:function(){
// return Errors_Coll.find({}).fetch();
// },
    // gates:function(){
    //        return Gate_Coll.find({}).fetch();
    // },
    // interval:function(){
    //   console.log("Interval: "+gateState.get(rr));
    //         return gateState.get(rr);
    // },
    // car:function(){
    //   return Gate2_Coll.find({}).fetch();
    //   console.log("Barrière info: "+bdd[0].datavalues.input1state);

    //   if(bdd[0].datavalues.input1state==1)
    //   {
    //     return true;
    //   }
    //   else
    //   {
    //     return false;
    //   }

    // },
});
  Template.userlisting.events({

  'click .user-listings-add':function(event, template){
    event.preventDefault();
//console.log("click input nameœ: "+event.target.name);
//console.log("click input value: "+event.target.value);
//console.log("click tag name: "+event.target.tagName);

console.log("click user id : "+Meteor.userId());
console.log("click current value: "+event.currentTarget.value);
console.log("click current tag name: "+event.currentTarget.tagName);

var key = event.target.name;
 var tar = event.target;

         CampingCars.insert({
             userid: Meteor.userId(),
             createdAt: new Date()
         }, function( error, result) { 
    if ( error ) console.log ( error ); //info about what went wrong
    if ( result )
{
 FlowRouter.go('userbasics', { _id: result });
}
  //   console.log ( result ); //the _id of new object if successful
  });
  
  }

   });
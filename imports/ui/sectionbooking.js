import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';

import './sectionbooking.html';
 //Collection


//Markers = new Mongo.Collection('markers');  

 Template.sectionbooking.onCreated(function() {

});


 Template.sectionbooking.helpers({

  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

      campingcars: function(){
        console.log("Collection find: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0]);
        //var imgId = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];

return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },

  images: function(){
    //return Images.find({ filename: 'chat.jpg' });
    console.log("Collection find: "+Images.find().cursor);
    //console.log("Collection images car find: "+ImagesCar.find({}).fetch());
    return Images.collection.find({}).fetch();
  },
    uploadedFiles: function () {
      var filesCursor = Images.find();
      //console.log("filecursor fetch: "+Images.find());
      //console.log("filecursor fetch: "+filesCursor.fetch());
      //console.log("filecursor get: "+filesCursor.get());
      console.log("Collection find: "+JSON.stringify(Images.find({}).cursor));
    return Images.find({}).cursor;
}




});
  Template.sectionbooking.events({
'click .booking-request': function(e, template){
var campingcarid = FlowRouter.getParam('_id');
var us = Meteor.user();
var userdata = UsersData.find({_id:Meteor.user()}).fetch()[0];
console.log("Meteor User: "+JSON.stringify(us));
console.log("User data name: "+JSON.stringify(UsersData.find({_id:Meteor.user()})));
},

'click .image-remove': function(e, template){
e.preventDefault();
console.log("curent id: "+e.currentTarget.id);
//{"images":{ $in:["hXZjsSk5oSzm759aN"]}}
var dig = '{"images":"'+e.currentTarget.id+'"}';
console.log("DIG: "+dig);

var js = JSON.parse(dig);

        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $pull: js
        }, {
          multi: true
        });
},

'click .image-up': function(e, template){
e.preventDefault();
console.log("curent id: "+e.currentTarget.id);
//{"images":{ $in:["hXZjsSk5oSzm759aN"]}}
var dig = '{ images:{ $each: [], $sort: -1 }}';
console.log("DIG: "+dig);

//var js = JSON.parse(dig);

        // CampingCars.update({
        //     _id: FlowRouter.getParam('_id'),
        //     images: e.currentTarget.id
        // }, {
        //     $set: { "images.$" :{ $each: [], $sort: -1 }}
        // });
},

'click .image-upload': function(e, template){
//console.log("click button");
  e.preventDefault();
  var inp = template.find('#fileInput');
  inp.click();
}
   });
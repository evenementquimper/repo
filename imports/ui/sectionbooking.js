import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';

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


 var resource_id = "67189";
    var start_time = moment().add(27, 'days');
    //console.log("First start: "+start_time.format('DD-MM-YYYY'));
    //var BookingDate = moment(Session.get("BookingDate"), 'DD-MM-YYYY');
    //BookingDate.format('DD-MM-YYYY');
//console.log("BookingDate F: "+BookingDate.format('DD-MM-YYYY'));
    //var start_time = moment().format('DD/MM/YYYY');
    //var duration = Session.get("ParkingDuration");
    var user_id = Meteor.userId();
    var end_time = moment(start_time, 'DD-MM-YYYY').add(4, 'days');
    
    var quantity = 1;
    var admin_mode = true;
    var send_notifications = true;
    var force_status = 0;
    var wants_share = null;
    var rental_prop_xyz = null;
    var rental_prop_voucher = "";
    var custom_price = null;
    var email = "antoine.donniou@gmail.com";
    var first_name = "Donniou";
    var last_name = "Antoine";
    var address = "23 rue de la prairie";
    var city = "Quimper";
    var zip= null;
    var state = null;
    var country = null;
    var phone_prefix = null;
    var phone_number = null;
    var mobile_prefix = "+33";
    var mobile_number = "0665770647";
    var user_notes = null;
    var admin_notes = null;
    var cart_id = null;
    var assignment1 = null;
    var version = null;
    var language = null;
    var planyo_api_key = null//"6c516632983afd2a9b40525eb1ea2b54bf37e18425264d1d2b5062afee2b61";

     Reservations.insert({"email":email});

     Meteor.call('MakeReservation',
    user_id,
    resource_id, 
    start_time.format('YYYY-MM-DD'), 
    end_time.format('YYYY-MM-DD'), 
    quantity, 
    admin_mode, 
    send_notifications,
    force_status, 
    wants_share, 
    rental_prop_xyz, 
    rental_prop_voucher, 
    custom_price, 
    email, 
    first_name, 
    last_name,
    address, 
    city, 
    zip, 
    state, 
    country, 
    phone_prefix, 
    phone_number, 
    mobile_prefix, 
    mobile_number, 
    user_notes, 
    admin_notes, 
    cart_id,
    assignment1,
    version,
    language,
    planyo_api_key);


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
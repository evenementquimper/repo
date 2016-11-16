import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import { Session } from 'meteor/session';

import './sectionbooking.html';
 //Collection


//Markers = new Mongo.Collection('markers');  


 Template.sectionbooking.onCreated(function() {
     this.dtime = new ReactiveDict();
     this.prizes = new ReactiveDict();
    // this.zoom = new ReactiveVar(0);
    // document.on('scroll', function(e) {
    //     // ... event processing stuff; 
    //     // say it produces value 'zoomAmount' ...
    //     this.zoom.set(zoomAmount);
    // });
    

});

 Template.sectionbooking.onRendered(function() {
//var bdd = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
//console.log("Bdd daysfull: "+JSON.stringify(bdd.daysfull));
//Meteor.call("get_resource_usage", 67189, 21654, null, null, null, null, null, null);


  var el = this.$('.sticky-inner-wrapper');
  console.log("offset top?: "+el.offset().top);
  //console.log("sticky move: "+el.style.position);
//console.log("client height : "+document.body.clientHeight);
//console.log("element scroll : "+el.scrollTop);

this.$('.startdatetimepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        minDate: moment(),

        //keepOpen: true,
        //inline: true,
        //focusOnShow:false,
        //collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]
    });
this.$('.enddatetimepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        minDate: moment(),
        //enableDates: [Template.instance().dtime.get('enabledates')],
        //keepOpen: true,
        //inline: true,
        //focusOnShow:false,
        //collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]
    });

});

 Template.sectionbooking.helpers({

    // zoom: function() { 
    //     // This will be called when 'zoom' changes, 
    //     console.log("zoom change: "+Template.instance().zoom.get());// so treat this as your events function
    //     return Template.instance().zoom.get(); 
    // },
    campingcarsbook: function(){


    //const instance = Template.instance();
    console.log("route id : "+FlowRouter.getParam("_id"));
return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },

netprize: function(){  
return Template.instance().prizes.get('netprize');
},

campingcaraddonsselect:function(){

var addonsids = Session.get("addonstab");
return AddOns.find({_id:{ $in: addonsids }}).fetch();
},

  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

totalprize: function(){
  var net = Template.instance().prizes.get('netprize');
  var addons =  150;//Template.instance().prizes.get('addons');
  var insurance = 100;//Template.instance().prizes.get('insurance');
  return net+addons+insurance;
},


  guests: function(){
    var mxg = 0;
var bdd;
    var guestsop = [];
    if(CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch())
    {
    bdd = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch();
    //console.log("bdd: "+JSON.stringify(bdd[0].maxGuests));
    //console.log("parse guests: "+parseInt(bdd[0].maxGuests));
    mxg = parseInt(bdd[0].maxGuests);
        
    for (var i = 1; mxg >= i; i++) {

        guestsop[i] = i;
        //console.log("guestsop: "+guestsop[i]);
    }
    }
    else
    {

    }


    return guestsop;
  },

  deltadays: function(){


    const instance = Template.instance();


  if (CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch() && instance.dtime.get('startdatepicker') && instance.dtime.get('enddatepicker')) {

var sd = null;
var fd = null;
var dif = null;

   var bddcp = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
     var pday=0;
     var nday = 0;
var netprize = 0;
if(moment(instance.dtime.get('startdatepicker'),"YYYY-MM-DD").isValid())
{
    //console.log("get instance start DD: ");
sd = moment(instance.dtime.get('startdatepicker'),"YYYY-MM-DD");    
}

if(moment(instance.dtime.get('enddatepicker'),"YYYY-MM-DD").isValid()){
    //console.log("get instance end DD: ");
fd = moment(instance.dtime.get('enddatepicker'),"YYYY-MM-DD");
}

else
{
    console.log("rien");
}



//console.log("SD: "+sd);
//console.log("FD: "+fd);
   dif = moment.duration(fd.diff(sd));
    //var dif = fd.diff(sd);
    //console.log("dif: "+dif.asDays());
    instance.dtime.set('deltadate', dif);

     if(bddcp.priceperday)
     {
        //console.log("netp bef parse p"+bddcp.priceperday); 
         pday = parseInt(bddcp.priceperday);
         //console.log("netp parse p"+pday); 
        //nday = instance.prizes.get('deltadate');
     }  
     else
     {
//console.log("else netp parse p"); 
     } 
        
//console.log("netp calcul start");
netprize = pday * dif.asDays();
//console.log("netp calcul result"+netprize);
 instance.prizes.set('netprize', netprize);

    }
    else
    {
    }
    return dif.asDays();
  },

//   images: function(){
//     //return Images.find({ filename: 'chat.jpg' });
//     console.log("Collection find: "+Images.find().cursor);
//     //console.log("Collection images car find: "+ImagesCar.find({}).fetch());
//     return Images.collection.find({}).fetch();
//   },
//     uploadedFiles: function () {
//       var filesCursor = Images.find();
//       //console.log("filecursor fetch: "+Images.find());
//       //console.log("filecursor fetch: "+filesCursor.fetch());
//       //console.log("filecursor get: "+filesCursor.get());
//       console.log("Collection find: "+JSON.stringify(Images.find({}).cursor));
//     return Images.find({}).cursor;
// }




});
  Template.sectionbooking.events({

    'e.wheelDelta': function(event, template) {
        console.log("scrolled");
        return false;
    },

// 'scroll.change': function(event, instance){
//     console.log("scroll!!");
// },

'dp.change .startdatetimepicker': function(event, instance){
 event.preventDefault();
      console.log("dp change startdatepicker");

       console.log("datetimepick data", $('.startdatetimepicker').data().date);
if(moment($('.startdatetimepicker').data().date).isValid())
      instance.dtime.set('startdatepicker', $('.startdatetimepicker').data().date);
      //startt = $('.datetimepickerstart').data().date;

// var dday = moment();//.format("DD/MM/YYYY");
// var day = $('.datetimepicker').data().date;
// //day = day.format("X"); 
// console.log("moment select: "+moment(day).format("YYYY-MM-DD"));
// //console.log("moment day select: "+moment(day).date());
// console.log("moment dday: "+dday.format("YYYY-MM-DD"));
//console.log("moment day dday: "+dday.date());


// if(moment().format("YYYY-MM-DD")!==moment(day).format("YYYY-MM-DD"))
// {

// //console.log("event current target : "+EJSON.stringify(event.target));
//   console.log("datetime css height: "+JSON.stringify($('.datetimepicker').height()));
// //$('.datetimepicker').data("DateTimePicker").destroy();
// var tb = Object.keys($('.datetimepicker').data("DateTimePicker").enabledDates());
// console.log("disabledDates: "+JSON.stringify($('.datetimepicker').data("DateTimePicker").disabledDates()));
// console.log("disabledDates keys tab: "+JSON.stringify(tb));
// var tb2 = [];
// for (var i = 0; i < tb.length; i++) {
// tb2[i] = moment(tb[i]);
// }
// tb2.push(moment(day));
// console.log("disabledDates add: "+JSON.stringify(tb2));
// $('.datetimepicker').data("DateTimePicker").enabledDates(tb2);
// }
// else
// {
// }

  
},

'dp.change .enddatetimepicker': function(event, instance){
 event.preventDefault();
      console.log("dp change enddatepicker");

       console.log("datetimepick data", $('.enddatetimepicker').data().date);
       if(moment($('.enddatetimepicker').data().date).isValid())
      instance.dtime.set('enddatepicker', $('.enddatetimepicker').data().date);
      //startt = $('.datetimepickerstart').data().date;

// var dday = moment();//.format("DD/MM/YYYY");
// var day = $('.datetimepicker').data().date;
// //day = day.format("X"); 
// console.log("moment select: "+moment(day).format("YYYY-MM-DD"));
// //console.log("moment day select: "+moment(day).date());
// console.log("moment dday: "+dday.format("YYYY-MM-DD"));
//console.log("moment day dday: "+dday.date());


// if(moment().format("YYYY-MM-DD")!==moment(day).format("YYYY-MM-DD"))
// {

// //console.log("event current target : "+EJSON.stringify(event.target));
//   console.log("datetime css height: "+JSON.stringify($('.datetimepicker').height()));
// //$('.datetimepicker').data("DateTimePicker").destroy();
// var tb = Object.keys($('.datetimepicker').data("DateTimePicker").enabledDates());
// console.log("disabledDates: "+JSON.stringify($('.datetimepicker').data("DateTimePicker").disabledDates()));
// console.log("disabledDates keys tab: "+JSON.stringify(tb));
// var tb2 = [];
// for (var i = 0; i < tb.length; i++) {
// tb2[i] = moment(tb[i]);
// }
// tb2.push(moment(day));
// console.log("disabledDates add: "+JSON.stringify(tb2));
// $('.datetimepicker').data("DateTimePicker").enabledDates(tb2);
// }
// else
// {
// }

  
},


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


}
   });

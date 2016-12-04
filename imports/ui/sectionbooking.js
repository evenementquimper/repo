import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import { Session } from 'meteor/session';

//import './loc_confirm_resa_mail.html';
import './sectionbooking.html';


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
var addonsbdd = AddOns.find({_id:{ $in: addonsids }}).fetch();

var addonsprize = 0;

for (var j = 0; addonsbdd.length > j ; j++) {
  var nbrdays = 1;
  var adetday = 0;
  if(addonsbdd.perday && Template.instance().dtime.get('deltadate'))
  {
    nbrdays = Template.instance().dtime.get('deltadate'); 
  }
  else
  {
  }
  console.log("addons[j].name: "+addonsbdd[j].name);
  adetday = addonsbdd[j].amount*nbrdays;
  addonsprize = addonsprize+adetday;
}

Template.instance().prizes.set('addonsprize', addonsprize);
return addonsbdd;
},

  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

totalprize: function(){
  var net = 0;

  if(Template.instance().prizes.get('netprize'))
    net = Template.instance().prizes.get('netprize');
  
  var addons = 0;

  if(Template.instance().prizes.get('addonsprize'))
    addons = Template.instance().prizes.get('addonsprize');

  var insurance = 0;//Template.instance().prizes.get('insurance');
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


});
  Template.sectionbooking.events({

    'e.wheelDelta': function(event, template) {
        //console.log("scrolled");
        return false;
    },

'dp.change .startdatetimepicker': function(event, instance){
 event.preventDefault();

if(moment($('.startdatetimepicker').data().date).isValid())
      instance.dtime.set('startdatepicker', $('.startdatetimepicker').data().date);
  
},

'dp.change .enddatetimepicker': function(event, instance){
 event.preventDefault();
       if(moment($('.enddatetimepicker').data().date).isValid())
      instance.dtime.set('enddatepicker', $('.enddatetimepicker').data().date);
  
},


'click .booking-request': function(e, instance){
var campingcarid = FlowRouter.getParam('_id');
//var us = Meteor.user();
//console.log("user email: "+us.emails[0].address);
var userdata = UsersData.find({_id:Meteor.user()}).fetch()[0];

    
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
    var planyo_api_key = null;


     Reservations.insert({"user_id":Meteor.userId(),
                          "resource_id":FlowRouter.getParam('_id'),
                          "status":"newbooking",
                          "start_time": instance.dtime.get('startdatepicker'), 
                          "end_time": instance.dtime.get('enddatepicker'),
                          "addons_id":Session.get("addonstab"),
                          "addonsprize": instance.prizes.get('addonsprize'),
                          "netprize": instance.prizes.get('netprize'),
                          "email":Meteor.user().emails[0].address,
                        createdAt: new Date()}, function( error, result) { 
     if ( error ) console.log ( error ); //info about what went wrong
     if ( result )
 {
  //FlowRouter.go('dashboard', { reservation_id: result });
 }
});

}
   });

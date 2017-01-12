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

  Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('Images');
    Meteor.subscribe('addons');
    Meteor.subscribe('reservations');
});

     this.dtime = new ReactiveDict();
     this.prizes = new ReactiveDict();

});

 Template.sectionbooking.onRendered(function() {

  var el = this.$('.sticky-inner-wrapper');

this.$('.startdatetimepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        minDate: moment(),

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

    campingcarsbook: function(){

return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },

netprize: function(){  
return Template.instance().prizes.get('netprize');
},

people: function(){
  //console.log("ppeople : "+Template.instance().prizes.get('peoplenbr'));
  //Template.instance().prizes.set('peoplenbr', event.currentTarget.innerHTML);
return Template.instance().prizes.get('peoplenbr');
},

campingcaraddonsselect:function(){

if(Session.get("addonstab")!=null)
{
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
}
else
{
  return false;
}

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
    if(CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0]!=null)
    {
    bdd = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
    //console.log("bdd: "+JSON.stringify(bdd));
    //console.log("parse guests: "+parseInt(bdd.maxGuests));
    mxg = parseInt(bdd.maxGuests);
        
    for (var i = 1; mxg >= i; i++) {

        guestsop[i] = {"guest":i};
        //console.log("guestsop: "+guestsop[i]);
    }
    return guestsop;
    }
    else
    {
      return false;
    }
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
   return dif.asDays();
    }
    else
    {
      return false;
    }
 
  },


});
  Template.sectionbooking.events({

'click .peoplenbr': function(event, template){
      event.preventDefault();
      //console.log("people nbr: "+event.currentTarget.innerHTML);
Template.instance().prizes.set('peoplenbr', event.currentTarget.innerHTML);
        var outpoupselect = template.find('#outpoupselect');
        outpoupselect.style.display = 'none';
        var transmissionselect = template.find('#peopleselect');
          transmissionselect.style.display = 'none';
      
},

'click #outpoupselect': function(event, template){
      event.preventDefault();
    var peopleselect = template.find('#peopleselect');
var popupselect = template.find('.popupselect');


if(peopleselect.style.display == 'inline-block')
{ 
  //console.log("fueltypeselect :"+fueltypeselect.style.display);
  peopleselect.style.display = 'none';
  event.currentTarget.style.display = 'none';
  //appcont.style.overflowY = 'scroll';
}
else
{

}

},

'click #people': function(event, template){
    event.preventDefault();
    var peopleid = template.find('#people'); 
var peopleselect = template.find('#peopleselect');
var outpoupselect = template.find('#outpoupselect');
outpoupselect.style.display = "inline-block";

peopleselect.style.display = "inline-block";
console.log("people top: "+peopleid.offsetTop);
//peopleselect.style.top = event.pageY+'px';
//peopleselect.style.left = event.pageX+'px';

peopleselect.style.top = event.clientY+'px';
peopleselect.style.left = event.clientX+'px';
},

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
var userdata = UsersData.find({_id:Meteor.user()}).fetch()[0];
if(Meteor.userId())
{
     Reservations.insert({"user_id":Meteor.userId(),
                          "resource_id":FlowRouter.getParam('_id'),
                          "status":"newbooking",
                          "people": instance.prizes.get('peoplenbr'),
                          "start_time": instance.dtime.get('startdatepicker'), 
                          "end_time": instance.dtime.get('enddatepicker'),
                          "addons_id":Session.get("addonstab"),
                          "addonsprize": instance.prizes.get('addonsprize'),
                          "netprize": instance.prizes.get('netprize'),
                          //"email":Meteor.user().emails[0].address,
                        createdAt: new Date()}, function( error, result) { 
     if ( error ) console.log ( error ); //info about what went wrong
     if ( result )
 {
  FlowRouter.go('dashboard', { reservation_id: result });
 }
});
}
else
{
  FlowRouter.go('authentication');
}

}
   });

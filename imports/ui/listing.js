import { Template } from 'meteor/templating';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import { UsersData } from '../api/usersdata.js';
import { Session } from 'meteor/session';

import './listing.html';
import './sectionavailability.html';
import './sectionbooking.html';

var metanbr;

 Template.listing.onCreated(function() {
//   Tracker.autorun(function () {
//     Meteor.subscribe("campingcars");
//     Meteor.subscribe('addons');
//     Meteor.subscribe('reservations');
//     Meteor.subscribe('usersdata');
// });

  this.autorun(() => {
    this.subscribe('campingcars');
    this.subscribe('addons');
    this.subscribe('reservations');
    this.subscribe('usersdata');
  });

Session.set("addonstab", null);
});

 Template.listing.onRendered(function() {

 this.$('.fc').fullCalendar({});
 var linkInfo = {rel: "icon", sizes:"16x16 32x32", href: "/favicon.ico?v=3"};
 DocHead.addLink(linkInfo);
 metanbr=0;

});

 Template.listing.helpers({

 calendaroptions: function() {

var tabtest = [
        {
            title  : 'event2',
            start  : '2017-01-05',
            end    : '2017-01-07',
            rendering:'background',
            backgroundColor:'red',
        }
        ];

    if(Reservations.find({resource_id:FlowRouter.getParam("_id")}).count() && FlowRouter.getParam("_id") && CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch())
{
var bddcampingcar = CampingCars.find({_id: FlowRouter.getParam('_id')}).fetch()[0];

  metanbr++;

  if(metanbr==1)
  DocHead.setTitle(bddcampingcar.name+"|Le Bon Camping-car");
  var metaInfo = {name: "description", content: bddcampingcar.description};
  DocHead.addMeta(metaInfo);

var bddreservations = Reservations.find({resource_id:FlowRouter.getParam("_id")}).fetch();

var evttab = [];
var tabfull = bddcampingcar.daysfull;

for (var j = 0; tabfull.length > j; j++)
{
  console.log("Days full :"+tabfull[j]);
  var daysf = {
                start: tabfull[j],
                rendering:'background',
                backgroundColor:'red',
              };
  tabtest.push(daysf);
}


for (var i = 0;  bddreservations.length > i; i++) {
//le loueur
var loueurid = bddreservations[i].user_id;


  var tt ="Loueur Id:"+loueurid+", Netprize :"+bddreservations[i].netprize+", Addonsprize: "+bddreservations[i].addonsprize;
 

  var uevent = {
    //id:bddreservations[i]._id,
                //title: tt,
                start: bddreservations[i].start_time,
                end: bddreservations[i].end_time,
                rendering:'background',
                backgroundColor:'red',
                //color:'red',
                //backgroundColor:'blue',
                //borderColor :'green', 
                //textColor :'white',
              };


  //console.log("uevet :"+uevent.title);
  //vttab[i] = uevent;
//rr.eventSources[0].events.push(uevent);
tabtest.push(uevent);
  // prsuevt;
    //console.log("uevet  tabparse:"+evttab[i]);
}

        var rr = {

            //height: 200,
            defaultDate: moment(),

              //eventLimit: true, // for all non-agenda views
        header: {
    left:   'prev',
    center: 'title',
    right:  'next'
        //center: 'agendaFourDay, myCustomButton' // buttons for switching between views
    },
    height: 'auto',
    aspectRatio: 2,
    views: {
        agendaDay: {
            type: 'agendaWeek',
            //duration: { days: 60 },
            //buttonText: '4 day'
        },
    },
    slotEventOverlap:false,
    events:tabtest

        };

                return rr;

}
else
{
return false;
}

    },

////////////////////////////////////////////////////////

    campingcar: function(){
return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },
  campingcaraddons: function(){
return AddOns.find({campingcarId:FlowRouter.getParam("_id")}).fetch();
},
  campingcaruser:function(){

return UsersData.find({_id:CampingCars.find({_id:FlowRouter.getParam("_id")}).userid}).fetch()[0];
},

});

  Template.listing.events({
'click .add-addon':function(event, template){
       event.preventDefault();
    //     // Prevent default browser 
var ob = event.currentTarget;

//console.log("style transition: "+ob.style.backgroundColor);
//console.log("Id: "+event.currentTarget.id);
var addonstab = [];
if(Session.get("addonstab"))
{

  addonstab = Session.get("addonstab");
  
  if(addonstab.indexOf(ob.id)!==-1)
   {

//console.log("childNodes length: "+ob.childNodes[1].innerText);
ob.childNodes[1].innerText = "Add";

    delete addonstab[addonstab.indexOf(ob.id)];
    Session.set("addonstab",addonstab);
    ob.style.backgroundColor = "#ef4136";


      }
      else
      {
        addonstab.push(ob.id);
        Session.set("addonstab",addonstab);
    ob.style.backgroundColor = "rgb(255, 102, 179)";
    ob.childNodes[1].innerText = "Remove";
      }
  
}
else
{
addonstab.push(ob.id);
Session.set("addonstab",addonstab);

}
}


   });
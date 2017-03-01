import { Template } from 'meteor/templating';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import { UsersData } from '../api/usersdata.js';
import { Session } from 'meteor/session';

import './campingcar.html';
//import './sectionavailability.html';
//import './campingcarbooking.html';

var metanbr;

 Template.campingcar.onCreated(function() {

  this.autorun(() => {
    const campingcarssubs = this.subscribe('campingcars');
    if(campingcarssubs.ready()){
      var bdd = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
      DocHead.setTitle(bdd.city+"|"+bdd.make+"|"+bdd.model+"|"+bdd.name+"|Le Bon Camping-car");
      var metaInfo = {name: "description", content: bdd.description};
      DocHead.addMeta(metaInfo);
      var linkInfo = {rel: "icon", sizes:"16x16 32x32", href: "/favicon.ico?v=4"};
      DocHead.addLink(linkInfo);

  // var campingcars = CampingCars.find().fetch();
  //   _.each(campingcars, function(campingcar) {
  //       if(campingcar.city && campingcar.make && campingcar.model)
  //   out.push({
  //     page: '/campingcar/'+campingcar.city+'/'+campingcar.make+'/'+campingcar.model,
  //     lastmod: new Date(),
  //     changefreq: 'daily', 
  //     priority: 0.8
  //   });
  // });
    }

    this.subscribe('addons');
    const reservationssubs = this.subscribe('reservations');
    if(reservationssubs.ready()){
    }

    this.subscribe('usersdata');
  });

Session.set("addonstab", null);
});

 Template.campingcar.onRendered(function() {

});

 Template.campingcar.helpers({

calendaroptions: function() {
    
    var tabtest = [];
    // if(FlowRouter.getParam("_id") && CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch())
    // {

        var bddcampingcar = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
        var bddreservations = Reservations.find({resource_id:bddcampingcar._id}).fetch();
        var evttab = [];
        var tabnoresa = [];
        var tabfull = bddcampingcar.daysfull;

            for (var j = 0; tabfull.length > j; j++)  {

                  var dd = moment(tabfull[j], 'YYYY-MM-DD');
                  var d = dd.format('x')
  
                  var daysf = {id:d,
                              start: tabfull[j],
                              rendering:'background',
                              backgroundColor:'red'
                              };
                  tabtest.push(daysf);
              }

            for (var i = 0;  bddreservations.length > i; i++) {

                  //var loueurid = bddreservations[i].user_id;
                  //var tt ="Loueur Id:"+loueurid+", Netprize :"+bddreservations[i].netprize+", Addonsprize: "+bddreservations[i].addonsprize;
 
                  var uevent = {id:bddreservations[i]._id,
                                //title: tt,
                                start: bddreservations[i].start_time,
                                end: bddreservations[i].end_time,
                                rendering:'background',
                                backgroundColor:'red'
                                };

                  tabtest.push(uevent);
              }


        var rr = {

            //height: 200,
        defaultDate: moment(),
              //eventLimit: true, // for all non-agenda views
        header: {
            left:   'prev',
            center: 'title',
            right:  'next'
        },
        height: 'auto',
        aspectRatio: 2,
        views: {
          agendaDay: {
            type: 'agendaWeek',
          },
        },
        slotEventOverlap:false,
            //defaultView: 'agendaWeek',
            //defaultView: 'basicWeek',

        eventSources:
          [

        // your event source
        {
        events:tabtest,
        },
    ]

        };

                return rr;

    },

////////////////////////////////////////////////////////

    campingcar: function(){
return CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
  },
  campingcaraddons: function(){
    //console.log("camping car id :"+CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0]._id);
return AddOns.find({campingcarId:CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0]._id}).fetch();
},
  campingcaruser:function(){

return UsersData.find({_id:CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).userid}).fetch()[0];
},

});

  Template.campingcar.events({
'click .add-addon':function(event, template){
       event.preventDefault();
    //     // Prevent default browser 
var ob = event.currentTarget;
var addonstab = [];
if(Session.get("addonstab"))
{

  addonstab = Session.get("addonstab");
  
  if(addonstab.indexOf(ob.id)!==-1)
   {

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
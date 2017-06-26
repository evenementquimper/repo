import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { Connections } from '../api/connections.js';
import { Mailings } from '../api/mailings.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import './ChartNew.js';
import './format.js';

import './admin.html';
        var dayfull = [];//tableau de moment
var startt = moment();
var endt = moment();
var place = {loc:null};



 Template.admin.onCreated(function() {
  this.autorun(() => {
      // wait on roles to intialise so we can check is use is in proper role
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize()
  }
    this.subscribe('campingcars');
    this.subscribe('connections');
    //this.subscribe('reservations');

   const reservationssubs = this.subscribe('reservations');
    if(reservationssubs.ready() && Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP)!=false)
    {
gantt.config.start_date = moment("2017-01-01", 'YYYY-MM-DD');
//gantt.config.end_date = new Date(2017, 03, 20);
gantt.config.end_date = moment("2017-07-20", 'YYYY-MM-DD');
  
    gantt.init("gantt");

// gantt.templates.task_class = function(start, end, task){
//     if(task.type == gantt.config.types.reservation){
//         return "reservation_task";
//     }
//     return "";
// };


// var taskId = gantt.addTask({
//     id:'10',
//     text:"Project #1",
//     start_date:"09-03-2017",
//     duration:28
// });

// gantt.addTask({
//     id:'3',
//     text:"Alpha release",
//     type:gantt.config.types.milestone,
//     parent:'10',
//     start_date:'13-03-2017'
// });

// var newreservation = {
//     data:[
//         {id:'1', text:"Project #1", type:gantt.config.types.project, open:true},           
//         {id:'2', text:"Task #1",start_date:'12-03-2017', duration:3, parent:1},
//         {id:'3', text:"Alpha release", type:gantt.config.types.milestone, parent:1, start_date:'13-03-2017'},
//         {id:'4', text:"Task #2",start_date:'14-03-2017', duration:3, parent:1}],
//     links:[]
// };
// gantt.addTask(newreservation);
var reservations = Reservations.find({}).fetch();
for (var i = 0;  reservations.length > i; i++) {

var start_time = moment(reservations[i].start_time,'YYYY-MM-DD');
var end_time = moment(reservations[i].end_time,'YYYY-MM-DD').add(1, 'day');
var color = 'blue';
var montant = 0;
      if(reservations[i].status=='owner_cancel')
        color = 'black';
                          

      if(reservations[i].status=='owner_valid')
        color = 'green';

        if(reservations[i].brutprize)
            montant = reservations[i].brutprize;
            if(reservations[i].brutprize.prize)
                montant = reservations[i].brutprize.prize;

gantt.addTask({id:"p_"+i,
               text:reservations[i]._id+" Montant: "+montant,
               color:color,
               start_date:start_time.format('DD-MM-YYYY'),
               duration:end_time.diff(start_time, 'days')});
    
  if(reservations[i].advance && reservations[i].advance.payment)
  {
gantt.addTask({
    id:"advance_"+i,
    text:"advance "+reservations[i].advance.prize,
    type:gantt.config.types.milestone,
    parent:"p_"+i,
    start_date:reservations[i].advance.createdAt
});    
  }
  if(reservations[i].solde && reservations[i].solde.payment)
  {
   gantt.addTask({
    id:"solde_"+i,
    text:"Solde "+reservations[i].solde.prize,
    type:gantt.config.types.milestone,
    parent:"p_"+i,
    start_date:reservations[i].solde.createdAt
});    
  }       
  if(!reservations[i].advance && !reservations[i].solde && reservations[i].brutprize && reservations[i].brutprize.payment)
  {
   gantt.addTask({
    id:"Comptant_"+i,
    text:"Comptant "+reservations[i].brutprize.prize,
    type:gantt.config.types.milestone,
    parent:"p_"+i,
    start_date:reservations[i].brutprize.createdAt
});    
  }   

gantt.addTask({
    id:"c_"+i,
    text:"Création",
    type:gantt.config.types.milestone,
    parent:"p_"+i,
    start_date:reservations[i].createdAt
});
//{id:"A"+reservations[i]._id+i, text:"Task #1", color:color,  start_date:start_time.format('DD-MM-YYYY'), duration:end_time.diff(start_time, 'days'), parent:"p_"+i},
//{id:"B"+reservations[i]._id+i, text:"Alpha release", type:gantt.config.types.milestone,   parent:"p_"+i, start_date:"11-03-2017"}


}


//gantt.meteor({tasks: Reservations});

      // var bdd = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
      // DocHead.setTitle(bdd.city+"|"+bdd.make+"|"+bdd.model+"|"+bdd.name+"|Le Bon Camping-car");
      // var metaInfo = {name: "description", content: bdd.description};
      // DocHead.addMeta(metaInfo);
      // var linkInfo = {rel: "icon", sizes:"16x16 32x32", href: "/favicon.ico?v=4"};
      // DocHead.addLink(linkInfo);

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

    this.subscribe('mailings');
  });

   this.mailling = new ReactiveDict();

var autocomplete;

//  GoogleMaps.ready('exampleMap', function(map){

//   var input = /** @type {!HTMLInputElement} */(
//       document.getElementById('autocomplete'));

//   autocomplete = new google.maps.places.Autocomplete(input);

//   autocomplete.addListener('place_changed', function() {
//     console.log("listener autocomplete");
//     //infowindow.close();
//     // marker.setVisible(false);
//     place = autocomplete.getPlace();
//     console.log("Place: "+JSON.stringify(place.geometry));
//     if (!place.geometry) {
//        window.alert("Autocomplete's returned place contains no geometry");
//        return;
//      }


//     if (place.geometry.viewport) {

//     } else {

//      }
// });

// });


});

 Template.admin.onRendered(function() {

// gantt.config.types.reservation = "type_id";
// gantt.locale.labels.type_reservation = "Réservation";
// gantt.config.lightbox.reservation_sections = [
//     {name:"title", height:20, map_to:"text", type:"textarea", focus:true},
//     {name:"details", height:70, map_to: "details", type: "textarea"},
//     {name:"type", type:"typeselect", map_to:"type"},
//     {name:"time", height:72, type:"time", map_to:"auto"}
// ];
// gantt.locale.labels.section_title = "Subject";
// gantt.locale.labels.section_details = "Details";
// gantt.config.autosize = "xy";
//gantt.config.initial_scroll = true;
//gantt.config.autosize_min_width = 500;
//gantt.config.autofit = true;

// gantt.templates.tooltip_text = function(start,end,task){
//     return "<b>Task:</b> "+task.text+"<br/><b>Duration:</b> " + task.duration;
// };

// gantt.attachEvent("onTaskClick", function(id,e){
//     console.log("task clic");
//     return true;
// });

// gantt.attachEvent("onTaskSelected", function(id,item){
//     console.log("task select");
// });

gantt.attachEvent("onLinkClick", function(id,e){
    //any custom logic here
    console.log("link clic");
});

this.$('.datetimepicker').datetimepicker({
        useCurrent:true,
        collapse:true,
        //format: 'YYYY-MM-DD',
        minDate: moment(),
        //keepOpen: true,
        //inline: true,
        focusOnShow:false,
        //collapse:false,
        sideBySide:true
        //enabledHours:true
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]
    });

var baroptions = {};
   // Set the options
    var options = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [1, 54, 68, 79, 64, 22, 14]
        }, {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0, 47, 74, 66, 28, 97, 37]
        }]
};

var bardata = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
};

 //var myLineChart = new Chart(ctx).Line(data, options);
 //var myBarChart = new Chart(ctx).Bar(bardata, baroptions);


// function MoreChartOptions(){

// } 



var ctx = document.getElementById("myChart").getContext("2d");
var datedata = {
                    labels: [new Date(2014,0,1,12,0,0), new Date(2014,1,1,12,15,0), new Date(2014,2,1,12,30,0), new Date(2014,3,1,12,45,0)],
                    datasets: [
                        {
                            fillColor: "rgba(220,0,0,0.5)",
                            strokeColor: "rgba(220,220,220,0.5)",
                            data: [20,56,24,35]
                        }
                        // {
                        //     fillColor: "rgba(0,220,0,0.5)",
                        //     strokeColor: "rgba(220,220,220,0.5)",
                        //     data: [13,40,55,33]
                        // },
                        // {
                        //     fillColor: "rgba(0,0,220,0.5)",
                        //     strokeColor: "rgba(220,220,220,0.5)",
                        //     data:[45,37,39,41]
                        // }
                    ]
                };

});


//  Template.mlsectioncontentavailability.rendered = function() {

// this.$('.datepicker').datepicker();

// }
 Template.admin.helpers({

adminrole: function(){
return Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
},

agregate: function(){

    // var agr = Reservations.aggregate([{$match:{status:"newbooking"}},
    //                                        {$group:{_id:"$book_id", brutprize:{$sum:"$brutprize"}}},
    //                                        {$sort:{brutprize:-1}}]);
    //console.log("agregate: "+agr.length);
//var agr = Reservations.aggregate([{$group:{_id:"$status", montanttotal:{$sum:"$brutprize"}}}]);
//console.log("agr :"+agr.fetch()[0].montanttotal);
    return false;
},

bookingsstat: function(){
   var nwbook = 0;
    var ownervalidnbr= 0;
    var ownercancelnbr= 0;
    var comptantnbr = 0;
    var comptantcost = 0;
    var advancenbr = 0;
    var advancecost = 0;
    var soldenbr = 0;
    var soldecost = 0;
    //var bookingsstat = bookingsstat = {totalbook:totalbook, nwbook:nwbook, ownervalidnbr:ownervalidnbr, ownnercancelnbr:ownnercancelnbr, comptantnbr:comptantnbr,comptantcost:comptantcost, advancenbr:advancenbr, advancecost:advancecost, soldenbr:soldenbr, soldecost:soldecost};
   
    var bookingsbdd = Reservations.find({}).fetch();

return {totalbook:Reservations.find({}).fetch().length,
        nwbook: Reservations.find({status:"newbooking"}).fetch().length,
        ownervalidnbr:Reservations.find({status:"owner_valid"}).fetch().length,
        ownnercancelnbr:Reservations.find({status:"owner_cancel"}).fetch().length,
        //comptantnbr:Reservations.find({status:"owner_cancel"}).fetch().length,
        //comptantcost:Reservations.find({status:"owner_cancel"}).fetch().length,
        //advancenbr:Reservations.find({status:"owner_cancel"}).fetch().length,
        //advancecost:Reservations.find({status:"owner_cancel"}).fetch().length,
        //soldenbr:Reservations.find({status:"owner_cancel"}).fetch().length,

    };


    //for (var i = 0;  bookingsbdd.length > i; i++) {
        //totalbook = 1+i;

//console.log("Réservation id :"+bookingsbdd[i]._id);

// if(bookingsbdd[i].status!="owner_cancel")
// {
        // if(bookingsbdd[i].status=="newbooking")
        // {
        //     //comptantcost = comptantcost+bookingsbdd[i].brutprize.prize
        //     nwbook++;
        // }
        // if(bookingsbdd[i].status=="owner_valid")
        // {
        //     //comptantcost = comptantcost+bookingsbdd[i].brutprize.prize
        //     ownervalidnbr++;
        // }

        // if(bookingsbdd[i].advance!=true && bookingsbdd[i].brutprize && bookingsbdd[i].brutprize.payment && bookingsbdd[i].brutprize.prize)
        // {
        //     comptantcost = comptantcost+bookingsbdd[i].brutprize.prize;
        //     comptantnbr++;
        // }
        // if(bookingsbdd[i].advance && bookingsbdd[i].advance.payment)
        // {
        //     advancecost = advancecost+bookingsbdd[i].advance.prize;
        //     advancenbr++;
        // }
        //  if(bookingsbdd[i].solde && bookingsbdd[i].solde.payment)
        // {
        //     soldecost = soldecost+bookingsbdd[i].solde.prize;
        //     soldenbr++;
        // }
        // else
        // {

        // }
    //}
    //else
    //{
      //  ownercancelnbr++;
    //}
    //}


    
//return {totalbook:totalbook, nwbook:nwbook, ownervalidnbr:ownervalidnbr, ownnercancelnbr:ownnercancelnbr, comptantnbr:comptantnbr,comptantcost:comptantcost, advancenbr:advancenbr, advancecost:advancecost, soldenbr:soldenbr, soldecost:soldecost};
},

userinfo: function(){
//if(Meteor.user() && Meteor.user().emails[0].address==Meteor.settings.admin.ADM_EMAIL)
//{
return Meteor.user().emails[0].address;//.emails[0].address==Meteor.settings.admin.ADM_EMAIL)  
},

//    exampleMapOptions: function() {
//     if (GoogleMaps.loaded()) {
//       return {
//         center: new google.maps.LatLng(-25.363, 131.044),
//         zoom: 8,
//         libraries: 'places',
//       };
//     }
// },
mailview: function(){

  var aeramail = '<p>Pas de template</p>';

if(Template.instance().mailling.get('tempt'))
{
  aeramail = Template.instance().mailling.get('tempt');
 console.log("template: "+aeramail);
 
  return new Spacebars.SafeString(aeramail);
 }
else
{
  return new Spacebars.SafeString(aeramail);
}

},

mailings: function(){

return Mailings.find({}).fetch();
},

canvas: function(){
var canvas1 = document.getElementById("myChart").getContext("2d");
var datedata2 = {
                    labels: [new Date(2014,0,1,12,0,0), new Date(2014,1,1,12,15,0), new Date(2014,2,1,12,30,0), new Date(2014,3,1,12,45,0)],
                    datasets: [
                        {
                            fillColor: "rgba(220,0,0,0.5)",
                            strokeColor: "rgba(220,220,220,0.5)",
                            data: [10,20,30,40]
                        }
                        // {
                        //     fillColor: "rgba(0,220,0,0.5)",
                        //     strokeColor: "rgba(220,220,220,0.5)",
                        //     data: [13,40,55,33]
                        // },
                        // {
                        //     fillColor: "rgba(0,0,220,0.5)",
                        //     strokeColor: "rgba(220,220,220,0.5)",
                        //     data:[45,37,39,41]
                        // }
                    ]
                };
                //var chart2 = new Chart(ctx2).Line(datedata2,{fmtXLabel : "time",graphTitle : "Format : time",animation :false});
return true;
},

    calendaroptions: function() {
        //var evt = {events:}

    if(Reservations.find({}).count())
{
var testevent = {title: "testtitle2",
                start: "2016-11-24",
                end: "2016-11-26"};

var tabtest = [];
tabtest.push(testevent);


console.log("connection find : "+Reservations.find({}).count());
var bddreservations = Reservations.find({}).fetch();
var evttab = [];
//var evt = {events:}
var testevent3 = {title: "testtitle3",
                start: "2016-11-02",
                end: "2016-11-06"};
tabtest.push(testevent3);
//JSON.parse(testevent);
//rr.eventSources[0].events.push(testevent);

for (var i = 0;  bddreservations.length > i; i++) {

  var tt =bddreservations[i]._id+", Netprize :"+bddreservations[i].netprize+", Addonsprize: "+bddreservations[i].addonsprize;
 

  var uevent = {id:bddreservations[i]._id,
                title: tt,
                start: bddreservations[i].start_time,
                end: bddreservations[i].end_time,
                url: '/mylistings/availability/'+bddreservations[i].resource_id
              };

  //console.log("uevet :"+uevent.title);
  //vttab[i] = uevent;
//rr.eventSources[0].events.push(uevent);
tabtest.push(uevent);
  // prsuevt;
    //console.log("uevet  tabparse:"+evttab[i]);
}

        var rr = {
             dayClick: function(date, jsEvent, view) {

        alert('Clicked on: ' + date.format());

        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

        alert('Current view: ' + view.name);

        // change the day's background color just for fun
        $(this).css('background-color', 'red');

    },
    eventMouseover: function(event, jsEvent, view) {

        //alert('event: ' + event);
        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

        //alert('Current view: ' + view.name);

        // change the day's background color just for fun
        //$(this).css('background-color', 'red');

    },
            //height: 200,
            defaultDate: '2016-11-10',
              //eventLimit: true, // for all non-agenda views
        header: {
        center: 'month,agendaFourDay' // buttons for switching between views
    },
    views: {
        agendaDay: {
            type: 'agendaWeek',
            duration: { days: 15 },
            //buttonText: '4 day'
        }
    },
    slotEventOverlap:false,
            //defaultView: 'agendaWeek',
            //defaultView: 'basicWeek',

   eventSources:
          [

        // your event source
        {
    events:tabtest,
    //[  
            // {
            //     title: 'testtitle',
            //     start: '2016-11-21',
            //     end: '2016-11-23'
            //   },
            //   testevent
        // {
        //     title  : "event1",
        //     start  : "2016-11-11"
        // },
        // {
        //     title  : "event2",
        //     start  : "2016-11-12",
        //     end    : "2016-12-12"
        // },
        //         {
        //     title  : 'réservations01',
        //     start  : '2016-11-12',
        //     end    : '2016-12-12'
        // },
        // {
        //     title  : 'event3',
        //     start  : '2010-01-09T12:30:00',
        //     allDay : false // will make the time show
        // },
        //   {
        //     start: '2016-11-10T10:00:00',
        //     end: '2016-11-10T16:00:00',
        //     rendering: 'background'
        // }
    //],
                color: 'red',     // an option!
            textColor: 'white' // an option!
        }

        // any other event sources...

    ]
        };
        
        //console.log("rr : "+JSON.stringify(rr.eventSources[0].events));
                //console.log("rr event 0: "+rr.eventSources[0].events[0]);
                return rr;

}
else
{
  return false;
}





                //console.log("rr string event 0: "+JSON.stringify(rr.eventSources[0].events[0]));
                //console.log("rr event 1: "+rr.eventSources[0].events[1]);
                //console.log("rr string event 1: "+JSON.stringify(rr.eventSources[0].events[1]));
        //return rr;
    },

text: function(){
  return new Spacebars.SafeString('<canvas id="myChart2" width="600" height="600"></canvas>');
},

testhtml:function(){

return "<p>Salut mon html</p>";
},

reservations:function(){
var bddreservations = Reservations.find({}).fetch();
return bddreservations;
},

connections:function(){
  
    if(Connections.find({}).count())
{
console.log("connection find : "+Connections.find({}).count());
console.log("bdd date: "+Connections.find({}).fetch()[0].createdAt);
var bddcon = Connections.find({}).fetch();
var datetab = [];
for (var i = 0;  bddcon.length > i; i++) {
  datetab.push(Connections.find({}).fetch()[i].createdAt);
  //console.log("tab push :"+datetab[i]);
}

//var ctx2 = document.getElementById("myChart").getContext("2d");

//ctx2.fillStyle = "rgb(200,0,0)"; 
//console.log("objet ctx2 :"+ctx2);

//console.log("inner ctx2 :"+ctx2.innerHTML);
//console.log("ctx2 :"+ctx2.canvas.toDataURL());
//new Chart(ctx2).Line(datedata,{fmtXLabel : "time",graphTitle : "Format : time",animation :false});

                //var latestLabel = datedata2.labels[2];

//                 setInterval(function(){
//   // Add two random numbers for each dataset
// ctx2.addData(datedata2.labels, ++latestLabel); 
//   // Remove the first point so we dont just add values forever
//  ctx2.removeData();
// }, 5000);
               
//updateChart(ctx2,datatab2,{fmtXLabel : "time",graphTitle : "Format : time",animation :false},true,true);
//document.getElementById("myChart").getContext("2d").Line(datetab,{fmtXLabel : "date de-DE weekday: long, year: numeric, month: long, day: numeric",graphTitle : "Format : date de-DE weekday: long, year: numeric, month: long, day: numeric",animation :true});
return Connections.find({},{limit:5}).fetch();

}
else
{
return false;
}
    //var ctx2 = document.getElementById("myChart").getContext("2d");
    //ctx2.addData([Math.random() * 100, Math.random() * 100], ++latestLabel);
},

    campingcars: function(){
    console.log("camping car find : "+CampingCars.find({}).count());
return CampingCars.find({},{limit:5}).fetch();
  }
});
  Template.admin.events({
'click #google':function(event, template){
    console.log("google clik");
//FlowRouter.url("http://google.fr");
     //console.log("google clik"+FlowRouter.url("http://google.fr"));
      window.location.replace("https://sandbox-webkit.lemonway.fr/demo/dev/?moneyInToken=133693523MsrQOlP6mp34PRqMl6HxLQPhMF3");
},


'click #lemonway': function(event, template){

//       var cursor = Images.findOne({_id:sup[1]});
//       console.log("onafterload file link?: "+cursor.link());
//       console.log("onafterload file fetch?: "+cursor.fetch());

// Meteor.call('UploadFile', "identite.jpeg",  "0", cursor.fetch() ,function(error, result){
//            if (!error){
//              console.log("result upload: "+JSON.stringify(result));
//            }
//            else{
//  console.log("result upload error: "+JSON.stringify(error));
//            }
//          });

var postData = {
  "p": {
    "wlLogin":  "society",
    "wlPass":   "123456",
    "language": "en",
    "version":  "1.9",
    "walletIp": "1.1.1.1",
    "walletUa": "Node.js Tutorial",
    "wallet":   "TEST123456"
  }
};

var myLemon = {
      "p": {
    "wlLogin":  "society",
    "wlPass":   "123456",
    "language": "en",
    "version":  "1.9",
    "walletIp": "1.1.1.1",
    "walletUa": "Node.js Tutorial",
    "wallet":   "1490286583tz5wvoe7"
  }
    
};

    var options = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    },
data: postData};

//console.log("random: "+Random.id());
//   Meteor.call('GetWalletDetails', options, function(error, result){
//           if (!error){
// console.log("result http: "+result.statusCode+"WALLET: "+result.data.d.WALLET.ID);
//           }
//           else{

//           }
//         }

//     );

// Generate a 16 character alpha-numeric token:
 //var token = "1234567891234567";//RandToken.generate(16);

// Use it as a replacement for uid:
//const token = RandToken.uid(16);
// var payerWallet = token;
// var postd={"p":{
//         "wlLogin":  "society",
//         "wlPass":   "123456",
//         "language": "en",
//         "version":  "1.9",                     result Details: {"d":{"__type":"WonderLib.MoneyInWebInitResult","MONEYINWEB":{"TOKEN":"133689856ATsjncVfWAvfawE8NwUFYwSfFyn","ID":"35999","CARD":null,"redirectURL":null},"E":null}}
//         "walletIp": "1.1.1.1",
//         "walletUa": "Node.js Tutorial",
//         "wallet":           payerWallet,
//         "clientMail":       payerWallet + "@lemonway.com",
//         "clientFirstName":  "Payer",
//         "clientLastName":   "Payer"}
// };

//     var options = {headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     },
// data: postd};
Meteor.call('GetMoneyInTransDetails', function(error, result){
          if (!error){
//console.log("result RegisterWallet: "+result.statusCode+"WALLET: "+result.data.d.WALLET.ID);
console.log("result Details: "+JSON.stringify(result.data));
//var params = {moneyInToken: result.data.MONEYINWEB.TOKEN};
//var queryParams = {};
//window.location.href = "https://sandbox-webkit.lemonway.fr/demo/dev/result/?moneyInToken="+result.data.MONEYINWEB.TOKEN;
 //window.location.replace("https://sandbox-webkit.lemonway.fr/demo/dev/?moneyInToken="+result.data.d.MONEYINWEB.TOKEN);
//FlowRouter.url("https://sandbox-webkit.lemonway.fr/demo/dev/result/", params, queryParams);
          }
          else{
console.log("error Details: "+error);
          }
        });

// Meteor.call('GetWalletDetails', options, function(error, result){
//           if (!error){
// console.log("result GetWalletDetails: "+result.statusCode+"WALLET: "+result.data.d.WALLET.ID);
//           }
//           else{
// console.log("error GetWalletDetails: "+error);
//           }
//         }

//     );

// HTTP.post("https://sandbox-api.lemonway.fr/mb/demo/dev/directkitjson2/Service.asmx/GetWalletDetails", options, function(error, result){
//            if (!error){
// console.log("result RegisterWallet: "+result.statusCode+"WALLET: "+result.data.d.WALLET.ID);
//           }
//          else{
//  console.log("error RegisterWallet: "+error);
//           }
// });

},

'click .gantt_task_content': function(event, template){
console.log("click gant task");
console.log("click current html: "+event.currentTarget.innerHTML);
 var delbook30 = template.find('.delbook30');
delbook30.style.display = "none";
var delbook5050 = template.find('.delbook5050');
delbook5050.style.display = "none";
 var delbook100 = template.find('.delbook100');
delbook100.style.display = "none";
var payowner = template.find('.payowner');
payowner.style.display = "none";
var booksp = event.currentTarget.innerHTML.split(" ");

var bookid = booksp[0];

console.log("Book id: "+bookid);

var book = Reservations.find({_id:bookid}).fetch()[0];
var echea = moment(book.start_time,'YYYY-MM-DD').add(1, 'days').diff(moment(), 'days'); // 1
console.log("Echeance "+echea+" jours");
if(book.status=="newbooking")
{
//actions possibles : 

}
if(book.status=="owner_valid")
{

}
        if(!book.advance && book.brutprize && book.brutprize.payment && book.brutprize.prize)
        {
            //paiement brut réaliser donc remboursement 100% - frais financiers 2%

        }
        if(book.advance && book.advance.payment)
        {
        }
        if(book.solde && book.solde.payment){

         }
        if(moment(book.start_time,'YYYY-MM-DD').subtract(1, 'months').isAfter(moment().add(1, 'days'))){
            console.log("Réservation dans 1 mois");
            //réservation dans plus d'un mois
            delbook30.style.display = "block";
         }
        if(moment(book.start_time,'YYYY-MM-DD').add(1, 'days').isBetween(moment().add(8, 'days'), moment().add(1, 'months'))){
            //reservation entre 8 j et 1 mois
            delbook5050.style.display = "block";

        }

        if(moment(book.start_time,'YYYY-MM-DD').add(1, 'days').isBefore(moment().add(8, 'days'))){
            //reservation dans moins de 8 jour
            delbook100.style.display = "block";
        }

        if(moment(book.start_time,'YYYY-MM-DD').add(3, 'days').isBefore(moment())){
            //reservation début + 2 jours
            payowner.style.display = "block";
        }

        if(moment().add(2, 'days').isAfter(moment(book.start_time,'YYYY-MM-DD'))){
            console.log("Réservation en cour depuis + de 2 jours");
            //pas de remboursement
         }
        if(moment(book.start_time,'YYYY-MM-DD').subtract(8, 'days').isAfter(moment())){
            console.log("Réservation dans 8 jours");
            //pas de remboursement
            //var delbook100 = template.find('.delbook100');
            //delbook30.style.display = "block";
         }


        if(moment(book.start_time,'YYYY-MM-DD').subtract(2, 'months').isAfter(moment())){
            console.log("Réservation dans 2 mois");
            //pas de remboursement
         }

        if(moment(book.start_time,'YYYY-MM-DD').subtract(3, 'months').isAfter(moment())){
            console.log("Réservation dans 3 mois");
            //pas de remboursement
         }
//console.log("click current text: "+event.currentTarget.text);
//console.log("click current id: "+event.currentTarget.id);

    var peopleid = template.find('#people'); 
var bookselectaction = template.find('#bookselectaction');
var outpoupselect = template.find('#outpoupselect');
var echeance = template.find('.echeance');
echeance.innerHTML = "Echéance :"+echea+" jours";
outpoupselect.style.display = "inline-block";

//bookselectaction.id = bookid;
bookselectaction.style.display = "inline-block";
//peopleselect.style.top = event.pageY+'px';
//peopleselect.style.left = event.pageX+'px';

bookselectaction.style.top = event.clientY+'px';
bookselectaction.style.left = event.clientX+'px';
},

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
    var bookselectaction = template.find('#bookselectaction');
var popupselect = template.find('.popupselect');


if(bookselectaction.style.display == 'inline-block')
{ 
  //console.log("fueltypeselect :"+fueltypeselect.style.display);
  bookselectaction.style.display = 'none';
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

  'input textarea': function(event, template){
    event.preventDefault();

//console.log("click current nameœ: "+event.currentTarget.name);
console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);
Template.instance().mailling.set('tempt', event.currentTarget.value);
  },

    'input #adres': function(event, template){
    event.preventDefault();

//console.log("click current nameœ: "+event.currentTarget.name);
console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);
Template.instance().mailling.set('adres', event.currentTarget.value);
  },

'change .selectstatus':function(event, template){
console.log("event id: "+event.currentTarget.id);
console.log("event select: "+event.currentTarget.value);

Reservations.update({_id:event.currentTarget.id},{$set:{status:event.currentTarget.value}},{upsert:true});

},

'click .removebook':function(event, template){
Reservations.remove({_id:event.currentTarget.id});
},

  'click .removemailing':function(event, template){
   var mailing = Mailings.find({_id:event.currentTarget.id}).fetch()[0];
   console.log("timeout id: "+mailing.timeout);
Meteor.clearTimeout(mailing.timeout);
Mailings.remove({_id:event.currentTarget.id});
  },

//     'click .updatemailing':function(event, template){
//    //var mailing = Mailings.find({_id:event.currentTarget.id}).fetch()[0];
// var ResId = template.find('#textarea_'+event.currentTarget.id);
// var textAval = $(ResId).val();
// console.log("text val: "+textAval);
// //Mailings.update({_id:event.currentTarget.id});

//         Mailings.update({
//             _id: event.currentTarget.id
//         }, {
//             $set: {template:textAval}
//         }, {
//           upsert: true
//         });

//   },

  'click #sendmail': function(instance, template){

// if($('.datetimepicker').data().date)
// {
//     var vdate = $('.datetimepicker').data().date;

//   console.log("date ?: "+vdate);
//  console.log("date  moment?: "+moment());
//  var delta = vdate-moment();
//  console.log("delta?: "+delta);
   
// }

// else
// {

// }

//var settim = Meteor.call('SendMail',vdate, Template.instance().mailling.get('adres'), 'subjecttest', Template.instance().mailling.get('tempt'), null, null, null);
//console.log("settim: "+settim);
// Meteor.setTimeout(function(){Test(10);},10000
//   , function(error, result){
//   if(!error){
//     console.log("result :"+result);
//   }
//   else
//   {
//     console.log("error :"+error);
//   }
// }

// );

//var spacetemp = new Spacebars.SafeString(Template.instance().mailling.get('tempt'));

// Mailings.insert({"user_id":Meteor.userId(),
//                  "timeout":settim,
//                  "start_time": vdate.valueOf(),
//                  "listmails": Template.instance().mailling.get('adres'),
//                  "template": Template.instance().mailling.get('tempt'),
//                   createdAt: new Date()}, function( error, result) { 
//       if ( error ) console.log ( error ); //info about what went wrong
//       if ( result )
//   {
//     console.log("enregistrement mailing_id: "+result);
//   }
//  });
//console.log("settim: "+settim);
//Meteor.setTimeout(function(){Test("10");}, 1000);
//Meteor.call('SendMail', Template.instance().mailling.get('adres'), 'subjecttest', Template.instance().mailling.get('tempt'), null, null, null);

  },

// 'click #calendar': function(event, template){
// console.log("click calendar");
// $('.fc').css("display",'none');
// },

'click #search-button': function(instance, template){
// var lat=46.227638;
// var lng=2.213749000000007;
// startt="";
// endt="";
// var loc = "";

//   if(place.geometry)
//   {
// loc = place.geometry.location;
// lat=loc.lat();
// lng=loc.lng();
// }


// if($('.datetimepickerstart').data().date)
// startt = $('.datetimepickerstart').data().date;

// if($('.datetimepickerend').data().date)
// endt = $('.datetimepickerend').data().date;

//      var queryParams = JSON.parse('{"lat":'+lat+',"lng":'+lng+',"start":"'+startt+'","end":"'+endt+'"}');

//      var path = FlowRouter.path("maplistings", queryParams);

// FlowRouter.go(path);

}

// 'dp.change .datetimepickerstart': function(instance, template){
  
// },

// 'click .datetimepickerend': function(instance, template){
// }

   });  

  function Test(x)
{
   console.log("*** Test() ***"+x);
}
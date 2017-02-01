import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { FilesCollection } from 'meteor/ostrio:files';

import { CampingCars } from '../api/campingcars.js';
import { AddOns } from '../api/addons.js';
import { Session } from 'meteor/session';
import { Reservations } from '../api/reservations.js';

import './mlsectioncontentavailability.html';

var dayfull = [];

 Template.mlsectioncontentavailability.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);
  //this.dayfull = new ReactiveVar(false);

});

 Template.mlsectioncontentavailability.onRendered(function() {

this.$('.datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        minDate: moment(),
        //keepOpen: true,
        inline: true,
        focusOnShow:false,
        collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]
    });

 this.$('.fc').fullCalendar({
    customButtons: {
        myCustomButton: {
            text: 'custom!',
            click: function() {
                alert('clicked the custom button!');
            }
        }
    },
    header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    }
});
 //console.log("les events : "+JSON.stringify(evtsourc[0])+" "+evtsourc[1]);

});

Template.mlsectioncontentavailability.onDestroyed(function () {
 //var evtsourc = $('.fc').fullCalendar('getEventSources');
 //console.log("les events : "+EJSON.stringify(evtsourc));
});

 Template.mlsectioncontentavailability.helpers({

    calendarsectionoptions: function() {

    if(Reservations.find({resource_id:FlowRouter.getParam("_id")}).count() && FlowRouter.getParam("_id") && CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch())
{

var bddcampingcar = CampingCars.find({_id: FlowRouter.getParam('_id')}).fetch();

var tabtest = [];

var bddreservations = Reservations.find({resource_id:FlowRouter.getParam("_id")}).fetch();

var evttab = [];
var tabnoresa = [];

for (var i = 0;  bddreservations.length > i; i++) {
//le loueur
var loueurid = bddreservations[i].user_id;


  var tt ="Loueur Id:"+loueurid+", Netprize :"+bddreservations[i].netprize+", Addonsprize: "+bddreservations[i].addonsprize;
 

  var uevent = {id:bddreservations[i]._id,
                title: tt,
                start: bddreservations[i].start_time,
                end: bddreservations[i].end_time,
                color:'red',
                backgroundColor:'blue',
                borderColor :'green', 
                textColor :'white',
              };


  //console.log("uevet :"+uevent.title);
  //vttab[i] = uevent;
//rr.eventSources[0].events.push(uevent);
tabtest.push(uevent);
  // prsuevt;
    //console.log("uevet  tabparse:"+evttab[i]);
}

// if(bddcampingcar[0].daysfull)
// {
//   console.log("day ful length"+bddcampingcar[0].daysfull.length);
//   for (var j = 0; bddcampingcar[0].daysfull.length > j; j++) {
//         var udfull = {id:"Day full"+j,
//                 title: "Day full"+j,
//                 start: bddcampingcar[0].daysfull[j]
//               };
// tabnoresa.push(udfull);
// console.log("udfulls start: "+udfull.start);
//   }

// }
// else
// {

// }

        var rr = {

              eventClick: function(calEvent, jsEvent, view) {
//event.preventDefault();
        //event.title = "CLICKED!";
     //alert('Event: ' + calEvent.id);
        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        //alert('View: ' + view.name);

        // change the border color just for fun
        //$(this).css('border-color', 'red');
//       var moday = moment(calEvent.id, 'x');

// console.log("calevent: "+moday.format('YYYY-MM-DD'));
//   var d = moday.format('YYYY-MM-DD');
  
//        $('.fc').fullCalendar('updateEvent', [calEvent]);
$('.fc').fullCalendar('removeEvents', calEvent.id);

 //var evtsourc = $('.fc').fullCalendar('getEventSources'); JSON.stringify(
 console.log("les events : "+calEvent.id);
        // CampingCars.update({
        //     _id: FlowRouter.getParam('_id')
        // }, {
        //     $unset: {daysfull:d}
        // });

        //$('.fc').fullCalendar( 'removeEvents' [calEvent.id] );
   //element.css('background-color', 'red');
        //$(this).fullCalendar('updateEvent', event);

    },
             dayClick : function(date, jsEvent, view) {
//var dyf = CampingCars.find({_id: FlowRouter.getParam('_id')}).fetch()[0].daysfull;

//console.log("dayclick : "+dyf[0]);

//console.log("jsevent currentTarget name: "+jsEvent.currentTarget.name);
//console.log("jsevent currentTarget value: "+jsEvent.currentTarget.value);
             //console.log("View: "+view.name); 
//$(this).css('background-color', 'red');
//var dig = '{"'+daysfull+'":"'+event.currentTarget.value+'"}';
//console.log("DIG: "+dig);
//var js = JSON.parse(dig);

//       var moday = moment(date, 'x');

// console.log("calevent: "+moday.format('YYYY-MM-DD'));
//   var d = moday.format('YYYY-MM-DD');

//         CampingCars.update({
//             _id: FlowRouter.getParam('_id')
//         }, {
//             $set: {daysfull:d}
//         });

      var source = {
    events: [
        {
            id:date,
            //title: 'Block',
            start: date
        }
        // etc...
    ],
    color: 'red',     // an option!
    textColor: 'white'
};

$('.fc').fullCalendar( 'addEventSource', source )

    },

            //height: 200,
            defaultDate: '2016-11-10',

    customButtons: {
        myCustomButton: {
            text: 'custom!',
            click: function() {
 //               var evtsourc2 = $('.fc').fullCalendar('getEventSources');
 // console.log("les events : "+EJSON.stringify(evtsourc2));
                alert('clicked the custom button!');
            }
        }
    },
              //eventLimit: true, // for all non-agenda views
        header: {
        center: 'agendaFourDay, myCustomButton' // buttons for switching between views
    },
    views: {
        agendaDay: {
            type: 'agendaWeek',
            duration: { days: 15 },
            //buttonText: '4 day'
        },
        day: {
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
            id:"tabtest",
            color: 'red',     // an option!
            textColor: 'white'// an option!
        },
        //{
    //events:tabnoresa,
    // [
    //         {
    //         title  : 'event3',
    //         start  : '2016-11-09',
    //         end  : '2016-11-09'

    //     }
    // ],

    //eventBackgroundColor: 'black'
    //color:'blue',
    //textColor:'white'
    //backgroundColor:'black',
    //textColor: 'white',
    //rendering :'background' 
        //},
//         {
//     events: function(start, end, timezone, callback) {
// var events = [];
//   console.log("day ful length"+bddcampingcar[0].daysfull.length);
//   for (var j = 0; bddcampingcar[0].daysfull.length > j; j++) {
        
//         var udfull = {id:"Day full"+j,
//                 title: "Day full"+j,
//                 start: bddcampingcar[0].daysfull[j]
//               };
//                      events.push(udfull);
// //tabnoresa.push(udfull);
// //console.log("udfulls start: "+udfull.start);
//   }

      
   
//       callback(events);
//     },
//             id:"eventfonction",
//             color: 'grey',     // an option!
//             textColor: 'white'// an option! 

//   }
        // any other event sources...

    ]

        };

                return rr;

}
else
{
  return false;
}

    },

  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

      uploadedFiles: function () {
      var filesCursor = Images.find();
    return Images.find({}).cursor;
},


    campingcars: function(){

      if(Meteor.userId()!==CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].userid)
      {
         FlowRouter.go("index");
         return true;
      }
      else
      {
          return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];

      }
  },
    addon: function(){
return AddOns.find({campingcarId:FlowRouter.getParam("_id")});
  }
});
  Template.mlsectioncontentavailability.events({

'click .fc-bgevent':function(event, template){
event.preventDefault();
console.log("click fc-bgevent");
},


'bs.click .modal':function(event, template){
event.preventDefault();
      console.log("bs show modal");
},


  'click #addonplus': function(event, template) {
    //var addonplus = template.find('#addonplus');
    //addonplus.style.display = "inline-block";

    AddOns.insert({ 
              userid : Meteor.userId(),
              campingcarId:FlowRouter.getParam("_id"),
              createdAt: new Date() });

  },

  'input .data-item': function (event, template) {
//event.preventDefault(); 
console.log("event: "+event.type);
    var routeid = FlowRouter.getParam('_id');
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
console.log("DIG: "+dig);
var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
  },

'click .addondisplay': function(event, template){
console.log("id?: "+event.currentTarget.id);
var adid = event.currentTarget.id;

var f = template.find(".addondetail"+adid);
console.log("F display: "+f.style.display);
if(f.style.display=="none")
{
f.style.display = "inline-block";
}
else
{
 f.style.display = "none"; 
}
},

  'input .addon-item': function (event, template) {

//event.preventDefault(); 
var curid = event.currentTarget.id;
var tabcurid = curid.split('_');

console.log("id?: "+event.currentTarget.id);
console.log("id tab?: "+tabcurid[1]);


var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
console.log("DIG: "+dig);
var js = JSON.parse(dig);

        AddOns.update({
            _id: tabcurid[1]
        }, {
            $set: js
        }, {
          upsert: true
        });
  },


'click .text-item': function(event, template){
//console.log("click current text-item label style width: "+event.currentTarget.children[0].style.position);
var lab = event.currentTarget.children[0];
var inp = event.currentTarget.children[1];
var hli = event.currentTarget.children[3];
//console.log("Label: "+lab.innerHTML);
inp.style.display = "inline-block";

var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
lab.style = nstyle;
//lab.style.;
lab.style.top = "38px";
lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
//lab.style.;
lab.style.cursor = "text";
//lab.style.; 244, 67, 54
lab.style.color ="rgba(86,90,92,0.5)";
//lab.innerHTML = "Vehicle Model";

var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
hli.style.transform = "scaleX(1)";


},

'click .select-item': function(event, template){
//console.log("click current text-item label style width: "+event.currentTarget.children[0].style.position);
var lab = event.currentTarget.children[0];
var inp = event.currentTarget.children[1];
var hli = event.currentTarget.children[3];
//console.log("Label: "+lab.innerHTML);
inp.style.display = "inline-block";

var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
lab.style = nstyle;
//lab.style.;
lab.style.top = "38px";
lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
//lab.style.;
lab.style.cursor = "text";
//lab.style.; 244, 67, 54
lab.style.color ="rgba(86,90,92,0.5)";
//lab.innerHTML = "Vehicle Model";

var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
hli.style.transform = "scaleX(1)";


},


  'click .flex-grid-item':function(event, template){
    event.preventDefault();
var key = event.target.name;
 var tar = event.target;

var routeid = FlowRouter.getParam('_id');
var dig = '{_id:"'+routeid+'",'+key+':"on"}';
console.log("av parser: "+dig);
console.log("fetch key: "+CampingCars.find({_id:FlowRouter.getParam('_id')}).fetch()[0]);
if (event.target.value=="on")
{


console.log("bdd on: "+tar.value);
var dig0 = '{"'+key+'":false  }';

var js = JSON.parse(dig0);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });

}
else
{
console.log("else value : ");
var dig2 = '{"'+key+'":"on"}';
console.log("dig2 : "+dig2);
var js2 = JSON.parse(dig2);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js2
        }, {
          upsert: true
        });

}

var transm = '{"transmission":[{"automatic":"on"},{"manuel":false}]}';
var jstr = JSON.parse(transm);
CampingCars.update({_id: FlowRouter.getParam('_id')
},{
  $set:jstr
},{
  upsert: true
});



var val = null;
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
  
  var inpt = template.find('.fileInputAddon');
  inpt.id = e.currentTarget.id; 
  inpt.click();
},
  'change .fileInputAddon': function (e, template) {

console.log("fileInputAddon Id :"+e.currentTarget.id);
var addonId = e.currentTarget.id;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      var upload = Images.insert({
        //campingcarid: FlowRouter.getParam("_id"),
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
                        var sup = fileObj.path.split('../../../../../public');
              console.log("Split 1: "+sup[0]);
              console.log("Split 2: "+sup[1]);
          alert('Split 01:"' + sup[0] + '" & sup 02:"' + sup[1] + '" successfully uploaded');
//sauvegarde de id de l'image ds la bdd du camping car


var dig = '{"images":"'+sup[1]+'"}';
//console.log("DIG: "+dig);

var js = JSON.parse(dig);

        AddOns.update({
            _id: addonId
        }, {
            $addToSet: js
        }, {
          upsert: true
        });

         }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }

   });
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

 //this.$('.fc').fullCalendar({});
 //console.log("les events : "+JSON.stringify(evtsourc[0])+" "+evtsourc[1]);

});

Template.mlsectioncontentavailability.onDestroyed(function () {
});

Template.mlsectioncontentavailability.helpers({

  calendarsectionoptions: function() {
    
    var tabtest = [];
    if(Reservations.find({resource_id:FlowRouter.getParam("_id")}).count() && FlowRouter.getParam("_id") && CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch())
    {

        var bddcampingcar = CampingCars.find({_id: FlowRouter.getParam('_id')}).fetch()[0];
        var bddreservations = Reservations.find({resource_id:FlowRouter.getParam("_id")}).fetch();
        var evttab = [];
        var tabnoresa = [];
        var tabfull = bddcampingcar.daysfull;

            for (var j = 0; tabfull.length > j; j++)  {

                  var dd = moment(tabfull[j], 'YYYY-MM-DD');
                  var d = dd.format('x')
  
                  var daysf = {id:d,
                              start: tabfull[j],
                              //rendering:'background',
                              backgroundColor:'red',
                              };
                  tabtest.push(daysf);
              }

            for (var i = 0;  bddreservations.length > i; i++) {

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

                  tabtest.push(uevent);
              }


        var rr = {

              eventClick: function(calEvent, jsEvent, view) {

                  if(calEvent.title==null)
                      {
                          $('.fc').fullCalendar('removeEvents', calEvent.id);
                          var moday = moment(calEvent.id, 'x');
                          var d = moday.format('YYYY-MM-DD');

                          CampingCars.update({
                              _id: FlowRouter.getParam('_id')
                                }, 
                                { 
                              $pull: 
                                  { daysfull:d}
                                },
                                { multi: true });
                      }
                  else
                      {
                          //alert('Impossible de ');
                      }
    },
             dayClick : function(date, jsEvent, view) {

                  var moday = moment(date, 'x');
                  var d = moday.format('YYYY-MM-DD');

                  CampingCars.update({
                      _id: FlowRouter.getParam('_id')
                        }, {
                      $addToSet: {
                          daysfull:d
                            }
                          });

                  var source = {id:date,
                                events: [{id:date,
                                     //title: 'Block',
                                       start: date,
                                 //rendering:'background',
                           //backgroundColor:'red',
                                          }
                                         ],
                                color: 'red',     // an option!
                            textColor: 'white'
                                };

                  $('.fc').fullCalendar( 'addEventSource', source )

    },

            //height: 200,
        defaultDate: moment(),
              //eventLimit: true, // for all non-agenda views
        header: {
        center: 'agendaFourDay, myCustomButton' // buttons for switching between views
        },
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

}
else
{
  return {defaultDate: moment()};
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

},


'bs.click .modal':function(event, template){
    event.preventDefault();
},


  'click #addonplus': function(event, template) {

    AddOns.insert({ 
              userid : Meteor.userId(),
              campingcarId:FlowRouter.getParam("_id"),
              createdAt: new Date() });

  },

'input .data-item': function (event, template) {
    event.preventDefault(); 
    var routeid = FlowRouter.getParam('_id');
    var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
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
//console.log("id?: "+event.currentTarget.id);
  event.preventDefault();
  var adid = event.currentTarget.id;
  var f = template.find(".addondetail"+adid);

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

    event.preventDefault(); 
    var curid = event.currentTarget.id;
    var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
    var js = JSON.parse(dig);

        AddOns.update({
            _id: curid
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


  'click .checkbox-item  ':function(event, template){
    event.preventDefault();
    console.log("current target: "+event.currentTarget.id);
    var curid = event.currentTarget.id.split(':');
    var key = curid[1];
    
    if(curid[2]!==null && curid[2].length > 0)
    {
//valide   
        var dig0 = '{"'+key+'":false  }';
        var js = JSON.parse(dig0);
        
        AddOns.update({
            _id: curid[0]
        }, {
            $set: js
        }, {
          upsert: true
        });

    }
    else
    {

        var dig = '{"'+key+'":"on"}';
        var js = JSON.parse(dig);

        AddOns.update({
            _id: curid[0]
        }, {
            $set: js
        }, {
          upsert: true
        });
    }
  },

'click .remove-addon': function(event, template){
event.preventDefault();
console.log("button click id: "+event.currentTarget.id);
var adname = event.currentTarget.name;
var txt;
var r = confirm("Supprimer "+adname);
if (r == true) {
    txt = "You pressed OK!";
            AddOns.remove({_id: event.currentTarget.id});
} else {
    txt = "You pressed Cancel!";
}

},

  'click .image-remove': function(e, template){
e.preventDefault();
console.log("curent id: "+e.currentTarget.id);
//{"images":{ $in:["hXZjsSk5oSzm759aN"]}}
var dig = '{"images":"'+e.currentTarget.id+'"}';
console.log("DIG: "+dig);

var js = JSON.parse(dig);

        AddOns.update({
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


var dig = '{"image":"'+sup[1]+'"}';
//console.log("DIG: "+dig);

var js = JSON.parse(dig);

        AddOns.update({
            _id: addonId
        }, {
            $set: js
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
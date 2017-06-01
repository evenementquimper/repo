import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { FilesCollection } from 'meteor/ostrio:files';

import { CampingCars } from '../api/campingcars.js';
import { AddOns } from '../api/addons.js';
import { Session } from 'meteor/session';
import { Reservations } from '../api/reservations.js';
import { UsersData } from '../api/usersdata.js';

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
        var bddreservations = Reservations.find({resource_id:FlowRouter.getParam("_id"),status:{ $in: [ "newbooking", "owner_valid" ] }}).fetch();
     
        var evttab = [];
        var tabnoresa = [];
        var tabfull = bddcampingcar.daysfull;

            for (var j = 0; tabfull.length > j; j++)  {

                  var dd = moment(tabfull[j], 'YYYY-MM-DD');
                  var d = dd.format('x');
  
                  var daysf = {id:d,
                              start: tabfull[j],
                              //rendering:'background',
                              backgroundColor:'red',
                              };
                  tabtest.push(daysf);
              }

            for (var i = 0;  bddreservations.length > i; i++) {

                  
                    var loueurid = bddreservations[i].user_id;

                  if(UsersData.find({_id:loueurid}).fetch()[0])
                      {
                        console.log("Resa find"+bddreservations.length); 
                        var ttprix = bddreservations[i].brutprize;

                        if(bddreservations[i].brutprize.prize)
                          ttprix = bddreservations[i].brutprize.prize

                  var tt = UsersData.find({_id:loueurid}).fetch()[0].firstname+", "+UsersData.find({_id:loueurid}).fetch()[0].lastname+", Montant: "+ttprix;
                        
                        var status = bddreservations[i].status;
                          console.log("booking _id: "+bddreservations[i]._id);
                        //console.log("resa end time: "+bddreservations[i].end_time);
                        //ajout d'un jour a la fin pour visualiser le dernier jour
                        var lastday = moment(bddreservations[i].end_time, 'YYYY-MM-DD').add(1, 'day');

                        var colorstatus = 'blue';

                        //if(bddreservations[i].status=='newbooking')

                          if(status=='owner_cancel')
                            colorstatus = 'black';
                          

                          if(status=='owner_valid')
                            colorstatus = 'green';

                            //if(bddreservations[i].status=='lodger_cancel')

                  var uevent = {id:bddreservations[i]._id,
                                title: tt,
                                start: bddreservations[i].start_time,
                                end: lastday,
                                //color:'red',
                                backgroundColor:colorstatus,
                                //borderColor :'green', 
                                textColor :'white',
                                height: '35px',
                                };

                  tabtest.push(uevent);
                      }
                  else
                  {

                  }
              }


        var rr = {

              eventClick: function(calEvent, jsEvent, view) {
var sectcont = $('.ml-section-content');

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
                  if(calEvent.backgroundColor=='blue')
                      {
        sectcont.css({'filter' : 'blur(0px)'});
        sectcont.css({'opacity' : '.4'});
                          var bookselect = $('#bookselect');
                          var bookselecttitre = $('.bookselecttitre');
                          bookselecttitre.empty();




bookselecttitre.prepend('<div style="background-color: rgb(255, 255, 255); box-sizing: border-box; font-family: Roboto,sans-serif; box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12); border-radius: 2px; transform: scaleY(1); transform-origin: center top 0px; opacity: 1; max-height: 500px; overflow-y: auto;">'+
'<div style="background-color: rgb(255, 255, 255); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; box-sizing: border-box; font-family: Roboto,sans-serif; border-radius: 2px; padding: 16px 0px; display: table-cell; width: 500px;">'+
'<div style="opacity: 1;">'+
'<div tabindex="0" style="border: 10px none; background-image: none; background-repeat: repeat; background-attachment: scroll; background-clip: border-box; background-origin: padding-box; background-position: 0% 0%; background-size: auto auto; box-sizing: border-box; display: block; font-family: Roboto,sans-serif; font-style: inherit; font-weight: inherit; font-size: 15px; line-height: 32px; font-size-adjust: inherit; font-stretch: inherit; font-feature-settings: inherit; font-language-override: inherit; font-kerning: inherit; font-synthesis: inherit; font-variant: inherit;text-decoration: none; outline: medium none; transform: translate3d(0px, 0px, 0px); color: rgba(86, 90, 92, 0.87); position: relative; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; white-space: nowrap;">'+
'<div>'+
'<div style="margin-left: 0px; padding: 0px 24px; position: relative;">Demande de Réservation'+
'<div class="valid_book" name="owner_valid" style="text-align: right;cursor: pointer;">Valider</div>'+
'<div class="cancel_book" name="owner_cancel" style="text-align: right;cursor: pointer;">Refuser</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>');





                          // bookselecttitre.prepend('<h3></h3>');
                          // bookselecttitre.prepend( '<h3>Valider cette réservation ?</h3><div>'+
                          //                          '<button class="cancel_book" name="owner_cancel" style="display:inline;">Refuser</button>'+
                          //                          '<button class="valid_book" name="owner_valid" style="display:inline;">Valider</button></div>');
                          var outpoupselect = $('#outpoupselect');
                          outpoupselect.css({'display':'inline-block'});
                          bookselect.css({'display':'inline-block','top':jsEvent.clientY+'px', left:jsEvent.clientX+'px'});

    
                          $('.valid_book').on("click", function(){
                              
                              calEvent.backgroundColor = 'green';
                              $('.fc').fullCalendar('updateEvent', calEvent);
                              var dig = '{"status":"owner_valid","mailstatus":"notsend"}';
                              var js = JSON.parse(dig);

                                  Reservations.update({
                                      _id: calEvent.id
                                        }, {
                                        $set: js
                                          }, {
                                        upsert: true
                                  });
                          });

                          $('.cancel_book').on("click", function(){

                            $('.fc').fullCalendar('removeEvents', calEvent.id);
                            var dig = '{"status":"owner_cancel","mailstatus":"notsend"}';
                            var js = JSON.parse(dig);
                      
                                  Reservations.update({
                                      _id: calEvent.id
                                        }, {
                                        $set: js
                                        }, {
                                        upsert: true
                                  });
                          });
                      }
                    if(calEvent.backgroundColor=='green')
                      {
        sectcont.css({'filter' : 'blur(0px)'});
        sectcont.css({'opacity' : '.4'});
                          var bookselect = $('#bookselect');
                          var bookselecttitre = $('.bookselecttitre');
                          bookselecttitre.empty();
                          bookselecttitre.prepend( '<h3>Attention Annulation de la réservation</h3><div>'+
                                                   '<button class="valid_book" name="owner_valid" style="display:inline;">Annuler</button>'+
                                                   '<button class="cancel_book" name="owner_cancel">Confirmer</button></div>');
                          var outpoupselect = $('#outpoupselect');
                          var cancelbook = $('.cancel_book');
                          cancelbook.css({'display':'inline-block'});
                          var validbook = $('.valid_book');
                          validbook.css({'display':'none'});
                          outpoupselect.css({'display':'inline-block'});
                          bookselect.css({'display':'inline-block','top':jsEvent.clientY+'px', left:jsEvent.clientX+'px'});
                          $('.cancel_book').on("click", function(){

                            $('.fc').fullCalendar('removeEvents', calEvent.id);
                            var dig = '{"status":"owner_cancel","mailstatus":"notsend"}';
                            var js = JSON.parse(dig);
                      
                                  Reservations.update({
                                      _id: calEvent.id
                                        }, {
                                        $set: js
                                        }, {
                                        upsert: true
                                  });
                          });
                      }
                    if(calEvent.backgroundColor=='black')
                      {
        sectcont.css({'filter' : 'blur(0px)'});
        sectcont.css({'opacity' : '.4'});
                          var bookselect = $('#bookselect');
                          var bookselecttitre = $('.bookselecttitre');
                          bookselecttitre.empty();
                          bookselecttitre.prepend( '<h3>Cette réservation est annuler, vous pouvez la valider</h3>'+
                                                   '<button style="display:inline;">Annuler</button>'+
                                                   '<button class="valid_book" name="owner_valid">Valider</button></div>');
                          var outpoupselect = $('#outpoupselect');
                          var cancelbook = $('.cancel_book');
                          cancelbook.css({'display':'none'});
                          var validbook = $('.valid_book');
                          validbook.css({'display':'inline-block'});
                          outpoupselect.css({'display':'inline-block'});
                          bookselect.css({'display':'inline-block','top':jsEvent.clientY+'px', left:jsEvent.clientX+'px'});

                          $('.valid_book').on("click", function(){
                              
                              calEvent.backgroundColor = 'green';
                              $('.fc').fullCalendar('updateEvent', calEvent);
                              var dig = '{"status":"owner_valid","mailstatus":"notsend"}';
                              var js = JSON.parse(dig);
        
                                  Reservations.update({
                                      _id: calEvent.id
                                        }, {
                                        $set: js
                                          }, {
                                        upsert: true
                                  });
                          });
                      }
                      else
                      {

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


        height: 200,
        defaultDate: moment(),
        displayEventTime:false,
              //eventLimit: true, // for all non-agenda views
                header: {
            left:   'prev',
            center: 'title, agendaFourDay, myCustomButton',
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

//   'click .fc-event-container':function( event, template ) { 
//               //console.log("mouseover html: "+$(this).html());
//                 console.log("mouseover event: ");
//                  //var peopleid = template.find('#people'); 
// var peopleselect = template.find('#peopleselect');
// var outpoupselect = template.find('#outpoupselect');
// outpoupselect.style.display = "inline-block";

// peopleselect.style.display = "inline-block";

// //peopleselect.style.top = event.pageY+'px'; mouseenter
// //peopleselect.style.left = event.pageX+'px';

// peopleselect.style.top = event.clientY+'px';
// peopleselect.style.left = event.clientX+'px';
//               //$(this).css('border-color', 'red');
              
//             },
// 'click button ':function(event, template){
//   console.log("id?: "+event.currentTarget.id);
//   console.log("name?: "+event.currentTarget.name);
//   event.preventDefault();
//   var bookid = event.currentTarget.id;
//   var dig = '{"status":"'+event.currentTarget.name+'"}';
//   var js = JSON.parse(dig);
//         Reservations.update({
//             _id: bookid
//         }, {
//             $set: js
//         }, {
//           upsert: true
//         });

//                   var source = {id:'01',
//                                 events: [{id:event.currentTarget.id,
//                                      //title: 'Block',
//                                        //start: date,
//                                  //rendering:'background',
//                            //backgroundColor:'red',
//                                           }
//                                          ],
//                                 //color: 'red',     // an option!
//                             //textColor: 'white'
//                                 };

//                var uevent = {id:event.currentTarget.id,
//                                 //title: tt,
//                                 //start: bddreservations[i].start_time,
//                                 //end: bddreservations[i].end_time,
//                                 //color:'red',
//                                 //backgroundColor:colorstatus,
//                                 //borderColor :'green', 
//                                 //textColor :'white',
//                                 //height: '35px',
//                                 };

//         //if(event.currentTarget.id=='owner_cancel')
//         $('.fc').fullCalendar( 'removeEventSource', source )
//   //$('.fc').fullCalendar('removeEvents', uevent);

// },

'click #outpoupselect': function(event, template){
      event.preventDefault();
    var bookselect = template.find('#bookselect');
var popupselect = template.find('.popupselect');
var sectcont = template.find('.ml-section-content');
        sectcont.style.filter = null;
        sectcont.style.opacity = null;

if(bookselect.style.display == 'inline-block')
{ 
  //console.log("fueltypeselect :"+fueltypeselect.style.display);
  bookselect.style.display = 'none';
  event.currentTarget.style.display = 'none';
  //appcont.style.overflowY = 'scroll';
}
else
{

}

},

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
//console.log("curent id: "+e.currentTarget.id);
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
//console.log("curent id: "+e.currentTarget.id);
//{"images":{ $in:["hXZjsSk5oSzm759aN"]}}
var dig = '{ images:{ $each: [], $sort: -1 }}';
//console.log("DIG: "+dig);

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
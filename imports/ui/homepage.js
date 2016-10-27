import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
 

import './homepage.html';
        var dayfull = [];//tableau de moment
var startt = moment();
var endt = moment();

 Template.homepage.onCreated(function() {
  this.autorun(() => {
    this.subscribe('tasks');
    this.subscribe('campingcars');
  });


 GoogleMaps.ready('exampleMap', function(map){

//console.log("campingcar find! nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).count());

console.log("start ready:");


  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('autocomplete'));

  var autocomplete = new google.maps.places.Autocomplete(input);
//   autocomplete.bindTo('bounds', map);

// var infowindow = new google.maps.InfoWindow();
//   var marker = new google.maps.Marker({
//     map: map,
//     anchorPoint: new google.maps.Point(0, -29)
//   });

  autocomplete.addListener('place_changed', function() {
    console.log("listener autocomplete");
    //infowindow.close();
    // marker.setVisible(false);
    var place = autocomplete.getPlace();
    console.log("Place: "+JSON.stringify(place.geometry));
    if (!place.geometry) {
       window.alert("Autocomplete's returned place contains no geometry");
       return;
     }

    // // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      //map.setCenter(place.geometry.viewport);
    } else {
       //map.setCenter(place.geometry.location);
       //map.setZoom(17);  // Why 17? Because it looks good.
     }
});

});


});

 Template.homepage.onRendered(function() {

GoogleMaps.load({key: Meteor.settings.public.G_MAP_KEY, libraries: 'places'});

this.$('.datetimepickerstart').datetimepicker({
        //format: 'DD/MM/YYYY',
        minDate: moment(),
        //keepOpen: true,
        inline: true,
        focusOnShow:false,
        //collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]
    });
 
 this.$('.datetimepickerend').datetimepicker({
        //format: 'DD/MM/YYYY',
        minDate: moment(),
        //keepOpen: true,
        inline: true,
        focusOnShow:false,
        //collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]
    }); 


this.$('.owl-carousel').owlCarousel({
   loop:true,
    margin:10,
    nav:false,
    items:4,
    autoplay:true,
    autoplayTimeout:5000,
});

// this.$('.datetimepicker').datetimepicker({
//         //format: 'DD/MM/YYYY',
//         minDate: moment(),
//         keepOpen: true,
//         inline: true,
//         focusOnShow:false,
//         collapse:false,
//         //deactivation des dates ou le parking est completenabledDates()
//         enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
//         //[moment().add(3, 'days')]            //[
//             //moment().add(7, 'days'),
//             //              ]
//     });

});


//  Template.mlsectioncontentavailability.rendered = function() {

// this.$('.datepicker').datepicker();

// }
 Template.homepage.helpers({

   exampleMapOptions: function() {
    // Make sure the maps API has loaded



    if (GoogleMaps.loaded()) {

 // var input = /** @type {!HTMLInputElement} */(
 //      document.getElementById('pac-input'));


 //  var autocomplete = new google.maps.places.Autocomplete(input);
 //  autocomplete.bindTo('bounds', map);
      // Map initialization options
      return {
        center: new google.maps.LatLng(-25.363, 131.044),
        zoom: 8,
        libraries: 'places',
      };
    }
},


    campingcars: function(){

    //const instance = Template.instance();
    console.log("camping car find : "+CampingCars.find({}).count());
    //console.log("campingcar find! vue nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).fetech()[0].daysfull[0]);


return CampingCars.find({},{limit:5}).fetch();
  }
});
  Template.homepage.events({



'click #search-button': function(event, template){
event.preventDefault();
      console.log("click search button");
FlowRouter.go("maplistings",{location:"Paris",start:startt,end:endt});

},

'bs.click .modal':function(event, template){
event.preventDefault();
      console.log("bs show modal");
},

'dp.change .datetimepickerstart': function(event, template){
 event.preventDefault();
      console.log("dp change startdatepicker");
       console.log("datetimepick data", $('.datetimepickerstart').data().date);
      startt = $('.datetimepickerstart').data().date;

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

'click .datetimepickerend': function(event, template){
    event.preventDefault();
      console.log("click datetimepik");
        console.log("datetimepick data", $('.datetimepickerend').data().date);
        endt = [$('.datetimepickerend').data().date];
},

    'click button': function(event, template) {
      // event.preventDefault();
      // console.log("click day");
      //   console.log("datetimepick data", $('.datetimepicker').data().date);
      //   var dd = [$('.datetimepicker').data().date];

      //   $('.datetimepicker').data("DateTimePicker").disabledDates(dd);
        // $('.datetimepicker').data("DateTimePicker").destroy();
       
    },

  'click .addons-panel': function(event, template) {
    //console.log("event "+event);
    // Prevent default browser form submit
//this.preventDefault();
   // 
    // console.log("event type : "+event.type);
    // console.log("event target : "+event.target);
    // console.log("event target text: "+event.target.text.value);
    //console.log("event current target : "+EJSON.stringify(event.currentTarget.hr.style));
setTimeout(function(){
        Modal.show('exampleModal')
    }, 500)

  },

  'input .data-item': function (event, template) {
//event.preventDefault(); 
// console.log("event: "+event.type);
//     var routeid = FlowRouter.getParam('_id');
// var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
// console.log("DIG: "+dig);
// var js = JSON.parse(dig);
//         CampingCars.update({
//             _id: FlowRouter.getParam('_id')
//         }, {
//             $set: js
//         }, {
//           upsert: true
//         });
  },

'click .text-item': function(event, template){
//console.log("click current text-item label style width: "+event.currentTarget.children[0].style.position);
// var lab = event.currentTarget.children[0];
// var inp = event.currentTarget.children[1];
// var hli = event.currentTarget.children[3];
// //console.log("Label: "+lab.innerHTML);
// inp.style.display = "inline-block";

// var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
// lab.style = nstyle;
// //lab.style.;
// lab.style.top = "38px";
// lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
// //lab.style.;
// lab.style.cursor = "text";
// //lab.style.; 244, 67, 54
// lab.style.color ="rgba(86,90,92,0.5)";
// //lab.innerHTML = "Vehicle Model";

// var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
// hli.style.transform = "scaleX(1)";

//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);

},

'click .select-item': function(event, template){
//console.log("click current text-item label style width: "+event.currentTarget.children[0].style.position);
// var lab = event.currentTarget.children[0];
// var inp = event.currentTarget.children[1];
// var hli = event.currentTarget.children[3];
// //console.log("Label: "+lab.innerHTML);
// inp.style.display = "inline-block";

// var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
// lab.style = nstyle;
// //lab.style.;
// lab.style.top = "38px";
// lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
// //lab.style.;
// lab.style.cursor = "text";
// //lab.style.; 244, 67, 54
// lab.style.color ="rgba(86,90,92,0.5)";
// //lab.innerHTML = "Vehicle Model";

// var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
// hli.style.transform = "scaleX(1)";

//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);

},


  'click .flex-grid-item':function(event, template){
//     event.preventDefault();
// //console.log("click input nameœ: "+event.target.name);
// //console.log("click input value: "+event.target.value);
// //console.log("click tag name: "+event.target.tagName);

// console.log("click current nameœ: "+event.currentTarget.name);
// console.log("click current value: "+event.currentTarget.value);
// console.log("click current tag name: "+event.currentTarget.tagName);

// var key = event.target.name;
//  var tar = event.target;
// //var req = Json.parse('{_id:"'+FlowRouter.getParam('_id')'",'+key+':null}');
// var routeid = FlowRouter.getParam('_id');
// var dig = '{_id:"'+routeid+'",'+key+':"on"}';
// console.log("av parser: "+dig);
// console.log("fetch key: "+CampingCars.find({_id:FlowRouter.getParam('_id')}).fetch()[0]);
// if (event.target.value=="on")
// {

//  //tar.value="off"; 
// console.log("bdd on: "+tar.value);
// var dig0 = '{"'+key+'":false  }';

// var js = JSON.parse(dig0);
//         // CampingCars.update({
//         //     _id: FlowRouter.getParam('_id')
//         // }, {
//         //     $set: js
//         // }, {
//         //   upsert: true
//         // });

// }
// else
// {
// console.log("else value : ");
// var dig2 = '{"'+key+'":"on"}';
// console.log("dig2 : "+dig2);
// var js2 = JSON.parse(dig2);
//         // CampingCars.update({
//         //     _id: FlowRouter.getParam('_id')
//         // }, {
//         //     $set: js2
//         // }, {
//         //   upsert: true
//         // });

// }

// var transm = '{"transmission":[{"automatic":"on"},{"manuel":false}]}';
// var jstr = JSON.parse(transm);
// // CampingCars.update({_id: FlowRouter.getParam('_id')
// // },{
// //   $set:jstr
// // },{
// //   upsert: true
// // });

// var val = null; 
  }

   });
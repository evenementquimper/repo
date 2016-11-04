import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { ReactiveDict } from 'meteor/reactive-dict'; 

import './homepage.html';
        var dayfull = [];//tableau de moment
var startt = moment();
var endt = moment();

 Template.homepage.onCreated(function() {
  this.autorun(() => {
    this.subscribe('tasks');
    this.subscribe('campingcars');
  });

   this.search = new ReactiveDict();


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

    
      Template.instance().search.set('geometry', geometry);
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
 
 this.$('.datetimepickerend').datetimepicker({
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

    const instance = Template.instance();
    console.log("camping car find : "+CampingCars.find({}).count());
    //console.log("campingcar find! vue nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).fetech()[0].daysfull[0]);


return CampingCars.find({},{limit:5}).fetch();
  }
});
  Template.homepage.events({



'click #search-button': function(instance, template){
//event.preventDefault();
      console.log("click search button");
      startt = "start";//Template.instance().search.get('startdate');
      endt = "end";//Template.instance().search.get('enddate');
  console.log(JSON.stringify(Template.instance().search.get('geometry')));
     var loc = instance.search.get('geometry');
  

     var queryParams = {location:'"'+loc+'"'};//,start:startt,end:endt};
  
     var path = FlowRouter.path("maplistings", queryParams);
     //FlowRouter.setQueryParams(queryParams);
//FlowRouter.go(path);

},

'bs.click .modal':function(event, template){
event.preventDefault();
      console.log("bs show modal");
},

'dp.change .datetimepickerstart': function(instance, template){
 //event.preventDefault();
      console.log("dp change startdatepicker");
       console.log("datetimepick data", $('.datetimepickerstart').data().date);
      startt = $('.datetimepickerstart').data().date;
instance.search.set('startdate', $('.datetimepickerstart').data().date);
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

'click .datetimepickerend': function(instance, template){
    //event.preventDefault();
      console.log("click datetimepik");
        console.log("datetimepick data", $('.datetimepickerend').data().date);
        instance.search.set('enddate', $('.datetimepickerend').data().date);
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

  }

   });
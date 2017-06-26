import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
import { ReactiveDict } from 'meteor/reactive-dict'; 

import './homepage.html';

var dayfull = [];//tableau de moment
var startt = moment();
var endt = moment();
var place = {loc:null};

Template.homepage.onCreated(function() {
  
  this.autorun(() => {
  this.subscribe("campingcars", {
    onError: function( error ) {
        //console.log("Meteor subscribe error: "+error);
        // if the subscribe terminates with an error
    },
    onReady: function() {
      //console.log("Meteor subscribe ready: ");
        // when ready
    }


  });
});


  var autocomplete;

  GoogleMaps.ready('exampleMap', function(map){
  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('autocomplete'));

  autocomplete = new google.maps.places.Autocomplete(input, {
  componentRestrictions: {country: 'fr'},
  types: ['(cities)']
});

  autocomplete.addListener('place_changed', function() {
    place = autocomplete.getPlace();
    if (!place.geometry) {
       window.alert("Autocomplete's returned place contains no geometry");
       return;
     }

    // // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {

    
      //Template.instance().search.set('geometry', geometry);
      //map.setCenter(place.geometry.viewport);
    } else {
      //p = place;
       //map.setCenter(place.geometry.location);
       //map.setZoom(17);  // Why 17? Because it looks good.
     }
});

});


});

 Template.homepage.onRendered(function() {

var linkInfo = {rel: "icon", sizes:"16x16 32x32", href: "/favicon.ico?v=3"};
DocHead.addLink(linkInfo);
  //titre de la page
DocHead.setTitle("Le Bon Camping-car");

GoogleMaps.load({key: Meteor.settings.public.G_MAP_KEY, libraries: 'places'});

 this.$('.datetimepickerend').datetimepicker({
        format: 'YYYY-MM-DD',
        locale:'fr',
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

 this.$('.datetimepickerstart').datetimepicker({
        format: 'YYYY-MM-DD',
        locale:'fr',
        minDate: moment()
        //showClose: true,
        //keepOpen: true,
        //debug: true

    }).on('dp.change', function(e) {
  $('.datetimepickerend').data("DateTimePicker").minDate(e.date)
});


  this.$('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        items:3,
        autoplay:true,
        autoplayTimeout:5000,
});

});


 Template.homepage.helpers({

  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-25.363, 131.044),
        zoom: 8,
        //libraries: 'places',
      };
    }
},


  campingcars: function(){
return CampingCars.find({publish : 'valid'}).fetch();
  },
});
  Template.homepage.events({



'click #search-button': function(instance, template){

    var lat=46.227638;
    var lng=2.213749000000007;
    startt="";
    endt="";
    var loc = "";
    var cityname= "";
    var citycode = null;

    if(place.name)
    {
      cityname = place.name;
    }

    if(place.geometry)
    {
      loc = place.geometry.location;
      lat=loc.lat();
      lng=loc.lng();
    }

    if($('.datetimepickerstart').data().date)
    startt = $('.datetimepickerstart').data().date;

    if($('.datetimepickerend').data().date)
    endt = $('.datetimepickerend').data().date;

    var queryParams = JSON.parse('{"citycode":'+citycode+',"name":"'+cityname+'","lat":'+lat+',"lng":'+lng+',"start":"'+startt+'","end":"'+endt+'"}');
    var path = FlowRouter.path("maplistings", queryParams);
     //FlowRouter.setQueryParams(queryParams);
    FlowRouter.go(path);
  },

'dp.change .datetimepickerstart': function(instance, template){
 //event.preventDefault();
      //console.log("dp change startdatepicker");
       //console.log("datetimepick data", $('.datetimepickerstart').data().date);
      //startt = $('.datetimepickerstart').data().date;
//instance.search.set('startdate', $('.datetimepickerstart').data().date);

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
      //console.log("click datetimepik");
        //console.log("datetimepick data", $('.datetimepickerend').data().date);
        //instance.search.set('enddate', $('.datetimepickerend').data().date);
        //endt = [$('.datetimepickerend').data().date];
}

   });
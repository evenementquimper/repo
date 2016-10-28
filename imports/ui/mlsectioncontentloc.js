import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { CampingCars } from '../api/campingcars.js';
 

import './mlsectioncontentloc.html';
 
 Template.mlsectioncontentloc.onCreated(function() {
TAPi18n.setLanguage("fr");


 GoogleMaps.ready('adressMap', function(map){

//console.log("campingcar find! nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).count());

console.log("start ready:");


  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('adressautocomplete'));

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
    //var ll = autocomplete.getLat();

    //console.log("Place lat: "+JSON.stringify(ll));
    if (!place.geometry) {
       window.alert("Autocomplete's returned place contains no geometry");
       return;
     }

    // // If the place has a geometry, then present it on a map.
    if (place.geometry.location) {
console.log("geometry: "+JSON.stringify(place.geometry.location));
//var lat = place.geometry.location.lat;
//var lng = place.geometry.location.lng;

//console.log("lat: "+lat+"lng: "+lng);
var dig = '{"city":"'+place.name+'","location":'+JSON.stringify(place.geometry.location)+'}';
console.log("DIG: "+dig);

var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
    } else {
     }
});

});



});

 Template.mlsectioncontentloc.onRendered(function() {

GoogleMaps.load({key: Meteor.settings.public.G_MAP_KEY, libraries: 'places'});

});


 Template.mlsectioncontentloc.helpers({

   adressMapOptions: function() {
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
    //console.log("helper route id : "+FlowRouter.getParam("_id"));
    console.log("campingcar find! vue nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).count());
return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  }

});

  Template.mlsectioncontentloc.events({

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

//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);

},

   });
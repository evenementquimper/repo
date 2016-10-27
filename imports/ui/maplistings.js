import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { CampingCars } from '../api/campingcars.js';
 

import './maplistings.html';
 
//Markers = new Mongo.Collection('markers');  

 Template.maplistings.onCreated(function() {

  this.autorun(() => {
    this.subscribe('campingcars');
  });



 GoogleMaps.ready('MapListings', function(map){



 if(CampingCars.find({})!=null)
{
//console.log("campingcar find! nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).count());





console.log("start ready:");


  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('location-input'));

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map.instance);


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
    console.log("geometry viewport");
    map.instance.fitBounds(place.geometry.viewport);

      }
    else {
       map.instance.setCenter(place.geometry.location);
       map.instance.setZoom(17);  // Why 17? Because it looks good.
}
 });
for (var i = 0;i < CampingCars.find({}).fetch().length; i++) {
 console.log("boucle for bdd: "+CampingCars.find({}).fetch()[i]._id);
 if(CampingCars.find({}).fetch()[i].lat && CampingCars.find({}).fetch()[i].lng)
 {

  new google.maps.Marker({
    position: new google.maps.LatLng(CampingCars.find({}).fetch()[i].lat, CampingCars.find({}).fetch()[i].lng),
    map: map.instance,
  });
 }
}


google.maps.event.addListener(map.instance, 'click',function(event){

 var dig = '{"lat":"'+event.latLng.lat()+'","lng":"'+event.latLng.lng()+'"}';
 console.log("dig: "+dig);
 var js = JSON.parse(dig);

       // CampingCars.update({
       //      _id: FlowRouter.getParam('_id')
       //  }, {
       //      $set: js
       //  }, {
       //    upsert: true
       //  });

         marker = new google.maps.Marker({
    position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
    icon: goldStar1,
    draggable: true,
    map: map.instance,
    title: 'Uluru (Ayers Rock)'
  });
});


var contentview1 = '<div class="listing-map-popover">'+
'<div style="background-color:#ffffff;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;box-sizing:border-box;font-family:Roboto, sans-serif;-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0 1px 6px rgba(0,0,0,0.12),'+
         '0 1px 4px rgba(0,0,0,0.12);border-radius:2px;overflow:hidden;z-index:1;">'+
         '<div style="padding-bottom:0;">'+
         '<div style="position:relative;">'+
         '<div style="width:250px;height:156px;">'+
         '<img src="" style="vertical-align:top;max-width:100%;min-width:100%;width:100%;" alt="rien" itemprop="image"></div>'+
         '<div style="position:absolute;top:0;bottom:0;right:0;left:0;">'+
         '<div style="height:100%;position:relative;"'+
         '<div style="position:absolute;bottom:0;right:0;left:0;padding-top:8px;background:rgba(0, 0, 0, 0.54);"'+
         '<div style="padding:0 20px 10px;position:relative;" title="Vehicle price from:"">'+
         '<span style="font-size:16px;color:rgba(255, 255, 255, 0.87);display:block;line-height:26px;font-weight:300;">Vehicle price from:</span>'+
         '<span style="font-size:14px;color:rgba(255, 255, 255, 0.54);display:block;">$100 per day...'+
         '</span></div></div></div></div></div>'+
         '<div title="The Wilderness" size="45" style="height:72px;padding:16px;font-weight:500;box-sizing:border-box;position:relative;">'+
         '<div style="display:inline-block;vertical-align:top;max-width:218px;">'+
         '<span style="color:rgba(0, 0, 0, 0.87);display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">The Wilderness '
         '</span>'+
         '<span style="color:rgba(0, 0, 0, 0.54);display:block;font-size:14px;">Sleeps 4</span></div></div>'+
         '<div style="padding:16px;font-size:14px;color:rgba(0, 0, 0, 0.87);padding-top:0;margin-bottom:36px;">This is a great tidy time capsule, remember the 80s!! well this will take you back. ...'+
         '</div>'+
         '<div style="padding:8px;position:absolute;bottom:8px;left:0;right:0;height:52px;">'+
         '<div style="background-color:#ffffff;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;box-sizing:border-box;font-family:Roboto, sans-serif;-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0 1px 6px rgba(0,0,0,0.12),'+
         '0 1px 4px rgba(0,0,0,0.12);border-radius:2px;display:inline-block;min-width:88px;height:36px;margin-right:8px;width:100%;">'+
         '<button style="border:10px;background:none;box-sizing:border-box;display:inline-block;font:inherit;font-family:Roboto, sans-serif;tap-highlight-color:rgba(0, 0, 0, 0);appearance:button;cursor:pointer;text-decoration:none;outline:none;transform:translate3d(0, 0, 0);position:relative;height:100%;width:100%;padding:0;overflow:hidden;border-radius:2px;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;background-color:#ef4136;" tabindex="0" type="button" data-reactid=".10.0.0.$=14.$/=10.0">'+
         '<div data-reactid=".10.0.0.$=14.$/=10.0.0">'+
         '<div style="transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; top: 0px;">'+
         '<span style="position:relative;opacity:1;font-size:14px;letter-spacing:0;text-transform:uppercase;font-weight:500;margin:0;user-select:none;padding-left:16px;padding-right:16px;line-height:36px;color:#ffffff;" data-reactid=".10.0.0.$=14.$/=10.0.0.1.0">View Listing'+
         '</span></div></div></button></div></div></div></div></div>';



  var goldStar1 = {
    path: 'M 6.66,13.02 C 4.81,6.64 13.16,7.01 17.00,7.00 20.59,6.99 32.23,6.59 34.89,7.74 41.13,10.42 38.39,19.07 33.94,22.19 31.86,23.65 29.42,24.34 27.00,25.00 27.00,25.00 33.81,32.00 33.81,32.00 33.81,32.00 41.40,42.98 41.40,42.98 42.82,45.83 41.89,47.97 38.95,46.83 31.24,43.86 26.58,22.21 16.31,34.17 14.73,36.02 14.65,36.81 14.00,39.00 3.66,37.22 11.83,29.45 17.00,27.00 17.00,27.00 17.00,25.00 17.00,25.00 13.82,23.28 7.65,16.47 6.66,13.02 Z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14
  };


  var infowindow = new google.maps.InfoWindow({
    content: contentview1
  });


var markers = {};

CampingCars.find().observe({  
  added: function(document) {
    console.log("bdd add");
    // Create a marker for this document
    var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.lat, document.lng),
      icon: goldStar1,
      map: map.instance,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });
    
  marker.addListener('click', function() {

    infowindow.open(map, marker);  
    
  });
    // This listener lets us drag markers on the map and update their corresponding document.
    google.maps.event.addListener(marker, 'dragend', function(event) {
      CampingCars.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
    });

    // Store this marker instance within the markers object.
    markers[document._id] = marker;
  },
  changed: function(newDocument, oldDocument) {
    console.log("bdd change, marker id: "+markers[newDocument._id].id);
    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
  },
  removed: function(oldDocument) {
    console.log("bdd remove, marker id: "+markers[oldDocument._id].id);
    // Remove the marker from the map
    markers[oldDocument._id].setMap(null);

    // Clear the event listener
    google.maps.event.clearInstanceListeners(
      markers[oldDocument._id]);

    // Remove the reference to this marker instance
    delete markers[oldDocument._id];
  }
});

 //var dataall = CampingCars.find({}).fetch();

  //console.log("id des data: "+dataall[0].lng);
}
else
{
  //console.log("campingcar not find!: ");
}
});

});

 Template.maplistings.onRendered(function(){

GoogleMaps.load({key: Meteor.settings.public.G_MAP_KEY, libraries: 'places'});

this.$('.datetimepickerstart').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: moment(),
        //collapse:false,
        //disabledHours:true,
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
        format: 'DD/MM/YYYY',
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



});


 Template.maplistings.helpers({

    campingcars: function(){

    //const instance = Template.instance();
    console.log("camping car find : "+CampingCars.find({}).count());
    //console.log("campingcar find! vue nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).fetech()[0].daysfull[0]);


return CampingCars.find({},{limit:5}).fetch();
  },

   MapListingsOptions: function() {
    // Make sure the maps API has loaded



    if (GoogleMaps.loaded() && CampingCars.find({}).fetch()) {

 // var input = /** @type {!HTMLInputElement} */(
 //      document.getElementById('pac-input'));


 //  var autocomplete = new google.maps.places.Autocomplete(input);
 //  autocomplete.bindTo('bounds', map);
      // Map initialization options
      return {
        center: new google.maps.LatLng(47.993, -4.114),
        zoom: 8,
        libraries: 'places',
      };
    }
},
});

  Template.maplistings.events({
'place_changed #location-input':function(event){
console.log("Detection place change");
},
    'click #facebook-login': function(event) {
      console.log("facebook log");
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }

   });
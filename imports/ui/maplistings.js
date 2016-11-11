import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { CampingCars } from '../api/campingcars.js';

import './maplistings.html';
 
//Markers = new Mongo.Collection('markers');  

 Template.maplistings.onCreated(function() {

  this.autorun(() => {
    this.subscribe('campingcars');
  });
  //console.log("Query params location: "+FlowRouter.getQueryParam("location"));
//console.log("lat param: "+JSON.stringify(FlowRouter.getParam("location").lat()));
//console.log("lng param: "+JSON.stringify(FlowRouter.getParam("lng")));
console.log("start param: "+FlowRouter.getParam("start"));

console.log("end param: "+FlowRouter.getParam("end"));
//location:loc,start:startt,end:endt


 GoogleMaps.ready('MapListings', function(map){

//marche good http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml
 // new google.maps.KmlLayer({
 //   url: 'http://82.245.202.35:14603/share/jNgNf3G7uwjImetj/kml.kml',
 //   map: map.instance,
 //  });
//http://82.245.202.35:14603/share/jNgNf3G7uwjImetj/gogole.json
//https://storage.googleapis.com/maps-devrel/google.json
var jj  = {"name":"antoine"};
var geo = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"letter":"G","color":"blue","rank":"7","ascii":"71"},"geometry":{"type":"Polygon","coordinates":[[[123.61,-22.14],[122.38,-21.73],[121.06,-21.69],[119.66,-22.22],[119.00,-23.40],[118.65,-24.76],[118.43,-26.07],[118.78,-27.56],[119.22,-28.57],[120.23,-29.49],[121.77,-29.87],[123.57,-29.64],[124.45,-29.03],[124.71,-27.95],[124.80,-26.70],[124.80,-25.60],[123.61,-25.64],[122.56,-25.64],[121.72,-25.72],[121.81,-26.62],[121.86,-26.98],[122.60,-26.90],[123.57,-27.05],[123.57,-27.68],[123.35,-28.18],[122.51,-28.38],[121.77,-28.26],[121.02,-27.91],[120.49,-27.21],[120.14,-26.50],[120.10,-25.64],[120.27,-24.52],[120.67,-23.68],[121.72,-23.32],[122.43,-23.48],[123.04,-24.04],[124.54,-24.28],[124.58,-23.20],[123.61,-22.14]]]}}]};


var quimper = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "letter": "G",
      "color": "red",
      "rank": "7",
      "ascii": "71"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [

[-4.047538379379563,47.937299041280419],
[-4.059807257208011,47.93109409296504],
[-4.069298138970288,47.932997683389296],
[-4.094330635109166,47.941198464136676],
[-4.08320748088317,47.952235211855928],
[-4.096508163056058,47.94249430770418],
[-4.109130215738879,47.942750446932664],
[-4.109365061977363,47.94970296390894],
[-4.097614630081992,47.95254749291324],
[-4.094888980764785,47.962913898974037],
[-4.096950024413827,47.971255676872481],
[-4.112589030106671,47.97718448686188],
[-4.11696148524967,47.984274453541865],
[-4.118226688327344,47.977077386753145],
[-4.103318577502409,47.967779839511564],
[-4.110286259553058,47.963562467408074],
[-4.119092233379512,47.965214838449079],
[-4.127469480312324,47.964480007369275],
[-4.134764166178001,47.980355592267642],
[-4.152237708825501,47.987152863067543],
[-4.160538561616586,48.006896681058457],
[-4.181773409179098,48.021159610375278],
[-4.171894133643456,48.021709443223841],
[-4.159119346894218,48.017094728569191],
[-4.134118682673018,48.019357924576518],
[-4.147867885570347,48.031885619045475],
[-4.129164114574619,48.043025353861466],
[-4.114276967033581,48.042238544894197],
[-4.110411513133865,48.044451427135009],
[-4.106475723804794,48.064666840442349],
[-4.07764688146446,48.063886329489236],
[-4.067141345288972,48.049547848310617],
[-4.058174869980196,48.034384302255098],
[-4.066502939339628,47.993324439495773],
[-4.024656266498619,47.991816832099005],
[-4.015716283222489,47.988448729539137],
[-4.014298247096703,47.978369344974631],
[-4.037175629126088,47.964024539971064],
[-4.037448532411251,47.953436978615564],
[-4.047538379379563,47.937299041280419]
        ]
      ]
    }
  }]
};

if(FlowRouter.getParam("lat") && FlowRouter.getParam("lng"))
  //var location = JSON.parse('('+FlowRouter.getParam("lat")+','+FlowRouter.getParam("lng")+')');
       map.instance.setCenter(new google.maps.LatLng(FlowRouter.getParam("lat"), FlowRouter.getParam("lng")));
       map.instance.setZoom(8);  // Why 17? Because it looks good.
//console.log("current geolocalisation: ",Geolocation.currentLocation());
//console.log("geolocalisation: ",Geolocation.latLng());

map.instance.data.addGeoJson(quimper);

map.instance.data.setStyle({
  //icon: '//example.com/path/to/image.png',
  fillColor: 'red',
  fillOpacity: 0.1,
});
//data.loadGeoJson mettre url de fichier json
//map.instance.data.loadGeoJson('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"letter":"G","color":"blue","rank":"7","ascii":"71"},"geometry":{"type":"Polygon","coordinates":[[[123.61,-22.14],[122.38,-21.73],[121.06,-21.69],[119.66,-22.22],[119.00,-23.40],[118.65,-24.76],[118.43,-26.07],[118.78,-27.56],[119.22,-28.57],[120.23,-29.49],[121.77,-29.87],[123.57,-29.64],[124.45,-29.03],[124.71,-27.95],[124.80,-26.70],[124.80,-25.60],[123.61,-25.64],[122.56,-25.64],[121.72,-25.72],[121.81,-26.62],[121.86,-26.98],[122.60,-26.90],[123.57,-27.05],[123.57,-27.68],[123.35,-28.18],[122.51,-28.38],[121.77,-28.26],[121.02,-27.91],[120.49,-27.21],[120.14,-26.50],[120.10,-25.64],[120.27,-24.52],[120.67,-23.68],[121.72,-23.32],[122.43,-23.48],[123.04,-24.04],[124.54,-24.28],[124.58,-23.20],[123.61,-22.14]]]}}]}');

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
       map.instance.setZoom(10);  // Why 17? Because it looks good.
}
 });

var mark = [];
var infowindow = [];

for (var i = 0;i < CampingCars.find({}).fetch().length; i++) {
 console.log("boucle for bdd: "+CampingCars.find({}).fetch()[i]._id);
 if(CampingCars.find({}).fetch()[i].location && CampingCars.find({}).fetch()[i].location && CampingCars.find({}).fetch()[i].images)
 {

console.log("location: "+CampingCars.find({}).fetch()[i].location);
  var infowin = new google.maps.InfoWindow({
    content: contentview
  });

  new google.maps.Marker({
    position: new google.maps.LatLng(CampingCars.find({}).fetch()[i].location.lat, CampingCars.find({}).fetch()[i].location.lng),
    map: map.instance,
  }).addListener('click', function() {
console.log("Mouse enter");
    infowin.open(map.instance, this);  
    
  });

var contentview = '<div class="listing-map-popover">'+
'<div style="background-color:#ffffff;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;box-sizing:border-box;font-family:Roboto, sans-serif;-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0 1px 6px rgba(0,0,0,0.12),'+
         '0 1px 4px rgba(0,0,0,0.12);border-radius:2px;overflow:hidden;z-index:1;">'+
         '<div style="padding-bottom:0;">'+
         '<div style="position:relative;">'+
         '<div style="width:150px;height:95px;">'+
         '<img src="'+CampingCars.find({}).fetch()[i].images[0]+'" style="vertical-align:top;max-width:100%;min-width:100%;width:100%;" alt="rien" itemprop="image"></div>'+
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



  var goldStar = {
    path: 'M 6.66,13.02 C 4.81,6.64 13.16,7.01 17.00,7.00 20.59,6.99 32.23,6.59 34.89,7.74 41.13,10.42 38.39,19.07 33.94,22.19 31.86,23.65 29.42,24.34 27.00,25.00 27.00,25.00 33.81,32.00 33.81,32.00 33.81,32.00 41.40,42.98 41.40,42.98 42.82,45.83 41.89,47.97 38.95,46.83 31.24,43.86 26.58,22.21 16.31,34.17 14.73,36.02 14.65,36.81 14.00,39.00 3.66,37.22 11.83,29.45 17.00,27.00 17.00,27.00 17.00,25.00 17.00,25.00 13.82,23.28 7.65,16.47 6.66,13.02 Z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14
  };    
 }
}


// google.maps.event.addListener(map.instance, 'click',function(event){

//  var dig = '{"lat":"'+event.latLng.lat()+'","lng":"'+event.latLng.lng()+'"}';
//  console.log("dig: "+dig);
//  var js = JSON.parse(dig);

//        // CampingCars.update({
//        //      _id: FlowRouter.getParam('_id')
//        //  }, {
//        //      $set: js
//        //  }, {
//        //    upsert: true
//        //  });

//          marker = new google.maps.Marker({
//     position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
//     icon: goldStar1,
//     draggable: true,
//     map: map.instance,
//     title: 'Uluru (Ayers Rock)'
//   });
// });


// var contentview1 = '<div class="listing-map-popover">'+
// '<div style="background-color:#ffffff;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;box-sizing:border-box;font-family:Roboto, sans-serif;-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0 1px 6px rgba(0,0,0,0.12),'+
//          '0 1px 4px rgba(0,0,0,0.12);border-radius:2px;overflow:hidden;z-index:1;">'+
//          '<div style="padding-bottom:0;">'+
//          '<div style="position:relative;">'+
//          '<div style="width:250px;height:156px;">'+
//          '<img src="" style="vertical-align:top;max-width:100%;min-width:100%;width:100%;" alt="rien" itemprop="image"></div>'+
//          '<div style="position:absolute;top:0;bottom:0;right:0;left:0;">'+
//          '<div style="height:100%;position:relative;"'+
//          '<div style="position:absolute;bottom:0;right:0;left:0;padding-top:8px;background:rgba(0, 0, 0, 0.54);"'+
//          '<div style="padding:0 20px 10px;position:relative;" title="Vehicle price from:"">'+
//          '<span style="font-size:16px;color:rgba(255, 255, 255, 0.87);display:block;line-height:26px;font-weight:300;">Vehicle price from:</span>'+
//          '<span style="font-size:14px;color:rgba(255, 255, 255, 0.54);display:block;">$100 per day...'+
//          '</span></div></div></div></div></div>'+
//          '<div title="The Wilderness" size="45" style="height:72px;padding:16px;font-weight:500;box-sizing:border-box;position:relative;">'+
//          '<div style="display:inline-block;vertical-align:top;max-width:218px;">'+
//          '<span style="color:rgba(0, 0, 0, 0.87);display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">The Wilderness '
//          '</span>'+
//          '<span style="color:rgba(0, 0, 0, 0.54);display:block;font-size:14px;">Sleeps 4</span></div></div>'+
//          '<div style="padding:16px;font-size:14px;color:rgba(0, 0, 0, 0.87);padding-top:0;margin-bottom:36px;">This is a great tidy time capsule, remember the 80s!! well this will take you back. ...'+
//          '</div>'+
//          '<div style="padding:8px;position:absolute;bottom:8px;left:0;right:0;height:52px;">'+
//          '<div style="background-color:#ffffff;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;box-sizing:border-box;font-family:Roboto, sans-serif;-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0 1px 6px rgba(0,0,0,0.12),'+
//          '0 1px 4px rgba(0,0,0,0.12);border-radius:2px;display:inline-block;min-width:88px;height:36px;margin-right:8px;width:100%;">'+
//          '<button style="border:10px;background:none;box-sizing:border-box;display:inline-block;font:inherit;font-family:Roboto, sans-serif;tap-highlight-color:rgba(0, 0, 0, 0);appearance:button;cursor:pointer;text-decoration:none;outline:none;transform:translate3d(0, 0, 0);position:relative;height:100%;width:100%;padding:0;overflow:hidden;border-radius:2px;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;background-color:#ef4136;" tabindex="0" type="button" data-reactid=".10.0.0.$=14.$/=10.0">'+
//          '<div data-reactid=".10.0.0.$=14.$/=10.0.0">'+
//          '<div style="transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; top: 0px;">'+
//          '<span style="position:relative;opacity:1;font-size:14px;letter-spacing:0;text-transform:uppercase;font-weight:500;margin:0;user-select:none;padding-left:16px;padding-right:16px;line-height:36px;color:#ffffff;" data-reactid=".10.0.0.$=14.$/=10.0.0.1.0">View Listing'+
//          '</span></div></div></button></div></div></div></div></div>';



//   var goldStar1 = {
//     path: 'M 6.66,13.02 C 4.81,6.64 13.16,7.01 17.00,7.00 20.59,6.99 32.23,6.59 34.89,7.74 41.13,10.42 38.39,19.07 33.94,22.19 31.86,23.65 29.42,24.34 27.00,25.00 27.00,25.00 33.81,32.00 33.81,32.00 33.81,32.00 41.40,42.98 41.40,42.98 42.82,45.83 41.89,47.97 38.95,46.83 31.24,43.86 26.58,22.21 16.31,34.17 14.73,36.02 14.65,36.81 14.00,39.00 3.66,37.22 11.83,29.45 17.00,27.00 17.00,27.00 17.00,25.00 17.00,25.00 13.82,23.28 7.65,16.47 6.66,13.02 Z',
//     fillColor: 'yellow',
//     fillOpacity: 0.8,
//     scale: 1,
//     strokeColor: 'gold',
//     strokeWeight: 14
//   };


//   var infowindow = new google.maps.InfoWindow({
//     content: contentview1
//   });


var markers = {};

// CampingCars.find().observe({  
//   added: function(document) {
//     console.log("bdd add");
//     // Create a marker for this document
//     var marker = new google.maps.Marker({
//       draggable: true,
//       animation: google.maps.Animation.DROP,
//       position: new google.maps.LatLng(document.lat, document.lng),
//       icon: goldStar1,
//       map: map.instance,
//       // We store the document _id on the marker in order 
//       // to update the document within the 'dragend' event below.
//       id: document._id
//     });
    
//   marker.addListener('click', function() {

//     infowindow.open(map, marker);  
    
//   });
//     // This listener lets us drag markers on the map and update their corresponding document.
//     google.maps.event.addListener(marker, 'dragend', function(event) {
//       CampingCars.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
//     });

//     // Store this marker instance within the markers object.
//     markers[document._id] = marker;
//   },
//   changed: function(newDocument, oldDocument) {
//     console.log("bdd change, marker id: "+markers[newDocument._id].id);
//     markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
//   },
//   removed: function(oldDocument) {
//     console.log("bdd remove, marker id: "+markers[oldDocument._id].id);
//     // Remove the marker from the map
//     markers[oldDocument._id].setMap(null);

//     // Clear the event listener
//     google.maps.event.clearInstanceListeners(
//       markers[oldDocument._id]);

//     // Remove the reference to this marker instance
//     delete markers[oldDocument._id];
//   }
// });

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


return CampingCars.find({},{limit:32}).fetch();
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
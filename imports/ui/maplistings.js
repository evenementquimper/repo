import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { CampingCars } from '../api/campingcars.js';
import { Communes } from '../api/communes.js';

import './maplistings.html';
 
var contentviewtab = []; 

 Template.maplistings.onCreated(function() {


  //titre de la page
  DocHead.setTitle("Localisation, carte, communes|Le Bon Camping-car");
  
  Tracker.autorun(function () {
  Meteor.subscribe("campingcars");
  Meteor.subscribe("communes");
});

 GoogleMaps.ready('MapListings', function(map){

if(FlowRouter.getParam("lat") && FlowRouter.getParam("lng") && FlowRouter.getParam("name") || FlowRouter.getParam("citycode"))
     map.instance.setCenter(new google.maps.LatLng(FlowRouter.getParam("lat"), FlowRouter.getParam("lng")));
       map.instance.setZoom(8);  // Why 17? Because it looks good.

 if(CampingCars.find({})!=null && Communes.find({})!=null)
{

  var city = FlowRouter.getParam("name").toUpperCase();

if(Communes.find({"nom_commune":city}).count()==1)
{

}

  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('location-input'));

  var autocomplete = new google.maps.places.Autocomplete(input, {
  //bounds: defaultBounds,
  componentRestrictions: {country: 'fr'},
  types: ['(cities)']
});
  autocomplete.bindTo('bounds', map.instance);


autocomplete.addListener('place_changed', function() {

    var place = autocomplete.getPlace();
    //console.log("Place: "+JSON.stringify(place));
    if (!place.geometry) {
       window.alert("Autocomplete's returned place contains no geometry");
       return;
     }

    // // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      
    map.instance.fitBounds(place.geometry.viewport);

var geom2 = geomap(place);

//GeoJson
map.instance.data.addGeoJson(geom2);

      }
    else {  

       map.instance.setCenter(place.geometry.location);
       map.instance.setZoom(10);  // Why 17? Because it looks good.
}
 });

var mark = [];
var infowindowtab = [];
var campingcars = CampingCars.find({publish : 'valid'}).fetch();
for (var i = 0;i < campingcars.length; i++) {

 if(campingcars[i].location && campingcars[i].location && campingcars[i].images)
 {

var contentview = '<div class="listing-map-popover">'+
'<div style="background-color:#ffffff;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;box-sizing:border-box;font-family:Roboto, sans-serif;-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0 1px 6px rgba(0,0,0,0.12),'+
         '0 1px 4px rgba(0,0,0,0.12);border-radius:2px;overflow:hidden;z-index:1;">'+
         '<div style="padding-bottom:0;">'+
         '<div style="position:relative;">'+
         '<div style="width:150px;height:95px;">'+
         '<a href="/campingcar/'+campingcars[i].city+'/'+campingcars[i].make+'/'+campingcars[i].model+'"><img src="'+campingcars[i].images[0]+'" style="vertical-align:top;max-width:100%;min-width:100%;width:100%;height: 100%;" alt="rien" itemprop="image"></a></div>'+
         '</div>'+
         '<div title="'+campingcars[i].name+'" size="45" style="padding:5px;font-weight:500;box-sizing:border-box;position:relative;">'+
         '<div style="display:inline-block;vertical-align:top;max-width:218px;">'+
         '<span style="color:rgba(0, 0, 0, 0.87);display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><a href="/campingcar/'+campingcars[i].city+'/'+campingcars[i].make+'/'+campingcars[i].model+'">'+campingcars[i].name+'</a></span>'+
         '<span style="color:rgba(0, 0, 0, 0.54);display:block;font-size:14px;">prix :'+campingcars[i].priceperday+' € par jour</span></div></div></div></div></div>';

  var infowindow = new google.maps.InfoWindow({
    content: "loading..."
  });

  var campingcaricon = {
    path: 'M 1.00,12.00 C 1.05,8.86 1.04,5.82 3.43,3.43 6.04,0.82 9.60,1.02 13.00,1.00 13.00,1.00 53.00,1.00 53.00,1.00 55.83,1.04 61.96,1.31 62.20,5.31 62.59,11.75 47.06,10.00 43.00,10.00 43.00,10.00 43.00,35.00 43.00,35.00 43.00,35.00 22.00,35.00 22.00,35.00 21.53,36.58 21.49,37.43 20.41,38.86 13.38,48.16 6.72,36.77 1.00,35.00 1.00,35.00 1.00,12.00 1.00,12.00 Z M 9.04,8.00 C 9.04,8.00 9.04,15.44 9.04,15.44 9.04,15.44 17.00,17.00 17.00,17.00 17.00,17.00 36.00,17.00 36.00,17.00 36.00,17.00 36.00,8.00 36.00,8.00 36.00,8.00 9.04,8.00 9.04,8.00 Z M 58.83,12.60 C 60.93,13.46 62.39,15.31 63.79,17.02 69.81,24.38 69.00,26.08 69.00,35.00 63.93,37.91 60.59,45.57 53.13,41.05 50.13,39.24 50.34,37.35 46.00,35.00 46.00,35.00 46.00,12.00 46.00,12.00 48.79,12.00 56.63,11.70 58.83,12.60 Z M 51.00,17.00 C 51.00,17.00 51.00,23.00 51.00,23.00 51.00,23.00 60.00,23.00 60.00,23.00 57.35,17.76 56.83,17.19 51.00,17.00 Z M 14.76,37.35 C 17.48,36.27 18.47,31.17 12.31,31.66 8.29,35.01 11.92,38.49 14.76,37.35 Z M 58.70,37.34 C 61.12,36.38 62.14,31.18 56.30,31.66 52.07,35.15 55.92,38.46 58.70,37.34 Z',    fillColor: 'transparent',
    fillOpacity: 0.9,
    scale: 1,
    strokeColor: '#f56b2a',
    strokeWeight: 3
  };    
//passez dans marker.html la vue de infowindows pour l'appeller dans le listener avec this.html
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(CampingCars.find({}).fetch()[i].location.lat, CampingCars.find({}).fetch()[i].location.lng),
    map: map.instance,
    icon: campingcaricon,
    html: contentview,
  });


new google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(this.html);
        infowindow.open(map, this);
});

 }
}

var markers = {};

}
else
{

}
});

  function geomap(place){

var com = {
  // "type": "FeatureCollection",
  // "features": [{
    "id":"1234",
    "type": "Feature",
    "properties": {
      "letter": "G",
      "color": "red",
      "rank": "7",
      "ascii": "71"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates":
      [
      
       [ 

         ]
      ]
    }
  //}]
};

    var sanac = place.address_components[0].long_name.replace(/[èéêë]/g,"e");

    if(place.address_components[5])
var code = parseInt(place.address_components[5].long_name);
     
     var city= sanac.toUpperCase();

var communesbdd = null;


if(Communes.find({nom_commune:city}).count()==1)
{
communesbdd = Communes.find({nom_commune:city}).fetch()[0];
  
}

else
{
  if(code && Communes.find({code_commune:code}).count()==1)
{
  communesbdd = Communes.find({code_commune:code}).fetch()[0];
}
else
{

}

}
   
   if(communesbdd)
{

   var prs = communesbdd.KML.split("<Polygon> <outerBoundaryIs> <LinearRing> <coordinates>");

var prs2 = prs[1].split("</coordinates> </LinearRing> </outerBoundaryIs> </Polygon>");
var lasttab = [];
var prs3 = [];
prs3 = prs2[0].split(" ");

for (var i = 0 ; prs3.length > i; i++) {

  var coord = prs3[i].split(',');

  if(com.geometry.coordinates[0][i]==null)
{
var t = [];
com.geometry.coordinates[0].push(t);

  com.geometry.coordinates[0][i].push(parseFloat(coord[0]));
  com.geometry.coordinates[0][i].push(parseFloat(coord[1]));


}
}
}
else
{
}


return com;
  } 


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
    console.log("camping car find : "+CampingCars.find({publish : 'valid'}).count());
    //console.log("campingcar find! vue nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).fetech()[0].daysfull[0]);


return CampingCars.find({publish : 'valid'},{limit:32}).fetch();
  },

   MapListingsOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded() && CampingCars.find({}).fetch()) {
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

// 'click .listing-map-popover':function(event, template){
//     event.preventDefault();
//     FlowRouter.go("listings",{_id:event.currentTarget.id});
// },


   });


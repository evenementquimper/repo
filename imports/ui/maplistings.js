import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { CampingCars } from '../api/campingcars.js';
import { Communes } from '../api/communes.js';

import './maplistings.html';
 
//Markers = new Mongo.Collection('markers');  

 Template.maplistings.onCreated(function() {

  this.autorun(() => {
    this.subscribe('campingcars');
      this.subscribe('communes');
  });
  //console.log("Query params location: "+FlowRouter.getQueryParam("location"));
//console.log("lat param: "+JSON.stringify(FlowRouter.getParam("location").lat()));
//console.log("lng param: "+JSON.stringify(FlowRouter.getParam("lng")));



 GoogleMaps.ready('MapListings', function(map){

if(FlowRouter.getParam("lat") && FlowRouter.getParam("lng") && FlowRouter.getParam("name") || FlowRouter.getParam("citycode"))
  //var location = JSON.parse('('+FlowRouter.getParam("lat")+','+FlowRouter.getParam("lng")+')');
       map.instance.setCenter(new google.maps.LatLng(FlowRouter.getParam("lat"), FlowRouter.getParam("lng")));
       map.instance.setZoom(8);  // Why 17? Because it looks good.





// map.instance.data.addGeoJson(quimper);

//data.loadGeoJson mettre url de fichier json
//map.instance.data.loadGeoJson('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"letter":"G","color":"blue","rank":"7","ascii":"71"},"geometry":{"type":"Polygon","coordinates":[[[123.61,-22.14],[122.38,-21.73],[121.06,-21.69],[119.66,-22.22],[119.00,-23.40],[118.65,-24.76],[118.43,-26.07],[118.78,-27.56],[119.22,-28.57],[120.23,-29.49],[121.77,-29.87],[123.57,-29.64],[124.45,-29.03],[124.71,-27.95],[124.80,-26.70],[124.80,-25.60],[123.61,-25.64],[122.56,-25.64],[121.72,-25.72],[121.81,-26.62],[121.86,-26.98],[122.60,-26.90],[123.57,-27.05],[123.57,-27.68],[123.35,-28.18],[122.51,-28.38],[121.77,-28.26],[121.02,-27.91],[120.49,-27.21],[120.14,-26.50],[120.10,-25.64],[120.27,-24.52],[120.67,-23.68],[121.72,-23.32],[122.43,-23.48],[123.04,-24.04],[124.54,-24.28],[124.58,-23.20],[123.61,-22.14]]]}}]}');

 if(CampingCars.find({})!=null && Communes.find({})!=null)
{
  //var citycode = FlowRouter.getParam("citycode"); 
  var city = FlowRouter.getParam("name").toUpperCase();
console.log("CITY: "+city);
//console.log("CITY code: "+citycode);
if(Communes.find({"Nom Commune":city}).count()!=0)
{
//  console.log("commune bdd: "+Communes.find({"Nom Commune":city}));

var geom = geomap(city);


//GeoJson
map.instance.data.addGeoJson(geom);
}








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
    console.log("Place: "+JSON.stringify(place));
    if (!place.geometry) {
       window.alert("Autocomplete's returned place contains no geometry");
       return;
     }

    // // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      
      
    //console.log("geometry viewport");
    map.instance.fitBounds(place.geometry.viewport);

// map.instance.data.forEach(function(feature){
//   //console.log("feature?: "+feature.getId());
//   feature.toGeoJson(function(geojson){
// //console.log("feature geojson: "+JSON.stringify(geojson));

//   });
// //map.instance.data.add(com);      


// });

var geom2 = geomap(place);


//GeoJson
map.instance.data.addGeoJson(geom2);

//map.instance.data.remove(feature:Data.Feature) , {idPropertyName:"1234"}


       // Color each letter gray. Change the color when the isColorful property
        // is set to true.
        // map.instance.data.setStyle(function(feature) {
        //   var color = 'gray';
        //   if (feature.getProperty('isColorful')) {
        //     color = feature.getProperty('color');
        //   }
        //   return /** @type {google.maps.Data.StyleOptions} */({
        //     fillColor: color,
        //     strokeColor: color,
        //     strokeWeight: 2
        //   });
        // });


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


//var cpcsvg = 'M 25.13,8.33 C 26.85,7.88 30.09,8.00 32.00,8.33 32.00,8.33 47.00,8.33 47.00,8.33 54.84,10.08 52.09,12.98 65.00,13.00 65.00,13.00 112.00,13.00 112.00,13.00 112.00,13.00 112.00,45.00 112.00,45.00 112.00,45.00 52.00,45.00 52.00,45.00 52.00,41.60 52.29,36.07 51.11,33.00 49.89,29.81 47.21,26.97 44.00,25.74 40.59,24.43 21.03,25.00 16.00,25.00 17.16,20.94 21.20,10.24 25.13,8.33 Z M 29.00,23.00 C 32.90,22.92 35.89,22.84 35.89,18.00 35.89,16.89 35.69,15.50 34.98,14.60 32.05,10.89 24.85,13.38 22.84,17.06 21.72,19.09 21.42,20.78 21.00,23.00 21.00,23.00 29.00,23.00 29.00,23.00 Z M 75.00,37.00 C 75.00,37.00 87.00,37.00 87.00,37.00 88.94,37.00 92.72,37.25 94.33,36.01 96.71,34.03 96.55,25.75 94.33,23.60 91.88,21.08 78.91,21.93 75.00,22.00 73.05,22.04 70.37,21.90 69.02,23.60 67.40,25.65 68.27,32.96 68.00,36.00 70.95,36.84 71.94,36.95 75.00,37.00 Z M 10.99,47.64 C 12.64,45.32 15.19,45.84 18.96,40.95 21.26,37.96 23.49,33.04 27.09,31.60 29.75,30.53 43.19,30.34 44.98,32.60 46.31,34.28 45.99,38.85 46.00,41.00 46.02,48.22 45.84,50.85 54.00,51.00 54.00,51.00 112.00,51.00 112.00,51.00 112.00,51.00 112.00,55.00 112.00,55.00 111.95,62.82 110.89,64.00 103.00,64.00 101.39,64.00 98.72,64.06 97.27,63.40 94.26,62.04 90.44,51.62 81.00,52.43 72.46,53.16 69.51,62.04 66.59,63.43 65.08,64.14 61.73,64.00 60.00,64.00 60.00,64.00 39.00,64.00 39.00,64.00 35.88,54.24 25.99,48.61 17.04,55.50 12.44,59.04 11.61,64.54 8.38,62.83 6.13,61.65 6.13,58.16 6.00,56.00 6.00,56.00 10.00,56.00 10.00,56.00 10.00,53.73 9.68,49.51 10.99,47.64 Z M 33.00,48.00 C 35.15,47.97 38.52,48.11 40.01,46.26 41.61,44.28 41.49,35.68 39.40,34.02 38.01,32.92 34.71,32.92 33.00,33.06 28.37,33.43 27.16,35.39 24.67,39.00 22.71,41.85 21.51,43.90 20.00,47.00 24.61,48.31 28.26,48.06 33.00,48.00 Z M 18.70,71.72 C 14.66,66.83 17.02,59.45 23.04,57.66 29.22,55.83 34.80,61.49 33.64,67.98 32.97,71.75 30.42,73.38 28.00,76.00 24.80,75.06 20.92,74.41 18.70,71.72 Z M 73.60,68.98 C 71.37,62.88 76.47,56.28 82.99,57.43 89.13,58.52 91.71,65.62 88.83,70.87 87.75,72.84 85.59,74.42 84.00,76.00 79.79,74.73 75.31,73.64 73.60,68.98 Z M 25.96,69.95 C 29.88,69.34 31.81,62.20 24.17,62.62 18.80,65.83 22.90,70.42 25.96,69.95 Z M 82.87,69.60 C 86.23,68.28 87.06,62.15 80.22,62.66 74.98,66.41 79.57,70.90 82.87,69.60 Z';

//var cpcsvg = 'M 8.00,52.00 C 8.04,27.56 23.56,8.04 49.00,8.00 49.00,8.00 274.00,8.00 274.00,8.00 274.00,8.00 335.00,8.00 335.00,8.00 345.97,8.02 347.45,12.45 355.00,20.00 359.50,24.50 364.29,28.81 368.00,34.00 363.90,38.10 350.29,52.82 346.00,54.40 344.06,55.12 341.09,55.00 339.00,55.00 339.00,55.00 250.00,55.00 250.00,55.00 250.00,55.00 250.00,203.00 250.00,203.00 250.00,203.00 127.00,203.00 127.00,203.00 126.12,243.13 79.15,264.02 49.09,237.54 44.67,233.64 40.28,227.36 37.79,222.00 34.86,215.66 34.02,209.89 34.00,203.00 34.00,203.00 8.00,203.00 8.00,203.00 8.00,203.00 8.00,52.00 8.00,52.00 Z M 69.00,44.00 C 52.85,44.19 45.03,51.83 45.00,68.00 45.00,68.00 45.00,105.00 45.00,105.00 45.00,105.00 213.00,105.00 213.00,105.00 213.00,105.00 213.00,44.00 213.00,44.00 213.00,44.00 69.00,44.00 69.00,44.00 Z M 339.00,74.00 C 341.52,74.01 344.65,73.80 346.91,75.02 349.56,76.45 352.28,80.56 354.13,83.00 354.13,83.00 367.20,100.00 367.20,100.00 367.20,100.00 387.88,127.00 387.88,127.00 394.69,135.92 397.98,136.55 398.00,148.00 398.00,148.00 398.00,203.00 398.00,203.00 398.00,203.00 383.00,203.00 383.00,203.00 382.85,209.84 381.33,216.80 378.37,223.00 375.78,228.43 372.39,232.82 368.00,236.91 338.56,264.30 290.12,243.46 290.00,203.00 290.00,203.00 269.00,203.00 269.00,203.00 269.00,203.00 269.00,74.00 269.00,74.00 269.00,74.00 339.00,74.00 339.00,74.00 Z M 339.85,112.00 C 334.71,104.97 333.94,101.05 325.00,101.00 325.00,101.00 296.00,101.00 296.00,101.00 296.00,101.00 296.00,141.00 296.00,141.00 296.00,141.00 361.00,141.00 361.00,141.00 361.00,141.00 339.85,112.00 339.85,112.00 Z M 58.53,190.00 C 49.25,206.30 60.85,227.76 80.00,227.82 95.92,227.87 105.36,216.30 104.99,201.00 104.84,195.03 102.82,189.59 98.67,185.18 93.87,180.08 86.84,177.77 80.00,177.45 70.90,178.30 63.24,181.73 58.53,190.00 Z M 320.04,183.39 C 301.61,198.57 314.23,229.76 338.00,227.67 352.89,226.37 361.34,215.48 360.99,201.00 360.84,195.03 358.82,189.59 354.67,185.18 349.65,179.85 343.07,177.99 336.00,177.57 329.99,177.93 324.78,179.48 320.04,183.39 Z';

//'M 6.66,13.02 C 4.81,6.64 13.16,7.01 17.00,7.00 20.59,6.99 32.23,6.59 34.89,7.74 41.13,10.42 38.39,19.07 33.94,22.19 31.86,23.65 29.42,24.34 27.00,25.00 27.00,25.00 33.81,32.00 33.81,32.00 33.81,32.00 41.40,42.98 41.40,42.98 42.82,45.83 41.89,47.97 38.95,46.83 31.24,43.86 26.58,22.21 16.31,34.17 14.73,36.02 14.65,36.81 14.00,39.00 3.66,37.22 11.83,29.45 17.00,27.00 17.00,27.00 17.00,25.00 17.00,25.00 13.82,23.28 7.65,16.47 6.66,13.02 Z',


//'M 1.00,12.00 C 1.05,8.86 1.04,5.82 3.43,3.43 6.04,0.82 9.60,1.02 13.00,1.00 13.00,1.00 53.00,1.00 53.00,1.00 55.83,1.04 61.96,1.31 62.20,5.31 62.59,11.75 47.06,10.00 43.00,10.00 43.00,10.00 43.00,35.00 43.00,35.00 43.00,35.00 22.00,35.00 22.00,35.00 21.53,36.58 21.49,37.43 20.41,38.86 13.38,48.16 6.72,36.77 1.00,35.00 1.00,35.00 1.00,12.00 1.00,12.00 Z M 9.04,8.00 C 9.04,8.00 9.04,15.44 9.04,15.44 9.04,15.44 17.00,17.00 17.00,17.00 17.00,17.00 36.00,17.00 36.00,17.00 36.00,17.00 36.00,8.00 36.00,8.00 36.00,8.00 9.04,8.00 9.04,8.00 Z M 58.83,12.60 C 60.93,13.46 62.39,15.31 63.79,17.02 69.81,24.38 69.00,26.08 69.00,35.00 63.93,37.91 60.59,45.57 53.13,41.05 50.13,39.24 50.34,37.35 46.00,35.00 46.00,35.00 46.00,12.00 46.00,12.00 48.79,12.00 56.63,11.70 58.83,12.60 Z M 51.00,17.00 C 51.00,17.00 51.00,23.00 51.00,23.00 51.00,23.00 60.00,23.00 60.00,23.00 57.35,17.76 56.83,17.19 51.00,17.00 Z M 14.76,37.35 C 17.48,36.27 18.47,31.17 12.31,31.66 8.29,35.01 11.92,38.49 14.76,37.35 Z M 58.70,37.34 C 61.12,36.38 62.14,31.18 56.30,31.66 52.07,35.15 55.92,38.46 58.70,37.34 Z'

  var campingcaricon = {
    path: 'M 1.00,12.00 C 1.05,8.86 1.04,5.82 3.43,3.43 6.04,0.82 9.60,1.02 13.00,1.00 13.00,1.00 53.00,1.00 53.00,1.00 55.83,1.04 61.96,1.31 62.20,5.31 62.59,11.75 47.06,10.00 43.00,10.00 43.00,10.00 43.00,35.00 43.00,35.00 43.00,35.00 22.00,35.00 22.00,35.00 21.53,36.58 21.49,37.43 20.41,38.86 13.38,48.16 6.72,36.77 1.00,35.00 1.00,35.00 1.00,12.00 1.00,12.00 Z M 9.04,8.00 C 9.04,8.00 9.04,15.44 9.04,15.44 9.04,15.44 17.00,17.00 17.00,17.00 17.00,17.00 36.00,17.00 36.00,17.00 36.00,17.00 36.00,8.00 36.00,8.00 36.00,8.00 9.04,8.00 9.04,8.00 Z M 58.83,12.60 C 60.93,13.46 62.39,15.31 63.79,17.02 69.81,24.38 69.00,26.08 69.00,35.00 63.93,37.91 60.59,45.57 53.13,41.05 50.13,39.24 50.34,37.35 46.00,35.00 46.00,35.00 46.00,12.00 46.00,12.00 48.79,12.00 56.63,11.70 58.83,12.60 Z M 51.00,17.00 C 51.00,17.00 51.00,23.00 51.00,23.00 51.00,23.00 60.00,23.00 60.00,23.00 57.35,17.76 56.83,17.19 51.00,17.00 Z M 14.76,37.35 C 17.48,36.27 18.47,31.17 12.31,31.66 8.29,35.01 11.92,38.49 14.76,37.35 Z M 58.70,37.34 C 61.12,36.38 62.14,31.18 56.30,31.66 52.07,35.15 55.92,38.46 58.70,37.34 Z',    fillColor: 'transparent',
    fillOpacity: 0.9,
    scale: 1,
    strokeColor: '#f56b2a',
    strokeWeight: 3
  };    

  new google.maps.Marker({
    position: new google.maps.LatLng(CampingCars.find({}).fetch()[i].location.lat, CampingCars.find({}).fetch()[i].location.lng),
    map: map.instance,
    icon: campingcaricon,
  }).addListener('click', function() {
console.log("Mouse enter");
    infowin.open(map.instance, this);  
    
  });

var contentview = '<div class="listing-map-popover" id="'+CampingCars.find({}).fetch()[i]._id+'">'+
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




 }
}



var markers = {};

}
else
{
  //console.log("campingcar not find!: ");
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

             //console.log("commune bdd: "+Communes.find({"Nom Commune":city}).count());
     //console.log("commune bdd kml: "+Communes.find({"Nom Commune":city}).fetch()[0].KML);

communesbdd = Communes.find({nom_commune:city}).fetch()[0];

    //var comindex;
  
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

  //  Meteor.call("communesearch",place);

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

'click .listing-map-popover':function(event, template){

   console.log("event type : "+event.type);
    console.log("event id : "+event.currentTarget.id);
      event.preventDefault();
    FlowRouter.go("listings",{_id:event.currentTarget.id});
    //console.log("event target text: "+event.target.text.value);
},

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


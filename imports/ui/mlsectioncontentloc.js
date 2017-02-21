import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { CampingCars } from '../api/campingcars.js';
import { ReactiveDict } from 'meteor/reactive-dict'; 

import './mlsectioncontentloc.html';
 
var place2;

Template.mlsectioncontentloc.onCreated(function() {

  var autocomplete2;

  GoogleMaps.ready('adressMap', function(map){

    var input2 = /** @type {!HTMLInputElement} */(
    document.getElementById('adressautocomplete'));
    autocomplete2 = new google.maps.places.Autocomplete(input2, {
      componentRestrictions: {country: 'fr'}
                    });

    //autocomplete2.bindTo('bounds', map.instance);

    var marker = new google.maps.Marker({
    map: map.instance,
    anchorPoint: new google.maps.Point(0, -29),
    icon:{
    path: 'M 1.00,12.00 C 1.05,8.86 1.04,5.82 3.43,3.43 6.04,0.82 9.60,1.02 13.00,1.00 13.00,1.00 53.00,1.00 53.00,1.00 55.83,1.04 61.96,1.31 62.20,5.31 62.59,11.75 47.06,10.00 43.00,10.00 43.00,10.00 43.00,35.00 43.00,35.00 43.00,35.00 22.00,35.00 22.00,35.00 21.53,36.58 21.49,37.43 20.41,38.86 13.38,48.16 6.72,36.77 1.00,35.00 1.00,35.00 1.00,12.00 1.00,12.00 Z M 9.04,8.00 C 9.04,8.00 9.04,15.44 9.04,15.44 9.04,15.44 17.00,17.00 17.00,17.00 17.00,17.00 36.00,17.00 36.00,17.00 36.00,17.00 36.00,8.00 36.00,8.00 36.00,8.00 9.04,8.00 9.04,8.00 Z M 58.83,12.60 C 60.93,13.46 62.39,15.31 63.79,17.02 69.81,24.38 69.00,26.08 69.00,35.00 63.93,37.91 60.59,45.57 53.13,41.05 50.13,39.24 50.34,37.35 46.00,35.00 46.00,35.00 46.00,12.00 46.00,12.00 48.79,12.00 56.63,11.70 58.83,12.60 Z M 51.00,17.00 C 51.00,17.00 51.00,23.00 51.00,23.00 51.00,23.00 60.00,23.00 60.00,23.00 57.35,17.76 56.83,17.19 51.00,17.00 Z M 14.76,37.35 C 17.48,36.27 18.47,31.17 12.31,31.66 8.29,35.01 11.92,38.49 14.76,37.35 Z M 58.70,37.34 C 61.12,36.38 62.14,31.18 56.30,31.66 52.07,35.15 55.92,38.46 58.70,37.34 Z',    fillColor: 'transparent',
    fillOpacity: 0.9,
    scale: 1,
    strokeColor: '#f56b2a',
    strokeWeight: 3
          }
                });

    if(CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].location!=null)
        marker.setPosition({
            lat:CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].location.lat,
            lng:CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].location.lng});
        marker.setVisible(true);

    autocomplete2.addListener('place_changed', function() {
        place2 = autocomplete2.getPlace();
    
          if (!place2.geometry) {
              window.alert("Autocomplete's returned place contains no geometry");
              return;
            }
    
          if (place2.geometry.viewport) {
              map.instance.fitBounds(place2.geometry.viewport);
            }
       // If the place has a geometry, then present it on a map.
          if (place2.geometry.location) {
              map.instance.setCenter(place2.geometry.location);
              map.instance.setZoom(10);  // Why 17? Because it looks good.
    
              var dig = '{"address":"'+place2.formatted_address+'","city":"'+place2.address_components[2].long_name+'","location":'+JSON.stringify(place2.geometry.location)+'}';
              var js = JSON.parse(dig);
        
              CampingCars.update({
                _id: FlowRouter.getParam('_id')
                    }, {
                        $set: js
                    }, {
                        upsert: true
                    });
            
            } else {}

    marker.setPosition(place2.geometry.location);
    marker.setVisible(true);
    });
  });
});

 Template.mlsectioncontentloc.onRendered(function() {
  GoogleMaps.load({key: Meteor.settings.public.G_MAP_KEY, libraries: 'places'});
});


 Template.mlsectioncontentloc.helpers({

  adressMapOptions: function() {
    // Make sure the maps API has loaded

        var camplat = "48.1076427";
        var camplng = "-1.6789076000000023";

    if (GoogleMaps.loaded()) {

      //       if(CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].location!=null)
      //           camplat = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].location.lat;
      //           camplng = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].location.lng;
      // // Map initialization options
      return {
        center: new google.maps.LatLng(camplat, camplng),
        zoom: 8,
      };
    }
    else
    {
      return false;
    }
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
  }

});

  Template.mlsectioncontentloc.events({

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


'click .text-item': function(event, template){
      event.preventDefault(); 
      var lab = event.currentTarget.children[0];
      var inp = event.currentTarget.children[1];
      var hli = event.currentTarget.children[3];
      var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
      var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
      inp.style.display = "inline-block";
      lab.style = nstyle;
      lab.style.top = "38px";
      lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
      lab.style.cursor = "text";
      lab.style.color ="rgba(86,90,92,0.5)";
      hli.style.transform = "scaleX(1)";

},

   });
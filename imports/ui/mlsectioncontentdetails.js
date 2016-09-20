import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
 

import './mlsectioncontentdetails.html';
 
 Template.mlsectioncontentdetails.onCreated(function() {
console.log("Star detail.js");
console.log("route id : "+FlowRouter.getParam("id"));
  //CampingCars.insert({name:"peugeot", description:"un super camping car de la mort qui tue", maxguests:4, bedsnumb: 4});
  //this.getListId = () => FlowRouter.getParam('_id');
//souscription a la base de donnée
  //this.autorun(() => {
    //this.subscribe('tasks');
  //});
GoogleMaps.ready('exampleMap', function(map){
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';


  var goldStar = {
    path: 'M 6.66,13.02 C 4.81,6.64 13.16,7.01 17.00,7.00 20.59,6.99 32.23,6.59 34.89,7.74 41.13,10.42 38.39,19.07 33.94,22.19 31.86,23.65 29.42,24.34 27.00,25.00 27.00,25.00 33.81,32.00 33.81,32.00 33.81,32.00 41.40,42.98 41.40,42.98 42.82,45.83 41.89,47.97 38.95,46.83 31.24,43.86 26.58,22.21 16.31,34.17 14.73,36.02 14.65,36.81 14.00,39.00 3.66,37.22 11.83,29.45 17.00,27.00 17.00,27.00 17.00,25.00 17.00,25.00 13.82,23.28 7.65,16.47 6.66,13.02 Z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14
  };


  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
var uluru = {lat: -25.363, lng: 131.044};
  var marker = new google.maps.Marker({
    position: uluru,
    icon: goldStar,
    draggable: true,
    map: map.instance,
    title: 'Uluru (Ayers Rock)'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
});


});

 Template.mlsectioncontentdetails.onRendered(function(){



GoogleMaps.load({key:"AIzaSyCFo3iJe21DtIo3wkHNXrTOBmT9DQz_6C0"});
 });

 Template.mlsectioncontentdetails.helpers({
todoArgs(todo){


},
  tasks: function() {

    var category = FlowRouter.getParam("id");
    console.log("Parametre: "+category);
    //var o_id = new ObjectID(id);  _id:category
//db.test.find({_id:o_id}) _id: 'category'

    console.log("BDD: "+Tasks.find({}).fetch()[0]);
    var bdd = Tasks.find({}).fetch();
    //console.log("BDD: "+Tasks.find({}).fetch());
    
    //return Tasks.find({}).fetch()[0];
    return bdd;
  },

    campingcars: function(){
    //const instance = Template.instance();
    console.log("route id : "+FlowRouter.getParam("_id"));
return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },

   exampleMapOptions: function() {
    // Make sure the maps API has loaded



    if (GoogleMaps.loaded()) {


      // Map initialization options
      return {
        center: new google.maps.LatLng(-25.363, 131.044),
        zoom: 8
      };
    }
  }
// ways:function(){
// return Way_Coll.find({}).fetch();
// },

// errors:function(){
// return Errors_Coll.find({}).fetch();
// },
    // gates:function(){
    //        return Gate_Coll.find({}).fetch();
    // },
    // interval:function(){
    //   console.log("Interval: "+gateState.get(rr));
    //         return gateState.get(rr);
    // },
    // car:function(){
    //   return Gate2_Coll.find({}).fetch();
    //   console.log("Barrière info: "+bdd[0].datavalues.input1state);

    //   if(bdd[0].datavalues.input1state==1)
    //   {
    //     return true;
    //   }
    //   else
    //   {
    //     return false;
    //   }

    // },
});
  Template.mlsectioncontentdetails.events({

'submit .basics.description': function (event, template){
  //event.preventDefault();

      // Get value from form element
    console.log("basic descrip: ");
    const target = event.target;

    const text = target.text.value;
    console.log("text value: "+text);
},
  'keyup .new-task': function(event, template) {
    //console.log("event "+event);
    // Prevent default browser form submit
//this.preventDefault();
   // event.preventDefault();
    console.log("event type : "+event.type);
    console.log("event target : "+event.target);
    console.log("event target text: "+event.target.text.value);
    //console.log("event current target : "+EJSON.stringify(event.currentTarget.hr.style));
       var Restask = template.find('.new-task');


    // Get value from form element

    //const target = event.target;

    const text = Restask.text.value;
    console.log("text value: "+text);
 

    // Clear form

    Restask.text.value = '';

  },

  'click .flex-grid-item':function(event, template){
console.log("click input nameœ: "+event.target.name);
console.log("click input value: "+event.target.value);
var key = event.target.name;

//var req = Json.parse('{_id:"'+FlowRouter.getParam('_id')'",'+key+':null}');
var routeid = FlowRouter.getParam('_id');
var dig = '{_id:"'+routeid+'",'+key+':"on"}';
console.log("av parser: "+dig);
console.log("fetch key: "+CampingCars.find(dig).fetch());
if (event.target.value=="on")
{
 event.target.value="off"; 
console.log("bdd on: ");
var dig0 = '{"'+key+'":null}';

var js = JSON.parse(dig0);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });

}
else
{
console.log("bdd null: ");
var dig2 = '{"'+key+'":"on"}';
var js2 = JSON.parse(dig2);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js2
        }, {
          upsert: true
        });

}
//var bdd = CampingCars.find({_id: FlowRouter.getParam('_id')});

var val = null;
//var dat = '{"'+key+'":'+val+'}';
//console.log("avant json: "+dat);
//var js = JSON.parse(dat);
  //      CampingCars.update({
    //        _id: FlowRouter.getParam('_id')
      //  }, {
        //    $set: js
        //}, {
          //  upsert: true
        //});
    //console.log("event target : "+event.target);
    //console.log("event current target child : "+event.currentTarget.children.item(0).children.item(1).children.item(1).children.item(0).children.item(0).style);
    //console.log("event current target child : "+event.currentTarget.children.item(6).children.item(0).style);
//style input style="tap-highlight-color:rgba(0,0,0,0);padding:0;position:relative;width:100%;height:100%;border:none;outline:none;background-color:transparent;color:rgba(86, 90, 92, 0.87);font:inherit;box-sizing:border-box;margin-top:14px;"
    
  },
    'blur input':function(event, template){
      //console.log("blur input name: "+event.target.name);
//console.log("blur input: "+event.target.value);
//console.log("route param: "+FlowRouter.getParam('_id'));
var key = event.target.name;
var val = event.target.value;
var dat = '{"'+key+'":"'+val+'"}';
//console.log("avant json: "+dat);
var js = JSON.parse(dat);
        // CampingCars.update({
        //     _id: FlowRouter.getParam('_id')
        // }, {
        //     $set: js
        // }, {
        //     upsert: true
        // });

//style input style="tap-highlight-color:rgba(0,0,0,0);padding:0;position:relative;width:100%;height:100%;border:none;outline:none;background-color:transparent;color:rgba(86, 90, 92, 0.87);font:inherit;box-sizing:border-box;margin-top:14px;"
    
  },

  'click .ml-panel-textfield':function(event, template) {
    //console.log("event "+event);
    // Prevent default browser form submit
//this.preventDefault();
   // event.preventDefault();
    //console.log("event type : "+event.type);
    //console.log("event target : "+event.target);
    //console.log("event target text: "+event.target.text.value);
    //console.log("event current target laschild : "+event.currentTarget.childNodes[1].data);
    //console.log("event current target innerhtml : "+event.currentTarget.innerHTML);
    //console.log("event current target child : "+event.currentTarget.children.item(6).children.item(0).style);

   
    //var evtar = event.currentTarget.children.item(6).children.item(1);
    //console.log("Style : "+evtar.style.width);
    //console.log("Style transform: "+evtar.style.transform);
    //evtar.style = evtar.style + "transform:scaleX(1);transition:all 450ms";


    //var evtar1 = event.currentTarget.children.item(6).children.item(1);
    //evtar.style.display = "none";
    //evtar1.style = "border:none;border-bottom:solid 1px;border-color:rgba(0,0,0,0.3);bottom:8px;box-sizing:content-box;margin:0;position:absolute;width:100%;";
    //evtar1.style.display = "inherit";
    //evtar1.style = "border:none;border-bottom:solid 2px;border-color:#246182;bottom:8px;box-sizing:content-box;margin:0;position:absolute;width:100%;transform:scaleX(0);transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;";
    //evtar1.style =  "border-width: medium medium 2px; border-style: none none solid; -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none; border-color: rgb(36, 97, 130); bottom: 8px; box-sizing: content-box; margin: 0px; position: absolute; width: 100%; transform: scaleX(0); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;";
    
    //evtar.style = "transform:scaleX(0); border-bottom:solid 2px;border-color:#246182;"; 
    //console.log("event current target : "+ evtar.find('hr'));
      // var Restask = template.find('.new-task');


    // Get value from form element

    //const target = event.target;

    //const text = Restask.text.value;
    //console.log("text value: "+text);
 

    // Clear form

    //Restask.text.value = '';

  },
  //   'click #valid': function(event, template) {
  //     // Prevent default browser 
  //     event.preventDefault();
  //     var ResId = template.find('#email');
  //     var email = $(ResId).val();
  //     //console.log("Current Service: "+Session.get("currentService"));
  //     if (Session.get("currentService")=="ticketreloading") {
  //     //console.log("Vérification du mail "+email);
  //     Session.set("BookingEmail", email);
  //     Router.go("BookingPrint");
  //     }
  //     else
  //     {
  //     Router.go("NewBookingName");
  //     Session.set("BookingEmail", email);
  // }
  // },

   });
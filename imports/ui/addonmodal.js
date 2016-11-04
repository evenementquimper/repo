import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { AddOns } from '../api/addons.js';
import { Session } from 'meteor/session';


import './addonmodal.html';
 
//Markers = new Mongo.Collection('markers');  

 Template.addonmodal.onCreated(function() {
console.log("camp id: ",this.campid);
console.log("camp id: ", Session.get("campid"));
});


 Template.addonmodal.helpers({


//     campid: function(){
//     //const instance = Template.instance();
//     //console.log("helper route id : "+FlowRouter.getParam("_id"));
//     console.log("camping: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).count());
// return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
//   },

});
  Template.addonmodal.events({

    'input .addon-item': function (event, template) {
//event.preventDefault(); 
console.log("event: "+event.type);

var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
console.log("DIG: "+dig);
var js = JSON.parse(dig);
        AddOns.update({
            campingcar_id: Session.get("campid")
        }, {
            $set: js
        }, {
          upsert: true
        });
  },

//   'input .data-item': function (event, template) {
// //event.preventDefault(); 
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
//   },

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

}

   });
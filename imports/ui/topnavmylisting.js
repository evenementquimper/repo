import { Template } from 'meteor/templating';


import './topnavmylisting.html';
 
 Template.topnavmylisting.onCreated(function() {
    console.log("oncreate top nav");
});

 Template.topnavmylisting.helpers({
  
});
  Template.topnavmylisting.events({
'click .tab-item-basics': function (event){
  //console.log("click basics");
  event.preventDefault();
    //var category = FlowRouter.getParam("_id");
    //console.log("Parametre: "+category);
    FlowRouter.go("userbasics",{_id:FlowRouter.getParam("_id")});
},
'click .tab-item-details': function(event){
    event.preventDefault();
    FlowRouter.go("userdetails",{_id:FlowRouter.getParam("_id")});
},
'click .tab-item-location': function(event){
    event.preventDefault();
    FlowRouter.go("userlocation",{_id:FlowRouter.getParam("_id")});
},
'click .tab-item-images': function(event){
    event.preventDefault();
    FlowRouter.go("userimages",{_id:FlowRouter.getParam("_id")});
},
'click .tab-item-availability': function(event){
    event.preventDefault();
    FlowRouter.go("useravailability",{_id:FlowRouter.getParam("_id")});
}

   });
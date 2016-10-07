import { Template } from 'meteor/templating';


import './topnavmylisting.html';
 
 Template.topnavmylisting.onCreated(function() {
    //console.log("oncreate top nav");
});

 Template.topnavmylisting.helpers({
  //console.log()
});
  Template.topnavmylisting.events({
'click .tab-item-basics': function (event, template){
  //console.log("click basics");
  event.preventDefault();
    //var category = FlowRouter.getParam("_id");
    //console.log("Parametre: "+category);
    FlowRouter.go("userbasics",{_id:FlowRouter.getParam("_id")});
           var tnactive = template.find('.top-nav-active');
           tnactive.style.left = "0%";
           tnactive.style.width =  "20%";
},
'click .tab-item-details': function(event, template){
    event.preventDefault();
    FlowRouter.go("userdetails",{_id:FlowRouter.getParam("_id")});
               var tnactive = template.find('.top-nav-active');
           tnactive.style.left = "20%";
           tnactive.style.width =  "20%";
},
'click .tab-item-location': function(event, template){
    event.preventDefault();
    FlowRouter.go("userlocation",{_id:FlowRouter.getParam("_id")});
               var tnactive = template.find('.top-nav-active');
           tnactive.style.left = "40%";
           tnactive.style.width =  "20%";
},
'click .tab-item-images': function(event, template){
    event.preventDefault();
    FlowRouter.go("userimages",{_id:FlowRouter.getParam("_id")});
               var tnactive = template.find('.top-nav-active');
           tnactive.style.left = "60%";
           tnactive.style.width =  "20%";
},
'click .tab-item-availability': function(event, template){
    event.preventDefault();
    FlowRouter.go("useravailability",{_id:FlowRouter.getParam("_id")});
               var tnactive = template.find('.top-nav-active');
           tnactive.style.left = "80%";
           tnactive.style.width =  "20%";
}

   });
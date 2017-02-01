import { Template } from 'meteor/templating';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import { UsersData } from '../api/usersdata.js';
import { Session } from 'meteor/session';

import './listing.html';
import './sectionavailability.html';
import './sectionbooking.html';
 
 Template.listing.onCreated(function() {
//   Tracker.autorun(function () {
//     Meteor.subscribe("campingcars");
//     Meteor.subscribe('addons');
//     Meteor.subscribe('reservations');
//     Meteor.subscribe('usersdata');
// });

  this.autorun(() => {
    this.subscribe('campingcars');
    this.subscribe('addons');
    this.subscribe('reservations');
    this.subscribe('usersdata');
  });

Session.set("addonstab", null);
});

 Template.listing.onRendered(function() {


this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: moment(),
        keepOpen: true,
        inline: true,
        focusOnShow:false,
        collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]  <div style="height:100px;width:100px;user-select:none;border-radius:50%;display:inline-block;background-color:#bdbdbd;text-align:center;line-height:100px;font-size:54px;color:#ffffff;">

    });

});

 Template.listing.helpers({

    campingcar: function(){
if(CampingCars.find({_id:FlowRouter.getParam("_id")}))
{
return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];

}
else
{
  return false;
}
  },
  campingcaraddons: function(){
return AddOns.find({campingcarId:FlowRouter.getParam("_id")}).fetch();
},
  campingcaruser:function(){

if(CampingCars.find({_id:FlowRouter.getParam("_id")}))
{

    var campingcar = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
    var proprioId = campingcar.userid;
if(UsersData.find({_id:proprioId}))
{
 return UsersData.find({_id:proprioId}).fetch()[0];

}
else
{
  return false;
}

}
else
{
  return false;
}
},

});
  Template.listing.events({
'click .add-addon':function(event, template){
       event.preventDefault();
    //     // Prevent default browser 
var ob = event.currentTarget;
    //background-color:#ffffff;
console.log("style transition: "+ob.style.backgroundColor);
console.log("Id: "+event.currentTarget.id);
var addonstab = [];
if(Session.get("addonstab"))
{

  addonstab = Session.get("addonstab");
  
  if(addonstab.indexOf(ob.id)!==-1)
   {
//textContent
console.log("childNodes length: "+ob.childNodes[1].innerText);
ob.childNodes[1].innerText = "Add";

    delete addonstab[addonstab.indexOf(ob.id)];
    Session.set("addonstab",addonstab);
    ob.style.backgroundColor = "#ef4136";


      }
      else
      {
        addonstab.push(ob.id);
        Session.set("addonstab",addonstab);
    ob.style.backgroundColor = "rgb(255, 102, 179)";
    ob.childNodes[1].innerText = "Remove";
      }
  
}
else
{
addonstab.push(ob.id);
Session.set("addonstab",addonstab);

}

//var dig = '{"'+event.currentTarget.id+'":"'+event.currentTarget.value+'"}';
       console.log("add-addon session?: "+Session.get("addonstab"));
}
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
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
  console.log("creation listing.js ");
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
            //              ]
    });

});

 Template.listing.helpers({

    campingcar: function(){
    //const instance = Template.instance();
    //console.log("route id : "+FlowRouter.getParam("_id"));
return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },
  campingcaraddons: function(){
return AddOns.find({campingcarId:FlowRouter.getParam("_id")}).fetch();
},
  campingcaruser:function(){

    var campingcar = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
    var proprioId = campingcar.userid;
console.log("CampingCars userId: "+UsersData.find({_id:proprioId}).fetch()[0]._id);
 return UsersData.find({_id:proprioId}).fetch()[0];
},

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
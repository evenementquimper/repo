import { Template } from 'meteor/templating';

 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
 

import './listingsLayout.html';
 
 Template.listingsLayout.onCreated(function(template) {
  this.getListId = () => FlowRouter.getParam('_id');
//souscription a la base de donnée
      //var ResId = template.find('section.section');
      //ResId.style.display = "none";
  this.autorun(() => {
    this.subscribe('tasks');
    this.subscribe('campingcars');
  });
      //   BlazeLayout.render("listingsLayout"
      // ,{listing:"mlsectioncontentavailability"}
      // );
});

 Template.listingsLayout.helpers({
  //task: function() {

    //var category = FlowRouter.getParam("id");
    //console.log("Parametre: "+category);
    //var o_id = new ObjectID(id);
//db.test.find({_id:o_id}) _id: 'category'
    //console.log("BDD: "+Tasks.find({}).fetch()[0]);
    //var bdd = Tasks.find({}).fetch()[0];
    //console.log("BDD: "+Tasks.find({}).fetch());
    
    //return Tasks.find({}).fetch()[0];
    //return bdd;
  //}
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
  Template.listingsLayout.events({

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
      'click button#about': function(event, template) {

    // Prevent default browser
      event.preventDefault();


      var Resdetails = template.find('.listingdetails');
      var Resabout = template.find('.listingabout');
      var Resaddons = template.find('.listingaddons');


      Resdetails.style.display = "none";
      Resabout.style.display = "inherit";
     Resaddons.style.display = "none";

  },

        'click button#details': function(event, template) {

    // Prevent default browser
      event.preventDefault();


      var Resdetails = template.find('.listingdetails');
      var Resabout = template.find('.listingabout');
      var Resaddons = template.find('.listingaddons');

      Resdetails.style.display = "inherit";
      Resabout.style.display = "none";
     Resaddons.style.display = "none";

  },

          'click button#addons': function(event, template) {

    // Prevent default browser
      event.preventDefault();


      var Resdetails = template.find('.listingdetails');
      var Resabout = template.find('.listingabout');
      var Resaddons = template.find('.listingaddons');


      Resdetails.style.display = "none";
      Resabout.style.display = "none";
     Resaddons.style.display = "inherit";

  },

//   'click #PushGateIp': function(event, template){

// // Prevent default browser
//       event.preventDefault();
//       var Gate = template.find('#GateIp');
//       var gate_ip = $(Gate).val();
//       Meteor.call('Set_gate_ip', gate_ip);
    
//   },

   });
import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { UsersData } from '../api/usersdata.js';
import './book.html';


 Template.book.onCreated(function() {
  
    Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('Images');
    Meteor.subscribe('addons');
    Meteor.subscribe('usersdata');
});
});


 Template.book.helpers({

  book: function(){
        //console.log("Réservation: "+Reservations.find({_id:FlowRouter.getParam("_id")}).fetch()[0].status);
          return Reservations.find({_id:FlowRouter.getParam("_id"),user_id:Meteor.userId()}).fetch()[0];
  },
  campingcar: function(){
          return CampingCars.find({_id:Reservations.find({_id:FlowRouter.getParam("_id"),user_id:Meteor.userId()}).fetch()[0].resource_id}).fetch()[0];
  },
  campingcar_owner: function(){
          return UsersData.find({_id:CampingCars.find({_id:Reservations.find({_id:FlowRouter.getParam("_id"),user_id:Meteor.userId()}).fetch()[0].resource_id}).fetch()[0].userid}).fetch()[0];
  },
  cancelbook: function(){
          var resa = Reservations.find({_id:FlowRouter.getParam("_id"),user_id:Meteor.userId()}).fetch()[0];
          var dday = moment();
          var startd = moment(resa.start_time, 'YYYY-MM-DD');
          var cancelbook = null;
          console.log("diff"+startd.diff(moment(), 'days'));
          if(startd.diff(moment(), 'days') >= 29)
            cancelbook = {class:'cancelbook',text:"Attention votre acompte ne vous sera pas remboursé."};
          if(startd.diff(moment(), 'days') < 29 && startd.diff(moment(), 'days') > 7)
            cancelbook = {class:'cancelbook',text:"Attention le remboursement de la réservation se fera à part égale entre vous et le propriétaire du camping-car (en dédommagement de la perte de réservation) soit 50% pour vous et 50% pour le propriétaire (déduction des frais de services)."};
            if(startd.diff(moment(), 'days') <= 7)
            cancelbook = {class:'cancelbook',text:"Attention le délai avant le début du séjour ne permet pas un remboursement de la réservation (délai inférieur à 8 jours)."};
         
          return cancelbook; 
  }
  
});
  Template.book.events({

'click .etatlieux': function(event, template){
      event.preventDefault();
console.log("etat des lieux");

},

'click .cancelbook_8inf': function(event, template){
      event.preventDefault();
var dig = '{"status":"user_cancel"}';
var js = JSON.parse(dig);
//Modal.show('exampleModal');
//alert('Supperssion de la réservation!'+location.hostname);
var r = confirm("Suppression de la réservation!");
if (r == true) {
          Reservations.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
    FlowRouter.go('userbooking');
} else {
    //txt = "You pressed Cancel!";
}

//alert('Thank you for your payment!');
         

},

'click .cancelbook': function(event, template){
      event.preventDefault();
var dig = '{"status":"user_cancel","mailstatus":"notsend"}';
var js = JSON.parse(dig);
//Modal.show('exampleModal');
//alert('Supperssion de la réservation!'+location.hostname);
var r = confirm("Suppression de la réservation!");
if (r == true) {
          Reservations.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
    FlowRouter.go('userbooking');
} else {
    //txt = "You pressed Cancel!";
}

//alert('Thank you for your payment!');
         

}
   });
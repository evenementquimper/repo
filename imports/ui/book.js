import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';

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
      if(Meteor.userId()!==Reservations.find({_id:FlowRouter.getParam("_id")}).fetch()[0].user_id)
      {
         FlowRouter.go("index");
         return true;
      }
      else
      {
          return Reservations.find({_id:FlowRouter.getParam("_id"),"status" : "submitted_for_settlement"}).fetch()[0];

      }    
  }
});
  Template.book.events({

'click .etatlieux': function(event, template){
      event.preventDefault();
console.log("etat des lieux");

},


'click .cancelbook': function(event, template){
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
         

}
   });
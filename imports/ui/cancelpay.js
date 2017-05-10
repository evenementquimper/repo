import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { CampingCars } from '../api/campingcars.js';

import './cancelpay.html';
 
var contentviewtab = []; 

 Template.cancelpay.onCreated(function() {


  //titre de la page
  DocHead.setTitle("Validation de paiement|Le Bon Camping-car");
  
  this.autorun(() => {
    const reservationssubs = this.subscribe('reservations');
    if(reservationssubs.ready()){
                console.log("erreur "+FlowRouter.getParam("reservation_id"));
          console.log("user "+Meteor.userId());
      if(Reservations.find({_id:FlowRouter.getParam("reservation_id") , user_id:Meteor.userId()}).fetch()[0])
        {
    //var bdd = Reservations.find({_id:FlowRouter.getParam("reservation_id") , user_id:Meteor.userId()}).fetch()[0];
 
              FlowRouter.go('/dashboard/'+FlowRouter.getParam("reservation_id"));
        }
        else
        {
            FlowRouter.go('index');
        }

    }
    const usersdatasubs = this.subscribe('usersdata');
if(usersdatasubs.ready()){
}
});


});





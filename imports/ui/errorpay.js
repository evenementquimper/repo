import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { CampingCars } from '../api/campingcars.js';

import './errorpay.html';
 
var contentviewtab = []; 

 Template.errorpay.onCreated(function() {


  //titre de la page
  DocHead.setTitle("Erreur de paiement|Le Bon Camping-car");
  
  this.autorun(() => {
    const reservationssubs = this.subscribe('reservations');
    const usersdatasubs = this.subscribe('usersdata');

if(usersdatasubs.ready() && reservationssubs.ready()){
  var transactionMerchantToken = FlowRouter.getQueryParam("response_wkToken");

    if(UsersData.find({_id:Meteor.userId()}).fetch()[0]){

      var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];
        if(userdata.wktoken==transactionMerchantToken){
    
          var resa = Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0];
          var amount = parseFloat(FlowRouter.getParam("amount"));
          var com = amount*0.15;
          var bal = null;
          var realamount = amount-com;
          var transidtab = resa.trans_id;
          var lastid = transidtab[transidtab.length];
FlowRouter.go('/dashboard/'+FlowRouter.getParam('reservation_id'));


    }
    else{
 FlowRouter.go('/');
    }
    }
    else{
 FlowRouter.go('/');
    }
  }

});


});

 Template.errorpay.onRendered(function(){


});


 Template.errorpay.helpers({

});



import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { CampingCars } from '../api/campingcars.js';

import './errorpaytest.html';
 
var contentviewtab = []; 

 Template.errorpaytest.onCreated(function() {


  //titre de la page
  DocHead.setTitle("Validation de paiement|Le Bon Camping-car");
  
  this.autorun(() => {
    const reservationssubs = this.subscribe('reservations');
    const usersdatasubs = this.subscribe('usersdata');

if(usersdatasubs.ready() && reservationssubs.ready()){
  //var transactionMerchantToken = FlowRouter.getQueryParam("response_wkToken");

  }

});


});

 Template.errorpaytest.onRendered(function(){

          var infocase = this.find('#infocase');
          var roote = this.find('.root');
          var lemonselect = this.find('#lemonselect');
          var outpoupselect = this.find('#outpoupselect');
          var gotoresa = this.find('.gotoresa');
          var cleaninfo = this.find('#cleaninfo');

          roote.style.filter = 'blur(2px)';
          roote.style.opacity = '.5';
          lemonselect.style.display = "inline-block";
          lemonselect.style.top = '35%';
          lemonselect.style.left = '28%';

infocase.innerHTML = "Paiement Annuler";
  cleaninfo.style.display = null;

});


 Template.errorpaytest.helpers({

});

  Template.errorpaytest.events({

  'click #cleaninfo':function(e, template){
  e.preventDefault();
FlowRouter.go('index');
},

   });


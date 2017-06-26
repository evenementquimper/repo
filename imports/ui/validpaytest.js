import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { CampingCars } from '../api/campingcars.js';

import './validpay.html';
 
var contentviewtab = []; 

 Template.validpaytest.onCreated(function() {


  //titre de la page
  DocHead.setTitle("Validation de paiement|Le Bon Camping-car");
  
  this.autorun(() => {
    const reservationssubs = this.subscribe('reservations');
    const usersdatasubs = this.subscribe('usersdata');

if(usersdatasubs.ready() && reservationssubs.ready()){

  }

});


});

 Template.validpaytest.onRendered(function(){

var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];


          
          var amount = 0;
          var realamount = 0;
          var bal=null;

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

  //var transactionMerchantToken = FlowRouter.getQueryParam("response_wkToken"); && userdata.wktoken && userdata.wktoken==FlowRouter.getQueryParam("response_wkToken")
if(FlowRouter.getQueryParam("response_wkToken")==null || FlowRouter.getParam("amount")==null || FlowRouter.getParam("reservation_id")==null){
  infocase.innerHTML = "Paiement Annuler";
  cleaninfo.style.display = null;
}

if(FlowRouter.getQueryParam("response_wkToken") && FlowRouter.getParam("amount") && FlowRouter.getParam("reservation_id")){
     
     amount = parseFloat(FlowRouter.getParam("amount"));
   var com = amount*0.15;
   realamount = amount-com;
     Meteor.call('GetWalletDetails', "", function(error, result){
          if (!error){

var resa = Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0];
//amount = resa.brutprize.prize;


              if(result.data.d.E == null && result.data.d.WALLET.BAL && result.data.d.WALLET.BAL!=="0" && result.data.d.WALLET.BAL >= realamount){

                //bal = result.data.d.WALLET.BAL;

                if(resa.solde && resa.solde.prize && resa.solde.prize == amount){
                    //console.log("case 1 : ");

                    Reservations.update({
                      _id: FlowRouter.getParam("reservation_id")
                    }, {
                      $set: {solde:{prize:amount,payment:true,createdAt:new Date()}}
                    }, {
                      upsert: true
                    });
                    infocase.innerHTML = "Paiement Terminé, voir le détail de la réservation: ";

                    gotoresa.style.display = null;
                }

                if(resa.advance && resa.advance.prize && resa.advance.prize == amount){

                  var sold = resa.brutprize-amount;
                    Reservations.update({
                      _id: FlowRouter.getParam("reservation_id")
                    }, {
                      $set: {status:"newbooking",advance:{prize:amount,payment:true,createdAt:new Date()},solde:{prize:sold,payment:false}}
                    }, {
                      upsert: true
                    });
                  infocase.innerHTML = "Paiement Terminé, voir le détail de la réservation: ";
                  gotoresa.style.display = null;

                }

                if(resa.brutprize && resa.brutprize.prize == amount){

                    Reservations.update({
                      _id: FlowRouter.getParam("reservation_id")
                    }, {
                      $set: {status:"newbooking",brutprize:{prize:amount,payment:true,createdAt:new Date()}}
                    }, {
                      upsert: true
                    });
                  infocase.innerHTML = "Paiement Terminé, voir le détail de la réservation: ";
                  gotoresa.style.display = null;
                }

                else{
                infocase.innerHTML = "Erreur de paiement";
                cleaninfo.style.display = null;
                }

              }
              if(result.data.d.E){
                infocase.innerHTML = result.data.d.E.Msg;
                cleaninfo.style.display = null;
              }
              else{}
          }
          else{}
        });
   }
   else
   {

   }

});


 Template.validpaytest.helpers({

    resa: function(){
return Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0];
  },

});

  Template.validpaytest.events({

  'click .gotoresa':function(event, template){
e.preventDefault();
 FlowRouter.go('book', { _id: event.currentTarget.id });
  },

  'click #cleaninfo':function(e, template){
  e.preventDefault();
FlowRouter.go('index');
},

   });


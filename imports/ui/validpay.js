import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { CampingCars } from '../api/campingcars.js';

import './validpay.html';
 
var contentviewtab = []; 

 Template.validpay.onCreated(function() {


  //titre de la page
  DocHead.setTitle("Validation de paiement|Le Bon Camping-car");
  
  this.autorun(() => {
    const reservationssubs = this.subscribe('reservations');
    const usersdatasubs = this.subscribe('usersdata');

if(usersdatasubs.ready() && reservationssubs.ready()){
  var transactionMerchantToken = FlowRouter.getQueryParam("response_wkToken");

    if(UsersData.find({_id:Meteor.userId()}).fetch()[0]){

      var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];
        if(userdata.wktoken==transactionMerchantToken){
    
          FlowRouter.getParam('reservation_id');
          var resa = Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0];
          var amount = parseFloat(FlowRouter.getParam("amount"));
          console.log("amount: "+amount);
          var com = amount*0.15;
          var bal = null;
          var realamount = amount-com;
          var transidtab = resa.trans_id;
          var lastid = transidtab[transidtab.length];

     Meteor.call('GetWalletDetails', FlowRouter.getQueryParam("response_wkToken"), function(error, result){
          if (!error){

              if(result.data.d.WALLET.BAL && result.data.d.WALLET.BAL!=="0" && result.data.d.WALLET.BAL >= realamount){
console.log("return Wallet info: "+result.data.d.WALLET.BAL);
                bal = result.data.d.WALLET.BAL;

                if(resa.solde && resa.solde.prize && resa.solde.prize == amount){

                    Reservations.update({
                      _id: FlowRouter.getParam("reservation_id")
                    }, {
                      $set: {solde:{prize:amount,payment:true,createdAt:new Date()}}
                    }, {
                      upsert: true
                    });
                  FlowRouter.go('/');

                }

                if(resa.advance && resa.advance.prize && resa.advance.prize == amount){
                  console.log("avance: "+amount);
                  var sold = resa.brutprize-amount;
                    Reservations.update({
                      _id: FlowRouter.getParam("reservation_id")
                    }, {
                      $set: {status:"newbooking",advance:{prize:amount,payment:true,createdAt:new Date()},solde:{prize:sold,payment:false}}
                    }, {
                      upsert: true
                    });
                  FlowRouter.go('/');

                }

                if(resa.brutprize && resa.brutprize == amount){

                    Reservations.update({
                      _id: FlowRouter.getParam("reservation_id")
                    }, {
                      $set: {status:"newbooking",brutprize:{prize:amount,payment:true,createdAt:new Date()}}
                    }, {
                      upsert: true
                    });
                  FlowRouter.go('/');
                }

                else{}

              } 
              else{}
          }
          else{}
        });


    }
    else{

    }


    }
    else{

    }
  }

});


});

 Template.validpay.onRendered(function(){


});


 Template.validpay.helpers({

    campingcars: function(){

    //const instance = Template.instance();
    console.log("camping car find : "+CampingCars.find({publish : 'valid'}).count());
    //console.log("campingcar find! vue nombre: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).fetech()[0].daysfull[0]);


return CampingCars.find({publish : 'valid'},{limit:32}).fetch();
  },

   MapListingsOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded() && CampingCars.find({}).fetch()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(47.993, -4.114),
        zoom: 8,
        libraries: 'places',
      };
    }
},
});

  Template.validpay.events({

// 'click .listing-map-popover':function(event, template){
//     event.preventDefault();
//     FlowRouter.go("listings",{_id:event.currentTarget.id});
// },


   });


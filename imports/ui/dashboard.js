import { Template } from 'meteor/templating';
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import './dashboard.html';
import  './recappay.html';


Template.dashboard.onCreated(function() {

  console.log("route id layout: "+FlowRouter.getParam("_id"));
//souscription a la base de donnée
      //var ResId = template.find('section.section');
      //ResId.style.display = "none";
  this.autorun(() => {
    this.subscribe('campingcars');
    this.subscribe('reservations');
    this.subscribe('addons');
  });
});

Template.dashboard.onRendered(function() {
  Meteor.call('getClientToken', function(error, clientToken) {
    if (error) {
      console.log(error);
    } else {
      //console.log("client token: "+clientToken);
      //dropin ou custom

      
      braintree.setup(clientToken, "dropin", {
        onError:function(type, message){
          //console.log("type erreur: "+type);
          //console.log("erreur message: "+message);
        },
          onReady: function (deviceData) {
    //console.log("Ready devicedata: "+JSON.stringify(deviceData));
        },
        container: "payment-form", // Injecting into <div id="payment-form"></div>
        onPaymentMethodReceived: function (response) {
          // When we submit the payment form,
          // we'll receive a response that includes
          // payment method nonce:
          //console.log("braintree nonce: "+response.nonce); 
          var nonce = response.nonce;
          //var nonce2 = payload.nonce;
          // Check the nonce printed in console after submitting the form.
          //console.log("braintree nonce: "+nonce2); 

            Meteor.call('btCreateCustomer', function(error, success) {
            if (error) {
              console.log("custumer creation bad");
              throw new Meteor.Error('customer-creation-failed');
            } else {
              console.log("custumer creation ok");
              // ... and when the customer is successfuly created,
              // call method for creating a transaction (finally!)
              Meteor.call('createTransaction', nonce, FlowRouter.getParam('reservation_id'), function(error, success) {
                if (error) {
                  console.log("Transaction creation bad");
                  throw new Meteor.Error('transaction-creation-failed');
                } else {
                  console.log("Transaction creation ok");
                  alert('Thank you for your payment! Reload page to access our premium items!');
                }
              });
            }
});
        }
      });
    }
  });
});

Template.dashboard.helpers({
  // items: function(){
  //   return Items.find();
  // },
  campingcar: function(){


    //const instance = Template.instance();
    //console.log("route id : "+FlowRouter.getParam("_id"));
return "campingcar";//CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },
  reservation:function(){
    //console.log("Reservations find: "+Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0]._id);
return Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0];
  },

    showForm: function() {
    var userId = Meteor.userId();
    return true;//Roles.userIsInRole(userId, 'paid') ? false : true; 
}
});
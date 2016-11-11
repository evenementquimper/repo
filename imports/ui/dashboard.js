import { Template } from 'meteor/templating';
//import { Items } from '../api/campingcars.js';
import './dashboard.html';
//import  './index.html';

Template.dashboard.onCreated(function() {
  var instance = this;
  instance.autorun(function() {

    instance.subscribe('items');
 console.log("creation dashboard subscribe");
  });
});

Template.dashboard.onRendered(function() {
  Meteor.call('getClientToken', function(error, clientToken) {
    if (error) {
      console.log(error);
    } else {
      console.log("client token: "+clientToken);
      //dropin ou custom

      
      braintree.setup(clientToken, "dropin", {
        onError:function(type, message){
          console.log("type erreur: "+type);
          console.log("erreur message: "+message);
        },
          onReady: function (deviceData) {
    console.log("Ready devicedata: "+JSON.stringify(deviceData));
        },
        container: "payment-form", // Injecting into <div id="payment-form"></div>
        onPaymentMethodReceived: function (response) {
          // When we submit the payment form,
          // we'll receive a response that includes
          // payment method nonce:
          console.log("braintree nonce: "+response.nonce); 

          //var nonce2 = payload.nonce;
          // Check the nonce printed in console after submitting the form.
          //console.log("braintree nonce: "+nonce2); 

//             Meteor.call('btCreateCustomer', function(error, success) {
//             if (error) {
//               console.log("custumer creation bad");
//               throw new Meteor.Error('customer-creation-failed');
//             } else {
//               console.log("custumer creation ok");
//               // ... and when the customer is successfuly created,
//               // call method for creating a transaction (finally!)
//               Meteor.call('createTransaction', nonce, function(error, success) {
//                 if (error) {
//                   console.log("Transaction creation bad");
//                   throw new Meteor.Error('transaction-creation-failed');
//                 } else {
//                   console.log("Transaction creation ok");
//                   alert('Thank you for your payment! Reload page to access our premium items!');
//                 }
//               });
//             }
// });
        }
      });
    }
  });
});

Template.dashboard.helpers({
  items: function(){
    return Items.find();
  },
    showForm: function() {
    var userId = Meteor.userId();
    return Roles.userIsInRole(userId, 'paid') ? false : true; 
}
});
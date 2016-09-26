import { Template } from 'meteor/templating';

import './dashboard.html';
//import  './index.html';

Template.dashboard.onCreated(function() {
  var instance = this;
  instance.autorun(function() {

    instance.subscribe('items');
 //console.log("creation dashboard subscribe");
  });
});

Template.dashboard.onRendered(function() {
  Meteor.call('getClientToken', function(error, clientToken) {
    if (error) {
      console.log(error);
    } else {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form", // Injecting into <div id="payment-form"></div>
        onPaymentMethodReceived: function (response) {
          // When we submit the payment form,
          // we'll receive a response that includes
          // payment method nonce:
          var nonce = response.nonce;
          // Check the nonce printed in console after submitting the form.
          console.log(nonce); 
        }
      });
    }
  });
});

Template.dashboard.helpers({
  // items: function(){
  //   return Items.find();
  // }
    showForm: function() {
    var userId = Meteor.userId();
    return Roles.userIsInRole(userId, 'paid') ? false : true; 
}
});
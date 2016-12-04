// Define gateway variable 
import { Reservations } from '../../imports/api/reservations.js';
var gateway;

Meteor.startup(function () {
  var env;
  // Pick Braintree environment based on environment defined in Meteor settings.
  if (Meteor.settings.public.env === 'Production') {
    env = Braintree.Environment.Production;
  } else {
    env = Braintree.Environment.Sandbox;
  }
  // Initialize Braintree connection: 
try{
  gateway = BrainTreeConnect({
    environment: env,
    publicKey: Meteor.settings.public.BT_PUBLIC_KEY,
    privateKey: Meteor.settings.private.BT_PRIVATE_KEY,
    merchantId: Meteor.settings.public.BT_MERCHANT_ID
  });
  } catch(error){
    throw new Meteor.Error(1001, error.message);
}
});

Meteor.methods({
  getClientToken: function (clientId) {
    console.log("start getclientToken");
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};

    if (clientId) {
      options.clientId = clientId;
    }

    var response = generateToken(options);
    console.log("getclientToken: "+response.clientToken);
    return response.clientToken;
  },
    btCreateCustomer: function(){
      console.log("Method btCreate, user: "+Meteor.user());
    var user = Meteor.user();

    var customerData = {
      email: user.emails[0].address
    };

    // Calling the Braintree API to create our customer!
    gateway.customer.create(customerData, function(error, response){
      if (error){
        console.log(error);
      } else {
        console.log("bdd insert customerid: "+response.customer.id);
        // If customer is successfuly created on Braintree servers,
        // we will now add customer ID to our User
        Meteor.users.update(user._id, {
          $set: {
            customerId: response.customer.id
          }
        });
      }
    });
  },
  createTransaction: function(nonceFromTheClient, bookingid) {
    var user = Meteor.user();
    var booking = Reservations.find({_id:bookingid}).fetch()[0];
    var totalprice = booking.netprize;
    // Let's create transaction.
    gateway.transaction.sale({
      amount: totalprice,
      paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
      customer: {
        id: user.customerId
      },
      options: {
        submitForSettlement: true, // Payment is submitted for settlement immediatelly
        storeInVaultOnSuccess: true // Store customer in Braintree's Vault
      }
    }, function (err, success) {
      if (err) { 
        console.log(err);
      } else {
        // When payment's successful, add "paid" role to current user.
        //Roles.addUsersToRoles(user._id, 'paid', Roles.GLOBAL_GROUP)

        Reservations.update({
            _id: bookingid
        }, {
            $set: {status:"pay_ok"}
        }, {
          upsert: true
        });
      }
    });
}
});
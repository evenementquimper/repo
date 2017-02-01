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

    var customerData = null;

if(user.services.facebook!=null)
    {
      console.log("Facebook info id : "+user.services.facebook.id);

      customerData = {
          email : user.services.facebook.email,
          firstName : user.services.facebook.first_name,
          lastName : user.services.facebook.last_name
      };
    }
else
{
 customerData = {
      email: user.emails[0].address
    };
}

if(user.customerid==null)
{
  console.log("Pas de customerid");
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
}
else
{
  console.log("Deja un customerid: "+user.customerid);
}
  },
  createTransaction: function(nonceFromTheClient, bookingid) {
    var user = Meteor.user();
    var booking = Reservations.find({_id:bookingid}).fetch()[0];
    var totalprice = booking.netprize;
    var transresult=null;
    // Let's create transaction.
    gateway.transaction.sale({
      amount: "10.00",//totalprice,'fake-valid-visa-nonce',//
      paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
      customerId: user.customerId,
      options: {
        submitForSettlement: true, // Payment is submitted for settlement immediatelly
        storeInVaultOnSuccess: true // Store customer in Braintree's Vault
      }
    }, function (err, transactionResult) {
      if (err) { 
        console.log(err);

      } else {

        console.log("Method transaction Id :"+transactionResult.transaction.id);
console.log("Method transaction succes ? :"+transactionResult.success);
// true

console.log("Transaction type :"+transactionResult.transaction.type);
// "credit"

console.log("Method transaction status :"+transactionResult.transaction.status);
// "submitted_for_settlement"

        // When payment's successful, add "paid" role to current user.
        //Roles.addUsersToRoles(user._id, 'paid', Roles.GLOBAL_GROUP)

        Reservations.update({
            _id: bookingid
        }, {
            $set: {status:transactionResult.transaction.status,
                    transaction:transactionResult.transaction}
        }, {
          upsert: true
        });
      }

    });

}
});
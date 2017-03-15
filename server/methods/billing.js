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

  submitForSettlement : function(transactionid, bookingid){

  gateway.transaction.find(transactionid, function (err, transaction) {
    if(transaction.status)
    {
    console.log("Recherche transaction ok status :"+transaction.status);  
  gateway.transaction.submitForSettlement(transaction.id, function (err, result) {
  if (result.success) {
    var settledTransaction = result.transaction;
    console.log("submitForSettlement ok"+result.transaction.id);
  } else {
    console.log(result.errors);
  }
});
    }else{
    console.log(err);  
    }
});


  },

  refundTransaction: function(transactionid){
    gateway.transaction.find(transactionid, function (err, transaction) {
    if(transaction.status)
    {
    console.log("Recherche transaction ok status :"+transaction.status);  
  gateway.transaction.void(transaction.id, function (err, result) {
    if(result.success){
      console.log("refundTransaction ok"+result.transaction.id);
      console.log("refundTransaction type"+result.transaction.type);
      console.log("refundTransaction amount"+result.transaction.amount);
    }
else
{
      console.log("erreur "+err); 
}
});
      }else{
    console.log(err);  
    }
});
  },


  createTransaction: function(nonceFromTheClient, bookingid) {
    var user = Meteor.user();
    var booking = Reservations.find({_id:bookingid}).fetch()[0];
    var amount = null;
    var transresult=null;
    var advance=null;
    var wht=null;
//vérifier si prix brut
if(booking.brutprize)
{
  console.log("Booking brutprize");
  if(!booking.brutprize.payment)
  {
    console.log("pas Booking brutprize payment");
    //vérification si avance
    if(booking.advance)
    {
      console.log("Booking advance");
      //si avance non payer  
      if(booking.advance.payment==false)
      {

        advance = booking.advance;
        amount = booking.advance.prize.toString();
        var soldeprize = booking.brutprize-booking.advance.prize;
        console.log("Booking advance price:"+amount);


    // Let's create transaction.
    gateway.transaction.sale({
      amount: amount.toString(),//totalprice,'fake-valid-visa-nonce',//
      paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
      customerId: user.customerId,
      options: {
        //submitForSettlement: true, // Payment is submitted for settlement immediatelly
        storeInVaultOnSuccess: true // Store customer in Braintree's Vault
      }
    }, function (err, transactionResult) {
      if (err) { 
        console.log(err);
          Reservations.update({
            _id: bookingid
        }, {
            $set: {status:"newbooking",advance:{prize:amount,payment:err,createdAt:new Date()}}
        }, {
          upsert: true
        });
      } else {

        console.log("Method transaction Id :"+transactionResult.transaction.id);
//console.log("Method transaction succes ? :"+transactionResult.success);
// true

//console.log("Transaction type :"+transactionResult.transaction.type);
// "credit"

//console.log("Method transaction status :"+transactionResult.transaction.status);
// "submitted_for_settlement"

          Reservations.update({
            _id: bookingid
        }, {
            $set: {status:"newbooking",advance:{prize:amount,payment:transactionResult.transaction.id,createdAt:new Date()},solde:{prize:soldeprize,payment:false,createdAt:new Date()}}
        }, {
          upsert: true
        });


      }

    });

      }
      //si avance payer et solde non payer
      if(booking.advance.payment!=false && booking.solde.payment==false)
      {
        var sold = booking.solde.prize;
        amount = sold.toString();
        console.log("Booking solde price:"+amount);



    // Let's create transaction.
    gateway.transaction.sale({
      amount: amount.toString(),//totalprice,'fake-valid-visa-nonce',//
      paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
      customerId: user.customerId,
      options: {
        submitForSettlement: true, // Payment is submitted for settlement immediatelly
        storeInVaultOnSuccess: true // Store customer in Braintree's Vault
      }
    }, function (err, transactionResult) {
      if (err) { 
        console.log(err);
          Reservations.update({
            _id: bookingid
        }, {
            $set: {solde:{prize:amount,payment:err,createdAt:new Date()}}
        }, {
          upsert: true
        });
      } else {

        console.log("Method transaction Id :"+transactionResult.transaction.id);
//console.log("Method transaction succes ? :"+transactionResult.success);
// true

//console.log("Transaction type :"+transactionResult.transaction.type);
// "credit"

//console.log("Method transaction status :"+transactionResult.transaction.status);
// "submitted_for_settlement"

          Reservations.update({
            _id: bookingid
        }, {
            $set: {brutprize:{prize:booking.brutprize,payment:true},solde:{prize:amount,payment:transactionResult.transaction.id,createdAt:new Date()}}
        }, {
          upsert: true
        });


      }

    });
      }
      else
      {

      }
    }
    else
    {
   //pas d'avance donc payer 100%
      amount = booking.brutprize;
      console.log("Payement 100% :"+amount.toString());

    // Let's create transaction.
    gateway.transaction.sale({
      amount: amount.toString(),//totalprice,'fake-valid-visa-nonce',//
      paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
      customerId: user.customerId,
      options: {
        //submitForSettlement: true, // Payment is submitted for settlement immediatelly
        storeInVaultOnSuccess: true // Store customer in Braintree's Vault
      }
    }, function (err, transactionResult) {
      if (err) { 
        console.log(err);
          Reservations.update({
            _id: bookingid
        }, {
            $set: {status:"newbooking",brutprize:{prize:booking.brutprize,payment:err,createdAt:new Date()}}
        }, {
          upsert: true
        });
      } else {

        console.log("Method transaction Id :"+transactionResult.transaction.id);
//console.log("Method transaction succes ? :"+transactionResult.success);
// true

//console.log("Transaction type :"+transactionResult.transaction.type);
// "credit"

//console.log("Method transaction status :"+transactionResult.transaction.status);
// "submitted_for_settlement"

          Reservations.update({
            _id: bookingid
        }, {
            $set: {status:"newbooking",brutprize:{prize:booking.brutprize,payment:transactionResult.transaction.id,createdAt:new Date()}}
        }, {
          upsert: true
        });


      }

    });

    }
  }
  else
  {

  }  
}

        // Reservations.update({
        //     _id: bookingid
        // }, {
        //     $set: {status:transactionResult.transaction.status,
        //             transaction:transactionResult.transaction.id}
        // }, {
        //   upsert: true
        // });

    // Let's create transaction.
//     gateway.transaction.sale({
//       amount: "10.00",//totalprice,'fake-valid-visa-nonce',//
//       paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
//       customerId: user.customerId,
//       options: {
//         submitForSettlement: true, // Payment is submitted for settlement immediatelly
//         storeInVaultOnSuccess: true // Store customer in Braintree's Vault
//       }
//     }, function (err, transactionResult) {
//       if (err) { 
//         console.log(err);

//       } else {

//         //console.log("Method transaction Id :"+transactionResult.transaction.id);
// //console.log("Method transaction succes ? :"+transactionResult.success);
// // true

// //console.log("Transaction type :"+transactionResult.transaction.type);
// // "credit"

// //console.log("Method transaction status :"+transactionResult.transaction.status);
// // "submitted_for_settlement"

//         // When payment's successful, add "paid" role to current user.
//         //Roles.addUsersToRoles(user._id, 'paid', Roles.GLOBAL_GROUP)


//       }

//     });

}
});
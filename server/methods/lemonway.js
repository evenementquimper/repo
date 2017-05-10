// Define gateway variable 
import { Reservations } from '../../imports/api/reservations.js';
import { UsersData } from '../../imports/api/usersdata.js';
var gateway;

Meteor.startup(function () {
  //console.log("rank key: "+RandToken.generate(16));
//   var env;
//   // Pick Braintree environment based on environment defined in Meteor settings.
//   if (Meteor.settings.public.env === 'Production') {
//     env = Braintree.Environment.Production;
//   } else {
//     env = Braintree.Environment.Sandbox;
//   }
//   // Initialize Braintree connection: 
// try{
//   gateway = BrainTreeConnect({
//     environment: env,
//     publicKey: Meteor.settings.public.BT_PUBLIC_KEY,
//     privateKey: Meteor.settings.private.BT_PRIVATE_KEY,
//     merchantId: Meteor.settings.public.BT_MERCHANT_ID
//   });
//   } catch(error){
//     throw new Meteor.Error(1001, error.message);
// }
});

Meteor.methods({

  HeaderDetails: function(){
    console.log("connection: "+this.connection.clientAddress);
    console.log("httpHeaders: "+JSON.stringify(this.connection.httpHeaders));
    var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
var cellphoneparse = null;
var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];

var js = JSON.parse(headers5);

    var user = Meteor.user();

    var customerData = null;

    var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];

if(user.services.facebook!=null)
    {
      console.log("Facebook info email : "+user.services.facebook.email);
console.log("Facebook info first_name: "+user.services.facebook.first_name);
console.log("Facebook info last_name : "+user.services.facebook.last_name);
          userdata.email = user.services.facebook.email;
          userdata.firstName = user.services.facebook.first_name;
          userdata.lastName = user.services.facebook.last_name;
    }
else
{
 // customerData = {
 //      email: user.emails[0].address,
 //      firstName : userdata.firstname,
 //      lastName : userdata.lastname
 //    };
}

console.log("Facebook firstname : "+ userdata.firstname);
console.log("Facebook lastname : "+ userdata.lastname);


      if(userdata.cellphone && userdata.cellphone.startsWith("0"))
    console.log("string 0 "+userdata.cellphone[0]);
  cellphoneparse = userdata.cellphone;
  cellphoneparse = cellphoneparse.split(cellphoneparse[0]);
  cellphoneparse = "33"+cellphoneparse[1];
    console.log("cellphoneparse "+cellphoneparse);
  
    //{"x-forwarded-for":"192.168.1.254,127.0.0.1","x-real-ip":"192.168.1.254","x-forwarded-proto":"ws","host":"leboncampingcar.fr","user-agent":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0","accept-language":"en-US,en;q=0.5"}

    //console.log("header get: "+this.connection.httpHeaders.get('x-forwarded-for').replace(/, /, ',').split(',')[0]);
    //console.log("userid: "+this.userId);
    //console.log("userdata: "+UsersData.find({_id:Meteor.userId()}).fetch()[0].email);
    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "en",
    "version":  "1.9",
    "walletIp": "1.1.1.1",
    "walletUa": "Node.js Tutorial",
    "wallet":   "TEST123456"
  }
};
    return UsersData.find({_id:Meteor.userId()}).fetch()[0]._id;
//

  },

  GetWalletDetails: function(wallet){
        var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);
console.log("Wallet detail id: "+wallet);
    var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];
    var user = Meteor.user();

    if(user.services.facebook!=null)
    {
      userdata.email = user.services.facebook.email;
      userdata.firstName = user.services.facebook.first_name;
      userdata.lastName = user.services.facebook.last_name;
    }
else
{
}
    
    if(user.wallet)
        wallet = user.wallet;

    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "en",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent,
    "wallet":   wallet,
    "email": userdata.email
  }
};

     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};
//console.log("rank key: "+RandToken.generate(16));
//     var options = {headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     },
// data: postData};
        return HTTP.post(Meteor.settings.public.LEMON_URL+"GetWalletDetails", post
//           , function(error, result, body){
//           if (!error){
// console.log("result http: "+result.statusCode+"body message: "+result.data.d.WALLET.ID);
//           }
//           else{
// console.log("error http: "+error);
//           }
//         }
        );
  },

RegisterWallet: function(options) {
      console.log("connection: "+this.connection.clientAddress);
    console.log("userid: "+this.userId);

        var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);
    
    var user = Meteor.user();

    var customerData = null;

    var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];

if(user.services.facebook!=null)
    {
      console.log("Facebook info id : "+user.services.facebook.id);

      userdata.email = user.services.facebook.email;
      userdata.firstName = user.services.facebook.first_name;
      userdata.lastName = user.services.facebook.last_name;
      
    }
else
{
}

  

var cellphoneparse = "";
var payerOrBeneficiary = "1";//1 payeur, 2 bénéficiaire

      if(userdata.cellphone && userdata.cellphone.startsWith("0"))
  cellphoneparse = userdata.cellphone;
  cellphoneparse = cellphoneparse.split(cellphoneparse[0]);
  cellphoneparse = "33"+cellphoneparse[1];
    console.log("cellphoneparse "+cellphoneparse);

var wallettoken = Random.id();

        Meteor.users.update(user._id, {
          $set: {
            wallet: wallettoken
          }
        });

var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "en",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent,
    "wallet":   wallettoken,
    "clientMail":userdata.email,
    "clientTitle":"TOTO2",
    "clientFirstName":userdata.firstname,
    "clientLastName":userdata.lastname,
    "street":"",
    "postCode":"",
    "city":"",
    "ctry":"",
    "birthdate":userdata.birthdate,
    "phoneNumber":"",
    "mobileNumber":cellphoneparse,
    "isCompany":"",
    "companyName":"",
    "companyWebsite":"",
    "companyDescription":"",
    "companyIdentificationNumber":"",
    "isDebtor":"",
    "nationality":"",
    "birthcity":"",
    "birthcountry":"",
    "payerOrBeneficiary":payerOrBeneficiary,
    "isOneTimeCustomer":"",
    "isTechWallet":""
   }
 };

     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};
//console.log("rank key: "+RandToken.generate(16));
//   "wallet":       payerWallet,
//     "clientMail":     payerWallet + "@lemonway.com",
//     "clientFirstName":  "Payer",
// "clientLastName": "Payer"
          return HTTP.post(Meteor.settings.public.LEMON_URL+"RegisterWallet", post);
},

MoneyInWebInit: function(bookid){

        var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);

    var user = Meteor.user();

    var customerData = null;

    var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];

if(user.services.facebook!=null)
    {
      console.log("Facebook info id : "+user.services.facebook.id);

      userdata.email = user.services.facebook.email;
      userdata.firstName = user.services.facebook.first_name;
      userdata.lastName = user.services.facebook.last_name;
      
    }
else
{
}

var amount = null;
var payname = null;
var factureid = null;
if(Reservations.find({_id:bookid}).fetch()[0]){
book = Reservations.find({_id:bookid}).fetch()[0];
factureid = book.book_id;
  if(book.advance){
    if(book.solde){
      amount = book.solde.prize;
      payname = "solde";
    }
    else{
      amount = book.advance.prize;
      payname = "advance";
    }
  }
  else{
    amount = book.brutprize;
    payname = "brutprize";
  }
}
var com = amount*0.15;
var tok = Random.id();
    console.log("tok: "+tok);
            UsersData.update({
            _id: user._id
        }, {
            $set: {"wktoken":tok}
        }, {
          upsert: true
        });

    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "en",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent,
    "wallet":   user.wallet,
    "email":userdata.email,
    "amountTot": amount.toFixed(2),
    "amountCom": com.toFixed(2),
    "comment":factureid,
    "useRegisteredCard":"",
    "wkToken":tok,
    "returnUrl":"https://leboncampingcar.fr/validpay/"+book._id+"/"+amount,
    "cancelUrl":"https://leboncampingcar.fr/cancelpay/"+book._id+"/"+amount,
    "errorUrl":"https://leboncampingcar.fr/errorpay/"+book._id+"/"+amount,
    "autoCommission":"0",
    "isPreAuth":"",
    "mobileNumber":""
  }
};
console.log("postdata: "+JSON.stringify(postData));
     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};

          return HTTP.post(Meteor.settings.public.LEMON_URL+"MoneyInWebInit", post);

},

GetWalletTransHistory: function(transactionMerchantToken){

          var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);

var ux = Math.round(new Date().getTime()/1000);
console.log("unix date: "+Math.round(new Date().getTime()/1000));

    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "en",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent,
    "wallet":   "uhoWJQBYRqoK3jQhZ",
    "transactionMerchantToken":transactionMerchantToken,
    "startDate":ux-10000,
    "endDate":ux+5000
  }
};
console.log("transactionMerchantToken: "+postData.p.transactionMerchantToken);
     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};
        return HTTP.post(Meteor.settings.public.LEMON_URL+"GetWalletTransHistory", post);
},

GetMoneyInTransDetails: function(){

        var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);
//XLpoqyFPsvazMWFZZ
var tok = Random.id();
    //console.log("tok: "+tok);
    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "en",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent
  }
};
console.log("Amount: "+postData.p.amountTot);
     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};

          return HTTP.post(Meteor.settings.public.LEMON_URL+"GetMoneyInTransDetails", post);
},   

UpdateWalletDetail: function(options) {
          return HTTP.post(Meteor.settings.public.LEMON_URL+"UpdateWalletDetail", options);
},

RegisterCard: function(options) {
          return HTTP.post(Meteor.settings.public.LEMON_URL+"RegisterCard", options);
},

UploadFile: function(fileName, type, imagedata){

// function arrayBufferToBase64( buffer, callback ) {
//     var blob = new Blob([buffer],{type:'application/octet-binary'});
//     var reader = new FileReader();
//     reader.onload = function(evt){
//         var dataurl = evt.target.result;
//         callback(dataurl.substr(dataurl.indexOf(',')+1));
//     };
//     reader.readAsDataURL(blob);
// }

//example:
var buf = new Uint8Array([11,22,33]);
//arrayBufferToBase64(imagedata.data, console.log.bind(console)); //"CxYh"


    var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);
    var user = Meteor.user();

    var customerData = null;

    var wallet = null;

    var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];
var buf = new Uint8Array([11,22,33]);
if(user.services.facebook!=null)
    {
      console.log("Facebook info id : "+user.services.facebook.id);

      userdata.email = user.services.facebook.email;
      userdata.firstName = user.services.facebook.first_name;
      userdata.lastName = user.services.facebook.last_name;
      
    }
else
{
}
    if(user.wallet)
        wallet = user.wallet;


    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "en",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent,
    "wallet":   wallet,
    "fileName":fileName,
    "type":type,
    "buffer":imagedata,
  }
};

     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};
          return HTTP.post(Meteor.settings.public.LEMON_URL+"UploadFile", post);
},

MoneyInWithCardId: function(options) {
          return HTTP.post(Meteor.settings.public.LEMON_URL+"MoneyInWithCardId", options);
},

SendPayment: function(debitwallet, creditwallet, amount, message, scheduleddate, privatedata) {
          var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);

    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "fr",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent,
    "debitWallet":debitwallet,
    "creditWallet":creditwallet,
    "amount":amount,
    "message":message,
    "scheduledDate":scheduleddate,
    "privateData":privatedata
  }
};
console.log("Amount: "+postData.p.amountTot);
     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};
          return HTTP.post(Meteor.settings.public.LEMON_URL+"SendPayment", post);
},

RefundMoneyIn: function(options){
          return HTTP.post(Meteor.settings.public.LEMON_URL+"RefundMoneyIn", options);
},

RegisterIBAN: function() {

            var headers = JSON.stringify(this.connection.httpHeaders);
    var headers2 = headers.replace('x-real-ip','xrealip');
    var headers3 = headers2.replace('x-forwarded-for','xforwardedfor');
    var headers4 = headers3.replace('x-forwarded-proto','xforwardedproto');
    var headers5 = headers4.replace('user-agent','useragent');
    var head = JSON.parse(headers5);

    var user = Meteor.user();

    var customerData = null;

    var wallet = null;

    var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];

if(user.services.facebook!=null)
    {
      userdata.email = user.services.facebook.email;
      userdata.firstName = user.services.facebook.first_name;
      userdata.lastName = user.services.facebook.last_name;  
    }
else
{
}
    if(user.wallet)
        wallet = user.wallet;

    var postData = {
  "p": {
    "wlLogin":  Meteor.settings.private.WLLOGIN,
    "wlPass":   Meteor.settings.private.WLPASS,
    "language": "fr",
    "version":  "1.9",
    "walletIp": head.xrealip,
    "walletUa": head.useragent,
    "wallet":wallet,
    "holder":userdata.firstname+" "+userdata.lastname,
    "bic":userdata.bic,
    "iban":userdata.iban,
    "dom1":"",
    "dom2":"",
    "comment":"",
    "ignoreIbanFormat":""
  }
};

     var post = {headers: {
      "Content-Type": "application/json; charset=utf-8",
      //"Access-Control-Allow-Origin": "*"
    },
data: postData};
//return post;
          return HTTP.post(Meteor.settings.public.LEMON_URL+"RegisterIBAN", post);
},

MoneyOut: function(options) {
          return HTTP.post(Meteor.settings.public.LEMON_URL+"MoneyOut", options);
}
});
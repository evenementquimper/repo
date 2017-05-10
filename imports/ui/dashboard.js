import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import './dashboard.html';
import  './recappay.html';


Template.dashboard.onCreated(function() {
     this.wallet = new ReactiveDict();
     this.error = new ReactiveDict();
//souscription a la base de donnée
    Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('addons');
    Meteor.subscribe('reservations');
});
});

Template.dashboard.onRendered(function() {
var template = Template.instance();
if(Meteor.user() && Meteor.user().wallet){

  Meteor.call('GetWalletDetails', Meteor.user().wallet,function(error, result){
          if (!error){
console.log("result Details: "+JSON.stringify(result.data));
template.wallet.set('wallet', result.data);
if(result.data.d.WALLET.DOCS.length==0){
  //console.log("tableau de docs vide: "+result.data.d.WALLET.DOCS.length);
  
}
if(result.data.d.E){
  template.error.set('error', result.data);
  //console.log("GetWalletDetails error: "+result.data.d.E.Error);

}
}
else
{
  console.log("error Details: "+JSON.stringify(error));
}
});
}
else
{
  Meteor.call('RegisterWallet', "", function(error, result){
  if(!error){
console.log("RegisterWallet result: "+JSON.stringify(result.data));
    if(!result.data.d.E){

    }
    else
    {
      template.error.set('error', result.data);
      //console.log("RegisterWallet error: "+result.data.d.E.Error);
    }
  }
  else{
    //console.log("RegisterWallet error : "+error);
  }

});
}
});

Template.dashboard.helpers({
  // items: function(){
  //   return Items.find();
  // },
  settings: function(){
    return Meteor.settings.public.LEMON_URL;
  },

  wallet: function(){
    //return true; 
    //return Meteor.call('GetWalletDetails', "XLpoqyFPsvazMWFZZZ"
      //,function(error, result){   
//console.log("wallet Details: "+JSON.stringify(result.data));
return Template.instance().wallet.get('wallet');
//}
//);
  },
  campingcar: function(){
if(Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0])
{
  var resa = Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0];

    if(CampingCars.find({_id:resa.resource_id}).fetch())
    {
return CampingCars.find({_id:resa.resource_id}).fetch()[0]; 
    }
    else
    {
return false;
    }

}
else
{
  return false;
}
},
  reservation:function(){
if(Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0])
{

    if(Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0].status == "submitted_for_settlement")
    {
alert('Thank you for your payment!');
FlowRouter.go('/book/'+FlowRouter.getParam("reservation_id"));
    }
    else
    {

    }

return Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0];

}
    else
    {
return false;
    }
  //console.log("Reservations find: "+Reservations.find({_id:FlowRouter.getParam("reservation_id")}).fetch()[0]._id);

  },

    showForm: function() {
    var userId = Meteor.userId();
    return true;//Roles.userIsInRole(userId, 'paid') ? false : true; +"&p=https://leboncampingcar.fr/css/lemonway.css"
}
});

  Template.dashboard.events({

'click #lemonway': function(event, template){

 Meteor.call('MoneyInWebInit', FlowRouter.getParam("reservation_id"), function(error, result){
           if (!error){
            console.log("result Details: "+JSON.stringify(result.data));
 if(result.data.d.MONEYINWEB.TOKEN && result.data.d.MONEYINWEB.ID){

        Reservations.update({
            _id: FlowRouter.getParam('reservation_id')
        }, {
            $addToSet: {"trans_id":result.data.d.MONEYINWEB.ID}
        }, {
          upsert: true
        });

 window.location.replace("https://sandbox-webkit.lemonway.fr/demo/dev/?moneyInToken="+result.data.d.MONEYINWEB.TOKEN+"&lang=fr&p=https://leboncampingcar.fr/css/lemonway.css"); 
 }
   }
           else{
            console.log("result Details: "+JSON.stringify(error));
           }
         });
}
});
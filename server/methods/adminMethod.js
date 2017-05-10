import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { CampingCars } from '../../imports/api/campingcars.js';
import { AddOns } from '../../imports/api/addons.js';
import { Reservations } from '../../imports/api/reservations.js';
import { Mailings } from '../../imports/api/mailings.js';
import { Communes } from '../../imports/api/communes.js';
import { UsersData } from '../../imports/api/usersdata.js';

Meteor.startup(function () {


  //observation de la base de donnée Images

var count = 0;
var query = Reservations.find({});
var usersquery = UsersData.find({});

var reservation =null;
var campingcardata = null;
//propriétaire du camping-car
var owner= null;
//locataire du camping-car
var user = null;

var options = false;

var handleusers = usersquery.observeChanges({
  addedBefore: function (id, fields, before) {
    count++;

    if(before==null){
    //attention lors du relancement de meteor car relecture des réservations déja sauvegarder
// reservation = Reservations.find({_id:id}).fetch()[0];
// campingcardata = CampingCars.find({_id:reservation.resource_id}).fetch()[0];
// //propriétaire du camping-car
// owner= Meteor.users.find({_id: campingcardata.userid}).fetch()[0];
// //locataire du camping-car
// user = Meteor.users.find({_id: reservation.user_id}).fetch()[0];



    if(fields.images)
    console.log("Add new image: "+count+" UserId: "+id + " réserve le camping car Id " + fields.images);
  //clear les nouvelles réservations qui date de la veille (non payer)

//Date du début de  et date de la création de la réservation

//si la date du nouveau status est  


}
else
{
}

  },
    changed(id, fields){
          if(fields.images)
    console.log("Add new image: "+count+" UserId: "+id + " réserve le camping car Id " + fields.images);
 

    },
});

var handle = query.observeChanges({
  addedBefore: function (id, fields, before) {
    count++;

    if(before==null){
    //attention lors du relancement de meteor car relecture des réservations déja sauvegarder
reservation = Reservations.find({_id:id}).fetch()[0];
campingcardata = CampingCars.find({_id:reservation.resource_id}).fetch()[0];
//propriétaire du camping-car
owner= Meteor.users.find({_id: campingcardata.userid}).fetch()[0];
//locataire du camping-car
user = Meteor.users.find({_id: reservation.user_id}).fetch()[0];



    if(fields.status)
    console.log("Add new booking: "+count+" UserId: "+id + " réserve le camping car Id " + fields.resource_id);
  //clear les nouvelles réservations qui date de la veille (non payer)

//Date du début de  et date de la création de la réservation

//si la date du nouveau status est  


}
else
{
  console.log("befor not null"+count);
}

  },
  changed(id, fields){

reservation = Reservations.find({_id:id}).fetch()[0];

campingcardata = CampingCars.find({_id:reservation.resource_id}).fetch()[0];
//propriétaire du camping-car
owner= Meteor.users.find({_id: campingcardata.userid}).fetch()[0];
//locataire du camping-car
user = Meteor.users.find({_id: reservation.user_id}).fetch()[0];
//Date du début de  et date de la création de la réservation

//changement format de date 
var st = moment(reservation.start_time, 'YYYY-MM-DD');
reservation.start_time = st.format('DD MMMM YYYY', 'fr');
var et = moment(reservation.end_time, 'YYYY-MM-DD');
reservation.end_time = et.format('DD MMMM YYYY', 'fr');
//si la date du nouveau status est  


    if(reservation.addons_id)
    {
    options = AddOns.find({_id:{$in:reservation.addons_id}}).fetch();
    //console.log("Options 1: "+options[0].name);
    }

    if(fields.status == "newbooking")
    {
      console.log("Nouvelle réservations de créer");
      //envoyer un mail au propriétaire pour valider la réservation
      console.log("send mail to: "+owner.emails[0].address);
      if(reservation.mailstatus == "notsend")
      {
          var tempmail_bookconf = Handlebars.templates['owner_validmaildeman']({bookingid:"id",datemailcreated:moment().format('DD-MM-YYYY'), campingcar:campingcardata, options:options, reservation:reservation, owner:owner});
          Meteor.call('SendMail', 0, owner, 'Nouvelle Réservation', tempmail_bookconf, null, null, null, reservation._id, function(result, error){
              if(!error){
    console.log("result admin :"+result);
    Reservations.update({_id:id},{$set:{mailstatus:"send"}},{upsert:true});
  }
  else
  {
    console.log("error admin :"+error);
    Reservations.update({_id:id},{$set:{mailstatus:"notsend"}},{upsert:true});
  }
          });
    }
    else
    {
      console.log("mail status: "+fields.mailstatus);
    }
         
      //
    }

    if(fields.status == "owner_valid" && reservation.mailstatus == "notsend")
    {
      console.log("Réservation valider par le propriétaire");
      //valider l'encaissement de la réservation
      var transactionid = null;
      //si acompte
      if(reservation.advance && reservation.advance.payment)
      {
        transactionid = reservation.advance.payment;
      }
      //si paiement comptant
      if(reservation.brutprize && reservation.brutprize.payment)
      {
        transactionid = reservation.brutprize.payment; 
      }
      else{

      }

      // Meteor.call('submitForSettlement', transactionid, reservation.id, function(result, error){
      //   if(!error){
      //envoyer un mail au locataire pour l'informer de la validation par le propriétaire
      var tempmail_bookconf = Handlebars.templates['user_bookvalidmail']({bookingid:"id",datemailcreated:moment().format('DD-MM-YYYY'), campingcar:campingcardata, options:options, reservation:reservation, owner:owner});
      Meteor.call('SendMail', 0, user, 'Validation Réservation', tempmail_bookconf, null, null, null, reservation._id, function(result, error){
              if(!error){
    //console.log("result admin :"+result);
    Reservations.update({_id:id},{$set:{mailstatus:"send"}},{upsert:true});
      }
  else
  {
    console.log("error admin :"+error);
    Reservations.update({_id:id},{$set:{mailstatus:error}},{upsert:true});
  }
          });
      //   }
      //   else{

      //   }
      // });

    }

    if(fields.status == "owner_cancel" && fields.mailstatus == "notsend")
    {
      console.log("Réservation annuler par le propriétaire");
            var transactionid = null;
      //si acompte
      if(reservation.advance && reservation.advance.payment)
      {
        transactionid = reservation.advance.payment;
      }
      //si paiement comptant
      if(reservation.brutprize && reservation.brutprize.payment)
      {
        transactionid = reservation.brutprize.payment; 
      }
      else{

      }

      // Meteor.call('refundTransaction', transactionid,  function(result, error){
      //   if(!error){
      //     console.log("result refundTransaction :"+result);
      //envoyer un mail au locataire pour l'informer de l'annulation par le propriétaire
      var tempmail_bookconf = Handlebars.templates['user_bookdeman_ownercancel']({bookingid:"id",datemailcreated:moment().format('DD-MM-YYYY'), campingcar:campingcardata, options:options, reservation:reservation, owner:owner});
      Meteor.call('SendMail', 0, user, 'Annulation Réservation', tempmail_bookconf, null, null, null, reservation._id, function(result, error){
              if(!error){
    //console.log("result admin :"+result);
    Reservations.update({_id:id},{$set:{mailstatus:"send"}},{upsert:true});
      }
  else
  {
    console.log("error admin :"+error);
    Reservations.update({_id:id},{$set:{mailstatus:error}},{upsert:true});
  }
          });

      //   }
      //   else{

      //   }
      // });
    }

    if(fields.status == "user_cancel" && fields.mailstatus == "notsend")
    {
      console.log("Réservation annuler par le locataire");
    }

    if(fields.status == "pay_ok")
    {
      console.log("Réservations payer");
      //vérifier que la date de paiement est récente avant l'envoie du mail de confirmation de la réservation
        var tempmail_bookconf = Handlebars.templates['tempmail']({bookingid:"id",datemailcreated:moment().format('DD-MM-YYYY'), campingcar:campingcardata, options:options, reservation:reservation});
        //console.log("Mail de confirmation: "+tempmail_bookconf);
          
    }
    if(fields.status == "sendmail_to_renter_book_confirm")
    {
      console.log("Sendmail to renter book confirm to"+user.emails[0].address);
        var tempmail_bookconf = Handlebars.templates['tempmail']({bookingid:"id",datemailcreated:moment().format('DD-MM-YYYY'), campingcar:campingcardata, options:options, reservation:reservation});
        
      //Meteor.call('SendMail', 0, Meteor.settings.admin.ADM_EMAIL, 'subjecttest', tempmail_bookconf, null, null, null);
Meteor.call('SendMail', 0, user, 'subjecttest', tempmail_bookconf, null, null, null);

      Reservations.update({_id:id},{$set:{status:"inprogress"}},{upsert:true});
    }
    if(fields.status == "admin_annul")
    {
      console.log("Réservations annuler par l'admin");
      //remboursement du client...
    }
    if(fields.status == "locataire_annul")
    {
      console.log("Réservations annuler par le loueur");
      //remboursement du client... et prélevement d'une com 10% sur le locataire
    }
    if(fields.status == "inprogress")
    {
      console.log("Réservations en cour");
    }
    if(fields.status == "finish") 
    {
      console.log("Réservations terminé");
    }
    if(fields.status == "close")
    {
      console.log("réservations clos");
    }
  //Meteor.call('SendMail', 0, Meteor.settings.admin.ADM_EMAIL, 'subjecttest', "<div><h1>Salut l'admin</h1></div>", null, null, null);

  },
  removed: function (id) {
    count--;
    console.log("Lost one. We're now down to " + count + " réservations.");
  }
});

});

Meteor.methods({

    communesearch: function (place) {
    
    console.log("start communesearch");
    
    var postcode = place.address_components[4].long_name;
    var sanac = place.address_components[0].long_name.replace(/[èéêë]/g,"e");

     var city= sanac.toUpperCase();
    console.log("place.name: "+city);
var coms;
    

if(city.search("ARRONDISSEMENT")!=-1)
{
var formatadres = place.formatted_address.match(/\D+/g);
var tab = formatadres[1].split(",");

  var pcty =  tab[0].toUpperCase();

console.log("tab 0: "+pcty.trim());

   coms = Communes.find({$text:{$search:pcty}});

   console.log("nomb de com: "+coms.count());

   
    
}
else
{
coms = Communes.find({"Nom Commune":city});
//f(coms.fetch()[0].)
}

//if 15th arrondissement of Paris
// if(city.search("ARRONDISSEMENT"))
// {
//   arron =  city.match(/\d/g);
//   console.log("match: "+arron);

//         // Communes.update({
//         //     _id: FlowRouter.getParam('_id')
//         // }, {
//         //     $set: js
//         // }, {
//         //   upsert: true
//         // });

// }


    //console.log("Nombre de communes: "+coms.count());
    // var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    // var options = {};

    // if (clientId) {
    //   options.clientId = clientId;
    // }

    // var response = generateToken(options);
    // console.log("getclientToken: "+response.clientToken);
    return coms;
  },
});
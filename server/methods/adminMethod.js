import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { CampingCars } from '../../imports/api/campingcars.js';
import { AddOns } from '../../imports/api/addons.js';
import { Reservations } from '../../imports/api/reservations.js';
import { Mailings } from '../../imports/api/mailings.js';
import { Communes } from '../../imports/api/communes.js';


Meteor.startup(function () {

// const output = FS.createWriteStream('./stdout.log');
// const errorOutput = FS.createWriteStream('./stderr.log');
// const myConsole = new console.Console(output, errorOutput);

// myConsole.log('hello world');
// // Prints: hello world, to out
// myConsole.log('hello %s', 'world');
// // Prints: hello world, to out
// myConsole.error(new Error('Whoops, something bad happened'));
// // Prints: [Error: Whoops, something bad happened], to err

// const name = 'Will Robinson';
// myConsole.warn(`Danger ${name}! Danger!`);

  //observation de la base de donnée réservations

var count = 0;
var query = Reservations.find({});
var handle = query.observeChanges({
  added: function (id, fields) {
    count++;
    //attention lors du relancement de meteor car relecture des réservations déja sauvegarder

    if(fields.status)
    console.log("Add new booking: "+count+" UserId: "+id + " réserve le camping car Id " + fields.resource_id);
  //clear les nouvelles réservations qui date de la veille (non payer)



  },
  changed(id, fields){
var reservation = Reservations.find({_id:id}).fetch()[0];

    //console.log("who Change?: "+whochange);
    //console.log("fields _id: "+fields.status);
console.log("Id du user: "+reservation.user_id);
var user = Meteor.users.find({_id: reservation.user_id}).fetch()[0];
var campingcardata = CampingCars.find({_id:reservation.resource_id}).fetch()[0];

var options = false;
//console.log("Nom du camping car: "+campingcardata.name); 

if(reservation.addons_id)
{
options = AddOns.find({_id:{$in:reservation.addons_id}}).fetch();
//console.log("Options 1: "+options[0].name);
}

    if(fields.status == "newbooking")
    {
      console.log("Nouvelle réservations de créer");
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
Meteor.call('SendMail', 0, user.emails[0].address, 'subjecttest', tempmail_bookconf, null, null, null);

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
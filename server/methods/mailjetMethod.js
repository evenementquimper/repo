//import { CampingCars } from '../api/campingcars.js';
import { CampingCars } from '../../imports/api/campingcars.js';
import { Reservations } from '../../imports/api/reservations.js';
import { UsersData } from '../../imports/api/usersdata.js';
import { Prospects } from '../../imports/api/prospects.js';
import fs from 'fs';
import Mailjet from 'node-mailjet';


//analyse base de donnée prospect

Meteor.startup(function () {


  //observation de la base de donnée Images

var count = 0;
var prospectsquery = Prospects.find({});


var handleprospect = prospectsquery.observeChanges({
  addedBefore: function (id, fields, before) {
    count++;
console.log("prospects count"+count);
 

  },
    changed(id, fields){
var prospect = Prospects.find({_id:id}).fetch()[0];

if(fields.regist == "sendmail")
{
  var usermail = "";
  var userfirstname = "";
  var userlastname = "";
   var user = Meteor.users.find({_id: prospect.parrainid}).fetch()[0];

    if(user.services.facebook!=null)
    {
      usermail = user.services.facebook.email;
      userfirstname = user.services.facebook.first_name;
      userlastname = user.services.facebook.last_name;
    }
    if(user.services.password!=null)
    {
      usermail = user.emails[0].address;
    }
else
{
}

    var mailjet_parrainage = Handlebars.templates['mailjetparrainage']({parrainemail:usermail,filleulefirstname:prospect.contactfirstname});
         

Email.send({
          from:"leboncampingcar@leboncampingcar.fr",
          to:prospect.email,
          subject:"Offre de parrainage de "+usermail,
          html:mailjet_parrainage
    }, function(error, result){
      if(!error){
      }
      else{
      }
    });
}
else
{

}

    },
});
});


Meteor.methods({

mailjetgetsender: function(){

  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var sender = mailjet.get('sender');
  return sender
    .request()
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},

mailjetvalitesender: function(){

  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var sender = mailjet.get('sender').id(60177).action('validate');
  return sender
    .request()
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},

mailjetnewcontactlist: function(){

    var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];
    var namecontactlist = userdata.firstname+userdata.lastname+'contactslist';
  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var addcontactlist = mailjet.post('contactslist');
  return addcontactlist
    .request({Name:namecontactlist})
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},

mailjetgetcampaigndraft: function(templateid){

  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var getcampaigndraft = mailjet.get('campaigndraft');
  return getcampaigndraft
    .request({"Template":templateid})
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},

mailjetsendcampaigndraft: function(campaigndraftid){

  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var postcampaigndraft = mailjet.post('campaigndraft').id(campaigndraftid).action("send");
  return postcampaigndraft
    .request()
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},

mailjetnewcontact: function(email){

  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var addcontact = mailjet.post('contact');
  return addcontact
    .request({Email:email})
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},

mailjetnewcontacttolist: function(email, contactlistid){

  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var addcontacttolist = mailjet.post('contactslist').id(contactlistid).action('ManageManyContacts');
  return addcontacttolist
    .request({
        Action:'addnoforce',
        Contacts:[{Email:email}]
        })
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},


mailjetgetlisttemplate: function(){
 const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var gettemplate = mailjet.get('template');
return gettemplate
  .request({"Name":"transactional01"})
    .then((result) =>{
        return result.body;
    })
    .catch((err) => {
      return err;
    });
},

mailjetgettemplate: function(){
  //var tempmail_bookconf = Handlebars.templates['owner_validmaildeman']({bookingid:"id",datemailcreated:moment().format('DD-MM-YYYY'), campingcar:campingcardata, options:options, reservation:reservation, owner:owner});
  const mailjet = Mailjet.connect(Meteor.settings.mailjet.apiKey, Meteor.settings.mailjet.secretKey);
  var gettemplate = mailjet.get('template').id("205893").action("detailcontent");
var template = null;
return gettemplate
  .request()
  //.id(205893){id:205893,"EditMode":"tool"}
  .then((result) =>{
   //var wsstream = fs.createWriteStream("template.handlebars");
   //wsstream.write(result.body.Data[0]); 
            //var data = JSON.stringify(result.body.Data[0]);
    //var parsedata = JSON.parse(data.replace('Text-part','Textpart'));
    return result.body;

    })
    .catch((err) => {
      return err;
    });
//205893
},

});
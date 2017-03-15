import { Reservations } from '../../imports/api/reservations.js';

Meteor.startup(function () {
  //process.env.MAIL_URL = Meteor.settings.smtp.GMAIL_SMTP;
  process.env.MAIL_URL = Meteor.settings.smtp.OVH_SMTP;
});

Meteor.methods({

    UpdateUserData: function(userid, jsondata){


return Meteor.users.update({
            _id: userid
        }, {
            $set: jsondata
        }, {
          upsert: true
        });
  },

  SendMail: function(datetosend, to, subject, text, header, attachments, mailcomposer, resa_id){

 var delta = datetosend-moment();
 var userdesti = "";

 //recherche une adresse mail dans user

if(to.services && to.services.facebook && to.services.facebook.email)
{
  userdesti= to.services.facebook.email;
}

if(to.emails && to.emails[0].address)
{
  userdesti = to.emails[0].address;
    //check([to, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    //this.unblock();
}

console.log("Send mail to: "+userdesti);

    Meteor.setTimeout(function(){
      Email.send({from:"leboncampingcar@leboncampingcar.fr",
          to:userdesti,
          bcc:"contact@leboncampingcar.fr",
          subject:subject,
          html:text,
          header:header,
          attachments:attachments,
          mailComposer:mailcomposer
    }, function(error, result){
      if(!error){
console.log("result send mail: "+result);


      }
      else{
console.log("Error send mail: "+error);
      }
    });
  //Meteor.call('SendMail', Template.instance().mailling.get('adres'), 'subjecttest', Template.instance().mailling.get('tempt'), null, null, null);
},delta.valueOf()
  , function(error, result){
  if(!error){
    console.log("result :"+result);
              if(resa_id){
            Reservations.update({_id:resa_id},{$set:{mailstatus:"send"}},{upsert:true});
          }
    return result;
  }
  else
  {
    console.log("error :"+error);
    console.log("error send mail: "+error);
          if(resa_id){
            Reservations.update({_id:resa_id},{$set:{mailstatus:"errorsend"}},{upsert:true});
          }
    return error;
  }
}

);


  }
});
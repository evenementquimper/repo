Meteor.startup(function () {
  process.env.MAIL_URL = Meteor.settings.smtp.GMAIL_SMTP;
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

  SendMail: function(datetosend, to, subject, text, header, attachments, mailcomposer){

 var delta = datetosend-moment();

    //check([to, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    //this.unblock();
    var settim = Meteor.setTimeout(function(){
      Email.send({from:"leboncampingcar@leboncampingcar.fr",
          to:to,
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
console.log("error send mail: "+error);
      }
    });
  //Meteor.call('SendMail', Template.instance().mailling.get('adres'), 'subjecttest', Template.instance().mailling.get('tempt'), null, null, null);
},delta.valueOf()
  , function(error, result){
  if(!error){
    console.log("result :"+result);
    return result;
  }
  else
  {
    console.log("error :"+error);
    return error;
  }
}

);


  }
});
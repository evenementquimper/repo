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

  SendMail: function(to, subject, text, header, attachments, mailcomposer){


    //check([to, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    //this.unblock();

  	Email.send({from:"leboncampingcar@leboncampingcar.fr",
  				to:to,
  				subject:subject,
  				text:text,
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
  }
});


Meteor.methods({

    UpdateUserData: function(userid, jsondata){


return Meteor.users.update({
            _id: userid
        }, {
            $set: jsondata
        }, {
          upsert: true
        });
  }
});
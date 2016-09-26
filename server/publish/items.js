Meteor.publish("items", function() {
  if ( Roles.userIsInRole(this.userId, 'paid') ) {
  	console("publish items");
    return Items.find();
  }
});
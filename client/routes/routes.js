
FlowRouter.route('/', {
	name:'index',
  action() {
    BlazeLayout.render("mainLayout", {nav:"nav",app:"login"});
 }
});

FlowRouter.route('/dashboard_one', {
  name: 'dashboard2',
  // triggersEnter: [AccountsTemplates.ensureSignedIn],
  //   subscriptions: function(params) {
  //       console.log("subscribe and register this subscription as 'myItems'");
  //       this.register('myItems', Meteor.subscribe('items'));
  //   },
    action: function(params) {
        console.log("Yeah! We are on the dashboard");
        BlazeLayout.render("appLayout", {area: "dashboard"});
    }
});

FlowRouter.route('/dashboard', {
  name:'dashboard',
  action() {
    BlazeLayout.render("dashboard");
 }
});

FlowRouter.route('/form1', {
	name:'form01',
  action: function() {
    BlazeLayout.render("mainLayout", {nav:"nav",app: "basicsform"});
  }
});

FlowRouter.route('/manage', {
	name:'form01',
  action: function() {
    BlazeLayout.render("mainLayout", {nav:"nav",app: "app"});

  }

});

FlowRouter.route('/user', {
	name:'user',
  action: function() {
   BlazeLayout.render("userLayout",{profilesection:"profilesection"});
   //BlazeLayout.render("userlisting",{listingsect:"profilesection"});
}
});

FlowRouter.route('/mylisting', {
  name:'userlisting',
  action: function() {
    BlazeLayout.render("userlisting");

  }
});

FlowRouter.route('/mylistings/basics/:_id', {
	name:'userbasics',
  action: function() {
    BlazeLayout.render("mylistingLayout"
    	,{content:"mlsectioncontentbasics"}
    	);

  }
});
FlowRouter.route('/mylistings/details/:_id', {
	name:'userdetails',
  action: function(params) {
  	//console.log("Yeah! We are on the post:", params._id;
    BlazeLayout.render("mylistingLayout"
    	,{content:"mlsectioncontentdetails"}
    	);

  }
});

FlowRouter.route('/mylistings/location/:_id', {
  name:'userlocation',
  action: function(params) {
    BlazeLayout.render("mylistingLayout"
      ,{content:"mlsectioncontentlocation"}
      );

  }
});

FlowRouter.route('/mylistings/images/:_id', {
  name:'userimages',
  action: function(params) {
    //console.log("Yeah! We are on the post:", params._id;
    BlazeLayout.render("mylistingLayout"
      ,{content:"mlsectioncontentimages"}
      );

  }
});

FlowRouter.route('/mylistings/availability/:_id', {
	name:'useravailability',
  action: function() {
    BlazeLayout.render("mylistingLayout"
    	,{content:"mlsectioncontentavailability"}
    	);

  }
});
FlowRouter.route('/listings/:_id', {
	name:'listing',
  action: function() {
    BlazeLayout.render("listingsLayout"
    	,{listing:"listing"}
    	);

  }
});
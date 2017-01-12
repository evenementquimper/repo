


FlowRouter.route('/', {
	name:'index',
  action:function() {
    if (Meteor.user())
    {
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"homepage"});

    }
else
{
  BlazeLayout.render("mainLayout", {nav:"navcon",homepage:"inwork"});
}
 }
});

// FlowRouter.route('/', {
//   name:'index',
//   action() {
//     BlazeLayout.render("mainLayout", {nav:"nav",homepage:"homepage"});
//  }
// });
// {{> atForm}}

FlowRouter.route('/twilio/my_twiml.xml', {
  where: 'server',
  action: function(res) {
console.log("creation xml");
    var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    xmlData += "<Response>";
    xmlData += "<Say voice=\"woman\" language=\"en\">Hello!</Say>";
    xmlData += "</Response>";

    res.writeHead(200, {'Content-Type': 'application/xml'});
    res.end(xmlData);
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

FlowRouter.route('/dashboard/:reservation_id', {
  name:'dashboard',
  action(params, queryParams) {
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

FlowRouter.route('/maplistings/:name/:lat/:lng/:start/:end', {
  name:'maplistings',
  action: function(params, queryParams) {
    //console.log("Params: "+JSON.stringify(params));  maplistings"
    //console.log("queryParams: "+JSON.stringify(queryParams));inwork
    BlazeLayout.render("mainLayout", {nav:"nav",homepage: "maplistings"});

  }

});

FlowRouter.route('/authentication', {
  name:'authentication',
  action: function() {
    BlazeLayout.render("loginLayout");
}

});

FlowRouter.route('/user', {
	name:'user',
  action: function() {
   BlazeLayout.render("userLayout",{profilesection:"profilesection"});
   //BlazeLayout.render("userlisting",{listingsect:"profilesection"});
}
});

FlowRouter.route('/userbooking', {
  name:'userbooking',
  action: function() {
    BlazeLayout.render("userbooking");

  }
});

FlowRouter.route('/mylisting', {
  name:'mylisting',
  action: function() {
    BlazeLayout.render("mylisting");

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
      ,{content:"mlsectioncontentloc"}
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
	name:'listings',
  action: function() {
    BlazeLayout.render("listingsLayout");

  }
});

FlowRouter.route('/book/:_id', {
  name:'book',
  action: function(){
    BlazeLayout.render("book");
  }
});

FlowRouter.route('/admin', {
  name:'admin',
  action: function() {
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"admin"});

  }
});

FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {
BlazeLayout.render("mainLayout", {nav:"naverror",homepage:"inwork"});
    }
};

// Picker.route('/post/:_id', function(params, req, res, next) {
//   var post = Posts.findOne(params._id);
//   res.end(post.content);
// });
//import { CampingCars } from '../../imports/api/campingcars.js';

FlowRouter.route('/', {
	name:'index',
  action:function() {
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"homepage"});
 }
});

FlowRouter.route('/tutoowner', {
	name:'tutoowner',
  action:function() {
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"tutoowner"});
 }
});

FlowRouter.route('/mentionslegales', {
  name:'mentionslegales',
  action:function() {
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"mentionslegales"});
  }
});

FlowRouter.route('/cgv', {
  name:'cgv',
  action:function() {
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"cgv"});
  }
});

// FlowRouter.route('/google494f604454476dc2.html', {
//   name:'google494f604454476dc2',
//   action:function() {
//     BlazeLayout.render("google494f604454476dc2");
//   }
// });

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

FlowRouter.route('/lemonway2', {
  name:'lemonway2',
  action: function(params, queryParams) {
    BlazeLayout.render("lemonway2");
 }
});

FlowRouter.route('/validpay/:reservation_id/:amount', {
  name:'validpay',
  action: function(params, queryParams) {
    BlazeLayout.render("validpay");
    //BlazeLayout.render("mainLayout", {nav:"nav",homepage:"validpay"});
 }
});

FlowRouter.route('/validpay', {
  name:'validpay',
  action: function(params, queryParams) {
    //BlazeLayout.render("validpay");
    BlazeLayout.render("validpay");
    //BlazeLayout.render("mainLayout", {nav:"nav",homepage:"validpaytest"});
 }
});

FlowRouter.route('/cancelpay/:reservation_id/:amount', {
  name:'cancelpay',
  action(params, queryParams) {

    BlazeLayout.render("cancelpay");
 }
});

FlowRouter.route('/errorpay/:reservation_id/:amount', {
  name:'errorpay',
  action(params, queryParams) {
    BlazeLayout.render("errorpay");
 }
});

FlowRouter.route('/errorpay', {
  name:'errorpay',
  action(params, queryParams) {
    BlazeLayout.render("errorpay");
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

FlowRouter.route('/campingcar/:city/:make/:model', {
  name:'campingcar',

  action: function(params) {
    BlazeLayout.render("campingcarsLayout");
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

FlowRouter.route('/statistiques', {
  name:'statistiques',
  action: function(){
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"admin"});
  }
});

// var adminRoutes = FlowRouter.group({
//   prefix: '/admin'
//   //triggersEnter: [trackRouteEntry],
//   //triggersExit: [trackRouteEntry]
// });

// function trackRouteEntry(context) {
//   // context is the output of `FlowRouter.current()`

//   console.log("admin route enter");

// }

// function trackRouteClose(context) {
//  console.log("admin route enter");
//   //Mixpanel.track("move-from-home", context.queryParams);
// }



// // handling /admin route
// adminRoutes.route('/', {
//   action: function() {

//     BlazeLayout.render("mainLayout", {nav:"nav",homepage:"admin"});

//   },

// });

FlowRouter.route('/admin2', {
  name:'admin2',
  action: function() {
    //     if (Meteor.user().emails[0].address==Meteor.settings.admin.ADM_EMAIL)
    // {
    BlazeLayout.render("mainLayout", {nav:"nav",homepage:"admin"});
//     }
// else
// {
//   BlazeLayout.render("mainLayout", {nav:"nav",homepage:"homepage"});
// }


  },
    triggersEnter: [(context, redirect) => {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP)) {
      redirect('/dont-go-there');
    }
  }],
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

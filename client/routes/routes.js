
FlowRouter.route('/', {
	name:'index',
	//template: 'mainLayout'
  action() {
    BlazeLayout.render("mainLayout", {nav:"nav",app:"app"});
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

  }
});

FlowRouter.route('/mylistings/basics', {
	name:'userbasics',
  action: function() {
    BlazeLayout.render("mylistingLayout"
    	,{content:"mlsectioncontentbasics"}
    	);

  }
});
FlowRouter.route('/mylistings/details', {
	name:'userdetails',
  action: function() {
    BlazeLayout.render("mylistingLayout"
    	,{content:"mlsectioncontentdetails"}
    	);

  }
});
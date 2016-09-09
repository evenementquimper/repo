
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
    BlazeLayout.render("userLayout");

  }
});

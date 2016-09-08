
FlowRouter.route('/', {
	name:'index',
	template: 'app'
//  action() {
//    BlazeLayout.render("app", {manage: "managelisting"});
//  }
});

FlowRouter.route('/form1', {
	name:'form01',
	//template: 'basicsform'
  action: function() {
    BlazeLayout.render("app", {manage: "basicsform"});
  }
});
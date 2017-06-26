import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import './loginLayout.html';

 Template.loginLayout.onCreated(function() {

    //titre de la page
  DocHead.setTitle("Inscription, Connection|Le Bon Camping-car");
T9n.setLanguage("fr");
});


 Template.loginLayout.helpers({

});
  Template.loginLayout.events({
});
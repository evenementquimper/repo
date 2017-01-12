import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { DDP } from 'meteor/ddp-client';

//import './main.html';
import '../imports/ui/body.js';
import '../imports/ui/nav.js';
import '../imports/ui/navcon.html';
import '../imports/ui/naverror.html';
import '../imports/ui/inwork.html';
import '../imports/ui/app.html';
import '../imports/ui/homepage.js';
import '../imports/ui/maplistings_lit.js';
import '../imports/ui/maplistings.js';

import '../imports/ui/leftnavuser.js';

import '../imports/ui/profilesection.js';
import '../imports/ui/basicsform.html';
import '../imports/ui/userlayout.js';

import '../imports/ui/mylistingLayout.js';
import '../imports/ui/listingsLayout.js';
import '../imports/ui/mylisting.js';
import '../imports/ui/userbooking.js';

import '../imports/ui/reservationslisting.js';
import '../imports/ui/login.js';
import '../imports/ui/dashboard.js';
import '../imports/ui/dashboard.html';

import '../imports/ui/topnavmylisting.js';

import '../imports/ui/managelisting.html';
import '../imports/ui/managelisting.js';
import '../imports/ui/mlsectionright.js';
import '../imports/ui/mlsectioncontent.html';
import '../imports/ui/mlsectionbuttons.html';

import '../imports/ui/mlsectioncontentloc.js';
import '../imports/ui/mlsectioncontentbasics.js';
import '../imports/ui/mlsectioncontentdetails.js';
import '../imports/ui/mlsectioncontentimages.js';
import '../imports/ui/sectionbooking.js';
import '../imports/ui/mlsectioncontentavailability.js';

import '../imports/ui/listing.js';
import '../imports/ui/book.js';

import '../imports/ui/admin.js';
import '../imports/ui/admin.html';
//import '../accounts/config.js';
import '../imports/ui/appLayout.html';
import '../imports/ui/_header.html';
import '../imports/ui/_header.js';
import '../imports/ui/_footer.html';

import '../imports/ui/override-atPwdFormBtn.js';
import '../imports/ui/authentication.js';
import '../imports/ui/loginLayout.html';

if (Meteor.isClient) {
  Meteor.startup(function () {
    //Session.set("showLoadingIndicator", true);
//DDP.connect('http://leboncampingcar.fr');
    TAPi18n.setLanguage("fr")
      .done(function () {
        //Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  // counter() {
  //   return Template.instance().counter.get();
  // },
});

Template.hello.events({
  // 'click button'(event, instance) {
  //   // increment the counter when button is clicked
  //   instance.counter.set(instance.counter.get() + 1);
  // },
});

import { Template } from 'meteor/templating';

 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { AddOns } from '../api/addons.js';
import { Reservations } from '../api/reservations.js';

import './userlayout.html';
 
 Template.userLayout.onCreated(function() {
  

  //this.getListId = () => FlowRouter.getParam('_id');
//souscription a la base de donnée
  this.autorun(() => {
    this.subscribe('tasks');
    this.subscribe('campingcars');
    this.subscribe('Images');
    this.subscribe('addons');
    this.subscribe('reservations');
    this.subscribe('usersdata');
  });
});

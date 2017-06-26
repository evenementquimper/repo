import { Template } from 'meteor/templating';

 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { AddOns } from '../api/addons.js';
import { Reservations } from '../api/reservations.js';

import './mylistingLayout.html';
 
 Template.mylistingLayout.onCreated(function() {
  

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

 Template.mylistingLayout.helpers({
});
  Template.mylistingLayout.events({
'submit .details.make': function (event){
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
}


   });
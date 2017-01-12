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

 Template.userLayout.helpers({
  //task: function() {

    //var category = FlowRouter.getParam("id");
    //console.log("Parametre: "+category);
    //var o_id = new ObjectID(id);
//db.test.find({_id:o_id}) _id: 'category'
    //console.log("BDD: "+Tasks.find({}).fetch()[0]);
    //var bdd = Tasks.find({}).fetch()[0];
    //console.log("BDD: "+Tasks.find({}).fetch());
    
    //return Tasks.find({}).fetch()[0];
    //return bdd;
  //}
// ways:function(){
// return Way_Coll.find({}).fetch();
// },

// errors:function(){
// return Errors_Coll.find({}).fetch();
// },
    // gates:function(){
    //        return Gate_Coll.find({}).fetch();
    // },
    // interval:function(){
    //   console.log("Interval: "+gateState.get(rr));
    //         return gateState.get(rr);
    // },
    // car:function(){
    //   return Gate2_Coll.find({}).fetch();
    //   console.log("Barrière info: "+bdd[0].datavalues.input1state);

    //   if(bdd[0].datavalues.input1state==1)
    //   {
    //     return true;
    //   }
    //   else
    //   {
    //     return false;
    //   }

    // },
});
  Template.userLayout.events({

   });
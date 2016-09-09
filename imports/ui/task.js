

import { Template } from 'meteor/templating';

 

import { Tasks } from '../api/tasks.js';

 

import './task.html';
Template.task.onCreated(function() {
  //this.getListId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('tasks'
    	//, this.getListId()
    	);
  });
});

 Template.task.helpers({

  tasks:function() {
console.log("BDD: "+Tasks.find({}).fetch()[0]);
    return Tasks.find({}).fetch();

  },

});

Template.task.events({

  'click .toggle-checked'() {

    // Set the checked property to the opposite of its current value

    Tasks.update(this._id, {

      $set: { checked: ! this.checked },

    });

  },

  'click .delete'() {
console.log("Clic delete");
    Tasks.remove(this._id);

  },

});


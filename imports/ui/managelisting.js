

import { Template } from 'meteor/templating';
 

import './managelisting.html';
import './basicsform.html';

 

Template.managelisting.events({

//   'click .toggle-checked'() {

//     // Set the checked property to the opposite of its current value

//     Tasks.update(this._id, {

//       $set: { checked: ! this.checked },

//     });

//   },

//   'click .delete'() {
// console.log("Clic delete");
//     Tasks.remove(this._id);

//   },

});


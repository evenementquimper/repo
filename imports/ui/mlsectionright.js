import { Template } from 'meteor/templating';
import { CampingCars } from '../api/campingcars.js';
//import { Session } from 'meteor/session';


import './mlsectionright.html';

Template.mlsectionright.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);
});

Template.mlsectionright.helpers({
    
campingcars: function(){

if(CampingCars.find({_id: FlowRouter.getParam('_id')}))
{
return CampingCars.find({}).fetch();

}
else
{
  return false;
}
  },

});

Template.mlsectionright.events({});
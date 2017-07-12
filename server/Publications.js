import { Tasks } from '../imports/api/tasks.js';
import { CampingCars } from '../imports/api/campingcars.js';
import { UsersData } from '../imports/api/usersdata.js';
import { Reservations } from '../imports/api/reservations.js';
import { AddOns } from '../imports/api/addons.js';
import { Connections } from '../imports/api/connections.js';
import { Mailings } from '../imports/api/mailings.js';
import { Communes } from '../imports/api/communes.js';
Meteor.publish('tasks', function () {
    return Tasks.find({});
});
Meteor.publish('campingcars', function () {
    return CampingCars.find({});
});
Meteor.publish('onecampingcar', function(city, make, model){
   console.log("publish onecampingcar: ");
   console.log("city: "+city);
   console.log("make: "+make);
   console.log("model: "+model);
    return CampingCars.find({city:city, make:make, model:model});
});
Meteor.publish('mycampingcar', function(id){
    return CampingCars.find({_id:id});
});
Meteor.publish('usersdata', function () {
    return UsersData.find({});
});
Meteor.publish('publicusersdata', function (id) {
    //Do a synchronous http request:
  try {
    return UsersData.find({_id:id},{firstname:1,lastname:1});
  }
  catch (error) {
    //We caught an exception; Let's add some detail:
    throw new Meteor.Error(error, "UsersData call failed", '');
  }
});
Meteor.publish('myusersdata', function myusersdataPublication() {
  console.log("publish userid: "+this.userId);
    return UsersData.find({_id:this.userId});
});
Meteor.publish('reservations', function () {
    return Reservations.find({});
});
Meteor.publish('campingcarreservations', function (campingcarid) {
    return Reservations.find({resource_id:campingcarid});
});
Meteor.publish('addons', function () {
    return AddOns.find({});
});
// Meteor.publish('images', function () {
//     return Images.find({});
// });
// Meteor.publish('imagesprivate', function () {
//     return ImagesPrivate.find({});
// });
Meteor.publish('connections', function () {
    return Connections.find({});
});
Meteor.publish('mailings', function () {
    return Mailings.find({});
});
Meteor.publish('communes', function () {
    return Communes.find({});
});
Meteor.publish('onecommune', function (city) {
    return Communes.find({nom_commune:city});
});
Meteor.publish('private', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.user({
    userId: this.userId
  });
});

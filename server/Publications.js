import { Tasks } from '../imports/api/tasks.js';
import { CampingCars } from '../imports/api/campingcars.js';
import { UsersData } from '../imports/api/usersdata.js';
import { Reservations } from '../imports/api/reservations.js';
import { AddOns } from '../imports/api/addons.js';
Meteor.publish('tasks', function () {
    return Tasks.find({});
});
Meteor.publish('campingcars', function () {
    return CampingCars.find({});
});
Meteor.publish('usersdata', function () {
    return UsersData.find({});
});
Meteor.publish('reservations', function () {
    return Reservations.find({});
});
Meteor.publish('addons', function () {
    return AddOns.find({});
});
Meteor.publish('images', function () {
    return Images.find({});
});

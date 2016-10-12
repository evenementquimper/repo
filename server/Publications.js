import { Tasks } from '../imports/api/tasks.js';
import { CampingCars } from '../imports/api/campingcars.js';
import { UsersData } from '../imports/api/usersdata.js';
Meteor.publish('tasks', function () {
    return Tasks.find({});
});
Meteor.publish('campingcars', function () {
    return CampingCars.find({});
});
Meteor.publish('usersdata', function () {
    return UsersData.find({});
});
Meteor.publish('images', function () {
    return Images.find({});
});

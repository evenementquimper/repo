import { Tasks } from '../imports/api/tasks.js';
import { CampingCars } from '../imports/api/campingcars.js';
Meteor.publish('tasks', function () {
    return Tasks.find({});
});
Meteor.publish('campingcars', function () {
    return CampingCars.find({});
});
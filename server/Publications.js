import { Tasks } from '../imports/api/tasks.js';

Meteor.publish('tasks', function () {
    return Tasks.find({});
});
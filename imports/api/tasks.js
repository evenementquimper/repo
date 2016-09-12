

import { Mongo } from 'meteor/mongo';

 //Gate2_Coll = new Mongo.Collection('Gate2_Coll');
//Gate2_Coll.allow({});

export const Tasks = new Mongo.Collection('tasks');
//Tasks.allow({});
//Tasks.insert({message: 'mon message'});
// So this line will return something
//const todo = Tasks.findOne({message: 'mon message'});
// Look ma, no callbacks!
//console.log(todo);


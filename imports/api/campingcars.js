

import { Mongo } from 'meteor/mongo';

export const CampingCars = new Mongo.Collection('campingcars');

  // CampingCars.allow({
  //   insert(userId,doc) {
  //     /* user and doc checks ,
  //     return true to allow insert */
  //     return true; 
  //   },
  //    update (userId,doc,fields,modifier) {
  //     /* user and doc checks ,
  //     return true to allow update */
  //     console.log("update db: "+fields);
  //     return true; 
  //   }
  // });




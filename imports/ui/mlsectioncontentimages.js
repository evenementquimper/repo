import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
//import { ImagesCar } from '../api/imagescar.js';
import { FilesCollection } from 'meteor/ostrio:files';

import './mlsectioncontentimages.html';
 //Collection
this.Images = new Meteor.Files({  collectionName: 'Images'
  //allowClientCode: false, // Disallow remove files from Client
  //public: true,
  //storagePath: '../../../../../public/images/'+FlowRouter.getParam("_id"),
  //onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    //if (file.size <= 4985760 && /png|jpg|jpeg/i.test(file.extension)) {
      //return true;
    //} else {
      //return 'Please upload image, with size equal or less than 4MB';
    //}
  //}
});


//Markers = new Mongo.Collection('markers');  

 Template.mlsectioncontentimages.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);


});


 Template.mlsectioncontentimages.helpers({

  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

      campingcars: function(){
      if(Meteor.userId()!==CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].userid)
      {
         FlowRouter.go("index");
         return true;
      }
      else
      {
          return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];

      }
  },

  images: function(){
    return Images.collection.find({}).fetch();
  },
    uploadedFiles: function () {
      var filesCursor = Images.find();
    return Images.find({}).cursor;
}




});
  Template.mlsectioncontentimages.events({

'click .image-remove': function(e, template){
e.preventDefault();
console.log("curent id: "+e.currentTarget.id);
//{"images":{ $in:["hXZjsSk5oSzm759aN"]}}
var dig = '{"images":"'+e.currentTarget.id+'"}';
console.log("DIG: "+dig);

var js = JSON.parse(dig);

        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $pull: js
        }, {
          multi: true
        });
},

'click .image-up': function(e, template){
e.preventDefault();

var dig = '{ images:{ $each: [], $sort: -1 }}';


//var js = JSON.parse(dig);

        // CampingCars.update({
        //     _id: FlowRouter.getParam('_id'),
        //     images: e.currentTarget.id
        // }, {
        //     $set: { "images.$" :{ $each: [], $sort: -1 }}
        // });
},

'click .image-upload': function(e, template){
//console.log("click button");
  e.preventDefault();
  var inp = template.find('#fileInput');
  inp.click();
},
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      var upload = Images.insert({
        //campingcarid: FlowRouter.getParam("_id"),
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
                        var sup = fileObj.path.split('../../../../../public');
              console.log("Split 1: "+sup[0]);
              console.log("Split 2: "+sup[1]);
          alert('Split 01:"' + sup[0] + '" & sup 02:"' + sup[1] + '" successfully uploaded');
//sauvegarde de id de l'image ds la bdd du camping car


var dig = '{"images":"'+sup[1]+'"}';
console.log("DIG: "+dig);

var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $addToSet: js
        }, {
          upsert: true
        });

         }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }

   });
import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
//import { ImagesCar } from '../api/imagescar.js';
import { FilesCollection } from 'meteor/ostrio:files';

import './mlsectioncontentimages.html';
 //Collection
this.Images = new Meteor.Files({  collectionName: 'Images'
//   allowClientCode: false, // Disallow remove files from Client
//   //public: true,
//   storagePath: '../../../../../public/images/'+FlowRouter.getParam("_id"),
//   onBeforeUpload: function (file) {
//     // Allow upload files under 10MB, and only in png/jpg/jpeg formats
//     if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
//       return true;
//     } else {
//       return 'Please upload image, with size equal or less than 10MB';
//     }
//   }
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
        console.log("Collection find: "+CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0]);
        //var imgId = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];

return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
  },

  images: function(){
    //return Images.find({ filename: 'chat.jpg' });
    console.log("Collection find: "+Images.find().cursor);
    //console.log("Collection images car find: "+ImagesCar.find({}).fetch());
    return Images.collection.find({}).fetch();
  },
    uploadedFiles: function () {
      var filesCursor = Images.find();
      //console.log("filecursor fetch: "+Images.find());
      //console.log("filecursor fetch: "+filesCursor.fetch());
      //console.log("filecursor get: "+filesCursor.get());
      console.log("Collection find: "+JSON.stringify(Images.find({}).cursor));
    return Images.find({}).cursor;
}




});
  Template.mlsectioncontentimages.events({

'click button': function(e, template){
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
          alert('File name:"' + fileObj.name + '" & file id:"' + fileObj._id + '" successfully uploaded');
//sauvegarde de id de l'image ds la bdd du camping car
              var routeid = FlowRouter.getParam('_id');
//var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
var dig = '{"images":"'+fileObj._id+'"}';
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
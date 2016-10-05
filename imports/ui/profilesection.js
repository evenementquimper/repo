import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
//import { ImagesCar } from '../api/imagescar.js';
import { FilesCollection } from 'meteor/ostrio:files';

import './profilesection.html';

 Template.profilesection.onCreated(function() {
    this.autorun(() => {
    this.subscribe('Images');
  });
  this.currentUpload = new ReactiveVar(false);


});


 Template.profilesection.helpers({

  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

  images: function(){
    //return Images.find({ filename: 'chat.jpg' });
    console.log("Collection find: "+Images.find().cursor);
    //console.log("Collection images car find: "+ImagesCar.find({}).fetch());
    return Images.collection.find({}).fetch();
  },
    uploadedFiles: function () {
      // console.log("Collection find count: "+Images.find().count);
    return Images.find();
}




});
  Template.profilesection.events({

'click .avatar-upload': function (e, template){
console.log("click avatar upload");
  e.preventDefault();
  var inp = template.find('#avatarImage');
  inp.click();
  //var email = $(ResId).val();
},

'click .license-uploader-button': function(e, template){
console.log("click license-uploader-button");
  e.preventDefault();
  var inp = template.find('#licenseImage');
  inp.click();
},
  'change #avatarImage': function (e, template) {
    console.log("click upload button");
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
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
    else
    {
      console.log("ELSE");
    }
  },

    'change #licenseImage': function (e, template) {
    console.log("click upload button");
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
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
    else
    {
      console.log("ELSE");
    }
  }

   });
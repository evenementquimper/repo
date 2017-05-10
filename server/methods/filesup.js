//import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { Collection2 } from 'meteor/aldeed:collection2';
import { FilesCollection } from 'meteor/ostrio:files';
var defaultSchema = {
  size: {
    type: Number
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  path: {
    type: String
  },
  isVideo: {
    type: Boolean
  },
  isAudio: {
    type: Boolean
  },
  isImage: {
    type: Boolean
  },
  isText: {
    type: Boolean
  },
  isJSON: {
    type: Boolean
  },
  isPDF: {
    type: Boolean
  },
  extension: {
    type: String,
    optional: true
  },
  _storagePath: {
    type: String
  },
  _downloadRoute: {
    type: String
  },
  _collectionName: {
    type: String
  },
  public: {
    type: Boolean,
    optional: true
  },
  meta: {
    type: Object,
    blackbox: true,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  versions: {
    type: Object,
    blackbox: true
  }
};

var mySchema = _.extend(defaultSchema, {
  campingcarid: {
    type: String
  }
});

//var sschema = new SimpleSchema(mySchema);

//var this.Images = new FilesCollection({ collectionName: 'Images'});
//console.log("Asset file path"+Assets.absoluteFilePath('casque-chantier.jpg'));
//var binaryImage = Assets.getBinary('casque-chantier.jpg');
//var dataURI = 'data:image/png;base64,'+Base64.encode(binaryImage);
//console.log("asset dataURI: "+dataURI); 
//Collection
var Images = new FilesCollection({
  debug:true,
  collectionName: 'Images',
  //schema: new SimpleSchema(mySchema), Meteor.Files
  allowClientCode: false, // Disallow remove files from Client
  storagePath: '../../../../../public/images',
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 4885760 && /png|jpg|jpeg/i.test(file.extension)) {
      console.log("size: "+file.size);
      //console.log("fetch: "+JSON.stringify(file.link()));
      
      return true;
    } else {
      return 'Please upload image, with size equal or less than 4MB';
    }
  },
  onAfterUpload: function(fileRef){
    //
    console.log("fileref: "+JSON.stringify(fileRef));
      var cursor = Images.findOne({_id:fileRef._id});
      console.log("onafterload file link?: "+cursor.link());
        if(fileRef.name == "licence_carte"){
      //console.log("Asset file path"+Assets.absoluteFilePath('casque-chantier.jpg'));
//var binaryImage = Assets.getBinary('casque-chantier.jpg');
Meteor.call('UploadFile', "identite.jpeg",  "0", fileRef.fetch() ,function(error, result){
           if (!error){
             console.log("result upload: "+JSON.stringify(result));
           }
           else{
 console.log("result upload error: "+JSON.stringify(error));
           }
         });
//var dataURI = 'data:image/png;base64,'+Base64.encode(binaryImage);
//console.log("asset dataURI: "+dataURI); 
    }
  }
  //,  onAfterUpload: function ()
});

//Images.collection.attachSchema(mySchema);

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });

var imagesquery = Images.find({});
var count = 0;
var handleimages = imagesquery.observeChanges({
  addedBefore: function (id, fields, before) {
    count++;
    //console.log("Addbefore new image: "+count+" UserId: "+fields.userId+" nom du fichier:"+fields.name);
    console.log("PATH: "+fields.path);

  },
  changed(id, fields){
    //if(fields.images)
    //console.log("Add new image: "+count);
  },
});
}

// var ImagesPrivate = new FilesCollection({
//   debug:true,
//   collectionName: 'ImagesPrivate',
//   //schema: new SimpleSchema(mySchema), Meteor.Files
//   allowClientCode: false, // Disallow remove files from Client
//   storagePath: '../../../../../private',
//   onBeforeUpload: function (file) {
//     // Allow upload files under 10MB, and only in png/jpg/jpeg formats
//     if (file.size <= 4885760 && /png|jpg|jpeg/i.test(file.extension)) {
//       return true;
//     } else {
//       return 'Please upload image, with size equal or less than 4MB';
//     }
//   },
//   onAfterUpload: function(fileRef){
//     console.log("onafterload: "+fileRef._id);
//   }
//   //,  onAfterUpload: function ()
// });

// if (Meteor.isClient) {
//   Meteor.subscribe('files.imagesprivate.all');
// }

// if (Meteor.isServer) {
//   Meteor.publish('files.imagesprivate.all', function () {
//     return ImagesPrivate.find().cursor;
//   });

// }
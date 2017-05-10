import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
import { FilesCollection } from 'meteor/ostrio:files';

import './profilesection.html';
var usersdatasubs = null;
 Template.profilesection.onCreated(function() {

  this.autorun(() => {
    const campingcarssubs = this.subscribe('campingcars');
    if(campingcarssubs.ready()){

    }
    this.subscribe('Images');
    usersdatasubs = this.subscribe('usersdata');

});

  this.currentUpload = new ReactiveVar(false);


});

  Template.profilesection.onRendered(function() {

    if(usersdatasubs.ready()){
      var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];
console.log("userdata: "+userdata._id);
if(userdata.licensestatus && userdata.licensestatus=="new"){
  console.log("nouvelle license: ");
  var idimg = template.find("#licenseimg");
          var idcanvas = template.find("#idcanvas");
          var ctx = idcanvas.getContext('2d');

ctx.drawImage(idimg, 0, 0);
var idcanvas2 = template.find("#idcanvas");

var myDataURL = idcanvas2.toDataURL('image/jpeg');


var myBase64Data = myDataURL.split(',')[1];
  var b64 = ctx.getImageData(0,0,150,150).data;
  console.log("license b64: "+b64);
}
    }

this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        //maxDate: moment().subtract(18, 'years'),
        viewMode:'years'
        //minDate: moment().subtract(18, 'years'),
        //keepOpen: true,
        //inline: true,
        //focusOnShow:false,
        //collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]  <div style="height:100px;width:100px;user-select:none;border-radius:50%;display:inline-block;background-color:#bdbdbd;text-align:center;line-height:100px;font-size:54px;color:#ffffff;">

    });



});


 Template.profilesection.helpers({

owner:function(){
return CampingCars.find({userid: Meteor.userId()}).fetch();
},

  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

  images: function(){
    //return Images.find({ filename: 'chat.jpg' });
    console.log("Collection images car find: "+Images.find().count);
    return Images.find({}).fetch()[0];
  },
    uploadedFiles: function () {
      // console.log("Collection find count: "+Images.find().count);
    return Images.find();
},
userdata:function(){
return UsersData.find({_id:Meteor.userId()}).fetch()[0];
},
// persodata:function(){
// return Meteor.User();
// }


});
  Template.profilesection.events({
  'input .data-item': function (event, template) {
event.preventDefault(); 
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
//console.log("DIG: "+dig);

if(event.currentTarget.name=="iban")
{

var ibanval = event.currentTarget.value;
var ibanerror = template.find('#ibanerror');
if(IBAN.isValid(ibanval)==true)
 {
   ibanerror.style.display = "none";

         Meteor.call('RegisterIBAN', function(error, result){
          if (!error){
            //if(result.data.d.IBAN_REGISTER.)
            //console.log("result upload: "+JSON.stringify(result));
            //if(reIBAN_REGISTER)
          }
          else{
//console.log("result upload: "+JSON.stringify(error));
          }
        });

var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });

}
if(IBAN.isValid(ibanval)!=true && ibanval.length>=26)
{
ibanerror.style.display = "inline-block";

}
else
{

}
}
else
{
var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });

}
  },

'dp.change .datetimepicker': function(event, instance){
    event.preventDefault();
    var dig = '{"birthdate":"'+$('.datetimepicker').data().date+'"}';

var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });
},

  'input .datatext-item': function (event, template) {
    event.preventDefault(); 
    var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';

    var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });
  },

'click .text-item': function(event, template){
  
  event.preventDefault();
  var lab = event.currentTarget.children[0];
  var inp = event.currentTarget.children[1];
  var hli = event.currentTarget.children[3];
  var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
  inp.style.display = "inline-block";
  lab.style = nstyle;
  lab.style.top = "38px";
  lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
  lab.style.cursor = "text";
  lab.style.color ="rgba(86,90,92,0.5)";
  var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
  hli.style.transform = "scaleX(1)";

},

'click #idcanvas': function(e, template){
var idimg = template.find("#profileimg");
          var idcanvas = template.find("#idcanvas");
          var ctx = idcanvas.getContext('2d');

ctx.drawImage(idimg, 0, 0);
var idcanvas2 = template.find("#idcanvas");

var myDataURL = idcanvas2.toDataURL('image/jpeg');


var myBase64Data = myDataURL.split(',')[1];
  var b64 = ctx.getImageData(0,0,150,150).data;
  //var tparray [];= new TypedArray.from(b64);
    // try {
    //     btoa(atob(myBase64Data)) == myBase64Data;
    // } catch (err) {
    //     console.log("errueur");
    // }
    //  console.log("ar64: "+myBase64Data);
//var ar64 = new Float64Array(myBase64Data);
       
//console.log("My data base 64 url: "+btoa(String.fromCharCode.apply(null, ctx.getImageData(0,0,150,150).data)));
//new Buffer(myBase64Data, 'ascii').toString('base64')

// function arrayBufferToBase64( buffer, callback ) {
//     var blob = new Blob([buffer],{type:'application/octet-binary'});
//     var reader = new FileReader();
//     reader.onload = function(evt){
//         var dataurl = evt.target.result;
//         callback(dataurl.substr(dataurl.indexOf(',')+1));
//     };
//     reader.readAsDataURL(blob);
// }

function arrayBufferToBase64(ab){

    var dView = new Uint8Array(ab);   //Get a byte view        

    var arr = Array.prototype.slice.call(dView); //Create a normal array        

    var arr1 = arr.map(function(item){        
      return String.fromCharCode(item);    //Convert
    });

    return window.btoa(arr1.join(''));   //Form a string

}
//example:
var buf = new Uint8Array([11,22,33]);
var buff = arrayBufferToBase64(ctx.getImageData(0,0,150,150).data); //"CxYh"
Meteor.call('UploadFile', "identite.jpeg",  "0", myBase64Data.toString() ,function(error, result){
          if (!error){
            console.log("result upload: "+JSON.stringify(result));
          }
          else{
console.log("result upload error: "+JSON.stringify(error));
          }
        });

},

'click .avatar-upload-button': function (e, template){
  e.preventDefault();
  var inp = template.find('#avatarImage');
  inp.click();
},

'click .license-upload': function(e, template){
console.log("click license-uploader-button");
  e.preventDefault();
  var inp = template.find('#licenseImage');
  inp.click();
},

  'change #avatarImage3': function (e, template) {
   
    if (e.currentTarget.files && e.currentTarget.files[0]) {
 console.log("click upload button"+e.currentTarget.files.getAsDataURL());
}
},

  'change #avatarImage': function (e, template) {
    console.log("click upload button");

// var encrypt = function encrypt(data) {
//   return someHowEncryptAndReturnAsBase64(data);
// };

// var zip = function zip(data) {
//   return someHowZipAndReturnAsBase64(data);
// };

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
//var idcanvas = template.find("#idcanvas");
//var ctx = idcanvas.getContext("2d");

      var upload = Images.insert({
        //campingcarid: FlowRouter.getParam("_id"),
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

// var upload = Images.insert({
//   file: idcanvas.toDataURL('image/png/jpeg/jpg'),
//   isBase64: true, // <— Mandatory
//   fileName: 'pic2.png' // <— Mandatory
//        });

      


      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          //ctx.drawImage(e.currentTarget.files[0],100,100);
          //console.log("file obj : "+JSON.stringify(fileObj));
          //var myDataURL = idcanvas.toDataURL('image/png/jpeg/jpg');
//console.log("My data url: "+JSON.stringify(fileObj.data));
          alert('File "' + JSON.stringify(fileObj) + '" successfully uploaded');
                        var sup = fileObj.path.split('../../../../../public');
              
// var idimg = template.find("#profileimg");
// var idcanvas = template.find("#idcanvas");
// var ctx = idcanvas.getContext('2d');
// console.log("id canvas: ");
// ctx.drawImage(idimg, 0, 0);
// console.log("id drawImage: ");
// var myDataURL = idcanvas.toDataURL('image/png/jpeg/jpg');
// console.log("My data url: "+myDataURL);

// Meteor.call('UploadFile', fileObj.name,  "0", new Buffer(myDataURL, 'ascii').toString('base64'),function(error, result){
//           if (!error){
//             console.log("result upload: "+JSON.stringify(result));
//           }
//           else{
// console.log("result upload error: "+JSON.stringify(error));
//           }
//         });

var dig = '{"images":"'+sup[1]+'"}';
//console.log("DIG: "+dig);
var dig2 = '{"userimage":"'+sup[1]+'"}';
var js2 = JSON.parse(dig2); 
var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, 
            {
            $set: js
        }
        , {
          upsert: true
        });
CampingCars.update({
            userid: Meteor.userId()
        }, 
            {
            $set: js2
        }
        , {
          upsert: true
        });

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
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      console.log("currentTarget file: "+JSON.stringify(e.currentTarget.files));
      var upload = Images.insert({
        //campingcarid: FlowRouter.getParam("_id"),
        file: e.currentTarget.files[0],
        //file: 'base64str…',
        //isBase64: true, // <— Mandatory
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });
      
      // upload.on('uploaded', function (error, fileObj) {
      //   if (!error) {
      //     alert('File "' + fileObj.name + '" successfully uploaded');
      //   }
      // });
      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          console.log("file obj : "+JSON.stringify(fileObj));
          //var cursor = Images.findOne({_id: fileObj._id});
          //console.log("cursor link : "+cursor.link());
          alert('File "' + fileObj.name + '" successfully uploaded');
                                  var sup = fileObj.path.split('../../../../../public');
//       var idimg = template.find("#licenseImage");
//           var idcanvas = template.find("#idcanvas");
//           var ctx = idcanvas.getContext('2d');

// ctx.drawImage(idimg, 0, 0);

var dig = '{"licenseimages":"'+sup[1]+'","licensestatus":"new"}';

var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });

        }
        template.currentUpload.set(false);
      });

      upload.start();




// var idcanvas2 = template.find("#idcanvas");

// var myDataURL = idcanvas2.toDataURL('image/jpeg');


// var myBase64Data = myDataURL.split(',')[1];

// function arrayBufferToBase64(ab){

//     var dView = new Uint8Array(ab);   //Get a byte view        

//     var arr = Array.prototype.slice.call(dView); //Create a normal array        

//     var arr1 = arr.map(function(item){        
//       return String.fromCharCode(item);    //Convert
//     });

//     return window.btoa(arr1.join(''));   //Form a string

// }
//example:
//var buf = new Uint8Array([11,22,33]);
//var buff = arrayBufferToBase64(ctx.getImageData(0,0,150,150).data); //"CxYh"
// Meteor.call('UploadFile', "identite.jpeg",  "0", myBase64Data.toString() ,function(error, result){
//           if (!error){
//             console.log("result upload: "+JSON.stringify(result));
//           }
//           else{
// console.log("result upload error: "+JSON.stringify(error));
//           }
//         });


    }
    else
    {

    }



  },
  'change #idcanvas': function (e, template) {
   
 //   if (e.currentTarget.files && e.currentTarget.files[0]) {
 console.log("change canvas");
//}
}

   });
import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { request } from "meteor/froatsnook:request";
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
    if(usersdatasubs.ready()){
    }
  
});

  this.currentUpload = new ReactiveVar(false);
  this.imagedata = new ReactiveVar(false);


});

  Template.profilesection.onRendered(function() {

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
       console.log("Collection find count: "+Images.find().count);
    return Images.find();
},

base64img: function(){
 return Template.instance().imagedata.get();
},
userdata:function(){
return UsersData.find({_id:Meteor.userId()}).fetch()[0];
},



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

'click .avatar-upload-button': function (e, template){
  e.preventDefault();
  var inp = template.find('#avatarImage');
  inp.click();
},

'click .license-upload': function(e, template){
  e.preventDefault();
  var userdd = UsersData.find({_id:Meteor.userId()}).fetch()[0];
  if(userdd.licensestatus == null)
  {
  var inp = template.find('#licenseImage');
  inp.click();
}
else
{

}
},

'click .cartid-upload': function(e, template){
  e.preventDefault();
  var userdd = UsersData.find({_id:Meteor.userId()}).fetch()[0];
  if(userdd.cartidstatus == null)
  {
  var inp2 = template.find('#cartidImage');
  inp2.click(); 
  }
  else{

  }
},

'click .iban-upload': function(e, template){
  e.preventDefault();
  var userdd = UsersData.find({_id:Meteor.userId()}).fetch()[0];
  if(userdd.ibanstatus == null)
  {
  var inp3 = template.find('#ibanImage');
  inp3.click(); 
  }
  else{
    
  }
},

'click #outpoupselect': function(event, template){
      
    event.preventDefault();
     var outpoupselect= template.find('#outpoupselect');
     var lemonselect = template.find('#lemonselect');
    var section = template.find('.section-container');
var lemonerror = template.find('#lemonerror');
        section.style.filter = null;
        section.style.opacity = null;
      if(lemonselect.style.display == 'inline-block'|| lemonerror.style.display == 'inline-block')
        { 
          lemonerror.style.display = 'none'
          lemonselect.style.display = 'none';
          event.currentTarget.style.display = 'none';
        }
      else
        {
        }

},

'click #registlemon':function(e, template){

var section = template.find('.section-container');
var lemonerror = template.find('#lemonerror');
var outpoupselect = template.find('#outpoupselect');
var lemonerrortext = template.find('#lemonerrortext');
var sendimg = template.find("#sendimgtolemon");
outpoupselect.style.display = 'none';
lemonerror.style.display = "none";
        section.style.filter = null;
        section.style.opacity = null;

Meteor.call('GetWalletDetails', "", function(error, result){
                      if(!error){
                         console.log("Wallet result: "+JSON.stringify(result.data));
                         if(result.data.d.WALLET == null)
                         {
                          //Pas de wallet
                          Meteor.call('RegisterWallet', "", function(error, result){
                              if(!error){
                              if(result.data.d.WALLET){

                          var userdat = UsersData.find({_id:Meteor.userId()}).fetch()[0];
                          var docid = 0;
                          //var doctosend = {cartid:{type:"0",tempid:"#cartid"}, iban:{type:"2",tempid:"#iban"}};

                          if(userdat.lemondocid!=null)
                            docid = userdat.lemondocid+1;

                      
  //for (var i = 0; doctosend.length > i; i++)  {

  var idcanvas = template.find("#idcanvas");
  var ctx = idcanvas.getContext('2d');
  var idimg = template.find("#cartid");
idcanvas.height = idimg.height;
idcanvas.width = idimg.width;
  ctx.drawImage(idimg, 0, 0);
  //, 104, 124, 0, 0, idimg.width, idimg.height

var typeimg = "png";

if(idimg.src.search('.jpeg')!=-1)
      typeimg = "jpeg";

if(idimg.src.search('.png')!=-1)
      typeimg = "png";


if(idimg.src.search('.jpg')!=-1)
      typeimg = "jpg";


if(idimg.src.search('.gif')!=-1)
      typeimg = "gif";


if(idimg.src.search('.bmp')!=-1)
      typeimg = "bmp";

 var myDataURL = template.find("#idcanvas").toDataURL("image/"+typeimg,1.0);

                                Meteor.call('UploadLicense', "carteid."+typeimg, "0", myDataURL, function(error, result){
          if (!error){
                        console.log("result upload: "+JSON.stringify(result.data.d.UPLOAD.ID));
            if(result.data.d.E)
            {
              //erreur de chargement
              alert("Erreur de chargement de l'image");
            }
           if(result.data.d.UPLOAD){
        //       //chargement ok 
               var dig = '{"cartidstatus":"upload","lemoncartid":'+result.data.d.UPLOAD.ID+'}';
               var js = JSON.parse(dig);
         UsersData.update({
             _id: Meteor.userId()
         }, {
             $set: js
         }, {
           upsert: true
         });
           }
    //     section.style.filter = 'blur(2px)';
    //     section.style.opacity = '.5';
    // outpoupselect.style.display = "inline-block";
    // lemonerrortext.innerHTML = "Compte créer";
    // lemonerror.style.display = "inline-block";
    // lemonerror.style.top = '35%';
    // lemonerror.style.left = '28%';
          }
          else{
          }
        });

  idcanvas = null;
  idcanvas = template.find("#idcanvas");
  ctx = null;
  ctx = idcanvas.getContext('2d');
idimg = template.find("#iban");
idcanvas.height = idimg.height;
idcanvas.width = idimg.width;
  ctx.drawImage(idimg, 0, 0);

typeimg = "png";
if(idimg.src.search('.jpeg')!=-1)
      typeimg = "jpeg";

if(idimg.src.search('.png')!=-1)
      typeimg = "png";


if(idimg.src.search('.jpg')!=-1)
      typeimg = "jpg";


if(idimg.src.search('.gif')!=-1)
      typeimg = "gif";


if(idimg.src.search('.bmp')!=-1)
      typeimg = "bmp";
myDataURL = template.find("#idcanvas").toDataURL("image/"+typeimg,1.0);
//send iban
                                Meteor.call('UploadLicense', "iban."+typeimg, "2", myDataURL, function(error, result){
          if (!error){
                        console.log("result upload: "+JSON.stringify(result.data.d.UPLOAD.ID));
            if(result.data.d.E)
            {
              //erreur de chargement
              alert("Erreur de chargement de l'image");
            }
           if(result.data.d.UPLOAD){
        //       //chargement ok 
               var dig = '{"ibanstatus":"upload","lemonibanid":'+result.data.d.UPLOAD.ID+'}';
               var js = JSON.parse(dig);
         UsersData.update({
             _id: Meteor.userId()
         }, {
             $set: js
         }, {
           upsert: true
         });
           }
    //     section.style.filter = 'blur(2px)';
    //     section.style.opacity = '.5';
    // outpoupselect.style.display = "inline-block";
    // lemonerrortext.innerHTML = "Compte créer";
    // lemonerror.style.display = "inline-block";
    // lemonerror.style.top = '35%';
    // lemonerror.style.left = '28%';
          }
          else{
          }
        });




                                  }
                              else{}
                                  }
                              else{

                                  }
                                  });

                         }
                         if(result.data.d.WALLET!=null){
                          console.log("sendimg.click");

                         }
}
else{

}
});

},

'click #sendimgtolemon':function(e, template){

 var idcanvas = template.find("#idcanvas");
 var ctx = idcanvas.getContext('2d');
  var idimg = template.find("#licenseimg");
idcanvas.height = idimg.height;
idcanvas.width = idimg.width;
  ctx.drawImage(idimg, 0, 0);
  //, 104, 124, 0, 0, idimg.width, idimg.height

var typeimg = "png";

if(idimg.src.search('.jpeg')!=-1)
      typeimg = "jpeg";

if(idimg.src.search('.png')!=-1)
      typeimg = "png";


if(idimg.src.search('.jpg')!=-1)
      typeimg = "jpg";


if(idimg.src.search('.gif')!=-1)
      typeimg = "gif";


if(idimg.src.search('.bmp')!=-1)
      typeimg = "bmp";

 var myDataURL = template.find("#idcanvas").toDataURL("image/"+typeimg,1.0);
console.log("myDataURL: "+myDataURL);
Meteor.call('UploadLicense', "license."+typeimg, "14", myDataURL, function(error, result){
          if (!error){
            if(result.d.E)
            {
              //erreur de chargement
              alert("Erreur de chargement de l'image");
            }
            if(result.d.UPLOAD){
              //chargement ok 
              var dig = '{"cartidstatus":"upload","lemondocid":'+result.d.UPLOAD.ID+'}';
              var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });
            }
            console.log("result upload: "+JSON.stringify(result));
          }
          else{
console.log("result upload error: "+JSON.stringify(error));
          }
        });
},

  'change #avatarImage3': function (e, template) {
   
    if (e.currentTarget.files && e.currentTarget.files[0]) {
 console.log("click upload button"+e.currentTarget.files.getAsDataURL());
}
},

  'change #avatarImage': function (e, template) {

    if (e.currentTarget.files && e.currentTarget.files[0]) {


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
          //ctx.drawImage(e.currentTarget.files[0],100,100);
          //console.log("file obj : "+JSON.stringify(fileObj));
          //var myDataURL = idcanvas.toDataURL('image/png/jpeg/jpg');
//console.log("My data url: "+JSON.stringify(fileObj.data));
alert('File "' + fileObj.name + '" successfully uploaded');

                        var sup = fileObj.path.split('../../../../../public');

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
          //console.log("file obj : "+JSON.stringify(fileObj));
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

    }
    else
    {
console.log("change license img else: ");
    }



  },


    'change #cartidImage': function (e, template) {
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
          //console.log("file obj : "+JSON.stringify(fileObj));
          //var cursor = Images.findOne({_id: fileObj._id});
          //console.log("cursor link : "+cursor.link());
          alert('File "' + fileObj.name + '" successfully uploaded');
                                  var sup = fileObj.path.split('../../../../../public');
//       var idimg = template.find("#licenseImage");
//           var idcanvas = template.find("#idcanvas");
//           var ctx = idcanvas.getContext('2d');

// ctx.drawImage(idimg, 0, 0);

var dig = '{"cartidimages":"'+sup[1]+'","cartidstatus":"new"}';

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

    }
    else
    {
    }



  },

   'change #ibanImage': function (e, template) {
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
          //console.log("file obj : "+JSON.stringify(fileObj));
          //var cursor = Images.findOne({_id: fileObj._id});
          //console.log("cursor link : "+cursor.link());
          alert('File "' + fileObj.name + '" successfully uploaded');
                                  var sup = fileObj.path.split('../../../../../public');
//       var idimg = template.find("#licenseImage");
//           var idcanvas = template.find("#idcanvas");
//           var ctx = idcanvas.getContext('2d');

// ctx.drawImage(idimg, 0, 0);

var dig = '{"ibanimages":"'+sup[1]+'","ibanstatus":"new"}';

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

    }
    else
    {
    }



  },

  'load img': function (event, template) {
   

    event.preventDefault();
    
    console.log("event target text: "+event.target.id);
    if(UsersData.find({_id:Meteor.userId()}).fetch()[0])
    {
      var userdat = UsersData.find({_id:Meteor.userId()}).fetch()[0];
    if(event.target.id == "licenseimg" && userdat.licenseimages && userdat.licensestatus == "new" && userdat.firstname && userdat.lastname && userdat.birthdate && userdat.cellphone && userdat.email && userdat.cartidstatus == "upload")
    {
    //   console.log("event client X : "+event.clientY);
    // console.log("event client Y : "+event.clientX);
    // var section = template.find('.section-container');
    // var lemonselect = template.find('#lemonselect');
    // var outpoupselect = template.find('#outpoupselect');
    // var lemonerrortext = template.find('#lemonerrortext');
    //     section.style.filter = 'blur(2px)';
    //     section.style.opacity = '.5';
    // outpoupselect.style.display = "inline-block";
    // lemonselect.style.display = "inline-block";
    // lemonselect.style.top = '35%';
    // lemonselect.style.left = '28%';
}
    if(event.target.id == "iban" && userdat.ibanimages && userdat.ibanstatus == "new" && userdat.cartidimages && userdat.cartidstatus == "new" && userdat.firstname && userdat.lastname && userdat.birthdate && userdat.cellphone && userdat.email)
    {
      console.log("event client X : "+event.clientY);
    console.log("event client Y : "+event.clientX);
    var section = template.find('.section-container');
    var lemonselect = template.find('#lemonselect');
    var outpoupselect = template.find('#outpoupselect');
    var lemonerrortext = template.find('#lemonerrortext');
        section.style.filter = 'blur(2px)';
        section.style.opacity = '.5';
    outpoupselect.style.display = "inline-block";
    lemonselect.style.display = "inline-block";
    lemonselect.style.top = '35%';
    lemonselect.style.left = '28%';
}
}
}

   });

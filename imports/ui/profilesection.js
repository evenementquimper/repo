import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
import { FilesCollection } from 'meteor/ostrio:files';

import './profilesection.html';

 Template.profilesection.onCreated(function() {
    this.autorun(() => {
    this.subscribe('Images');
    //this.subscribe('usersdata');
  });
  this.currentUpload = new ReactiveVar(false);


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
    console.log("Collection find: "+Images.find().cursor);
    //console.log("Collection images car find: "+ImagesCar.find({}).fetch());
    return Images.collection.find({}).fetch();
  },
    uploadedFiles: function () {
      // console.log("Collection find count: "+Images.find().count);
    return Images.find();
},
userdata:function(){
  if(Meteor.userId())
  {
    if(UsersData.find({_id:Meteor.userId()}))
    {
return UsersData.find({_id:Meteor.userId()}).fetch()[0];
    }
    else
    {
      return false
    }
    //console.log("User ID: "+UsersData.find({_id:Meteor.userId()}).fetch()[0].firstname);
    
  }
  else
  {
    return false;
  }
}


});
  Template.profilesection.events({
  'input .data-item': function (event, template) {
event.preventDefault(); 
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
//console.log("DIG: "+dig);

//if(event.currentTarget.name=="iban")
//{
//console.log("Iban number");
//var ibanval = event.currentTarget.value;
//var ibanerror = template.find('#ibanerror');
//console.log("IBAN valid: "+IBAN.isValid('BE68539007547034'));
//console.log("IBAN2 valid: "+IBAN.isValid('FR76160061001110'));
//if(IBAN.isValid(ibanval)==true)
 // {
  //  ibanerror.style.display = "none";
//}
//else
//{
//ibanerror.style.display = "inline-block";
//console.log("Label: "+ibanerror.innerHTML);
//}
//}
//else
//{
var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });

//}
  },

'dp.change .datetimepicker': function(event, instance){
 event.preventDefault();
console.log("datepick chage"+$('.datetimepicker').data().date);

      var dig = '{"birthdate":"'+$('.datetimepicker').data().date+'"}';
console.log("DIG: "+dig);

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
console.log("event text area: "+event.type);
//
//var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value.replace(/\n|\r|\0|\t/g,'')+'"}';
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';

console.log("value length: "+event.currentTarget.value);
console.log("DIG: "+dig);
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

'click .license-upload-button': function(e, template){
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
                        var sup = fileObj.path.split('../../../../../public');
              console.log("Split 1: "+sup[0]);
              console.log("Split 2: "+sup[1]);
          alert('Split 01:"' + sup[0] + '" & sup 02:"' + sup[1] + '" successfully uploaded');
//sauvegarde de id de l'image ds la bdd du camping car
//$addToSet

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
                                  var sup = fileObj.path.split('../../../../../public');
              console.log("Split 1: "+sup[0]);
              console.log("Split 2: "+sup[1]);
          alert('Split 01:"' + sup[0] + '" & sup 02:"' + sup[1] + '" successfully uploaded');
//sauvegarde de id de l'image ds la bdd du camping car


var dig = '{"licenseimages":"'+sup[1]+'"}';
console.log("DIG: "+dig);

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
      console.log("ELSE");
    }
  }

   });
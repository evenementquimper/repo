import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { FilesCollection } from 'meteor/ostrio:files';

import './mlsectioncontentbasics.html';

var metanbr;
 Template.mlsectioncontentbasics.onCreated(function() {


  Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('Images');
    Meteor.subscribe('addons');
    Meteor.subscribe('reservations');
    Meteor.subscribe('usersdata');
});
  this.currentUpload = new ReactiveVar(false);
//TAPi18n.setLanguage("fr");
});
Template.mlsectioncontentbasics.onRendered(function() {

 var linkInfo = {rel: "icon", sizes:"16x16 32x32", href: "/favicon.ico?v=3"};
 DocHead.addLink(linkInfo);
 metanbr=0;

});

 Template.mlsectioncontentbasics.helpers({
    campingcars: function(){
      if(Meteor.userId()!==CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].userid)
      {
         FlowRouter.go("index");
         return true;
      }
      // if(Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP))
      // {
      //   return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
      // }
      else
      {
          metanbr++;

          if(metanbr==1){
          var bdd = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
          DocHead.setTitle(bdd.name+"|Présentation|Le Bon Camping-car");
          var cont = bdd.description+" places "+bdd.maxGuests+" lits "+bdd.beds;
          var metaInfo = {name: "description", content: cont};
          DocHead.addMeta(metaInfo);  

          }
          else
          {

          }
          
          return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];

      }
}

});

  Template.mlsectioncontentbasics.events({


'click .greycard-upload': function (e, template){
  e.preventDefault();
  var inp = template.find('#greycardImage');
  inp.click();
},

   'change #greycardImage': function (e, template) {
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


var dig = '{"greycardimages":"'+sup[1]+'"}';
console.log("DIG: "+dig);

var js = JSON.parse(dig);
        CampingCars.update({
            _id:FlowRouter.getParam("_id")
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
  },

  'click .insurance-upload': function (e, template){
  e.preventDefault();
  var inp = template.find('#insuranceImage');
  inp.click();
},

   'change #insuranceImage': function (e, template) {
    //console.log("click upload button");
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
              //console.log("Split 1: "+sup[0]);
              //console.log("Split 2: "+sup[1]);
          //alert('Split 01:"' + sup[0] + '" & sup 02:"' + sup[1] + '" successfully uploaded');
//sauvegarde de id de l'image ds la bdd du camping car


var dig = '{"insuranceimages":"'+sup[1]+'"}';
//console.log("DIG: "+dig);

var js = JSON.parse(dig);
        CampingCars.update({
            _id:FlowRouter.getParam("_id")
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
      //console.log("ELSE");
    }
  },

  'input .data-item': function (event, template) {
event.preventDefault(); 
//console.log("event: "+event.type);
    var routeid = FlowRouter.getParam('_id');
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
//console.log("DIG: "+dig);

var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
  },

  'input .datatext-item': function (event, template) {
event.preventDefault(); 
    var routeid = FlowRouter.getParam('_id');
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value.replace(/\n|\r|\0|\t/g,'')+'"}';
//console.log("value length: "+event.currentTarget.value.replace(/\n|\r|\0|\t/g,''));
//console.log("DIG: "+dig);
var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
  },

'click .text-item': function(event, template){
  
  var lab = event.currentTarget.children[0];
  var inp = event.currentTarget.children[1];
  var hli = event.currentTarget.children[3];
  inp.style.display = "inline-block";
  var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
  lab.style = nstyle;
  lab.style.top = "38px";
  lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
  lab.style.cursor = "text";
  lab.style.color ="rgba(86,90,92,0.5)";
  var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
  hli.style.transform = "scaleX(1)";

},

'click .select-item': function(event, template){
//console.log("click current text-item label style width: "+event.currentTarget.children[0].style.position);
var lab = event.currentTarget.children[0];
var inp = event.currentTarget.children[1];
var hli = event.currentTarget.children[3];
//console.log("Label: "+lab.innerHTML);
inp.style.display = "inline-block";

var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
lab.style = nstyle;
//lab.style.;
lab.style.top = "38px";
lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
//lab.style.;
lab.style.cursor = "text";
//lab.style.; 244, 67, 54
lab.style.color ="rgba(86,90,92,0.5)";
//lab.innerHTML = "Vehicle Model";

var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
hli.style.transform = "scaleX(1)";

//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);

},

   });
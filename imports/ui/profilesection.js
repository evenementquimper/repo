import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { request } from "meteor/froatsnook:request";
import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
import { FilesCollection } from 'meteor/ostrio:files';
import { Prospects } from '../api/prospects.js';
import { check } from 'meteor/check';

import './profilesection.html';

 Template.profilesection.onCreated(function() {

  this.autorun(() => {

    const prospectsdatasubs = this.subscribe('myprospects', {
  onStop : function (error){
  },
  onReady :function(){
  }

});

    const usersdatasubs = this.subscribe('myusersdata', {
  onStop : function (error){
  },
  onReady :function(){
  }

});

    const campingcarssubs = this.subscribe('campingcars');
    this.subscribe('Images');
  
});

  this.currentUpload = new ReactiveVar(false);
  this.imagedata = new ReactiveVar(false);


});

  Template.profilesection.onRendered(function() {

this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        viewMode:'years'

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
  return Images.find({}).fetch()[0];
},
uploadedFiles: function () {
  return Images.find();
},

base64img: function(){
 return Template.instance().imagedata.get();
},

userdata:function(){
return UsersData.find({}).fetch()[0];
},

prospects:function(){
return Prospects.find({}).fetch();
}

});
  Template.profilesection.events({
  'input .data-item': function (event, template) {
event.preventDefault(); 
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';

if(event.currentTarget.name=="iban")
{

var ibanval = event.currentTarget.value;
var ibanerror = template.find('#ibanerror');
if(IBAN.isValid(ibanval)==true)
 {
   ibanerror.style.display = "none";

         Meteor.call('RegisterIBAN', function(error, result){
          if (!error){

          }
          else{
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

'click .licensepdf':function(event, template){
  event.preventDefault();

  var useraadd = UsersData.find({_id:Meteor.userId()}).fetch()[0];
  
  if(useraadd.licensebase64.pdf != null)
  window.open(useraadd.licensebase64.pdf,"","");
  
},

'click .ibanpdf':function(event, template){
event.preventDefault();

  var useriadd = UsersData.find({_id:Meteor.userId()}).fetch()[0];
  
  if(useriadd.ibanbase64.pdf != null)
  window.open(useriadd.ibanbase64.pdf,"","");
  
},

'click .cartidpdf':function(event, template){
event.preventDefault();

  var usericdd = UsersData.find({_id:Meteor.userId()}).fetch()[0];
  
  if(usericdd.cartidbase64.pdf != null)
  window.open(usericdd.cartidbase64.pdf,"","");
  
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
'click #testwait':function(e, template){
  e.preventDefault();
  var outpoupselect= template.find('#outpoupselect');
  var lemonselect = template.find('#lemonselect');
  var section = template.find('.section-container');
  var lemonerror = template.find('#lemonerror');
  var testwait = template.find('#testwait');
  var infocase = template.find('#infocase');
  var cleaninfo = template.find('#cleaninfo');
  infocase.innerHTML = 'Veuillez patienter';
  e.currentTarget.style.display = 'none';
  outpoupselect.style.cursor = 'wait';
Meteor.setTimeout(fin, 10000);

function fin()
{
   console.log("*** fin() ***");
     testwait.style.cursor = 'pointer';
  outpoupselect.style.cursor = 'pointer';
  infocase.innerHTML = 'Demande de Validation du compte (2 à 3 jours de délai)';
          section.style.filter = null;
        section.style.opacity = null;
        testwait.style.display = null;
        testwait.style.textAlign = 'right';
        cleaninfo.style.display = null;

}

},

'click #cleaninfo':function(e, template){
  e.preventDefault();
  var outpoupselect= template.find('#outpoupselect');
  var lemonselect = template.find('#lemonselect');
  var section = template.find('.section-container');
  var lemonerror = template.find('#lemonerror');
  var infocase = template.find('#infocase');
  e.currentTarget.style.display = 'none';

        //outpoupselect.style.cursor = 'wait';

        section.style.filter = null;
        section.style.opacity = null;
      if(lemonselect.style.display == 'inline-block'|| lemonerror.style.display == 'inline-block')
        { 
          lemonerror.style.display = 'none'
          lemonselect.style.display = 'none';
          outpoupselect.style.display = 'none';
        }
      else
        {
        }
},

'click #registlemonbase64':function(e, template){
  e.preventDefault();
  var outpoupselect= template.find('#outpoupselect');
  var lemonselect = template.find('#lemonselect');
  var section = template.find('.section-container');
  var lemonerror = template.find('#lemonerror');
  var infocase = template.find('#infocase');
  var cleaninfo = template.find('#cleaninfo');
  infocase.innerHTML = 'Veuillez patienter...';
  e.currentTarget.style.display = 'none';
  outpoupselect.style.cursor = 'wait';
  cleaninfo.style.display = 'none';
        //outpoupselect.style.cursor = 'wait';

      //   section.style.filter = null;
      //   section.style.opacity = null;
      // if(lemonselect.style.display == 'inline-block'|| lemonerror.style.display == 'inline-block')
      //   { 
      //     lemonerror.style.display = 'none'
      //     lemonselect.style.display = 'none';
      //     outpoupselect.style.display = 'none';
      //   }
      // else
      //   {
      //   }
        infocase.innerHTML = 'Vérification...';
  Meteor.call('GetWalletDetails', "", function(error, result){
                      if(!error){
                        console.log("result getwallet: "+JSON.stringify(result.data.d));
                         if(result.data.d.WALLET == null && result.data.d.E != null)
                         {
                           infocase.innerHTML = 'Création Compte...';
                             Meteor.call('RegisterWallet', "", function(error, result){
                              if(!error)
                              {
                                //console.log("result lemonway: "+JSON.stringify(result.data.d));
                              if(result.data.d.WALLET && result.data.d.E == null){
                               
                          var userdt = UsersData.find({_id:Meteor.userId()}).fetch()[0];

                            if(userdt.cartidbase64){
                                var typeimg = "pdf";
                                var docsd= null;
                              if(userdt.cartidbase64.img){
                               

                                  if(userdt.cartidbase64.img.search('data:image/jpeg')!=-1)
                                      typeimg = "jpeg";

                                  if(userdt.cartidbase64.img.search('data:image/png')!=-1)
                                        typeimg = "png";

                                  if(userdt.cartidbase64.img.search('data:image/jpg')!=-1)
                                        typeimg = "jpg";

                                  if(userdt.cartidbase64.img.search('data:image/gif')!=-1)
                                        typeimg = "gif";

                                  if(userdt.cartidbase64.img.search('data:image/bmp')!=-1)
                                        typeimg = "bmp";

                                      docsd = userdt.cartidbase64.img;
                              }
                              if(userdt.cartidbase64.pdf){
                                docsd = userdt.cartidbase64.pdf.replace(/^data:application\/(pdf);base64,/,'');
                              }
                              else{

                              }
                 infocase.innerHTML = 'Chargement carte identité';
   Meteor.call('UploadLicense', "carteidpdf."+typeimg, "0", docsd, function(error, result){
          if (!error){
            if(result.data.d.E)
            {
              //erreur de chargement
              //alert("Erreur de chargement de l'image");
              infocase.innerHTML = 'Erreur Chargement carte identité '+result.data.d.E;
            }
           if(result.data.d.UPLOAD){
        infocase.innerHTML = 'Chargement carte identité teminé';
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
          }
          else{
          }
        });

                                        }
                                      else
                                      { 
                                        }



                            if(userdt.ibanbase64){
                                var ibandoctype = "pdf";
                                var ibandoc= null;
                              if(userdt.ibanbase64.img){
                               

                                  if(userdt.ibanbase64.img.search('data:image/jpeg')!=-1)
                                      ibandoctype = "jpeg";

                                  if(userdt.ibanbase64.img.search('data:image/png')!=-1)
                                        ibandoctype = "png";

                                  if(userdt.ibanbase64.img.search('data:image/jpg')!=-1)
                                        ibandoctype = "jpg";

                                  if(userdt.ibanbase64.img.search('data:image/gif')!=-1)
                                        ibandoctype = "gif";

                                  if(userdt.ibanbase64.img.search('data:image/bmp')!=-1)
                                        ibandoctype = "bmp";

                                      ibandoc = userdt.ibanbase64.img;
                              }
                              if(userdt.ibanbase64.pdf){
                                ibandoc = userdt.ibanbase64.pdf.replace(/^data:application\/(pdf);base64,/,'');
                              }
                              else{

                              }
                         infocase.innerHTML = 'Chargement R.I.B...';
   Meteor.call('UploadLicense', "iban."+typeimg, "2", ibandoc, function(error, result){
          if (!error){
            if(result.data.d.E)
            {
              //erreur de chargement
              infocase.innerHTML = 'Erreur Chargement R.I.B '+result.data.d.E;
              //alert("Erreur de chargement de l'image");
            }
           if(result.data.d.UPLOAD){
             infocase.innerHTML = 'Chargement R.I.B Terminé';
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
          }
          else{
          }
        });


                                        }
                                      else
                                      { 
                                        }

                              if(userdt.licensebase64){
                                var licensedoctype = "pdf";
                                var licensedoc= null;
                              if(userdt.licensebase64.img){
                               

                                  if(userdt.licensebase64.img.search('data:image/jpeg')!=-1)
                                      licensedoctype = "jpeg";

                                  if(userdt.licensebase64.img.search('data:image/png')!=-1)
                                        licensedoctype = "png";

                                  if(userdt.licensebase64.img.search('data:image/jpg')!=-1)
                                        licensedoctype = "jpg";

                                  if(userdt.licensebase64.img.search('data:image/gif')!=-1)
                                        licensedoctype = "gif";

                                  if(userdt.licensebase64.img.search('data:image/bmp')!=-1)
                                        licensedoctype = "bmp";

                                      licensedoc = userdt.licensebase64.img;
                              }
                              if(userdt.licensebase64.pdf){
                                licensedoc = userdt.licensebase64.pdf.replace(/^data:application\/(pdf);base64,/,'');
                              }
                              else{

                              }
                                 infocase.innerHTML = 'Chargement Permis..';                      //send pdf test
   Meteor.call('UploadLicense', "license."+licensedoctype, "14", licensedoc, function(error, result){
          if (!error){
            if(result.data.d.E)
            {
              //erreur de chargement
              //alert("Erreur de chargement de l'image");
              infocase.innerHTML = 'Erreur Chargement Permis '+result.data.d.E;
            }
           if(result.data.d.UPLOAD){
        //       //chargement ok
        infocase.innerHTML = 'Chargement Permis Terminé';
        infocase.innerHTML = 'Création Compte Terminé';
        outpoupselect.style.cursor = null;
        cleaninfo.style.display = null;
               var dig = '{"licensestatus":"upload","lemonlicenseid":'+result.data.d.UPLOAD.ID+'}';
               var js = JSON.parse(dig);
         UsersData.update({
             _id: Meteor.userId()
         }, {
             $set: js
         }, {
           upsert: true
         });
           }
          }
          else{
          }
        });

                                        }
                                      else
                                      {
                                        infocase.innerHTML = 'Création compte Annulé';
                                        outpoupselect.style.cursor = null;
                                        cleaninfo.style.display = null;
                                      //console.log("error lemonway: "+error); 
                                        }
                               
                              }
                            }
                            else{
                              infocase.innerHTML = 'Création compte Annulé';
                              outpoupselect.style.cursor = null;
                              cleaninfo.style.display = null;
                       //console.log("error lemonway: "+error);
                            }
                          });

                         }
                         else
                         {
                           infocase.innerHTML = 'Compte existant';
                            outpoupselect.style.cursor = null;
                            cleaninfo.style.display = null;
                         }
                       }
                       else{
                        infocase.innerHTML = 'Création compte Annulé';
                        outpoupselect.style.cursor = null;
                        cleaninfo.style.display = null;
                       }
                     });

},


  'change #avatarImage3': function (e, template) {
   
    if (e.currentTarget.files && e.currentTarget.files[0]) {
 //console.log("click upload button"+e.currentTarget.files.getAsDataURL());
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
         e.currentTarget.style.cursor = 'wait';
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
           e.currentTarget.style.cursor = 'pointer';
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
                  e.preventDefault();
  var outpoupselect= template.find('#outpoupselect');
  var lemonselect = template.find('#lemonselect');
  var section = template.find('.section-container');
  var lemonerror = template.find('#lemonerror');
  var infocase = template.find('#infocase');
  var cleaninfo = template.find('#cleaninfo');
  var section = template.find('.section-container');
  var registlemonbase64 = template.find('#registlemonbase64');



    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
  
             // Select the very first file from list
            var fileToLoad = e.currentTarget.files[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var pdfbase64;

            fileReader.onloadstart = function(){
        section.style.filter = 'blur(2px)';
        section.style.opacity = '.5';
    outpoupselect.style.display = "inline-block";
    lemonselect.style.display = "inline-block";
    lemonselect.style.top = '35%';
    lemonselect.style.left = '28%';
  infocase.innerHTML = 'Veuillez patienter...';
  e.currentTarget.style.display = 'none';
  outpoupselect.style.cursor = 'wait';
  registlemonbase64.style.display = 'none';
  cleaninfo.style.display = 'none';
            };

            fileReader.onerror = function(event){
        outpoupselect.style.cursor = null;
        infocase.innerHTML = 'Erreur '+event.target.error.code;
        cleaninfo.style.display = null;
            };

            fileReader.onload = function(fileLoadedEvent, filename) {
  //e.currentTarget.style.cursor = 'wait';
                pdfbase64 = fileLoadedEvent.target.result;

var dig= null;

if( /\.(jpe?g|png|jpg)$/i.test(fileToLoad.name)) 
dig = '{"licensebase64":{"img":"'+pdfbase64+'"},"license64status":"none"}';


if( /\.(pdf)$/i.test(fileToLoad.name)) 
dig = '{"licensebase64":{"pdf":"'+pdfbase64+'"},"license64status":"none"}';


var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });
        Meteor.reconnect();


            };
            
            fileReader.onloadend = function(){
              outpoupselect.style.cursor = null;
              infocase.innerHTML = 'Chargement Terminé';

              var userdat = UsersData.find({_id:Meteor.userId()}).fetch()[0];

              if(userdat.ibanbase64 && userdat.lemonibanid == null && userdat.cartidbase64 && userdat.lemoncartid == null && userdat.licensebase64 && userdat.lemonlicenseid == null && userdat.firstname && userdat.lastname && userdat.birthdate && userdat.cellphone && userdat.email)
                {
                  infocase.innerHTML = 'Demande de Validation du compte (2 à 3 jours de délai)';
                  //registlemonbase64.style.display = null;
                                    cleaninfo.style.display = null;  
                }
              else{

                  infocase.innerHTML = 'Chargement Terminé';
                  cleaninfo.style.display = null;  
                }
            };
       
            fileReader.readAsDataURL(fileToLoad, fileToLoad.name);
    }
    else
    {
    }



  },


    'change #cartidImage': function (e, template) {

              e.preventDefault();
  var outpoupselect= template.find('#outpoupselect');
  var lemonselect = template.find('#lemonselect');
  var section = template.find('.section-container');
  var lemonerror = template.find('#lemonerror');
  var infocase = template.find('#infocase');
  var cleaninfo = template.find('#cleaninfo');
  var section = template.find('.section-container');
  var registlemonbase64 = template.find('#registlemonbase64');

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
             // Select the very first file from list
            var fileToLoad = e.currentTarget.files[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var pdfbase64;

            fileReader.onloadstart = function(){
              section.style.filter = 'blur(2px)';
              section.style.opacity = '.5';
              outpoupselect.style.display = "inline-block";
              lemonselect.style.display = "inline-block";
              lemonselect.style.top = '35%';
              lemonselect.style.left = '28%';
              infocase.innerHTML = 'Veuillez patienter...';
              e.currentTarget.style.display = 'none';
              outpoupselect.style.cursor = 'wait';
              registlemonbase64.style.display = 'none';
              cleaninfo.style.display = 'none';
            };

            fileReader.onerror = function(event){
              outpoupselect.style.cursor = null;
              infocase.innerHTML = 'Erreur '+event.target.error.code;
              cleaninfo.style.display = null;
            };
            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent, filename) {
                pdfbase64 = fileLoadedEvent.target.result;
                         

var dig= null;

if( /\.(jpe?g|png|jpg)$/i.test(fileToLoad.name)) 
dig = '{"cartidbase64":{"img":"'+pdfbase64+'"},"cartid64status":"none"}';


if( /\.(pdf)$/i.test(fileToLoad.name)) 
dig = '{"cartidbase64":{"pdf":"'+pdfbase64+'"},"cartid64status":"none"}';


var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });
        Meteor.reconnect();

            };

            fileReader.onloadend = function(){
              outpoupselect.style.cursor = null;
              infocase.innerHTML = 'Chargement Terminé';

          var userdat = UsersData.find({_id:Meteor.userId()}).fetch()[0];
          
    if(userdat.ibanbase64 && userdat.lemonibanid == null && userdat.cartidbase64 && userdat.lemoncartid == null && userdat.licensebase64 && userdat.lemonlicenseid == null && userdat.firstname && userdat.lastname && userdat.birthdate && userdat.cellphone && userdat.email)
    {
      infocase.innerHTML = 'Demande de Validation du compte (2 à 3 jours de délai)';
      //registlemonbase64.style.display = null;
            cleaninfo.style.display = null;  
    }
    else{

      infocase.innerHTML = 'Chargement Terminé';
      cleaninfo.style.display = null;  
    }
            };
            fileReader.readAsDataURL(fileToLoad, fileToLoad.name);

    }
    else
    {
    }



  },

   'change #ibanImage': function (e, template) {
                  e.preventDefault();
  var outpoupselect= template.find('#outpoupselect');
  var lemonselect = template.find('#lemonselect');
  var section = template.find('.section-container');
  var lemonerror = template.find('#lemonerror');
  var infocase = template.find('#infocase');
  var cleaninfo = template.find('#cleaninfo');
  var section = template.find('.section-container');
  var registlemonbase64 = template.find('#registlemonbase64');

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected

            var fileToLoad = e.currentTarget.files[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var pdfbase64;

            fileReader.onloadstart = function(){
        section.style.filter = 'blur(2px)';
        section.style.opacity = '.5';
    outpoupselect.style.display = "inline-block";
    lemonselect.style.display = "inline-block";
    lemonselect.style.top = '35%';
    lemonselect.style.left = '28%';
  infocase.innerHTML = 'Veuillez patienter...';
  e.currentTarget.style.display = 'none';
  outpoupselect.style.cursor = 'wait';
  registlemonbase64.style.display = 'none';
  cleaninfo.style.display = 'none';
            };

            fileReader.onerror = function(event){
        outpoupselect.style.cursor = null;
        infocase.innerHTML = 'Erreur '+event.target.error.code;
        cleaninfo.style.display = null;
            };

            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent, filename) {
                pdfbase64 = fileLoadedEvent.target.result;

var dig= null;

if( /\.(jpe?g|png|jpg)$/i.test(fileToLoad.name)) 
dig = '{"ibanbase64":{"img":"'+pdfbase64+'"},"iban64status":"none"}';


if( /\.(pdf)$/i.test(fileToLoad.name)) 
dig = '{"ibanbase64":{"pdf":"'+pdfbase64+'"},"iban64status":"none"}';


var js = JSON.parse(dig);
        UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: js
        }, {
          upsert: true
        });
        Meteor.reconnect();

            };

            fileReader.onloadend = function(){
              outpoupselect.style.cursor = null;
              infocase.innerHTML = 'Chargement Terminé';

                   var userdat = UsersData.find({_id:Meteor.userId()}).fetch()[0];

    if(userdat.ibanbase64 && userdat.lemonibanid == null && userdat.cartidbase64 && userdat.lemoncartid == null && userdat.licensebase64 && userdat.lemonlicenseid == null && userdat.firstname && userdat.lastname && userdat.birthdate && userdat.cellphone && userdat.email)
    {
      infocase.innerHTML = 'Chargement Terminé';
      infocase.innerHTML = 'Demande de Validation du compte (2 à 3 jours de délai)';
      //registlemonbase64.style.display = null;
           cleaninfo.style.display = null; 
}
else{

      infocase.innerHTML = 'Chargement Terminé';
      cleaninfo.style.display = null;  
}
            };
       
            fileReader.readAsDataURL(fileToLoad, fileToLoad.name);

    }
    else
    {
    }



  },

'click .parrainckb': function(event, template){
       event.preventDefault();
  var parrainsection = template.find('.parrainsection');
  if(UsersData.find({}).fetch()[0].contactslistID == null)
  {
   parrainsection.style.display = null;

   Meteor.call('mailjetnewcontactlist', function(error, result){
           if (!error){
            if(result.Data && result.Data[0].ID)
            {
           UsersData.update({
            _id: Meteor.userId()
        }, {
            $set: {contactslistID:result.Data[0].ID}
        });
         }
           }
            else{

            }});
         
   
  }
  else
  {
        //        UsersData.update({
        //     _id: Meteor.userId()
        // }, {
        //     $set: {contactslistID:null}
        // });
  }

},

'click .newprospect': function(event, template){
     event.preventDefault();

if(UsersData.find({}).fetch()[0] && UsersData.find({}).fetch()[0].newprospectemail && /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(UsersData.find({}).fetch()[0].newprospectemail))
{
var mailjetcontactemail = UsersData.find({}).fetch()[0].newprospectemail;
var mailjetcontactfirstname = UsersData.find({}).fetch()[0].newprospectfirstname;
var mailjetcontactlastname = UsersData.find({}).fetch()[0].newprospectlastname;

if(Prospects.find({email:mailjetcontactemail}).count()==0)
{
                //add new prospect ok ds la list de contact
                            Prospects.insert({
            email: mailjetcontactemail,
            parrainid : Meteor.userId(),
            email : mailjetcontactemail,
            contactfirstname : mailjetcontactfirstname,
            contactlastname : mailjetcontactlastname,
            regist: true});

            var prosp = Prospects.find({email:mailjetcontactemail}).fetch()[0];

 Meteor.call('mailjetnewcontacttolist', mailjetcontactemail, event.currentTarget.id, function(error, result){
          if (!error){
            if(result.Count && result.Count == 1)
            {
                           Prospects.update({
                              _id: prosp._id
                            },{
                              $set: {regist: "sendmail"}
                            });
                            alert("Contact Ajouter");
            }
          }
          else
          {
             alert("Erreur :"+error);
          }
});
}
else
{
  var prospectexist = Prospects.find({email:mailjetcontactemail}).fetch()[0];
  if(prospectexist.regist==false)
  {
                           Prospects.update({
                              _id: prospectexist._id
                            },{
                              $set: {regist: true}
                            });
                               alert('Contact Ajouter'); 
  }
  else
  {
    alert('Contact existant!');  
  }
}


}
else
{
  alert('Email non valide');
}
},

'click .prospectdel': function(event, template){
  event.preventDefault();
                            Prospects.update({
                              _id: event.currentTarget.id
                            },{
                              $set: {regist: false}
                            }, {
                            upsert: true  
                            });
                            alert("Contact Supprimer");
},

'click .openinfobul': function(event, template){
event.preventDefault();

  var lemonwayregister = template.find('.LemonwayRegister');
  lemonwayregister.style.display = 'inline-block';
    var section = template.find('.section-container');
    var lemonselect = template.find('#lemonselect');
    var outpoupselect = template.find('#outpoupselect');
    var lemonerrortext = template.find('#lemonerrortext');
    var registlemonbase64 = template.find('#registlemonbase64');
    var infocase = template.find('#infocase');
    infocase.innerHTML = 'Demande de Validation du compte (2 à 3 jours de délai)';
        section.style.filter = 'blur(2px)';
        section.style.opacity = '.5';
    outpoupselect.style.display = "inline-block";
    lemonselect.style.display = "inline-block";
    registlemonbase64.style.display = null;
    lemonselect.style.top = '35%';
    lemonselect.style.left = '28%';

},

'click .TestLemonwayRequestHTTP': function(event, template){
 event.currentTarget.style.cursor = 'wait';//wait copy
Meteor.call('GetWalletDetails', "", function(error, result){
  if(!error){
        event.currentTarget.style.cursor = 'pointer';
    console.log("TestLemonwayRequest result:"+JSON.stringify(result.data));
  }
  else{
   console.log("TestLemonwayRequest error:"+JSON.stringify(error)); 
  }
});
},

'click .LemonwayRegister': function(event, template){
  
  event.preventDefault();
  var outpoupselect= template.find('#outpoupselect');
  var lemonselect = template.find('#lemonselect');
  var section = template.find('.section-container');
  var lemonerror = template.find('#lemonerror');
  var infocase = template.find('#infocase');
  var cleaninfo = template.find('#cleaninfo');
  var lemonwayregister = template.find('.LemonwayRegister');
  infocase.innerHTML = 'Veuillez patienter...';
  cleaninfo.style.display = 'none';
  lemonwayregister.style.display = 'none';
  event.currentTarget.style.display = 'none';
  outpoupselect.style.cursor = 'wait';


Meteor.call('RegisterWallet', "", function(error, result){
  if(!error){
    console.log("LemonwayRegister result:"+JSON.stringify(result.data));
    
    if(result.data.d.WALLET == null || result.data.d.E){
        outpoupselect.style.cursor = null;
      infocase.innerHTML = 'Création de Compte Annulé';
      cleaninfo.style.display = null;
  }
    else{
      infocase.innerHTML = 'Création Compte Terminé';
      outpoupselect.style.cursor = null;
      cleaninfo.style.display = null;
  }
}
  else{
          //infocase.innerHTML = result.data.d.E.Msg; 
  }
    
});
},

   });

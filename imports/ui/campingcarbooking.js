import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
import { UsersData } from '../api/usersdata.js';
import { Reservations } from '../api/reservations.js';
import { AddOns } from '../api/addons.js';
import { Session } from 'meteor/session';

import './campingcarbooking.html';


 Template.campingcarbooking.onCreated(function() {
  this.dtime = new ReactiveDict();
  this.prizes = new ReactiveDict();

  this.autorun(() => {
    const campingcarssubs = this.subscribe('onecampingcar',FlowRouter.getParam('city') , FlowRouter.getParam('make'), FlowRouter.getParam('model'), {
  onStop : function (error){
  },
  onReady :function(){   
        var bddcampingcar = CampingCars.find({}).fetch()[0];
       Meteor.subscribe('campingcarreservations', bddcampingcar._id);
  }
      });

  //   if(campingcarssubs.ready()){
  //     var bdd = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];

  //   this.subscribe('campingcarreservations', bdd._id, {
  //   onStop : function (error){
  // },
  // onReady :function(){   
  // }   
  //   }); 

  //   }
    this.subscribe('Images');
    this.subscribe('addons');
    

  const usersdatasubs = this.subscribe('myusersdata', {
  onStop : function (error){
  },
  onReady :function(){    
  }

});
});



});

 Template.campingcarbooking.onRendered(function() {

function daysf(){

      
    
    var tabtest = [];
    // if(FlowRouter.getParam("_id") && CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch())
    // {

        var bddcampingcar = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
        var bddreservations = Reservations.find({resource_id:bddcampingcar._id,status:{ $in: [ "newbooking", "owner_valid" ] }}).fetch();
        var evttab = [];
        var tabnoresa = [];
        var tabfull = bddcampingcar.daysfull;

            for (var j = 0; tabfull.length > j; j++)  {

                  var dd = moment(tabfull[j], 'YYYY-MM-DD');  
                  tabtest.push(dd);
              }

            for (var i = 0;  bddreservations.length > i; i++) {

                  //var loueurid = bddreservations[i].user_id;
                  //var tt ="Loueur Id:"+loueurid+", Netprize :"+bddreservations[i].netprize+", Addonsprize: "+bddreservations[i].addonsprize;
                  var sday = moment(bddreservations[i].start_time, 'YYYY-MM-DD');
                  var fday = moment(bddreservations[i].end_time,'YYYY-MM-DD').add(0, 'day');
                  
                  while(sday.isBefore(fday)){
                  tabtest.push(sday.format('YYYY-MM-DD'));
                  sday = sday.add(1,'day');
                  }

                  tabtest.push(fday);
              }

          return tabtest;
};


this.$('.enddatetimepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        locale:'fr',
        minDate: moment(),
        disabledDates:daysf(), 

        //enableDates: [Template.instance().dtime.get('enabledates')],
        //keepOpen: true,
        //inline: true,
        //focusOnShow:false,
        //collapse:false,
        //deactivation des dates ou le parking est completenabledDates()
        //enabledDates: [moment().add(3, 'days'),moment().add(4, 'days')]
        //[moment().add(3, 'days')]            //[
            //moment().add(7, 'days'),
            //              ]
    });

this.$('.startdatetimepicker').datetimepicker({
        format: 'YYYY-MM-DD',
        locale:'fr',
        minDate: moment(),
        disabledDates:daysf() 
        //showClose: true,
        //keepOpen: true,
        //debug: true

    }).on('dp.change', function(e) {
  $('.enddatetimepicker').data("DateTimePicker").minDate(e.date)
});

});

Template.campingcarbooking.helpers({

campingcarsbook: function(){
return CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
  },

netprize: function(){  
return Template.instance().prizes.get('netprize');
},

people: function(){
return Template.instance().prizes.get('peoplenbr');
},

insuranceprize: function(){
return Template.instance().dtime.get('deltadate')*15;
},

campingcaraddonsselect:function(){

if(Session.get("addonstab")!=null)
{

var addonsids = Session.get("addonstab");
var addonsbdd = AddOns.find({_id:{ $in: addonsids }}).fetch();

var addonsprize = 0;

for (var j = 0; addonsbdd.length > j ; j++) {
  var nbrdays = 1;
  var adetday = 0;
  if(addonsbdd[j].perday && Template.instance().dtime.get('deltadate'))
  {
    
    nbrdays = Template.instance().dtime.get('deltadate');
    addonsbdd[j].somaddonprice = nbrdays * addonsbdd[j].amount;
  }
  else
  {
   addonsbdd[j].somaddonprice = addonsbdd[j].amount; 
  }
  //console.log("addons[j].name: "+addonsbdd[j].name);
  adetday = addonsbdd[j].amount*nbrdays;
  addonsprize = addonsprize+adetday;
}

Template.instance().prizes.set('addonsprize', addonsprize);
return addonsbdd;
}
else
{
  return false;
}

},

totalprize: function(){
  var net = 0;

  if(Template.instance().prizes.get('netprize'))
    net = Template.instance().prizes.get('netprize');
  
  var addons = 0;

  if(Template.instance().prizes.get('addonsprize'))
    addons = Template.instance().prizes.get('addonsprize');

  var insurance = Template.instance().dtime.get('deltadate')*15;
  Template.instance().prizes.set('brutprize', net+addons+insurance);
  return net+addons+insurance;
},


  guests: function(){
    var mxg = 0;
    var bdd;
    var guestsop = [];
    
    if(CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0]!=null)
      {
      bdd = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
      mxg = parseInt(bdd.maxGuests);
        
        for (var i = 1; mxg >= i; i++) {
        guestsop[i] = {"guest":i};
        }
    return guestsop;
    }
    else
    {
      return false;
    }
  },

  deltadays: function(){


    const instance = Template.instance();


  if (CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch() && instance.dtime.get('startdatepicker') && instance.dtime.get('enddatepicker')) {

var sd = null;
var fd = null;
var dif = null;

   var bddcp = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
     var pday=0;
     var nday = 0;
var netprize = 0;
if(moment(instance.dtime.get('startdatepicker'),"YYYY-MM-DD").isValid())
{
sd = moment(instance.dtime.get('startdatepicker'),"YYYY-MM-DD");    
}

if(moment(instance.dtime.get('enddatepicker'),"YYYY-MM-DD").isValid()){

fd = moment(instance.dtime.get('enddatepicker'),"YYYY-MM-DD").add(1, 'day');
//console.log("date de fin: "+)
}

else
{
}

   dif = moment.duration(fd.diff(sd));
     //dif = fd.diff(sd);
    //console.log("dif: "+Math.round(dif.asDays()));
    instance.dtime.set('deltadate', Math.round(dif.asDays()));

     if(bddcp.priceperday)
     {
         pday = parseInt(bddcp.priceperday);
     }  
     else
     {
     } 
netprize = pday * Math.round(dif.asDays());
 instance.prizes.set('netprize', netprize);
   return Math.round(dif.asDays());
    }
    else
    {
      return false;
    }
 
  },


});
  Template.campingcarbooking.events({

'click .peoplenbr': function(event, template){
    
    event.preventDefault();
    Template.instance().prizes.set('peoplenbr', event.currentTarget.innerHTML);
    var outpoupselect = template.find('#outpoupselect');
    outpoupselect.style.display = 'none';
    var transmissionselect = template.find('#peopleselect');
    transmissionselect.style.display = 'none';
      
},

'click #outpoupselect': function(event, template){
      
    event.preventDefault();
    var peopleselect = template.find('#peopleselect');
    var popupselect = template.find('.popupselect');

      if(peopleselect.style.display == 'inline-block')
        { 
          peopleselect.style.display = 'none';
          event.currentTarget.style.display = 'none';
        }
      else
        {
        }

},

'click #people': function(event, template){

    event.preventDefault();
    var peopleid = template.find('#people'); 
    var peopleselect = template.find('#peopleselect');
    var outpoupselect = template.find('#outpoupselect');
    outpoupselect.style.display = "inline-block";
    peopleselect.style.display = "inline-block";
    peopleselect.style.top = event.clientY+'px';
    peopleselect.style.left = event.clientX+'px';

},

'e.wheelDelta': function(event, template) {
        return false;
},

'dp.change .startdatetimepicker': function(event, instance){
    
    event.preventDefault();

    if(moment($('.startdatetimepicker').data().date).isValid())
      instance.dtime.set('startdatepicker', $('.startdatetimepicker').data().date);
  
},

'dp.change .enddatetimepicker': function(event, instance){
    
    event.preventDefault();

    if(moment($('.enddatetimepicker').data().date).isValid())
      instance.dtime.set('enddatepicker', $('.enddatetimepicker').data().date);

  
},


'click .booking-request': function(e, instance){

//vérifier que la durée de la réservation est supérieur à la durée minimum

//vérifier que la période de réservation ne contiens pas des jours full  
var baduser = false;
var wallet = false;

if(UsersData.find({_id:Meteor.userId()}).fetch()[0]){
var userdata = UsersData.find({_id:Meteor.userId()}).fetch()[0];
  if(!userdata.firstname || !userdata.lastname || !userdata.birthdate || !userdata.cellphone || !userdata.email || !userdata.lemoncartid || !userdata.lemonibanid){
    alert("Merci de compléter votre profil");
    FlowRouter.go('/user');
    baduser = true;
  }
}


var bdd =CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];
var error = false;

if(instance.dtime.get('deltadate')<=bdd.mindaysrental){
alert("Durée minimum de réservation: "+bdd.mindaysrental+ " jours");
error = true;
}

for (var i = 0; i < bdd.daysfull.length; i++) {

  if(moment(bdd.daysfull[i]).isBetween(moment(instance.dtime.get('startdatepicker'),"YYYY-MM-DD"), moment(instance.dtime.get('enddatepicker'),"YYYY-MM-DD"))) 
  error = true;
}

if(error!=false)
alert("Réservation Impossible durant cette période");

 console.log("userId: "+Meteor.userId());
 console.log("userdata firstname: "+UsersData.find({_id:Meteor.userId()}).fetch()[0].firstname);
 console.log("instance: "+instance.dtime.get('startdatepicker'));
console.log("moment: "+moment.locale());

if(Meteor.userId() && UsersData.find({_id:Meteor.userId()}).fetch()[0] && error==false && baduser==false)
{

var advance = false;



//si la date du debut de la réservation est à dans plus 1 mois, un acompte de 30% est prélever  
if(moment(instance.dtime.get('startdatepicker'),"YYYY-MM-DD").diff(moment(), 'months')!=0)
{
  var advprize = 0.30*instance.prizes.get('brutprize');
  //'{"transmissiontype":"'+event.currentTarget.innerHTML+'"}';
  advance = '{"prize":'+advprize+',"payment":false}';
  var js = JSON.parse(advance);
//advance.prize = advprize;
//console.log("adv prize: "+js.prize);
}
else
{}

var book_id = Reservations.find({}).fetch().length+"-"+moment().format('YY-DDD');
var bdd = CampingCars.find({city:FlowRouter.getParam('city') , make:FlowRouter.getParam('make'), model:FlowRouter.getParam('model')}).fetch()[0];

     Reservations.insert({"book_id":book_id,
                          "user_id":Meteor.userId(),
                          "resource_id":bdd._id,
                          "status":"zero",
                          "mailstatus":"notsend",
                          "people": instance.prizes.get('peoplenbr'),
                          "start_time": instance.dtime.get('startdatepicker'), 
                          "end_time": instance.dtime.get('enddatepicker'),
                          "addons_id":Session.get("addonstab"),
                          "addonsprize": instance.prizes.get('addonsprize'),
                          "brutprize": instance.prizes.get('brutprize'),
                          "advance": js,
                          "trans_id":[],
                          //"email":Meteor.user().emails[0].address,
                        createdAt: new Date()}, function( error, result) { 
     if ( error ) console.log ( error ); //info about what went wrong
     if ( result )
 {
  console.log("insert resa: "+result);
  FlowRouter.go('dashboard', { reservation_id: result });
 }
});
}
else
{
  console.log("erreur reservation: ");
  //FlowRouter.go('/');
}

}
   });

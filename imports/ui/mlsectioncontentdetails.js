import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
 

import './mlsectioncontentdetails.html';
 
 Template.mlsectioncontentdetails.onCreated(function() {
console.log("Star detail.js");
  //CampingCars.insert({name:"peugeot", description:"un super camping car de la mort qui tue", maxguests:4, bedsnumb: 4});
  //this.getListId = () => FlowRouter.getParam('_id');
//souscription a la base de donnée
  //this.autorun(() => {
    //this.subscribe('tasks');
  //});
});

 Template.mlsectioncontentdetails.helpers({
todoArgs(todo){


},
  tasks: function() {

    var category = FlowRouter.getParam("id");
    console.log("Parametre: "+category);
    //var o_id = new ObjectID(id);  _id:category
//db.test.find({_id:o_id}) _id: 'category'

    console.log("BDD: "+Tasks.find({}).fetch()[0]);
    var bdd = Tasks.find({}).fetch();
    //console.log("BDD: "+Tasks.find({}).fetch());
    
    //return Tasks.find({}).fetch()[0];
    return bdd;
  },

  campingcars: function(){
    //const instance = Template.instance();
    //console.log("instantence: "+EJSON.stringify(instance));
return CampingCars.find({}).fetch();;
  }
// ways:function(){
// return Way_Coll.find({}).fetch();
// },

// errors:function(){
// return Errors_Coll.find({}).fetch();
// },
    // gates:function(){
    //        return Gate_Coll.find({}).fetch();
    // },
    // interval:function(){
    //   console.log("Interval: "+gateState.get(rr));
    //         return gateState.get(rr);
    // },
    // car:function(){
    //   return Gate2_Coll.find({}).fetch();
    //   console.log("Barrière info: "+bdd[0].datavalues.input1state);

    //   if(bdd[0].datavalues.input1state==1)
    //   {
    //     return true;
    //   }
    //   else
    //   {
    //     return false;
    //   }

    // },
});
  Template.mlsectioncontentdetails.events({

'submit .basics.description': function (event, template){
  //event.preventDefault();

      // Get value from form element
    console.log("basic descrip: ");
    const target = event.target;

    const text = target.text.value;
    console.log("text value: "+text);
},
  'keyup .new-task': function(event, template) {
    //console.log("event "+event);
    // Prevent default browser form submit
//this.preventDefault();
   // event.preventDefault();
    console.log("event type : "+event.type);
    console.log("event target : "+event.target);
    console.log("event target text: "+event.target.text.value);
    //console.log("event current target : "+EJSON.stringify(event.currentTarget.hr.style));
       var Restask = template.find('.new-task');


    // Get value from form element

    //const target = event.target;

    const text = Restask.text.value;
    console.log("text value: "+text);
 

    // Clear form

    Restask.text.value = '';

  },

  'click input':function(event, template){
console.log("click input: "+event.currentTarget.innerHTML);

//style input style="tap-highlight-color:rgba(0,0,0,0);padding:0;position:relative;width:100%;height:100%;border:none;outline:none;background-color:transparent;color:rgba(86, 90, 92, 0.87);font:inherit;box-sizing:border-box;margin-top:14px;"
    
  },
    'blur input':function(event, template){
      console.log("blur input name: "+event.target.name);
console.log("blur input: "+event.target.value);
console.log("route param: "+FlowRouter.getParam('_id'));
var key = event.target.name;
var val = event.target.value;
var dat = '{"'+key+'":"'+val+'"}';
console.log("avant json: "+dat);
var js = JSON.parse(dat);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
            upsert: true
        });

//style input style="tap-highlight-color:rgba(0,0,0,0);padding:0;position:relative;width:100%;height:100%;border:none;outline:none;background-color:transparent;color:rgba(86, 90, 92, 0.87);font:inherit;box-sizing:border-box;margin-top:14px;"
    
  },

  'click .ml-panel-textfield':function(event, template) {
    //console.log("event "+event);
    // Prevent default browser form submit
//this.preventDefault();
   // event.preventDefault();
    //console.log("event type : "+event.type);
    //console.log("event target : "+event.target);
    //console.log("event target text: "+event.target.text.value);
    //console.log("event current target laschild : "+event.currentTarget.childNodes[1].data);
    //console.log("event current target innerhtml : "+event.currentTarget.innerHTML);
    //console.log("event current target child : "+event.currentTarget.children.item(6).children.item(0).style);

   
    //var evtar = event.currentTarget.children.item(6).children.item(1);
    //console.log("Style : "+evtar.style.width);
    //console.log("Style transform: "+evtar.style.transform);
    //evtar.style = evtar.style + "transform:scaleX(1);transition:all 450ms";


    //var evtar1 = event.currentTarget.children.item(6).children.item(1);
    //evtar.style.display = "none";
    //evtar1.style = "border:none;border-bottom:solid 1px;border-color:rgba(0,0,0,0.3);bottom:8px;box-sizing:content-box;margin:0;position:absolute;width:100%;";
    //evtar1.style.display = "inherit";
    //evtar1.style = "border:none;border-bottom:solid 2px;border-color:#246182;bottom:8px;box-sizing:content-box;margin:0;position:absolute;width:100%;transform:scaleX(0);transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;";
    //evtar1.style =  "border-width: medium medium 2px; border-style: none none solid; -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none; border-color: rgb(36, 97, 130); bottom: 8px; box-sizing: content-box; margin: 0px; position: absolute; width: 100%; transform: scaleX(0); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;";
    
    //evtar.style = "transform:scaleX(0); border-bottom:solid 2px;border-color:#246182;"; 
    //console.log("event current target : "+ evtar.find('hr'));
      // var Restask = template.find('.new-task');


    // Get value from form element

    //const target = event.target;

    //const text = Restask.text.value;
    //console.log("text value: "+text);
 

    // Clear form

    //Restask.text.value = '';

  },
  //   'click #valid': function(event, template) {
  //     // Prevent default browser 
  //     event.preventDefault();
  //     var ResId = template.find('#email');
  //     var email = $(ResId).val();
  //     //console.log("Current Service: "+Session.get("currentService"));
  //     if (Session.get("currentService")=="ticketreloading") {
  //     //console.log("Vérification du mail "+email);
  //     Session.set("BookingEmail", email);
  //     Router.go("BookingPrint");
  //     }
  //     else
  //     {
  //     Router.go("NewBookingName");
  //     Session.set("BookingEmail", email);
  // }
  // },

   });
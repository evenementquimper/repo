import { Template } from 'meteor/templating';
import { CampingCars } from '../api/campingcars.js';
//import { Session } from 'meteor/session';


import './mlsectionright.html';

Template.mlsectionright.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);
});

Template.mlsectionright.helpers({

steps: function(){
	var steps = 0;
	var campingcar = CampingCars.find({_id: FlowRouter.getParam('_id')}).fetch()[0];

	if(campingcar.name!=null &&
	 	campingcar.description!=null &&
	    campingcar.maxGuests!=null &&
	    campingcar.beds!=null &&
	    campingcar.name!="" &&
	    campingcar.description!="" &&
	    campingcar.maxGuests!="" &&
	    campingcar.beds!="")
			steps = steps+1;

	if(campingcar.make!=null &&
	    campingcar.model!=null &&
	    campingcar.tankcapacity!=null &&
	    campingcar.year!=null &&
	    campingcar.km!=null &&
	    campingcar.vehiculeheight!=null &&
	    campingcar.vehiculelength!=null &&
	    campingcar.vehiculewidth!=null &&
		campingcar.engineSize!=null &&
	    campingcar.marketValue!=null &&
	    campingcar.transmissiontype!=null &&
	    campingcar.fueltype!=null &&
	    
	    campingcar.make!="" &&
	    campingcar.model!="" &&
	    campingcar.tankcapacity!="" &&
	    campingcar.year!="" &&
	    campingcar.km!="" &&
	    campingcar.vehiculeheight!="" &&
	    campingcar.vehiculelength!="" &&
	    campingcar.vehiculewidth!="" &&
		campingcar.engineSize!="" &&
	    campingcar.marketValue!="" &&
	    campingcar.transmissiontype!="" &&
	    campingcar.fueltype!=""

	    // campingcar.vacuum!=null &&
	    // campingcar.hotwtr!=null &&
	    // campingcar.wtrpur!=null &&
	    // campingcar.sink!=null &&
	    // campingcar.oven!=null &&
	    // campingcar.mwave!=null &&
	    // campingcar.ctop!=null &&
	    // campingcar.fridge!=null &&
	    // campingcar.freezer!=null &&
	    // campingcar.cooler!=null &&
	    // campingcar.basic!=null &&
	    // campingcar.ttowel!=null &&
	    // campingcar.ac!=null &&
	    // campingcar.heat!=null &&
	    // campingcar.curtain!=null &&
	    // campingcar.flyscr!=null &&
	    // campingcar.dtable!=null &&
	    // campingcar.skylight!=null &&
	    // campingcar.fan!=null &&
	    // campingcar.toilet!=null &&
	    // campingcar.ishower!=null &&
	    // campingcar.washb!=null &&
	    // campingcar.washer!=null &&
	    // campingcar.dryer!=null &&
	    // campingcar.linen!=null &&
	    // campingcar.pillows!=null &&
	    // campingcar.radio!=null &&
	    // campingcar.cd!=null &&
	    // campingcar.tv!=null &&
	    // campingcar.dvd!=null &&
	    // campingcar.sat!=null &&
	    // campingcar.wifi!=null &&
	    // campingcar.fwtank!=null &&
	    // campingcar.pinvert!=null &&
	    // campingcar.dgen!=null &&
	    // campingcar.spanel!=null &&
	    // campingcar.smkdetect!=null &&
	    // campingcar.fireext!=null &&
	    // campingcar.rcamera!=null &&
	    // campingcar.awning!=null &&
	    // campingcar.oshower!=null &&
	    // campingcar.storage!=null &&
	    // campingcar.otablench!=null &&
	    // campingcar.tbar!=null &&
	    // campingcar.bbq!=null &&
	    // campingcar.brack!=null

	    // campingcar.vacuum!=false &&
	    // campingcar.hotwtr!=false &&
	    // campingcar.wtrpur!=false &&
	    // campingcar.sink!=false &&
	    // campingcar.oven!=false &&
	    // campingcar.mwave!=false &&
	    // campingcar.ctop!=false &&
	    // campingcar.fridge!=false &&
	    // campingcar.freezer!=false &&
	    // campingcar.cooler!=false &&
	    // campingcar.basic!=false &&
	    // campingcar.ttowel!=false &&
	    // campingcar.ac!=false &&
	    // campingcar.heat!=false &&
	    // campingcar.curtain!=false &&
	    // campingcar.flyscr!=false &&
	    // campingcar.dtable!=false &&
	    // campingcar.skylight!=false &&
	    // campingcar.fan!=false &&
	    // campingcar.toilet!=false &&
	    // campingcar.ishower!=false &&
	    // campingcar.washb!=false &&
	    // campingcar.washer!=false &&
	    // campingcar.dryer!=false &&
	    // campingcar.linen!=false &&
	    // campingcar.pillows!=false &&
	    // campingcar.radio!=false &&
	    // campingcar.cd!=false &&
	    // campingcar.tv!=false &&
	    // campingcar.dvd!=false &&
	    // campingcar.sat!=false &&
	    // campingcar.wifi!=false &&
	    // campingcar.fwtank!=false &&
	    // campingcar.pinvert!=false &&
	    // campingcar.dgen!=false &&
	    // campingcar.spanel!=false &&
	    // campingcar.smkdetect!=false &&
	    // campingcar.fireext!=false &&
	    // campingcar.rcamera!=false &&
	    // campingcar.awning!=false &&
	    // campingcar.oshower!=false &&
	    // campingcar.storage!=false &&
	    // campingcar.otablench!=false &&
	    // campingcar.tbar!=false &&
	    // campingcar.bbq!=false &&
	    // campingcar.brack!=false
	    )
	 	    steps = steps+1;

	 		if(campingcar.address!=null &&
	    campingcar.address!="")
			steps = steps+1;

			if(campingcar.images!=null &&
	    campingcar.images!="")
			steps = steps+1;

			if(campingcar.priceperday!=null &&
	    campingcar.priceperday!="")
			steps = steps+1;
			
			if(steps==5)
				steps = false;

	return steps;
},

publish: function(){

if(CampingCars.find({_id: FlowRouter.getParam('_id')}).fetch()[0].publish!=null &&CampingCars.find({_id: FlowRouter.getParam('_id')}).fetch()[0].publish=="valid")
{
return true	;

}
else
{
  return false;
}
  },

});

Template.mlsectionright.events({

	'click .publish': function (event, template) {
event.preventDefault(); 

var dig = '{"publish":"valid"}';

var r = confirm("Demande de publier votre annonce");
if (r == true) {
          
var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
    FlowRouter.go('index');
} else {
    //txt = "You pressed Cancel!";
}

  },

  'click .unpublish': function (event, template) {
event.preventDefault(); 

var dig = '{"publish":"unvalid"}';
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
});
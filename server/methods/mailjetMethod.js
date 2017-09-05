//import { CampingCars } from '../api/campingcars.js';
import { CampingCars } from '../../imports/api/campingcars.js';
import { Reservations } from '../../imports/api/reservations.js';
 var mailjet = require('node-mailjet').connect(Meteor.settings.mailjet.apiKey+":"+Meteor.settings.mailjet.secretKey);


Meteor.methods({

    // API Planyo-Vérifier un numéro de réservation 
//  predefined_duration_count int optional
// In case you want to use predefined durations (see time-related settings in resource settings or Q228), specify the number of durations in this parameter. You should also pass the actual durations and their descriptions in the parameters: predefined_duration_text_X and predefined_duration_hours_X (where X is a number from 1 to the value of predefined_duration_count). If you don't want to use predefined durations, or want to use the base resource's settings, don't pass this parameter.
// 
//min_rental_time float optional
// You can override the base resource's minimum rental time (expressed in hours) by specifying this parameter. This is ignored if you specified predefined_duration_count
// max_rental_time float optional
// You can override the base resource's maximum rental time (expressed in hours) by specifying this parameter. This is ignored if you specified predefined_duration_count
// available_from int optional
// You can override the base resource's setting Available on working days from. This only applies to hour-based resources. This should be a single integer (using a 24-hour clock), e.g. 8 means 8am.
// available_until int optional
// You can override the base resource's setting Available on working days until. This only applies to hour-based resources. This should be a single integer (using a 24-hour clock), e.g. 18 means 6pm.
// start_times string optional
// You can override the base resource's setting Restrict starting times. This only applies to hour-based resources. The different times should be comma-separated.
// min_hours_to_rental int optional
// You can override the base resource's setting Min. time between reservation and rental. This is an integer, time is expressed in hours.
// max_days_to_rental int optional
// You can override the base resource's setting Max. time between reservation and rental. This is an integer, time is expressed in days.
// default_price string optional
// You can override the base resource's default price (first row in the pricing manager). This can be also used to specify a new custom pricing script (see Q137 in the FAQ).
// resource_admin_id int optional
// You can override the base resource's resource admin ID. The new resource admin must be either an existing resource admin or moderator. New users without an administrative role in this Planyo site are not allowed to be admins.
// event_dates string optional
// If you set this parameter, the resource will become an event-type resource. Here you can specify comma-separated start dates or start dates and times (in the same way as in resource settings).
// is_published bool optional
// By default the new resource will be published. You can set this to false if you want it to be unpublished.
// prop_res_xyz string optional
// Resource-specific properties (defined in the admin panel in: Site settings / Custom resource properties). E.g. for a custom property 'distance to sea', this would be prop_res_distance_to_sea (where '_' replaces all space characters).
// images string optional
// You can pass comma-separated full URLs (starting with http:// or https://) of images to be downloaded by Planyo and used for the new resource.
// version float optional
// you can optionally specify the version of the API that you're using. Use the value of latest or simply skip this parameter to use the latest API version. The latest version is: 1
// language string optional
// by specifying a 2-letter (ISO 639-1) language code (all capital letters e.g. EN, DE, FR, ES, IT) you can change the language of the text values returned
mailjettest: function(){

return HTTP.call("GET", "https://api.mailjet.com/v3/REST/contact/antoine.donniou@gmail.com", {
    auth:Meteor.settings.mailjet.apiKey+":"+Meteor.settings.mailjet.secretKey});
},

mailjetaddcontact: function(email, name){
  try{
 return HTTP.call("POST", "https://api.mailjet.com/v3/REST/contact", {
    auth:Meteor.settings.mailjet.apiKey+":"+Meteor.settings.mailjet.secretKey,
    params:{Email:email}
  }
  // , function(error, result){
  //     if(!error){
  //       console.log("erreur mailjet: "+error);
  //       return false;
  //     }
  //     else{
  //       console.log("result mailjet: "+JSON.stringify(result));
  //       console.log("result mailjet message: "+result.data.ErrorMessage);
  //       return true;
  //     }
  //   }
    );
}
catch(e){
  return e;
}
},

mailjetsendprospectmail: function(){

  try{
    var getContacts = Mailjet.get('contact');

getContacts.request({Limit: 3})
  .then(function (result) {
    console.log("getcontact result: "+result)
    // do something with the result
    // result structure is {response: {...}, body: {...}}
  })
  .catch(function (reason) {
    // handle the rejection reason
    console.log("getcontact error: "+reason.statusCode)
  })
// const request = mailjet
//     .post("send", {
//       url: 'api.mailjet.com', version: 'v3', perform_api_call: false
//     })
//     .request({
//       FromEmail: 'leboncampingcar@leboncampingcar.com',
//       FromName: 'Mailjet Pilot',
//       Subject: 'Hello world Mailjet!',
//       'Text-part': 'Hello World',
//       Recipients: [{'Email': 'passenger@mailjet.com'}]
//   })


// return mailjet
//     .post("send", {'version': 'v3.1'})
//     .request({
//         "Messages":[
//                 {
//                         "From": {
//                                 "Email": "leboncampingcar@leboncampingcar.fr",
//                                 "Name": "leboncampingcar"
//                         },
//                         "To": [
//                                 {
//                                         "Email": "antoine.donniou@gmail.com",
//                                         "Name": "antoine"
//                                 }
//                         ],
//                         "Subject": "Your email flight plan!",
//                         "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//                         "HTMLPart": "<h3>Dear passenger 1, welcome to Mailjet!</h3><br />May the delivery force be with you!"
//                 }
//         ]
//     })
// request
//     .then((result) => {
//         console.log(result.body)
//     })
//     .catch((err) => {
//         console.log(err.statusCode)
//     })




 // return HTTP.call("POST", "https://api.mailjet.com/v3.1/send", {
 //    auth:Meteor.settings.mailjet.apiKey+":"+Meteor.settings.mailjet.secretKey,
 //    params:{
 //            "version": "v3.1",
 //            "Messages":[
 //                {
 //                        "From": {
 //                                "Email": "leboncampingcar@leboncampingcar.fr",
 //                                "Name": "pospect"
 //                        },
 //                        "To": [
 //                                {
 //                                        "Email": "antoine.donniou@gmail.com",
 //                                        "Name": "passenger 1"
 //                                }
 //                        ],
 //                        "HTMLPart": "<ul>{% for rock_band in var:rock_bands %}<li>Title: {{ rock_band.name }}<ul>{% for member in rock_band.members %}<li>Member name: {{ member }}</li>{% endfor %}</ul></li>{% endfor %}</ul>",
 //                        "TemplateLanguage": true,
 //                        "Subject": "Your email prospect",
 //                        "Variables":{
 //                          "rock_bands": [
 //                          {
 //                            "name": "The Beatles",
 //                            "members":["John Lennon","Paul McCartney"]
 //                          }

 //                          ]
 //                        }
 //                }
 //        ]}
 //  }
 //    );
}
catch(e){
  return e;
}

// const request = mailjet
//     .post("send", {'version': 'v3.1'})
//     .request({
//         "Messages":[
//                 {
//                         "From": {
//                                 "Email": "pilot@mailjet.com",
//                                 "Name": "Mailjet Pilot"
//                         },
//                         "To": [
//                                 {
//                                         "Email": "passenger1@mailjet.com",
//                                         "Name": "passenger 1"
//                                 }
//                         ],
//                         "Subject": "Your email flight plan!",
//                         "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//                         "HTMLPart": "<h3>Dear passenger 1, welcome to Mailjet!</h3><br />May the delivery force be with you!"
//                 }
//         ]
//     })
// request
//     .then((result) => {
//         console.log(result.body)
//     })
//     .catch((err) => {
//         console.log(err.statusCode)
//     })

},

mailjetcontact: function(){
return HTTP.call("GET", "https://api.mailjet.com/v3/REST/contact/", {
    auth:Meteor.settings.mailjet.apiKey+":"+Meteor.settings.mailjet.secretKey,
    params:{ContactsList:9928}
}
    );
},

    AddContact: function(base_resource_id, name, quantity, predefined_duration_count, min_rental_time, max_rental_time, available_from, available_until, start_times, min_hours_to_rental, max_days_to_rental, default_price, resource_admin_id, event_dates, is_published, prop_res_xyz, images, version, language, planyo_api_key) {
        // return "";
        //console.log('Booking :' + bookingId);
        console.log('Meteor time :' + moment());
        console.log("hash key: "+CryptoJS.MD5(Meteor.settings.private.PLANYO_API_HASHKEY+moment().format("X")+"add_resource"));
        //var method = "add_resource";
            //  Doc: https://www.planyo.com/api.php?topic=add_resource
            var timestamp = Date();//&hash_timestamp="+timestamp+"  &hash_key=4330f7dc276db60b353f2b7a47a69d27
            return HTTP.call("GET", "https://api.planyo.com/rest/?method=add_resource&base_resource_id="+Meteor.settings.private.PLANYO_BASE_RES_ID+"&name="+name+"&quantity="+quantity+"&predefined_duration_count=&min_rental_time=&max_rental_time=&available_from=&available_until=&start_times=&min_hours_to_rental=&max_days_to_rental=&default_price=&resource_admin_id=&event_dates=&prop_res_xyz=&images=&api_key="+Meteor.settings.private.PLANYO_API_KEY+"&hash_timestamp="+moment().format("X")+"&hash_key="+CryptoJS.MD5(Meteor.settings.private.PLANYO_API_HASHKEY+moment().format("X")+"add_resource")
                //,
                //{timeout:5000},

                );

    },


// get_resource_usage (version 1)
// Description:
// This function will return usage/availability information of given resource (or entire site) for specified period of time.
// Input:
// resource_id int optional
// ID of the resource. Pass null if you want info for all resources to be returned. In this case and if using a metasite API key, you'll need to pass the site id in the site_id parameter.

// site_id int optional
// Required only for metasite API keys and when resource_id is null. Otherwise skip this parameter.
// start_date DateTime required
// Start date of the period
// end_date DateTime required
// End date of the period
// separate_units bool optional
// You can retrieve usage for individual units if you set this to true
// version float optional
// you can optionally specify the version of the API that you're using. Use the value of latest or simply skip this parameter to use the latest API version. The latest version is: 1
// language string optional
// by specifying a 2-letter (ISO 639-1) language code (all capital letters e.g. EN, DE, FR, ES, IT) you can change the language of the text values returned
// api_key string required
// your API key - Click here to get your key. If your API key uses a hash key, you must also include the parameters hash_key and hash_timestamp.
// Output:
// usage array
// Resource usage. This is a multi-dimentional array. The first dimention is the resource ID, then month followed by day number, then for hour-based resources it's the hour and in case of quarter-based resource the last array dimention is the number of minutes (00, 15, 30 or 45). The array value is the number of units available for given time slot (day, hour or quarter). Subtracting this number from the total quantity gives you availability info.
    get_resource: function(resource_id, site_id, start_date, end_date, separate_units , version, language, planyo_api_key) {
        
        //console.log("hash key: "+CryptoJS.MD5(Meteor.settings.private.PLANYO_API_HASHKEY+moment().format("X")+"get_resource_usage"));
       
        var start = moment().format("X");
        console.log("Tme: "+start);
        var end = moment().add(30, 'days');
            //  Doc: https://www.planyo.com/api.php?topic=get_resource_usage
            //var timestamp = Date();
            return HTTP.call("GET", "https://api.planyo.com/rest/?method=get_resource_usage&resource_id="+resource_id+"&site_id="+site_id+"&start_date="+start+"&end_date="+end+"&separate_units="+separate_units+"&api_key="+Meteor.settings.private.PLANYO_API_KEY+"&hash_timestamp="+moment().format("X")+"&hash_key="+CryptoJS.MD5(Meteor.settings.private.PLANYO_API_HASHKEY+moment().format("X")+"get_resource_usage"),
function(error, result){
      if(!error){
      console.log("CallBack result: "+JSON.stringify(result.data.data.usage));
    var stg = JSON.stringify(result.data.data.usage);

    var tabresult = [];
    
    var keys = Object.keys(result.data.data.usage);

    var numres = Object.keys(result.data.data.usage);

    var val = Object.values(result.data.data.usage);


    // console.log("CallBack result: "+keys);
    // console.log("Values: "+JSON.stringify(Object.values(result.data.data.usage)));

    // console.log("tab val key: "+Object.keys(val[0]));//tab des années

    // console.log("tab val val: "+JSON.stringify(Object.values(val[0])));//les mois
    
    var ansclef = Object.keys(val[0]);
    var ans = Object.values(val[0]);

for (var k= 0; k<val.length; k++){
  //console.log("Année: "+val[k]);

  var année = Object.keys(val[k]);
  var ansval = Object.values(val[k]);
   // console.log("Année keys: "+année);
   // console.log("année val: "+JSON.stringify(ansval));
   // console.log("mois keys: "+Object.keys(ansval[k]));
   var mois = Object.keys(ansval[k]);

   for (var j = 0; j < mois.length; j++){

   //console.log("mois keys: "+mois[j]);
   var moisid = mois[j];
    var moisval = Object.values(ansval[k])[j];
   //var moisval = Object.keys(Object.values(mois[j]));
   //console.log("mois val: "+JSON.stringify(Object.values(ansval[k])[j]));
   //console.log("jours keys: "+Object.keys(moisval[j]));

  var days = Object.keys(moisval);
//     var moisval = Object.values(mois[j]);
//     console.log("Mois keys: "+JSON.stringify(days));
     for (var i = 0; i < days.length; i++) {
//       //var val = Object.values(mois[j]);
 //console.log("moment itme : "+année+"/"+moisid+"/"+days[i]);
 var strgmoment = année+'-'+moisid+'-'+days[i];
//cd mconsole.log("stgmoment : "+JSON.stringify(strgmoment));

      // var mm = moment(strgmoment,"YYYY-MM-DD");
//console.log("moment : "+mm);
 tabresult.push(JSON.stringify(strgmoment));
     }
   }
}  
    //insert dayfull tabresult;

      CampingCars.update({
              planyo_resource_id: resource_id
          },{
            $set:{
                daysfull: tabresult
            }
        }, {
            upsert: true
   });
  }
  else
  {
    //return [];
    console.log("CallBack error: "+JSON.stringify(error));
  }
}
                );

    }

});
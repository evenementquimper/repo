//import { CampingCars } from '../api/campingcars.js';
import { CampingCars } from '../../imports/api/campingcars.js';
import { Reservations } from '../../imports/api/reservations.js';

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
Planyotest: function(){
    var testmd5 = CryptoJS.MD5('Message').toString();
    console.log("Test md5: "+testmd5);
    console.log("moment: "+moment().format("X"));
    console.log("date: "+Date());

return HTTP.call("GET", "https://www.planyo.com/rest/?method=get_site_info&api_key="+Meteor.settings.private.PLANYO_API_KEY+"&hash_timestamp="+moment().format("X")+"&hash_key="+CryptoJS.MD5(Meteor.settings.private.PLANYO_API_HASHKEY+moment().format("X")+"get_site_info"), function(error, result){
                    if (!error) {


                        console.log('Result :' + JSON.stringify(result.data));

        } else {
console.log('Error :' + error);
        }
    });
},

    AddResource: function(base_resource_id, name, quantity, predefined_duration_count, min_rental_time, max_rental_time, available_from, available_until, start_times, min_hours_to_rental, max_days_to_rental, default_price, resource_admin_id, event_dates, is_published, prop_res_xyz, images, version, language, planyo_api_key) {
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
                //function(error, result) {
                    //Output:
                    //      regular_product_price float
                    // Price to be paid for all standard additional products
                    // regular_products array
                    // A named array of all standard products reserved for the reservation. The array keys are: id, name, unit_price, tax_rate, customer_reservable, recurring, per_person, quantity, usage_time
                    // custom_products array
                    // A named array of all custom products reserved for the reservation. The array keys are: id, name, price, tax_rate

//                     if (!error) {


//                         console.log('Result :' + JSON.stringify(result.data));


//         } else {
// console.log('Error :' + error);
//         }

//                         return result.data;
                //}
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
    get_resource_usage: function(resource_id, site_id, start_date, end_date, separate_units , version, language, planyo_api_key) {
        
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

    },



    // API Planyo-Vérifier un numéro de réservation 
    GetReservationProducts: function(bookingId, planyo_api_key) {
        // return "";
        console.log('Booking :' + bookingId);
        console.log('planyo_api_key :' + planyo_api_key);
        var method = "get_reservation_data";
            //  Doc: https://www.planyo.com/api.php?topic=get_reservation_products
            return HTTP.call("GET", "http://api.planyo.com/rest?method=get_reservation_products&reservation_id=" + bookingId + "&api_key=" + planyo_api_key,
                //{data:{"method":method, "reservation_id":bookingId, "api_key":planyo_api_key}},            
                //{headers:{"Access-Control-Allow-Origin":"*"}},
                function(error, result) {
                    //Output:
                    //      regular_product_price float
                    // Price to be paid for all standard additional products
                    // regular_products array
                    // A named array of all standard products reserved for the reservation. The array keys are: id, name, unit_price, tax_rate, customer_reservable, recurring, per_person, quantity, usage_time
                    // custom_products array
                    // A named array of all custom products reserved for the reservation. The array keys are: id, name, price, tax_rate

                    if (!error) {


                        console.log('Result :' + EJSON.stringify(result.data));

        } else {

        }

                        return result.data;
                });

    },

    // API Planyo-Récupérer les info d'une réservation 
    GetReservationData: function(bookingId, planyo_api_key) {
        // return "";
        var method = "get_reservation_data";
        // console.log("Resevation:  "+EJSON.stringify(GetReservationProducts_Coll.find({reservation_id:bookingId})));

        //console.log('planyo_api_key :'+ GetReservationProducts_Coll.find({reservation_id:bookingId}).fetch()[0]);

        if (GetReservationProducts_Coll.find({
                "reservation_id": bookingId
            }).fetch()) {
            console.log("Resevation:  " + EJSON.stringify(GetReservationProducts_Coll.find({
                "reservation_id": bookingId
            }).fetch()[0]));
            //  Doc: https://www.planyo.com/api.php?topic=get_reservation_products
            return HTTP.call("GET", "http://api.planyo.com/rest?method=get_reservation_data&reservation_id=" + bookingId + "&api_key=" + planyo_api_key,
                //{data:{"method":method, "reservation_id":bookingId, "api_key":planyo_api_key}},            
                //{headers:{"Access-Control-Allow-Origin":"*"}},
                function(error, result) {
                    //Output:
                    //      regular_product_price float
                    // Price to be paid for all standard additional products
                    // regular_products array
                    // A named array of all standard products reserved for the reservation. The array keys are: id, name, unit_price, tax_rate, customer_reservable, recurring, per_person, quantity, usage_time
                    // custom_products array
                    // A named array of all custom products reserved for the reservation. The array keys are: id, name, price, tax_rate

                    if (!error) {
                        var reser_id = {
                            "reservation_id": bookingId
                        };

                        console.log('Result :' + EJSON.stringify(result.data));
                        //Sauvegarde ds la BDD de la reponse pour un numéro de réservation 
                        GetReservationProducts_Coll.insert({
                            reservation_id: bookingId
                        });
                        GetReservationProducts_Coll.update({
                            reservation_id: bookingId
                        }, {
                            $set: {
                                data: result.data
                            }
                        }, {
                            upsert: true
                        });
                        //Si result.data.response_message == Method get_reservation_products executed successfully.
                        //Imprim ticket Qrcode ?
                        return result.data;
                    } else {
                        console.log('Error :' + error);
                        GetReservationProducts_Coll.insert({
                            reservation_id: bookingId
                        });
                        GetReservationProducts_Coll.update({
                            reservation_id: bookingId
                        }, {
                            $set: {
                                data: error
                            }
                        }, {
                            upsert: true
                        });
                        return error;
                    }
                });
        } else {
            //console.log("Resevation:  "+EJSON.stringify(GetReservationProducts_Coll.find({reservation_id:bookingId})))
        }
    },

    // API Planyo-Récupérer les info d'une réservation 
    MakeReservation: function(user_id, resource_id, start_time, end_time, quantity, admin_mode, send_notifications,
        force_status, wants_share, rental_prop_xyz, rental_prop_voucher, custom_price, email, first_name, last_name,
        address, city, zip, state, country, phone_prefix, phone_number, mobile_prefix, mobile_number, user_notes, admin_notes,
        cart_id, assignment1, version, language, api_key) {


       return HTTP.call("GET", "https://api.planyo.com/rest/?resource_id=" + resource_id +
            "&start_time=" + start_time +
            "&end_time=" + end_time +
            "&quantity=" + quantity +
            "&admin_mode=" + admin_mode +
            "&send_notifications=" + send_notifications +
            "&force_status=" + force_status +
            "&wants_share=" + wants_share +
            "&rental_prop_xyz=" + rental_prop_xyz +
            "&rental_prop_voucher=" + rental_prop_voucher +
            "&custom_price=" + custom_price +
            "&email=" + email +
            "&first_name=" + first_name +
            "&last_name=" + last_name +
            "&address=" + address +
            "&city=" + city +
            "&zip=" + zip +
            "&state=" + state +
            "&country=" + country +
            "&phone_prefix=" + phone_prefix +
            "&phone_number=" + phone_number +
            "&mobile_prefix=" + mobile_prefix +
            "&mobile_number=" + mobile_number +
            "&user_notes=" + user_notes +
            "&admin_notes=" + admin_notes +
            "&cart_id=" + cart_id +
            "&assignment1=" + assignment1 +
            "&version=" + version +
            "&language=" + language +
            "&api_key=" + api_key +
            "&method=make_reservation" + 
            "&api_key=" + Meteor.settings.private.PLANYO_API_KEY + 
            "&hash_timestamp=" + moment().format("X") + 
            "&hash_key=" + CryptoJS.MD5(Meteor.settings.private.PLANYO_API_HASHKEY+moment().format("X")+"make_reservation")
                ,
            
                function(error, result) {
                    //Output:
                    //      regular_product_price float
                    // Price to be paid for all standard additional products
                    // regular_products array
                    // A named array of all standard products reserved for the reservation. The array keys are: id, name, unit_price, tax_rate, customer_reservable, recurring, per_person, quantity, usage_time
                    // custom_products array
                    // A named array of all custom products reserved for the reservation. The array keys are: id, name, price, tax_rate

                    if (!error) {
                        if(result.data.response_code!=0)
                        {

                        }
                        if (result.data.response_code==0)
                        {
                         var resid = result.data.data.reservation_id;
                            Reservations.insert({"userid":user_id,"data":result.data.data});
                        }
                        else
                        {

                        }
                    console.log("Resevations reponse:  "+JSON.stringify(result.data));
                        return result.data;

                    } else {
     console.log("Resevations reponse:  "+JSON.stringify(error));
                        return error;
                    }
                }
                );
    
    },

    // API Planyo add-reservation-payment
    //reservation_id: int
    //payment_mode: int
    add_reservation_payment: function(reservation_id, payment_mode, payment_status, payment_response_code, transaction_id, transaction_status_text, amount, currency, api_key){
//http://api.planyo.com/rest/?reservation_id=1898801&
//payment_mode=11&
//payment_status=1&
//payment_response_code=&
//transaction_id=001&
//transaction_status_text=&
//amount=5&currency=EUR&
//api_key=6c516632983afd2a9b40525eb1ea2b54bf37e18425264d1d2b5062afee2b61&
//method=add_reservation_payment)
    
return HTTP.call("GET", "http://api.planyo.com/rest/?reservation_id=" + reservation_id +
            "&payment_mode=" + payment_mode +
            "&payment_status=" + payment_status +
            "&payment_response_code=" + payment_response_code +
            "&transaction_id=" + transaction_id +
            "&transaction_status_text=" + transaction_status_text +
            "&amount=" + amount +
            "&api_key=" + api_key +
            "&method=add_reservation_payment"
            );
    },
   

//{"data":{"status":"7"},"response_code":0,"response_message":"Method add_reservation_payment executed successfully."}

// API Planyo-Informations liste des resources
    list_resources: function(detail_level, page, admin_id, res_filter_name, res_filter_value, site_id, api_key){

if(admin_id==null)
{
    admin_id = "";
}
if(res_filter_name==null)
{
    res_filter_name = "";
}
if(res_filter_value==null)
{
    res_filter_value = "";
}


            return HTTP.call ("GET", "http://api.planyo.com/rest/?detail_level="+ detail_level +
                                     "&page="+ page +
                                     "&admin_id="+ admin_id +
                                     "&res_filter_name="+ res_filter_name +
                                     "&res_filter_value="+ res_filter_value +
                                     "&site_id=" + site_id +
                                     "&api_key=" + api_key +
                                     "&method=list_resources",
function(error, result) {
                if (!error) {
                    if (Sites_Coll.find({}).count() > 0) {
                         //console.log('Result :' + EJSON.stringify(result.data));
                        //console.log("Recup liste ressources");
                        //fonction récup les numéros des sites

      //console.log("find fetch: "+EJSON.stringify(result.data.data));
      var json = result.data.data.resources;

// var jsontest =  "resources" : {
//         "56751" : {
//             "name" : "Concarneau Camping-cars",
//             "id" : 56751,
//             "resource_admin_id" : null,
//             "resource_admin_email" : null,
//             "resource_admin_name" : null,
//             "quantity" : "27",
//             "site_id" : "21710",
//             "confirmation_type" : "4",
//             "category" : "9978",
//             "unit_price" : "0",
//             "currency" : "EUR",
//             "min_rental_time" : "24",
//             "min_time_between_rentals" : 0,
//             "max_rental_time" : "168",
//             "min_hours_to_rental" : "0",
//             "max_days_to_rental" : "365",
//             "is_published" : "true",
//             "is_listed" : "true",
//             "is_overnight_stay" : "0"
//         },
//                 "22222" : {
//             "name" : "Quimper Camping-cars",
//             "id" : 22222,
//             "resource_admin_id" : null,
//             "resource_admin_email" : null,
//             "resource_admin_name" : null,
//             "quantity" : "27",
//             "site_id" : "21710",
//             "confirmation_type" : "4",
//             "category" : "9978",
//             "unit_price" : "0",
//             "currency" : "EUR",
//             "min_rental_time" : "24",
//             "min_time_between_rentals" : 0,
//             "max_rental_time" : "168",
//             "min_hours_to_rental" : "0",
//             "max_days_to_rental" : "365",
//             "is_published" : "true",
//             "is_listed" : "true",
//             "is_overnight_stay" : "0"
//         }
//     }


var array = [];
for (elem in json) {
    //console.log("Element json: "+elem);
   array.push(json[elem]);
}

    //console.log("To array: "+EJSON.stringify(array));

                        Sites_Coll.update({
                            "site_id": site_id
                        }, {
                            $set: {"resources": array}
                        }, {
                            upsert: true
                        });
                    } else {
                      //console.log('Result :' + EJSON.stringify(result.data));
                        //console.log("creation base de donnée liste ressources");

                        Sites_Coll.insert({
                            "site_id": site_id,
                            "api_key": api_key
                        });
                        Sites_Coll.update({
                            "site_id": site_id
                        }, {
                            $set: {"resources":array}
                        }, {
                            upsert: true
                        });
                    }

                    return result.data;
                } else {
                    console.log('Error :' + error);
                    // GetReservationProducts_Coll.insert({reservation_id:bookingId});
                    // GetReservationProducts_Coll.update({reservation_id:bookingId}, {$set: {data: error}}, { upsert: true });
                    //Affichage Message erreur -        error.response_message == Reservation not found

                    return error;
                }
            });
    },

 
    // API Planyo-Informations d'une resource
    get_resource_info: function(resource_id, version, language, api_key) {
        var resid = resource_id;
        var api = api_key;
        return HTTP.call("GET", "http://api.planyo.com/rest/?resource_id=" + resource_id + "&version=" + version + "&api_key=" + api_key + "&method=get_resource_info",           

            function(error, result) {
                if (!error) {
                    if (Parking_Coll.find({}).count() > 0) {
                        console.log("Recup info res");

                        Parking_Coll.update({
                            resource_id: resid
                        }, {
                            $set: result.data.data
                        }, {
                            upsert: true
                        });
                    } else {
                        console.log("creation base de donnée res");
                        Parking_Coll.insert({
                            "resource_id": resid,
                            "api_key": api_key
                        });
                        Parking_Coll.update({
                            resource_id: resid
                        }, {
                            $set: result.data.data
                        }, {
                            upsert: true
                        });
                    }

                    return result.data;
                } else {
                    console.log('Error :' + error);
                    // GetReservationProducts_Coll.insert({reservation_id:bookingId});
                    // GetReservationProducts_Coll.update({reservation_id:bookingId}, {$set: {data: error}}, { upsert: true });
                    //Affichage Message erreur -        error.response_message == Reservation not found

                    return error;
                }
            });

        // Output: 
        // name string
        // Resource name
        // translated_name string
        // Resource name translated to the language passed in the language parameter
        // quantity int
        // Number of units available
        // site_id int
        // Planyo site ID
        // confirmation_type ConfirmationType
        // Reservation approval mode
        // category int
        // Category of the resource
        // sharing_mode SharingMode
        // Resource's sharing mode
        // start_hour int
        // Resource is available on working days from this time (ignore for day-based resources)
        // end_hour int
        // Resource is available on working days until this time (ignore for day-based resources)
        // start_quarters Quarters
        // Allowed start quarters (ignore for day-based resources)
        // time_unit TimeUnit
        // Base time unit of the resource (day-based, hour-based or quarter-based)
        // unit_price string
        // Price of one unit (returned as float) or URL for custom pricing
        // unit_names string
        // Comma-seprated unit names, in case the resource has quantity greater than 1 and units have defined names
        // currency string
        // Currency in which prices are expressed (3-letter ISO 4217 code)
        // is_overnight_stay bool
        // True for over-night rentals (e.g. hotels, vacation homes)
        // is_published bool
        // True if the resource is marked as published, false if it's unpublished.
        // max_quantity_per_rental int
        // Max. quantity allowed for a single reservation
        // properties array
        // Array whose items are resource-specific properties (name => value) defined in the admin panel in: Site settings / Custom resource properties
        // min_rental_time float
        // Minimum rental time expressed in hours
        // max_rental_time float
        // Maximum rental time expressed in hours
        // start_times string
        // Resource setting Restrict starting times. This only applies to hour-based resources. The different times should be comma-separated.
        // min_hours_to_rental int
        // Resource setting Min. time between reservation and rental. This is an integer, time is expressed in hours
        // max_days_to_rental int
        // Resource setting Max. time between reservation and rental. This is an integer, time is expressed in days.
        // event_dates string
        // For event-type resources, you can specify comma-separated start dates or start dates and times (in the same way as in resource settings).
        // photos array
        // Array whose items are named arrays with following keys: id (unique photo ID), path (URL of the photo), title (optional title)


    },

    // API Planyo-Informations user
    get_user_data: function(user_id, email, detail_level, api_key) {
        //var g = "http://api.planyo.com/rest/?user_id="+user_id+"&email="+email+"&detail_level="+detail_level+"&api_key="+api_key+"&method=get_user_data";
        //http://api.planyo.com/rest/?user_id=838829&email=&detail_level=&api_key=6c516632983afd2a9b40525eb1ea2b54bf37e18425264d1d2b5062afee2b61&method=get_user_data
        return HTTP.call("GET", "http://api.planyo.com/rest/?user_id=" + user_id + "&email=&detail_level=&api_key=" + api_key + "&method=get_user_data",
            function(error, result) {
                if (!error) {
                    // Resources_Coll.remove({});
                    console.log('Result :' + EJSON.stringify(result.data));
                    //   Resources_Coll.insert(result.data);
                    Meteor.users.insert(result.data);
                    // }
                    // else
                    // {
                    //   console.log('User: '+user_id+' exist');
                    // }
                    // GetReservationProducts_Coll.insert({reservation_id:bookingId});
                    // GetReservationProducts_Coll.update({reservation_id:bookingId}, {$set: {data: result.data}}, { upsert: true });


                    return result.data;
                } else {
                    console.log('Error :' + error);
                    // GetReservationProducts_Coll.insert({reservation_id:bookingId});
                    // GetReservationProducts_Coll.update({reservation_id:bookingId}, {$set: {data: error}}, { upsert: true });
                    //Affichage Message erreur -        error.response_message == Reservation not found

                    return error;
                }
            });

        // Output:
        // login string
        // User's login name
        // id int
        // User ID
        // email string
        // User's email address
        // registration_time DateTime
        // Time of registration or entry into the system
        // is_email_verified bool
        // Returns true if user's email has been verified or false otherwise.
        // first_name string
        // User's first name
        // last_name string
        // User's last name
        // address string
        // User's address
        // city string
        // User's city
        // zip string
        // Zip or postal code
        // state string
        // State or province
        // country string
        // Two-letter country code (ISO 3166-1 alpha-2)
        // phone_number string
        // Phone number (including country code)
        // mobile_number string
        // Mobile number (including country code)
        // properties array
        // If you requested custom user properties to be returned (using detail_level), then they will be returned in here.

    },

    // API Planyo-List des réservations sur une période
    list_reservations: function(start_time, end_time, resource_id, site_id, api_key) {
        //console.log("date : " + start_time + " end me: " + end_time);

        return HTTP.call("GET", "http://api.planyo.com/rest/?start_time=" + start_time + "&end_time=" + end_time + "&resource_id=" + resource_id + "&site_id=" + site_id + "&sort=&detail_level=&user_id=&required_status=&excluded_status=&page=&api_key=" + api_key + "&method=list_reservations",
            function(error, result) {
                if (!error) {
                    // Resources_Coll.remove({});
                    //console.log('Result :' + EJSON.stringify(result.data.data));
                    //   Resources_Coll.insert(result.data);
                    if (result.data.data.results) {
                        var i;

                        //console.log("longueur de tableau: "+result.data.data.results.length);
                        for (i = 0; i < result.data.data.results.length; i++) {
                            var resid = result.data.data.results[i];
                            //console.log("Num reservation: " + EJSON.stringify(resid));
                            if (GetReservationProducts_Coll.find({
                                    reservation_id: resid.reservation_id
                                })) {
                                GetReservationProducts_Coll.update({
                                    reservation_id: resid.reservation_id
                                }, {
                                    $set:resid
                                    
                                }, {
                                    upsert: true
                                });
                            } else {
                                GetReservationProducts_Coll.insert({
                                    $set:resid
                                });
                            }
                        }
                    } else {

                    }

                } else {
                    console.log('Error :' + error);
                    // GetReservationProducts_Coll.insert({reservation_id:bookingId});
                    // GetReservationProducts_Coll.update({reservation_id:bookingId}, {$set: {data: error}}, { upsert: true });
                    //Affichage Message erreur -        error.response_message == Reservation not found

                    // return error;
                }
            });

        // list_reservations (version 1)
        // Description:
        // Lists all reservations that either start within given time period or that were entered into the system within given time period (when list_by_creation_date is true). A maximum of 500 reservations will be listed. For further items use the 'page' parameter.
        // Input:
        // start_time DateTime required
        // Start of time period
        // end_time DateTime required
        // End of time period
        // resource_id int optional
        // Optionally you can only list reservations for a single resource by specifying its ID here
        // site_id int optional
        // Planyo site ID (needed if using a metasite api key and you only want the results to come from a single site)
        // list_by_creation_date bool optional
        // If true, this function returns reservations created between given start and end time. If false, the function returns reservations that begin between given start and end times. Note: if this is set to false, you can use an additional parameter: must_include_time_point DateTime if you want to only list rentals which go over a specific point in time. In such case you still must pass start_time and end time.
        // sort string optional
        // Optional sort field. One of: user, user_id, email, phone, resource_id, resource, reservation_id, duration
        // sort_reverse bool optional
        // If true, the ordering (sort field) will be reversed (descending order)
        // detail_level int optional
        // Sum of one or more of the following integers (ORed value): 1=reservation info (all except for price and custom properties), 2=reservation properties, 4=pricing info and flexible package assignments, 8=custom resource properties, 16=site properties. Default value is 1.
        // user_id int optional
        // You can optionally pass the user ID of a customer if you want the reservation listing to be limited to that customer only.
        // required_status ReservationStatus optional
        // You can optionally filter the results to only include reservations with desired status. The value can be a single status value (e.g. 4 for confirmed reservations) or a bitwise OR if multiple status values are required (e.g. checked-in and confirmed).
        // excluded_status ReservationStatus optional
        // You can optionally filter the results to exclude reservations with specific statuses. The value can be a single status value (e.g. 4 for confirmed reservations) or a bitwise OR if multiple status values are to be excluded (e.g. 24 if you want to exclude all reservations cancelled EITHER by admin OR by user).
        // page int optional
        // Zero-based page number. The default is 0. Each page lists max 500 reservations.
        // version float optional
        // you can optionally specify the version of the API that you're using. Use the value of latest or simply skip this parameter to use the latest API version. The latest version is: 1
        // language string optional
        // by specifying a 2-letter (ISO 639-1) language code (all capital letters e.g. EN, DE, FR, ES, IT) you can change the language of the text values returned
        // api_key string required
        // your API key - Click here to get your key. If your API key uses a hash key, you must also include the parameters hash_key and hash_timestamp.
        // Output:
        // results array
        // Array whose items are named arrays with the following keys: reservation_id, start_time, end_time, creation_time, quantity, user_notes, admin_notes, unit_assignment, custom_color, night_reservation, first_name, last_name, login, user_id, email, phone, phone_country_code, mobile_number, mobile_country_code, address, city, zip, country, resource_id, name (resource name), status. In case detail_level is set, this can also include: properties (named array), total_price and original_price, resources assigned in a flexible package (flexible_package_assignment_X), resource_properties, or site_properties.

    },
 list_additional_products: function(site_id, api_key) {
        //console.log("date : " + start_time + " end me: " + end_time); products

        return HTTP.call("GET", "http://api.planyo.com/rest/?site_id="+site_id+"&api_key="+api_key+"&method=list_additional_products",

          function(error, result) {
                if (!error) {
                    // Resources_Coll.remove({});
                    console.log('list additional product Result :' + EJSON.stringify(result.data.data.products));
                    //Additional_Products_Coll.insert(result.data.data);
                    if (result.data.data.products) {
                        var i;

                        //console.log("data addproduct: "+result.data.data.products);
                        Additional_Products_Coll.remove({});
                        Additional_Products_Coll.insert(result.data.data.products);
               
                    } else {

                    }

                } else {
                    console.log('Error :' + error);
                    // GetReservationProducts_Coll.insert({reservation_id:bookingId});
                    // GetReservationProducts_Coll.update({reservation_id:bookingId}, {$set: {data: error}}, { upsert: true });
                    //Affichage Message erreur -        error.response_message == Reservation not found

                    // return error;
                }
            });
      },

});
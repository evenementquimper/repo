ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.public.FB_APP_ID,
    secret: Meteor.settings.public.FB_SECRET
});

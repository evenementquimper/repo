/**
 * Options
 *
 */

//import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

//import { Tasks } from '../api/tasks.js'; 

//import './task.js';
//import './indexdash.html';
//import './loginLayout.html';



AccountsTemplates.configure({

    // Behavior
    //confirmPassword: true,
    //enablePasswordChange: true,
    forbidClientAccountCreation: true,
    //overrideLoginErrors: true,
    
//parametrer MAIL_URL
    sendVerificationEmail: true,
    enforceEmailVerification: true,

    //lowercaseUsername: false,
    //focusFirstInput: true,

    // Appearance
    //showAddRemoveServices: false,
    //showForgotPasswordLink: false,
    //showLabels: true,
    //showPlaceholders: true,
    //showResendVerificationEmailLink: false,

    // Client-side Validation
    //continuousValidation: false,
    //negativeFeedback: false,
    //negativeValidation: true,
    //positiveValidation: true,
    //positiveFeedback: true,
    //showValidating: true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 5000,

    //Captcha
    //reCaptcha: {
    //    siteKey: 1234,
    //    theme: "light",
    //    data_type: "image"
    //},
    //showReCaptcha: true,
    // Hooks
     //onLogoutHook: myLogoutFunc,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    //defaultTemplate: 'Auth_page',
    //defaultLayout: 'loginLayout',
    defaultContentRegion: 'main',
    defaultLayoutRegions: {},
    // Texts
    texts: {
      button: {
         signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
         "meteor-developer": "fa fa-rocket"
      },
      title: {
         forgotPwd: "Recover Your Password"
      },
    },







    //defaultTemplate: 'appLayout',
    //defaultLayout: 'appLayout',
	// defaultLayoutRegions: {
 //        header: '_header',
 //        footer: '_footer'
 //    },
    //defaultContentRegion: 'area',

    //showForgotPasswordLink: true,
    //overrideLoginErrors: true,
    //enablePasswordChange: true,
    //sendVerificationEmail: false,

    //enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: false,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,

    //negativeValidation: true,
    //positiveValidation:true,
    //negativeFeedback: false,
    //positiveFeedback:false,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
});


/**
 * Routes
 *
 */

// Define these routes in a file loaded on both client and server
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/index'
});

// AccountsTemplates.configureRoute('signUp', {
//   name: 'join',
//   path: '/join'
// });

// AccountsTemplates.configureRoute('forgotPwd');

// AccountsTemplates.configureRoute('resetPwd', {
//   name: 'resetPwd',
//   path: '/reset-password'
// });

 //var myPostLogout = function(){
    //example redirect after logout
    //Router.go('/home');
  //  FlowRouter.go("index");
//};

//AccountsTemplates.configure({
   // onLogoutHook: myPostLogout
//});
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('enrollAccount');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
//AccountsTemplates.configureRoute('verifyEmail');
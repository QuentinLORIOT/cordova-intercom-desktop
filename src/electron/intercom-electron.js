var appId = 'APP_ID';
var unReadCount = 0;
var authorizedLanguages = ['fr', 'en'];
var defaultLanguage = 'fr';

var script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = "(function(){var w=window;var ic=w.Intercom;if(typeof ic==='function'){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;"
    + "  s.src='https://widget.intercom.io/widget/" + appId + "';"
    + "  var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()";
document.getElementsByTagName('head')[0].appendChild(script);

function getAppVersion() {
    const app = window.require('electron').remote.app;
    return app.getVersion();
}

function checkLang(lang) {
    return authorizedLanguages.indexOf(lang.toLowerCase()) > -1;
}

var intercom = {
    registerIdentifiedUser: function (successCallback, errorCallback, options) {
        window.Intercom('boot', {
            app_id: appId,
            language_override: checkLang(options[0].lang) ? options[0].lang.toLowerCase() : defaultLanguage,
            user_id: options[0].userId,
            user_hash: options[0].userHash,
            desktop_app_version: getAppVersion(),
            desktop_platform: process.platform
        });
        successCallback('success');
    },
    registerUnidentifiedUser: function (successCallback, errorCallback, options) {
        window.Intercom('boot', {
            app_id: appId,
            language_override: checkLang(options[0].lang) ? options[0].lang.toLowerCase() : defaultLanguage,
            desktop_app_version: getAppVersion(),
            desktop_platform: process.platform
        });
        successCallback('success');
    },
    logout: function (successCallback, errorCallback) {
        Intercom('shutdown');
        successCallback('success');
    },
    unreadConversationCount: function (successCallback, errorCallback) {
        successCallback(unReadCount);
    },
    displayMessageComposerWithInitialMessage: function (successCallback, errorCallback, options) {
        Intercom('showNewMessage', options[0]);
        successCallback('success');
    },
    displayMessageComposer: function (successCallback, errorCallback) {
        Intercom('showNewMessage');
        successCallback('success');
    },
    displayConversationsList: function (successCallback, errorCallback) {
        Intercom('showMessages');
        successCallback('success');
    },
    logEvent: function (successCallback, errorCallback, options) {
        Intercom('trackEvent', options[0], options[1]);
        successCallback('success');
    }
};

Intercom('onUnreadCountChange', function (count) {
    unReadCount = count;
});

module.exports = intercom;

require("cordova/exec/proxy").add("Intercom", intercom);

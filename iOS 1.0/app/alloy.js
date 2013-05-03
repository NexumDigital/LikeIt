// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.properties = []
Alloy.Globals.properties.id_session = Ti.App.Properties.getString('id_session', '');
Alloy.Globals.properties.code = Ti.App.Properties.getString('code', '');
Alloy.Globals.properties.username = Ti.App.Properties.getString('username', '');
Alloy.Globals.properties.profile_picture = Ti.App.Properties.getString('profile_picture', '');
Alloy.Globals.properties.email = Ti.App.Properties.getString('email', '');

Alloy.Globals.http = require('http');

Alloy.Globals.height = Ti.Platform.displayCaps.platformHeight - 20;
Alloy.Globals.width = Ti.Platform.displayCaps.platformWidth;

Alloy.Globals.data = [];
// GRID
Alloy.Globals.data.media = [];
Alloy.Globals.data.frames = [];
Alloy.Globals.data.visible = [];
// ZOOM
Alloy.Globals.data.containers = [];
// DETAILS
Alloy.Globals.data.tags = [];
Alloy.Globals.data.likes = [];
Alloy.Globals.data.albums = [];

// UI STATE
Alloy.Globals.ui = [];
Alloy.Globals.ui.zoom_index = null;
Alloy.Globals.ui.streams = [];
Alloy.Globals.ui.albums = [];
Alloy.Globals.ui.relationships = [];
Alloy.Globals.ui.album = [];
Alloy.Globals.ui.album['id_album'] = null;
Alloy.Globals.ui.album['title'] = null;
Alloy.Globals.ui.stream = [];
Alloy.Globals.ui.stream['id_stream'] = null;
Alloy.Globals.ui.stream['title'] = null;
Alloy.Globals.ui.stream['stream'] = null;
Alloy.Globals.ui.stream['identifier'] = null;

// MODULES
Alloy.Globals.modules = [];

Alloy.Globals.modules.twitterbook = require("es.appio.twitterbook");

Alloy.Globals.modules.flurry = require("com.onecowstanding.flurry");
Alloy.Globals.modules.flurry.appVersion = Ti.App.version;
Alloy.Globals.modules.flurry.sessionReportsOnPauseEnabled = true;
Alloy.Globals.modules.flurry.sessionReportsOnCloseEnabled = true;
Alloy.Globals.modules.flurry.startSession(Alloy.CFG.fl_key);
if ('' !== Alloy.Globals.properties.id_session)
	Alloy.Globals.modules.flurry.setUserId(Alloy.Globals.properties.id_session);

Alloy.Globals.modules.push = {};
Alloy.Globals.modules.push.register = function() {
	Ti.Network.registerForPushNotifications({
		types : [Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND],
		success : function(e) {
			Alloy.Globals.modules.push.success(e);
		},
		error : function(e) {
			Alloy.Globals.modules.push.error(e);
		},
		callback : function(e) {
			Alloy.Globals.modules.push.message(e);
		}
	});
};
Alloy.Globals.modules.push.success = function(e) {
	Alloy.Globals.http.post('subscribers/device_token', {
		device_token : e.deviceToken
	});
};
Alloy.Globals.modules.push.error = function(e) {
	alert(e.error);
};
Alloy.Globals.modules.push.message = function(e) {
};

Alloy.Globals.animation = require('alloy/animation');

Ti.Gesture.addEventListener('orientationchange', function(e) {
	Alloy.Globals.height = Ti.Platform.displayCaps.platformHeight - 20;
	Alloy.Globals.width = Ti.Platform.displayCaps.platformWidth;
});

Ti.Geolocation.purpose = 'to find places near you';
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

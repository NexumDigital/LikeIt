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

Alloy.Globals.http = require('http');

Alloy.Globals.height = Ti.Platform.displayCaps.platformHeight - 20;
Alloy.Globals.width = Ti.Platform.displayCaps.platformWidth;

Alloy.Globals.stream = [];
Alloy.Globals.stream['title'] = null;
Alloy.Globals.stream['stream'] = null;
Alloy.Globals.stream['identifier'] = null;

Alloy.Globals.data = [];
// GRID
Alloy.Globals.data.photos = [];
Alloy.Globals.data.frames = [];
Alloy.Globals.data.visible = [];
// ZOOM
Alloy.Globals.data.containers = [];
// DETAILS
Alloy.Globals.data.tags = [];
Alloy.Globals.data.likes = [];

// UI STATE
Alloy.Globals.ui = [];
Alloy.Globals.ui.zoom_id_ig_media = null;
Alloy.Globals.ui.streams = [];
Alloy.Globals.ui.albums = [];
Alloy.Globals.ui.relationships = [];



Alloy.Globals.animation = require('alloy/animation');

Ti.Gesture.addEventListener('orientationchange', function (e) {
    Alloy.Globals.height = Ti.Platform.displayCaps.platformHeight - 20;
    Alloy.Globals.width = Ti.Platform.displayCaps.platformWidth;
});

Ti.Geolocation.purpose = 'to find places near you';
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
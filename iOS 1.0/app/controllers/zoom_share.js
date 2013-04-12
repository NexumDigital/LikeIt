$.zoom_share.alert = Titanium.UI.createAlertDialog({
	title : 'You can paste the link now',
	buttonNames : ['Got it!']
});

$.zoom_share.image = Ti.UI.createImageView({
	image : Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['urls']['612'],
	width : 612,
	height : 612
});

function facebookTap() {
	Alloy.Globals.modules.twitterbook.post({
		type : 'facebook',
		message : 'I found this awesome photo by @' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['username'] + ' thanks to http://facebook.com/applikeit',
		urls : [Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['link']],
		images : [$.zoom_share.image.toBlob()],
		success : function() {
		},
		cancel : function() {
		},
		error : function(e) {
		}
	});
}

function twitterTap() {
	Alloy.Globals.modules.twitterbook.post({
		type : 'twitter',
		message : 'I found this awesome photo by @' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['username'] + ' thanks to @applikeit',
		urls : [Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['link']],
		images : [$.zoom_share.image.toBlob()],
		success : function() {
		},
		cancel : function() {
		},
		error : function(e) {
		}
	});
}

function copyTap() {
	Ti.UI.Clipboard.setText(Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['link']);
	$.zoom_share.alert.show();
}
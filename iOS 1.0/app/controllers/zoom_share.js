$.zoom_share.alert = Titanium.UI.createAlertDialog({
	title : 'You can paste the link now',
	buttonNames : ['Thanks =)']
});

function facebookTap(){
	Alloy.Globals.modules.twitterbook.post({
        type : 'facebook',
        message : 'I found this awesome photo by @' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['username'] + ' with http://facebook.com/applikeit',
        urls : [Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['link']],
        images : [Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['urls']['612']],
        success : function() {},
        cancel : function() {},
        error : function(e) {}
   });
}

function twitterTap(){
	Alloy.Globals.modules.twitterbook.post({
        type : 'twitter',
        message : 'I found this awesome photo by @' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['username'] + ' with @applikeit',
        urls : [Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['link']],
        images : [Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['urls']['612']],
        success : function() {},
        cancel : function() {},
        error : function(e) {}
   });
}

function copyTap(){
	Ti.UI.Clipboard.setText(Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['link']);
	$.zoom_share.alert.show();
}
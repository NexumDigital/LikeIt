Alloy.Globals.data.tags = [];
Alloy.Globals.data.likes = [];
Alloy.Globals.data.albums = [];

$.zoom_details.tag_count = 0;
$.zoom_details.likes_count = 0;

$.zoom_details.profile_picture_params = {
	defaultImage : '',
	width : 64,
	height : 64,
	right : 0,
	left : 16,
	bottom : 16
};

$.zoom_details.boder_params = {
	touchEnabled : false,
	width : 208,
	height : 1,
	top : 0,
	left : 0,
	backgroundColor : '#ebebeb'
};

$.zoom_details.label_params = {
	width : 184,
	height : 48,
	top : 0,
	left : 16,
	color : Alloy.CFG.ui_color,
	font : {
		fontFamily : Alloy.CFG.ui_font,
		fontSize : 14,
		fontWeight : 'bold'
	}
};

$.zoom_details.addEventListener('updateDetails', function(e) {
	$.zoom_details.likes_count = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['likes']['count'];
	$.zoom_details.tag_count = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['tags'].length;

	$.author.action = 'user';
	$.author.text = '@' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['username'];
	$.author.identifier = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['id'];

	$.profile_picture.image = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['profile_picture'];
	$.username.text = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['author']['username'];
	$.caption.text = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['caption'];

	$.likes_count.text = $.zoom_details.likes_count;

	if (0 != $.zoom_details.likes_count) {
		for (var id in Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['likes']['data']) {
			Alloy.Globals.data.likes[id] = Ti.UI.createImageView($.zoom_details.profile_picture_params);
			Alloy.Globals.data.likes[id].image = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['likes']['data'][id]['profile_picture'];

			Alloy.Globals.data.likes[id].action = 'user';
			Alloy.Globals.data.likes[id].text = '@' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['likes']['data'][id]['username'];
			Alloy.Globals.data.likes[id].identifier = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['likes']['data'][id]['id'];

			$.likes.add(Alloy.Globals.data.likes[id]);
		}
	}

	if (null !== Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['location']['name']) {
		$.location.height = 65;
		$.location_name.text = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['location']['name'];

		$.location_name.action = 'location';
		$.location_name.text = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['location']['name'];
		$.location_name.identifier = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['location']['id'];
	}

	if (0 !== $.zoom_details.tag_count) {
		$.tags.height = 64;
		$.column_left.add(Ti.UI.createView($.zoom_details.boder_params));

		for (var id in Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['tags']) {
			Alloy.Globals.data.tags[id] = Ti.UI.createLabel($.zoom_details.label_params);
			Alloy.Globals.data.tags[id].text = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['tags'][id];

			Alloy.Globals.data.tags[id].action = 'tag';
			Alloy.Globals.data.tags[id].text = '#' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['tags'][id];
			Alloy.Globals.data.tags[id].identifier = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['tags'][id];

			$.column_left.add(Alloy.Globals.data.tags[id]);
			$.column_left.add(Ti.UI.createView($.zoom_details.boder_params));
		}
	}
	
	for(var id in Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['albums']){
		Alloy.Globals.data.albums[Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['albums'][id]] = true;
	}
	
});

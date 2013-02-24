var tags = {};
var tag_count = 0;

var boder_params = {
	touchEnabled : false,
	width : 208,
	height : 1,
	top : 0,
	left : 0,
	backgroundColor : '#ebebeb'
};

var label_params = {
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

$.zoom_content.updatePhoto = function(photo_data_p) {
	tag_count = photo_data_p['tags'].length;

	$.photo.backgroundImage = photo_data_p['urls']['306'];
	$.photo.image = photo_data_p['urls']['612'];

	$.profile_picture.image = photo_data_p['author']['profile_picture'];
	$.username.text = photo_data_p['author']['username'];
	$.caption.text = photo_data_p['caption'];

	if (null !== photo_data_p['location']['name']) {
		$.location.height = 65;
		$.location_name.text = photo_data_p['location']['name'];
	}

	if (0 !== tag_count) {
		$.tags.height = 64;
		$.column_right.add(Ti.UI.createView(boder_params));

		for (var id in photo_data_p['tags']) {
			tags[id] = Ti.UI.createLabel(label_params);
			tags[id].text = photo_data_p['tags'][id];
			$.column_right.add(tags[id]);
			$.column_right.add(Ti.UI.createView(boder_params));
		}
	}
}

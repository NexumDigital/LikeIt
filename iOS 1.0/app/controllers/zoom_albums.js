var albums_data = [];

$.zoom_albums.primary = {
	backgroundImage : 'popup/primary.png',
	width : 260,
	height : 65,
	top : 0,
	left : 0
}

$.zoom_albums.label = {
	touchEnabled : false,
	width : 192,
	height : 64,
	top : 1,
	left : 34,
	color : '#666',
	font : {
		fontFamily : Alloy.CFG.ui_font,
		fontSize : 14,
		fontWeight : 'bold'
	}
}

$.zoom_albums.check = {
	touchEnabled : false,
	opacity : 0,
	image : 'popup/check.png',
	width : 51,
	height : 65,
	top : 0,
	right : 0
}

var albums_data = [];

for (var index in Alloy.Globals.ui.albums) {
	albums_data[index] = Ti.UI.createView($.zoom_albums.primary)
	albums_data[index].index = index;
	albums_data[index].id_album = Alloy.Globals.ui.albums[index]['id_album'];
	albums_data[index].label = Ti.UI.createLabel($.zoom_albums.label);
	albums_data[index].label.text = Alloy.Globals.ui.albums[index]['title'];
	albums_data[index].check = Ti.UI.createImageView($.zoom_albums.check);
	if(undefined !== Alloy.Globals.data.albums[Alloy.Globals.ui.albums[index]['id_album']]){
		albums_data[index].check.opacity = 1;
	}
	albums_data[index].add(albums_data[index].label);
	albums_data[index].add(albums_data[index].check);
	$.list.add(albums_data[index]);
}

function showCreateButton() {
	$.btn_create.opacity = 1;
}

function hideCreateButton() {
	$.btn_create.opacity = 0;
}

function createTap() {
	if ('' !== $.create_field.value) {
		Alloy.Globals.http.post('albums', {
			title : $.create_field.value
		});
		$.create_field.value = '';
		$.create_field.blur();
	}
}

function listClick(e) {
	if (1 === albums_data[e.source.index].check.opacity) {
		albums_data[e.source.index].check.opacity = 0
		
		Alloy.Globals.http.del('albums/media', e.source.id_album + '/' + Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['id_ig_media']);
	} else {
		albums_data[e.source.index].check.opacity = 1;
		
		Alloy.Globals.http.post('albums/media', {
			id_album : e.source.id_album,
			id_ig_media : Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['id_ig_media']
		});
	}

}

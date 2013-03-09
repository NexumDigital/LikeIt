$.zoom_photo.menu_albums = null;

function openLink(e) {
	switch(e.source.action) {
		case 'albums':
			updateAlbumsSelected(!$.btn_albums.selected);
			break;
		case 'share':
			updateShareSelected(!$.btn_share.selected);
			break;
		case 'user':
		case 'tag':
		case 'location':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : e.source.action,
				param_title : e.source.text,
				param_stream : e.source.action,
				param_identifier : e.source.identifier
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			break;
	}
}

function likePhoto(e) {
	$.photo_overlay.opacity = 1;
	
	Alloy.Globals.http.post('likes', {
		id_ig_media : Alloy.Globals.ui.zoom_id_ig_media
	});

	Alloy.Globals.data.photos[$.zoom_photo.index]['liked'] = true;
}

function updateAlbumsSelected(selected_p) {
	if (selected_p) {
		$.btn_albums.image = 'zoom/btn_albums_on.png';
		if (null === $.zoom_photo.menu_albums) {
			$.zoom_photo.menu_albums = Alloy.createController('zoom_albums').getView();
			$.zoom_photo.add($.zoom_photo.menu_albums);
		}
		$.btn_albums.selected = true;
	} else {
		$.btn_albums.image = 'zoom/btn_albums.png';
		if (null !== $.zoom_photo.menu_albums) {
			$.zoom_photo.remove($.zoom_photo.menu_albums);
			$.zoom_photo.menu_albums = null;
		}
		$.btn_albums.selected = false;
	}
}



function updateShareSelected(selected_p) {
	if (selected_p) {
		$.btn_share.image = 'zoom/btn_share_on.png';
		$.btn_share.selected = true;
	} else {
		$.btn_share.image = 'zoom/btn_share.png';
		$.btn_share.selected = false;
	}
}

$.zoom_photo.addEventListener('updatePhoto', function(e) {
	$.zoom_photo.index = e.index;
	
	Alloy.Globals.ui.zoom_id_ig_media = Alloy.Globals.data.photos[$.zoom_photo.index]['id_ig_media'];
	
	$.photo.backgroundImage = Alloy.Globals.data.photos[$.zoom_photo.index]['urls']['306'];
	$.photo.image = Alloy.Globals.data.photos[$.zoom_photo.index]['urls']['612'];

	$.btn_albums.action = 'albums';
	$.btn_share.action = 'share';

	if (Alloy.Globals.data.photos[$.zoom_photo.index]['liked']) {

	} else {

	}

	//if (Alloy.Globals.width < Alloy.Globals.height) {
	$.scroll.details = Alloy.createController('zoom_details_a').getView();
	$.scroll.add($.scroll.details);
	$.scroll.details.fireEvent('updateDetails', {
		index : $.zoom_photo.index
	});
	//}
});

$.zoom_media.menu_albums = null;

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
	$.media_overlay.opacity = 1;
	
	Alloy.Globals.http.post('likes', {
		id_ig_media : Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['id_ig_media']
	});

	Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['liked'] = true;
}

function updateAlbumsSelected(selected_p) {
	if (selected_p) {
		$.btn_albums.image = 'zoom/btn_albums_on.png';
		if (null === $.zoom_media.menu_albums) {
			$.zoom_media.menu_albums = Alloy.createController('zoom_albums').getView();
			$.zoom_media.add($.zoom_media.menu_albums);
		}
		$.btn_albums.selected = true;
	} else {
		$.btn_albums.image = 'zoom/btn_albums.png';
		if (null !== $.zoom_media.menu_albums) {
			$.zoom_media.remove($.zoom_media.menu_albums);
			$.zoom_media.menu_albums = null;
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

$.zoom_media.addEventListener('updatePhoto', function(e) {
	$.media.backgroundImage = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['urls']['306'];
	$.media.image = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['urls']['612'];

	$.btn_albums.action = 'albums';
	$.btn_share.action = 'share';

	if (Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['liked']) {

	} else {

	}

	//if (Alloy.Globals.width < Alloy.Globals.height) {
	$.scroll.details = Alloy.createController('zoom_details_a').getView();
	$.scroll.add($.scroll.details);
	$.scroll.details.fireEvent('updateDetails');
	//}
});

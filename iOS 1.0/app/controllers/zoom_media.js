$.zoom_media.menu_albums = null;
$.zoom_media.menu_share = null;

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
				param_id_stream : null,
				param_title : e.source.text,
				param_stream : e.source.action,
				param_identifier : e.source.identifier
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			break;
	}
}

function likePhoto(e) {
	if (Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['liked']) {
		$.media_overlay.opacity = 0;
		$.liked.image = 'zoom/btn_liked.png';
		Alloy.Globals.http.del('likes', Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['id_ig_media']);
		Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['liked'] = false;
	} else {
		if('media' === e.source.id) {
			$.media_overlay.opacity = 1;
		}
		$.liked.image = 'zoom/btn_liked_on.png';
		Alloy.Globals.http.post('likes', {
			id_ig_media : Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['id_ig_media']
		});
		Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['liked'] = true;
	}
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
		if (null === $.zoom_media.menu_share) {
			$.zoom_media.menu_share = Alloy.createController('zoom_share').getView();
			$.zoom_media.add($.zoom_media.menu_share);
		}
		$.btn_share.selected = true;
	} else {
		$.btn_share.image = 'zoom/btn_share.png';
		if (null !== $.zoom_media.menu_share) {
			$.zoom_media.remove($.zoom_media.menu_share);
			$.zoom_media.menu_share = null;
		}
		$.btn_share.selected = false;
	}
}

$.zoom_media.addEventListener('updatePhoto', function(e) {
	$.media.backgroundImage = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['urls']['306'];
	$.media.image = Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['urls']['612'];

	$.btn_albums.action = 'albums';
	$.btn_share.action = 'share';

	if (Alloy.Globals.data.media[Alloy.Globals.ui.zoom_index]['liked']) {
		$.liked.image = 'zoom/btn_liked_on.png';
	}
	
	$.scroll.details = Alloy.createController('zoom_details').getView();
	$.scroll.add($.scroll.details);
	$.scroll.details.fireEvent('updateDetails');
});
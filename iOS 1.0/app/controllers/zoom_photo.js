function openLink(e) {
	switch(e.source.action) {
		case 'post_like':
			Alloy.Globals.http.post('likes', {
				id_ig_photo : $.photo.id_ig
			});
			$.btn_like.image = 'zoom/btn_like_on.png';
			$.btn_like.action = 'delete_like';
			Alloy.Globals.data.photos[$.zoom_photo.index]['liked'] = true;
			break;
		case 'delete_like':
			Alloy.Globals.http.del('likes', $.photo.id_ig);
			$.btn_like.image = 'zoom/btn_like.png';
			$.btn_like.action = 'post_like';
			Alloy.Globals.data.photos[$.zoom_photo.index]['liked'] = false;
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
		id_ig_photo : $.photo.id_ig
	});
}

$.zoom_photo.addEventListener('updatePhoto', function(e) {
	$.zoom_photo.index = e.index;

	$.photo.id_ig = Alloy.Globals.data.photos[$.zoom_photo.index]['id'];

	$.photo.backgroundImage = Alloy.Globals.data.photos[$.zoom_photo.index]['urls']['306'];
	$.photo.image = Alloy.Globals.data.photos[$.zoom_photo.index]['urls']['612'];

	if (Alloy.Globals.data.photos[$.zoom_photo.index]['liked']) {
		$.btn_like.image = 'zoom/btn_like_on.png';
		$.btn_like.action = 'delete_like';
	} else {
		$.btn_like.action = 'post_like';
	}

	//if (Alloy.Globals.width < Alloy.Globals.height) {
		$.scroll.details = Alloy.createController('zoom_details_a').getView();
		$.scroll.add($.scroll.details);
		$.scroll.details.fireEvent('updateDetails', {
			index : $.zoom_photo.index
		});
	//}
});

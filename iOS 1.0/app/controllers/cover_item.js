$.cover_item.addEventListener('updateStream', function(e) {
	$.cover_item.origin = 'streams';
	$.cover_item.id_stream = e.id_stream;
	$.cover_item.stream = e.stream;
	$.cover_item.identifier = e.identifier;
	$.cover_item.title = e.title.toUpperCase();
	$.cover_item.icon = e.icon;
	$.thumbnail.image = e.thumbnail;
	$.icon.image = 'cover/icon_' + e.icon + '.png';
	$.title.text = e.title.toUpperCase();
});

$.cover_item.addEventListener('updateAlbum', function(e) {
	$.cover_item.origin = 'albums';
	
	$.cover_item.id_album = e.id_album;
	$.cover_item.title = e.title.toUpperCase();
	
	$.thumbnail.image = e.thumbnail;
	
	$.title.left = 16;
	$.title.width = 224;
	$.title.text = e.title.toUpperCase();
}); 
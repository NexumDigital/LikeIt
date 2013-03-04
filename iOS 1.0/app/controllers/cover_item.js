$.cover_item.addEventListener('updateItem', function(e) {
	$.cover_item.id_stream = e.id_stream;
	$.cover_item.action = e.action;
	$.cover_item.title = e.label.toUpperCase();
	$.cover_item.icon = e.icon;
	$.back.image = e.image;
	$.icon.image = 'cover/icon_'+e.icon+'.png';
	$.label.text = e.label.toUpperCase();
}); 
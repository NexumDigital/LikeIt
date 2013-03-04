function openLeft() {
	Alloy.Globals.index.fireEvent('openLeft');
}

function openRight() {
	Alloy.Globals.index.fireEvent('openRight');
}

$.header.updateIcon = function(icon_p) {
	$.title_icon.image = 'header/icon_' + icon_p + '.png';
}

$.header.updateTitle = function(title_p) {
	$.title_text.text = title_p.toUpperCase();
}

$.header.updateRight = function(icon_p) {
	if ('instagram' === icon_p || 'album' === icon_p || 'results' === icon_p)
		$.right.image = '';
	else
		$.right.image = 'header/right.png';
}

$.header.getTitle = function() {
	return $.title_text.text;
}
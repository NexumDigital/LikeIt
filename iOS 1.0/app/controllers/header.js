function openLeft() {
	Alloy.Globals.index.fireEvent('openLeft');
}

function openRight() {
	Alloy.Globals.index.fireEvent('openRight', {
		options : $.right.options
	});
}

$.header.updateIcon = function(icon_p) {
	//$.title_icon.image = 'header/icon_' + icon_p + '.png';
}

$.header.updateTitle = function(title_p) {
	$.title_text.text = title_p.toUpperCase();
}

$.header.updateRight = function(options_p) {
	switch(options_p) {
		case 'a' :
		case 'b' :
			$.right.image = 'header/right.png';
			break;
		default :
			$.right.image = '';
			break;
	}

	$.right.options = options_p;
}

$.header.updateRightSelected = function(selected_p) {
	if (selected_p)
		$.right.image = 'header/right_on.png';
	else
		$.right.image = 'header/right.png';
}

$.header.getTitle = function() {
	return $.title_text.text;
}
$.title_input.hasFocus = false;
$.title_input.value = Alloy.Globals.ui.album['title'];

function closeInput() {
	Alloy.Globals.index.fireEvent('closeOverlay');
}

function sendTitle(e) {
	if ('' !== $.title_input.value) {
		Alloy.Globals.ui.album['title'] = $.title_input.value;
		
		Alloy.Globals.http.put('albums', Alloy.Globals.ui.album['id_album'], {
			title : Alloy.Globals.ui.album['title']
		});
		
		Alloy.Globals.index.ui_header.updateTitle(Alloy.Globals.ui.album['title']);
		
		Alloy.Globals.index.fireEvent('closeOverlay');
	}
}

$.input_title.addEventListener('adjustContent', function(e) {
	var keyboard_height;
	if (Alloy.Globals.width < Alloy.Globals.height) {
		keyboard_height = 262;
	} else {
		keyboard_height = 350;
	}
	
	$.content.animate(Ti.UI.createAnimation({
		top : ((Alloy.Globals.height - $.content.height - ($.title_input.hasFocus ? keyboard_height : 0)) / 2)
	}));
});

$.title_input.addEventListener('focus', function(e) {
	$.title_input.hasFocus = true;
	$.input_title.fireEvent('adjustContent');
});

$.title_input.addEventListener('blur', function(e) {
	$.title_input.hasFocus = false;
	$.input_title.fireEvent('adjustContent');
});
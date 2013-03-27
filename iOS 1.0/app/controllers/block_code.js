$.code_input.hasFocus = false;

function blockMail() {
	Alloy.Globals.index.fireEvent('overlayAction', {
		kind : 'block_email',
		action : 'blockEmail'
	});
}

function sendCode(e) {
	if ('' !== $.code_input.value) {
		Alloy.Globals.http.post('subscribers/invite', {
			invite : $.code_input.value
		});
	}
}

$.block_code.addEventListener('adjustContent', function(e) {
	var keyboard_height;
	if (Alloy.Globals.width < Alloy.Globals.height) {
		keyboard_height = 262;
	} else {
		keyboard_height = 350;
	}

	$.border.animate(Ti.UI.createAnimation({
		top : ((Alloy.Globals.height - $.border.height - ($.code_input.hasFocus ? keyboard_height : 0)) / 2)
	}));
	$.content.animate(Ti.UI.createAnimation({
		top : ((Alloy.Globals.height - $.content.height - ($.code_input.hasFocus ? keyboard_height : 0)) / 2)
	}));
});

$.code_input.addEventListener('focus', function(e) {
	$.code_input.hasFocus = true;
	$.block_code.fireEvent('adjustContent');
});

$.code_input.addEventListener('blur', function(e) {
	$.code_input.hasFocus = false;
	$.block_code.fireEvent('adjustContent');
}); 
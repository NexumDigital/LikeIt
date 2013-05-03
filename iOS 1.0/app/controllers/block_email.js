$.mail_input.hasFocus = false;
$.mail_input.value = Alloy.Globals.properties.email;

function sendEmail(e) {
	if ('' !== $.mail_input.value) {
		Alloy.Globals.http.post('subscribers/email', {
			email : $.mail_input.value
		});
		
		Alloy.Globals.properties.email = $.mail_input.value;
	}
}


$.block_email.addEventListener('adjustContent', function(e) {
	var keyboard_height;
	if (Alloy.Globals.width < Alloy.Globals.height) {
		keyboard_height = 262;
	} else {
		keyboard_height = 350;
	}
	
	$.content.animate(Ti.UI.createAnimation({ top : ((Alloy.Globals.height - $.content.height - ($.mail_input.hasFocus ? keyboard_height : 0))/2)}));
});

$.mail_input.addEventListener('focus', function(e){
	$.mail_input.hasFocus = true;
	
	$.block_email.fireEvent('adjustContent');
});

$.mail_input.addEventListener('blur', function(e){
	$.mail_input.hasFocus = false;
	
	$.block_email.fireEvent('adjustContent');
});

$.block_email.fireEvent('adjustContent');
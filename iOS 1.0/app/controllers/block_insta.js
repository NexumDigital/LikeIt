$.block_insta.current_event = 'requestLogin';

function tapCancel() {
	Alloy.Globals.index.fireEvent('blockAction', {
		kind : 'block_intro'
	});
}

$.block_insta.alert = Titanium.UI.createAlertDialog({
	title : 'Instagram is unavailable',
	buttonNames : [':(', 'Retry!']
});

$.block_insta.alert.addEventListener('click', function(e) {
	switch (e.index) {
		case 0:
			Alloy.Globals.index.fireEvent('blockAction', {
				kind : 'intro'
			});
			break;
		case 1:
			$.block_insta.fireEvent($.block_insta.current_event);
			break;
		default:
			break;
	}
});

$.web.addEventListener('load', function(e) {
	if (undefined !== e.source.url) {
		switch($.block_insta.current_event) {
			case 'requestLogin':
				$.web.opacity = 1;

				var invalid = ['http://instagram.com/', 'https://instagram.com/accounts/login/?next=', 'https://instagram.com/accounts/login/', 'http://nexumdigital.com/', 'https://instagram.com/accounts/password/reset/done/'];

				$.block_insta.url = e.source.url;
				$.block_insta.url = $.block_insta.url.replace('&_=_#_', '');
				$.block_insta.url = $.block_insta.url.replace('_#_', '');
				$.block_insta.url = $.block_insta.url.replace('#_', '');

				$.block_insta.code = $.block_insta.url.replace(Alloy.CFG.ig_callback + '?code=', '');
				$.block_insta.error_reason = $.block_insta.url.replace(Alloy.CFG.ig_callback + '?error_reason=', '');
				if ($.block_insta.code != $.block_insta.url) {
					Ti.App.Properties.setString('code', $.block_insta.code);
					Alloy.Globals.properties.code = $.block_insta.code;

					Alloy.Globals.http.post('sessions', {
						id_install : Ti.Platform.id,
						client : Ti.App.id,
						version : Ti.App.version,
						code : Alloy.Globals.properties.code
					});
					
					$.web.opacity = 0;
				} else if ($.block_insta.error_reason != e.source.url || -1 !== invalid.indexOf($.block_insta.url)) {
					$.block_insta.fireEvent('requestLogin');
				}
				break;
			case 'requestLogout':
				Ti.App.Properties.setString('id_session', '');
				Alloy.Globals.properties.id_session = '';
				Ti.App.Properties.setString('code', '');
				Alloy.Globals.properties.code = '';
				Ti.App.Properties.setString('email', '');
				Alloy.Globals.properties.email = '';

				Alloy.Globals.index.fireEvent('blockAction', {
					kind : 'block_intro'
				});
				$.block_insta.fireEvent('requestLogin');
				break;
		}
	}
});

$.web.addEventListener('error', function(e) {
	$.block_insta.alert.show();
});

$.block_insta.addEventListener('requestLogin', function(e) {
	$.block_insta.current_event = 'requestLogin';
	$.web.url = 'https://api.instagram.com/oauth/authorize/?client_id=' + Alloy.CFG.ig_client_id + '&redirect_uri=' + Alloy.CFG.ig_callback + '&response_type=code&scope=relationships+likes+comments&display=touch';
});

$.block_insta.addEventListener('requestLogout', function(e) {
	$.web.opacity = 0;
	$.block_insta.current_event = 'requestLogout';
	$.web.url = Alloy.CFG.ig_logout;
});

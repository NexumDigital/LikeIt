$.instagram.current_event = 'requestLogin';

function requestLogin() {
	$.instagram.fireEvent('requestLogin');
}

$.instagram.alert = Titanium.UI.createAlertDialog({
	title : 'Instagram is unavailable',
	buttonNames : [':(', 'Retry!']
});

$.instagram.alert.addEventListener('click', function(e) {
	switch (e.index) {
		case 0:
			Alloy.Globals.index.fireEvent('blockAction', {
				kind : 'intro'
			});
			break;
		case 1:
			$.instagram.fireEvent($.instagram.current_event);
			break;
		default:
			break;
	}
});

$.web.addEventListener('load', function(e) {
	if (undefined !== e.source.url) {
		switch($.instagram.current_event) {
			case 'requestLogin':
				$.web.opacity = 1;

				var invalid = ['http://instagram.com/', 'https://instagram.com/accounts/login/?next=', 'https://instagram.com/accounts/login/', 'http://nexumdigital.com/', 'https://instagram.com/accounts/password/reset/done/'];

				$.instagram.url = e.source.url;
				$.instagram.url = $.instagram.url.replace('&_=_#_', '');
				$.instagram.url = $.instagram.url.replace('_#_', '');
				$.instagram.url = $.instagram.url.replace('#_', '');

				$.instagram.code = $.instagram.url.replace(Alloy.CFG.ig_callback + '?code=', '');
				$.instagram.error_reason = $.instagram.url.replace(Alloy.CFG.ig_callback + '?error_reason=', '');
				if ($.instagram.code != $.instagram.url) {
					Ti.App.Properties.setString('code', $.instagram.code);
					Alloy.Globals.properties.code = $.instagram.code;

					Alloy.Globals.http.post('sessions', {
						id_install : Ti.Platform.id,
						client : Ti.App.id,
						version : Ti.App.version,
						code : Alloy.Globals.properties.code
					});

					$.web.touchEnabled = false;
					$.web.opacity = 0;
				} else if ($.instagram.error_reason != e.source.url || -1 !== invalid.indexOf($.instagram.url)) {
					$.instagram.fireEvent('requestLogin');
				}
				break;
			case 'requestLogout':
				Ti.App.Properties.setString('id_session', '');
				Alloy.Globals.properties.id_session = '';
				Ti.App.Properties.setString('code', '');
				Alloy.Globals.properties.code = '';
				
				Alloy.Globals.index.fireEvent('blockAction', {
					kind : 'intro'
				});
				break;
		}

	}
});

$.web.addEventListener('error', function(e) {
	$.instagram.alert.show();
});

$.instagram.addEventListener('requestLogin', function(e) {
	Alloy.Globals.index.fireEvent('contentAction', {
		kind : 'grid',
		action : 'gridOpenLikes',
		param_title : 'Explore'
	});

	$.web.touchEnabled = true;
	$.instagram.current_event = 'requestLogin';
	$.web.url = 'https://api.instagram.com/oauth/authorize/?client_id=' + Alloy.CFG.ig_client_id + '&redirect_uri=' + Alloy.CFG.ig_callback + '&response_type=code&scope=relationships+likes+comments&display=touch';
});

$.instagram.addEventListener('requestLogout', function(e) {
	$.web.touchEnabled = true;
	$.web.opacity = 0;
	$.instagram.current_event = 'requestLogout';
	$.web.url = Alloy.CFG.ig_logout;
});

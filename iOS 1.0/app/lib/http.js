exports.get = function(path_p, params_p) {
	var http_client = Ti.Network.createHTTPClient();
	var params = '?';

	http_client.onload = function(e) {
		Ti.API.info(this.responseText);
		mod.onload.get(path_p, params_p, JSON.parse(this.responseText));
	}

	http_client.timeout = Alloy.CFG.api_timeout;

	http_client.onerror = function(e) {
		mod.onerror(path_p, params_p);
	}
	for (var key in params_p) {
		params += '&' + key + '=' + params_p[key];
	}

	http_client.open('GET', Alloy.CFG.api_url + path_p + params);

	http_client.send();
};

exports.post = function(path_p, params_p) {
	var http_client = Ti.Network.createHTTPClient();

	http_client.onload = function(e) {
		mod.onload.post(path_p, params_p, JSON.parse(this.responseText));
	}

	http_client.timeout = Alloy.CFG.api_timeout;

	http_client.onerror = function(e) {
		mod.onerror(path_p, params_p);
	}

	http_client.open('POST', Alloy.CFG.api_url + path_p);

	http_client.send(params_p);
};

exports.del = function(path_p, params_p) {
	var http_client = Ti.Network.createHTTPClient();

	http_client.onload = function(e) {
		Ti.API.info(this.responseText);
		mod.onload.del(path_p, params_p, JSON.parse(this.responseText));
	}

	http_client.timeout = Alloy.CFG.api_timeout;

	http_client.onerror = function(e) {
		mod.onerror(path_p, params_p);
	}

	http_client.open('DELETE', Alloy.CFG.api_url + path_p + '/' + params_p);

	http_client.send();
};

var mod = {};

mod.onerror = function(path_p, params_p) {
	alert(path_p);
	alert(params_p);
};

mod.onload = {};

mod.onload.del = function(path_p, params_p, response_p) {
	if (response_p['success']) {
		switch(path_p) {
			case 'streams':
				Alloy.Globals.http.get('streams', {});
				break;
		}
	} else {
		alert(response_p['message']);
	}
}

mod.onload.get = function(path_p, params_p, response_p) {
	if (response_p['success']) {
		switch(path_p) {
			case 'relationships':
				Alloy.Globals.ui.relationships[response_p['relationship_data']['id_ig_other_user']] = response_p['relationship_data'];
				break;
			case 'streams':
				Alloy.Globals.ui.streams = [];
				for (var id in response_p['streams_data']) {
					Alloy.Globals.ui.streams[response_p['streams_data'][id]['stream'] + '_' + response_p['streams_data'][id]['identifier']] = response_p['streams_data'][id];
				}
				break;
			case 'albums':
				Alloy.Globals.ui.albums = [];
				for (var id in response_p['albums_data']) {
					Alloy.Globals.ui.albums[id] = response_p['albums_data'][id];
				}
				Alloy.Globals.index.fireEvent('contentAction', {
					kind : 'grid',
					action : 'gridHandleResponse',
					param_response : response_p
				});
				break;
			case 'streams/instagram':
				Alloy.Globals.index.fireEvent('contentAction', {
					kind : 'grid',
					action : 'gridHandleResponse',
					param_response : response_p
				});
				break;
			case 'streams/search':
				Alloy.Globals.index.fireEvent('overlayAction', {
					kind : 'results',
					action : 'resultsHandleResponse',
					param_response : response_p
				});
				break;
		}
	} else {
		alert(response_p['message']);
	}
}

mod.onload.post = function(path_p, params_p, response_p) {
	if (response_p['success']) {
		switch(path_p) {
			case 'sessions':
				Alloy.Globals.index.fireEvent('contentAction', {
					kind : 'grid',
					action : 'gridOpenStream',
					param_icon : 'instagram',
					param_title : 'Popular',
					param_stream : 'popular'
				});

				Alloy.Globals.index.remove(Alloy.Globals.index.view_login);
				Alloy.Globals.http.get('streams', {});
				Alloy.Globals.http.get('albums', {});
				break;
			case 'streams':
				Alloy.Globals.http.get('streams', {});
				break;
			case 'albums':
				Alloy.Globals.http.get('albums', {});
				break;
		}
	} else {
		alert(response_p['message']);
	}
}
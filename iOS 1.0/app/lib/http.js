exports.get = function(path_p, params_p) {
	var http_client = Ti.Network.createHTTPClient();
	var params = '?';

	http_client.onload = function(e) {
		Alloy.Globals.index.fireEvent('httpHandler', {
			method : 'GET',
			path : path_p,
			params : params_p,
			response : JSON.parse(this.responseText)
		});
	}

	http_client.timeout = Alloy.CFG.api_timeout;

	http_client.onerror = function(e) {
		Alloy.Globals.index.fireEvent('httpError', {
			path : path_p,
			params : params_p
		});
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
		Alloy.Globals.index.fireEvent('httpHandler', {
			method : 'POST',
			path : path_p,
			params : params_p,
			response : JSON.parse(this.responseText)
		});
	}

	http_client.timeout = Alloy.CFG.api_timeout;

	http_client.onerror = function(e) {
		Alloy.Globals.index.fireEvent('httpError', {
			path : path_p,
			params : params_p
		});
	}

	http_client.open('POST', Alloy.CFG.api_url + path_p);

	http_client.send(params_p);
};

exports.del = function(path_p, id_p) {
	var http_client = Ti.Network.createHTTPClient();

	http_client.onload = function(e) {
		Alloy.Globals.index.fireEvent('httpHandler', {
			method : 'DELETE',
			path : path_p,
			params : id_p,
			response : JSON.parse(this.responseText)
		});
	}

	http_client.timeout = Alloy.CFG.api_timeout;

	http_client.onerror = function(e) {
		Alloy.Globals.index.fireEvent('httpError', {
			path : path_p,
			params : id_p
		});
	}

	http_client.open('DELETE', Alloy.CFG.api_url + path_p + '/' + id_p);

	http_client.send();
};

exports.put = function(path_p, id_p, params_p) {
	var http_client = Ti.Network.createHTTPClient();

	http_client.onload = function(e) {
		Alloy.Globals.index.fireEvent('httpHandler', {
			method : 'PUT',
			path : path_p,
			params : params_p,
			response : JSON.parse(this.responseText)
		});
	}
	
	http_client.timeout = Alloy.CFG.api_timeout;

	http_client.onerror = function(e) {
		Alloy.Globals.index.fireEvent('httpError', {
			path : path_p,
			params : params_p
		});
	}

	http_client.open('PUT', Alloy.CFG.api_url + path_p + '/' + id_p);

	http_client.send(params_p);
};

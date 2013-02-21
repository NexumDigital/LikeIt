exports.post = function(path_p, params_p){
    var http_client = Ti.Network.createHTTPClient();
    
    http_client.onload = function(e){
        mod.onload.post(path_p, params_p, JSON.parse(this.responseText));
    }
    
    http_client.timeout = Alloy.CFG.api_timeout;
    
    http_client.onerror = function(e){
        mod.onerror(path_p, params_p);
    }
    
    http_client.open('POST', Alloy.CFG.api_url+path_p);
    
    http_client.send(params_p);
};

exports.get = function(path_p, params_p){
    var http_client = Ti.Network.createHTTPClient();
    var params = '?';
    
    http_client.onload = function(e){
        //Ti.API.info(this.responseText);
        mod.onload.get(path_p, params_p, JSON.parse(this.responseText));
    }
    
    http_client.timeout = Alloy.CFG.api_timeout;
    
    http_client.onerror = function(e){
        mod.onerror(path_p, params_p);
    }
    
    for(var key in params_p){
        params += '&'+key+'='+params_p[key];
    }
    
    http_client.open('GET', Alloy.CFG.api_url+path_p+params);
    
    http_client.send();
};

var mod = {};

mod.onerror = function(path_p, params_p){
    alert(path_p);
    alert(params_p);
};

mod.onload = {};

mod.onload.get = function(path_p, params_p, response_p){
    if(response_p['success']){
        switch(path_p){
            case 'streams/instagram':
                Alloy.Globals.index.ui_grid.fireEvent('appendPhotos', {
                    response : response_p
                });
                break;
            case 'streams/search':
                Alloy.Globals.index.ui_overlay.fireEvent('appendResults', {
                    response : response_p
                });
                break;
        }
    } else {
        alert(response_p['message']);
    }
}

mod.onload.post = function(path_p, params_p, response_p){
    if(response_p['success']){
        switch(path_p){
            case 'sessions':
                Alloy.Globals.index.remove(Alloy.Globals.index.view_login);
                
                Alloy.Globals.index.ui_grid.fireEvent('resetStream', {
                    set_kind : 'feed'
                });
                break;
        }
    } else {
        alert(response_p['message']);
    }
}
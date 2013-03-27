var frames = [];

function openSelection(e) {
	switch(e.source.origin) {
		case 'albums':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenAlbum',
				param_id_album : e.source.id_album,
				param_title : e.source.title
			});
			break;
		case 'streams':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_id_stream : e.source.id_stream,
				param_title : e.source.title,
				param_stream : e.source.stream,
				param_identifier : e.source.identifier
			});
			break;
	}
}

$.cover.addEventListener('setCover', function(e) {
	$.cover.origin = e.cover;
	
	for (var id in frames) {
		$.content.remove(frames[id]);
	}
	
	frames = [];
	
	switch(e.cover) {
		case 'streams':
			for (var id in Alloy.Globals.ui.streams) {
				frames[Alloy.Globals.ui.streams[id]['id_stream']] = Alloy.createController('cover_item').getView();
				frames[Alloy.Globals.ui.streams[id]['id_stream']].fireEvent('updateStream', {
					id_stream : Alloy.Globals.ui.streams[id]['id_stream'],
					stream : Alloy.Globals.ui.streams[id]['stream'],
					identifier : Alloy.Globals.ui.streams[id]['identifier'],
					thumbnail : Alloy.Globals.ui.streams[id]['thumbnail'],
					icon : Alloy.Globals.ui.streams[id]['stream'],
					title : Alloy.Globals.ui.streams[id]['title']
				});
				$.content.add(frames[Alloy.Globals.ui.streams[id]['id_stream']]);
			}
			Alloy.Globals.http.get('streams', {});
			break;
		case 'albums':
			for (var id in Alloy.Globals.ui.albums) {
				frames[Alloy.Globals.ui.albums[id]['id_album']] = Alloy.createController('cover_item').getView();
				frames[Alloy.Globals.ui.albums[id]['id_album']].fireEvent('updateAlbum', {
					id_album : Alloy.Globals.ui.albums[id]['id_album'],
					title : Alloy.Globals.ui.albums[id]['title'],
					thumbnail : Alloy.Globals.ui.albums[id]['thumbnail']
				});
				$.content.add(frames[Alloy.Globals.ui.albums[id]['id_album']]);
			}
			Alloy.Globals.http.get('albums', {});
			break;
	}
	
	Alloy.Globals.modules.flurry.logPageView();
});

$.cover.addEventListener('handleResponse', function(e){
	switch($.cover.origin) {
		case 'streams':
			for (var id in Alloy.Globals.ui.streams) {
				if(undefined === frames[Alloy.Globals.ui.streams[id]['id_stream']]){
					frames[Alloy.Globals.ui.streams[id]['id_stream']] = Alloy.createController('cover_item').getView();
					$.content.add(frames[Alloy.Globals.ui.streams[id]['id_stream']]);
				}
				
				frames[Alloy.Globals.ui.streams[id]['id_stream']].fireEvent('updateStream', {
					id_stream : Alloy.Globals.ui.streams[id]['id_stream'],
					stream : Alloy.Globals.ui.streams[id]['stream'],
					identifier : Alloy.Globals.ui.streams[id]['identifier'],
					thumbnail : Alloy.Globals.ui.streams[id]['thumbnail'],
					icon : Alloy.Globals.ui.streams[id]['stream'],
					title : Alloy.Globals.ui.streams[id]['title']
				});
			}
			break;
		case 'albums':
			for (var id in Alloy.Globals.ui.albums) {
				if(undefined === frames[Alloy.Globals.ui.albums[id]['id_album']]){
					frames[Alloy.Globals.ui.albums[id]['id_album']] = Alloy.createController('cover_item').getView();
					$.content.add(frames[Alloy.Globals.ui.albums[id]['id_album']]);
				}
				
				frames[Alloy.Globals.ui.albums[id]['id_album']].fireEvent('updateAlbum', {
					id_album : Alloy.Globals.ui.albums[id]['id_album'],
					title : Alloy.Globals.ui.albums[id]['title'],
					thumbnail : Alloy.Globals.ui.albums[id]['thumbnail']
				});
				
			}
			break;
	}
});

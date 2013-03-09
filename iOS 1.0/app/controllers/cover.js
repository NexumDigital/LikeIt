var frames = [];

function openSelection(e) {
	switch(e.source.origin) {
		case 'albums':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenAlbum',
				param_icon : 'album',
				param_title : e.source.title,
				param_id_album : e.source.id_album
			});
			break;
		case 'streams':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : e.source.icon,
				param_title : e.source.title,
				param_stream : e.source.stream,
				param_identifier : e.source.identifier
			});
			break;
	}
}

$.cover.addEventListener('setCover', function(e) {
	for (var id in frames) {
		$.content.remove(frames[id]);
	}

	frames = [];
	$.cover.index = 0;

	switch(e.cover) {
		case 'streams':
			for (var id in Alloy.Globals.ui.streams) {
				frames[$.cover.index] = Alloy.createController('cover_item').getView();
				frames[$.cover.index].fireEvent('updateStream', {
					id_stream : Alloy.Globals.ui.streams[id]['id_stream'],
					stream : Alloy.Globals.ui.streams[id]['stream'],
					identifier : Alloy.Globals.ui.streams[id]['identifier'],
					thumbnail : Alloy.Globals.ui.streams[id]['thumbnail'],
					icon : Alloy.Globals.ui.streams[id]['stream'],
					title : Alloy.Globals.ui.streams[id]['title']
				});
				$.content.add(frames[$.cover.index++]);
			}
			Alloy.Globals.http.get('streams', {});
			break;
		case 'albums':
			for (var id in Alloy.Globals.ui.albums) {
				frames[$.cover.index] = Alloy.createController('cover_item').getView();
				frames[$.cover.index].fireEvent('updateAlbum', {
					id_album : Alloy.Globals.ui.albums[id]['id_album'],
					title : Alloy.Globals.ui.albums[id]['title'],
					thumbnail : Alloy.Globals.ui.albums[id]['thumbnail']
				});
				$.content.add(frames[$.cover.index++]);
			}
			Alloy.Globals.http.get('albums', {});
			break;
	}
});

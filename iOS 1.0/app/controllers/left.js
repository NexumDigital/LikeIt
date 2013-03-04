function closeLeft() {
	$.search_field.blur();
	Alloy.Globals.index.fireEvent('closeLeft');
}

function openSelection(e) {
	switch(e.source.action) {
		case 'explore':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : 'instagram',
				param_title : 'popular',
				param_stream : 'popular'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();
			break;
		case 'streams':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'cover',
				action : 'coverOpen',
				param_icon : 'album',
				param_title : 'streams',
				param_cover : 'streams'
			});
			
			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();
			break;
		case 'albums':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'cover',
				action : 'coverOpen',
				param_icon : 'album',
				param_title : 'albums',
				param_cover : 'albums'
			});
			
			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();
			break;
	}
}

function doSearch(e) {
	if ('' !== $.search_field.value) {
		Alloy.Globals.index.fireEvent('overlayAction', {
			kind : 'results',
			action : 'resultsOpen'
		});
	
		Ti.Geolocation.getCurrentPosition(function(e) {
			Alloy.Globals.http.get('streams/search', {
				stream : 'locations',
				lat : e.coords.latitude,
				lng : e.coords.longitude
			});
		});

		Alloy.Globals.http.get('streams/search', {
			stream : 'tags',
			q : $.search_field.value
		});

		Alloy.Globals.http.get('streams/search', {
			stream : 'users',
			q : $.search_field.value
		});
	}

	closeLeft();
}

var table_data = [];

table_data[0] = Alloy.createController('row_type_a').getView();
table_data[1] = Alloy.createController('row_type_a').getView();
table_data[2] = Alloy.createController('row_type_a').getView();

table_data[0].action = 'explore';
table_data[0].updateLabel('Popular');
table_data[1].action = 'streams';
table_data[1].updateLabel('Streams');
table_data[2].action = 'albums';
table_data[2].updateLabel('Albums');

$.options.setData(table_data);

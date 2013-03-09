function closeLeft() {
	$.search_field.blur();
	Alloy.Globals.index.fireEvent('closeLeft');
}

function openSelection(e) {
	switch(e.source.action) {
		case 'instagram':
			if (menu_data[0].open) {
				if (4 < $.options.selected)
					menu_data[0].updateSelected(false);
				$.options.setData([menu_data[0], menu_data[5], menu_data[6]]);
				menu_data[0].open = false;
			} else {
				menu_data[0].updateSelected(true);
				$.options.setData(menu_data);
				menu_data[0].open = true;
			}
			break;
		case 'popular':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : 'instagram',
				param_title : 'popular',
				param_stream : 'popular'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[1].updateSelected(true);
			$.options.selected = 1;
			break;
		case 'liked':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : 'instagram',
				param_title : 'liked',
				param_stream : 'liked'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[2].updateSelected(true);
			$.options.selected = 2;
			break;
		case 'friends':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : 'instagram',
				param_title : 'friends',
				param_stream : 'feed'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[3].updateSelected(true);
			$.options.selected = 3;
			break;
		case 'mine':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : 'instagram',
				param_title : 'mine',
				param_stream : 'self'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[4].updateSelected(true);
			$.options.selected = 4;
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

			if (!menu_data[0].open)
				menu_data[0].updateSelected(false);
			menu_data[$.options.selected].updateSelected(false);
			menu_data[5].updateSelected(true);
			$.options.selected = 5;
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

			if (!menu_data[0].open)
				menu_data[0].updateSelected(false);
			menu_data[$.options.selected].updateSelected(false);
			menu_data[6].updateSelected(true);
			$.options.selected = 6;
			break;
	};
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

var menu_data = [];

menu_data[0] = Alloy.createController('row_type_a').getView();
menu_data[1] = Alloy.createController('row_type_b').getView();
menu_data[2] = Alloy.createController('row_type_b').getView();
menu_data[3] = Alloy.createController('row_type_b').getView();
menu_data[4] = Alloy.createController('row_type_b').getView();
menu_data[5] = Alloy.createController('row_type_a').getView();
menu_data[6] = Alloy.createController('row_type_a').getView();

menu_data[0].action = 'instagram';
menu_data[0].open = false;
menu_data[0].updateLabel('Instagram');
menu_data[0].updateSelected(true);
menu_data[1].action = 'popular';
menu_data[1].updateLabel('Popular');
menu_data[1].updateSelected(true);
menu_data[2].action = 'liked';
menu_data[2].updateLabel('Liked');
menu_data[3].action = 'friends';
menu_data[3].updateLabel('Friends');
menu_data[4].action = 'mine';
menu_data[4].updateLabel('Mine');
menu_data[5].action = 'streams';
menu_data[5].updateLabel('Streams');
menu_data[6].action = 'albums';
menu_data[6].updateLabel('Albums');

$.options.selected = 1;
$.options.setData([menu_data[0], menu_data[5], menu_data[6]]);

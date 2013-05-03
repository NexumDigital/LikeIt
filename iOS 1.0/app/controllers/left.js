$.username.text = Alloy.Globals.properties.username;
$.profile_picture.image = Alloy.Globals.properties.profile_picture;

var menu_data = [];

menu_data[0] = Alloy.createController('row_type_a').getView();
menu_data[1] = Alloy.createController('row_type_a').getView();
menu_data[2] = Alloy.createController('row_type_b').getView();
menu_data[3] = Alloy.createController('row_type_b').getView();
menu_data[4] = Alloy.createController('row_type_b').getView();
menu_data[5] = Alloy.createController('row_type_b').getView();
menu_data[6] = Alloy.createController('row_type_a').getView();
menu_data[7] = Alloy.createController('row_type_a').getView();

menu_data[0].action = 'explore';
menu_data[0].updateLabel('Explore');
menu_data[0].updateSelected(true);
menu_data[1].action = 'instagram';
menu_data[1].open = false;
menu_data[1].updateLabel('Instagram');
menu_data[2].action = 'popular';
menu_data[2].updateLabel('Popular');
menu_data[3].action = 'liked';
menu_data[3].updateLabel('Liked');
menu_data[4].action = 'friends';
menu_data[4].updateLabel('Friends');
menu_data[5].action = 'mine';
menu_data[5].updateLabel('Mine');
menu_data[6].action = 'streams';
menu_data[6].updateLabel('Streams');
menu_data[7].action = 'albums';
menu_data[7].updateLabel('Albums');

$.options.selected = 0;
$.options.setData([menu_data[0], menu_data[1], menu_data[6], menu_data[7]]);

function closeLeft() {
	$.search_field.blur();
	Alloy.Globals.index.fireEvent('closeLeft');
}

function openSelection(e) {
	$.search_field.blur();
	switch(e.source.action) {
		case 'explore':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenLikes',
				param_title : 'Explore'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();
			
			if (!menu_data[1].open)
				menu_data[1].updateSelected(false);
			menu_data[$.options.selected].updateSelected(false);
			menu_data[0].updateSelected(true);
			$.options.selected = 0;
			break;
		case 'instagram':
			if (menu_data[1].open) {
				if (5 < $.options.selected || 1 > $.options.selected)
					menu_data[1].updateSelected(false);
				$.options.setData([menu_data[0], menu_data[1], menu_data[6], menu_data[7]]);
				menu_data[1].open = false;
			} else {
				menu_data[1].updateSelected(true);
				$.options.setData(menu_data);
				menu_data[1].open = true;
			}
			break;
		case 'popular':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_id_stream : null,
				param_title : 'popular',
				param_stream : 'popular'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[2].updateSelected(true);
			$.options.selected = 2;
			break;
		case 'liked':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_id_stream : null,
				param_title : 'liked',
				param_stream : 'liked'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[3].updateSelected(true);
			$.options.selected = 3;
			break;
		case 'friends':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_id_stream : null,
				param_title : 'friends',
				param_stream : 'feed'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[4].updateSelected(true);
			$.options.selected = 4;
			break;
		case 'mine':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_id_stream : null,
				param_title : 'mine',
				param_stream : 'self'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			menu_data[$.options.selected].updateSelected(false);
			menu_data[5].updateSelected(true);
			$.options.selected = 5;
			break;
		case 'streams':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'cover',
				action : 'coverOpen',
				param_title : 'streams',
				param_cover : 'streams'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			if (!menu_data[1].open)
				menu_data[1].updateSelected(false);
			menu_data[$.options.selected].updateSelected(false);
			menu_data[6].updateSelected(true);
			$.options.selected = 6;
			break;
		case 'albums':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'cover',
				action : 'coverOpen',
				param_title : 'albums',
				param_cover : 'albums'
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			closeLeft();

			if (!menu_data[1].open)
				menu_data[1].updateSelected(false);
			menu_data[$.options.selected].updateSelected(false);
			menu_data[7].updateSelected(true);
			$.options.selected = 7;
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
			if(e.success){
				Alloy.Globals.http.get('streams/search', {
					stream : 'locations',
					lat : e.coords.latitude,
					lng : e.coords.longitude
				});
				
				Alloy.Globals.modules.flurry.recordLocation({
	                latitude: e.coords.latitude,
	                longitude: e.coords.longitude,
	                horizontalAccuracy: e.coords.accuracy,
	                verticalAccuracy: e.coords.altitudeAccuracy
	            });
			} else {
				Ti.Geolocation.restart();
			}
		});

		Alloy.Globals.http.get('streams/search', {
			stream : 'tags',
			q : ($.search_field.value.replace(/[^a-zA-Z0-9\_]/g, '')).toLowerCase()
		});

		Alloy.Globals.http.get('streams/search', {
			stream : 'users',
			q : ($.search_field.value.replace(/[^a-zA-Z0-9\_]/g, '')).toLowerCase()
		});
	}

	closeLeft();
}

function fieldFocus() {
	$.search_back.image = 'left/search_back_clear.png';
}

function fieldBlur() {
	if ('' === $.search_field.value) {
		$.search_back.image = 'left/search_back.png';
	}
}

function searchTap(e) {
	if ('search_button' === e.source.id){
		$.search_field.value = '';
		$.search_back.image = 'left/search_back.png';
		$.search_field.blur();
	} else {
		$.search_field.focus();
	}
}

function logoutTap(e){
	Alloy.Globals.index.fireEvent('blockAction', {
		kind : 'intro'
	});
	
	Alloy.Globals.index.fireEvent('blockAction', {
		kind : 'block_insta',
		action : 'instaLogout'
	});
	
	closeLeft();
}

$.left.addEventListener('updateSubscriber', function(e){
	Ti.App.Properties.setString('username', e.username);
	Alloy.Globals.properties.username = e.username;
	Ti.App.Properties.setString('profile_picture', e.profile_picture);
	Alloy.Globals.properties.profile_picture = e.profile_picture;
	
	$.username.text = e.username;
	$.profile_picture.image = e.profile_picture;
});
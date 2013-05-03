function openStream(e) {

	switch(e.source.action) {
		case 'user':
		case 'tag':
		case 'location':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_id_stream : null,
				param_title : e.source.selection['text'],
				param_stream : e.source.action,
				param_identifier : e.source.selection['id']
			});

			Alloy.Globals.index.fireEvent('closeOverlay');
			break;
	}
}

$.results.addEventListener('handleResults', function(e) {
	switch(e.response['stream']) {
		case 'locations':
			var places_data = [];
			for (var id in e.response['results_data']) {
				places_data[id] = Alloy.createController('row_type_d').getView();
				places_data[id].action = 'location';
				places_data[id].selection = e.response['results_data'][id];
				places_data[id].updateLabel(e.response['results_data'][id]['text']);
			}
			$.places_table.setData(places_data);
			break;
		case 'tags':
			var tags_data = [];
			for (var id in e.response['results_data']) {
				tags_data[id] = Alloy.createController('row_type_a').getView();
				tags_data[id].action = 'tag';
				tags_data[id].selection = e.response['results_data'][id];
				tags_data[id].updateLabel(e.response['results_data'][id]['text']);
			}
			$.tags_table.setData(tags_data);
			break;
		case 'users':
			var people_data = [];
			for (var id in e.response['results_data']) {
				people_data[id] = Alloy.createController('row_type_c').getView();
				people_data[id].action = 'user';
				people_data[id].selection = e.response['results_data'][id];
				people_data[id].updatePhotoUrl(e.response['results_data'][id]['photo']);
				people_data[id].updateLabel(e.response['results_data'][id]['text']);
			}
			$.people_table.setData(people_data);
			break;
	}
});

$.results.addEventListener('adjustContent', function(e) {
	if (Alloy.Globals.width < Alloy.Globals.height) {
		$.tags.width = 256;
		$.people.width = 256;
		$.places.width = 256;

		$.tags.height = Alloy.Globals.height - 44;
		$.people.height = Alloy.Globals.height - 44;
		$.places.height = Alloy.Globals.height - 44;
	} else {
		$.tags.width = 352;
		$.people.width = 352;
		$.places.width = 320;

		$.tags.height = Alloy.Globals.height - 44;
		$.people.height = Alloy.Globals.height - 44;
		$.places.height = Alloy.Globals.height - 44;
	}
});

$.results.fireEvent('adjustContent');

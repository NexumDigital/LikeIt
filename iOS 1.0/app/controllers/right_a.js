if (undefined === Alloy.Globals.ui.streams[Alloy.Globals.stream['stream'] + '_' + Alloy.Globals.stream['identifier']]) {
	$.subscribe.text = 'SAVE STREAM';
	$.subscribe.subscribed = false;
} else {
	$.subscribe.text = 'REMOVE STREAM';
	$.subscribe.subscribed = true;
}

function subscribeTap() {
	if ($.subscribe.subscribed) {
		if (undefined !== Alloy.Globals.ui.streams[Alloy.Globals.stream['stream'] + '_' + Alloy.Globals.stream['identifier']]) {
			Alloy.Globals.http.del('streams', Alloy.Globals.ui.streams[Alloy.Globals.stream['stream'] + '_' + Alloy.Globals.stream['identifier']]['id_stream']);
			
			$.subscribe.text = 'SAVE STREAM';
			$.subscribe.subscribed = false;
		}
	} else {
		Alloy.Globals.http.post('streams', {
			stream : Alloy.Globals.stream['stream'],
			identifier : Alloy.Globals.stream['identifier'],
			title : Alloy.Globals.stream['title']
		});

		$.subscribe.text = 'REMOVE STREAM';
		$.subscribe.subscribed = true;
	}
}

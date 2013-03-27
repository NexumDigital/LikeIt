if ('saved' === Alloy.Globals.ui.stream['id_stream']) {
	$.subscribe.text = 'STREAM SAVED';
	$.subscribe.subscribed = false;
} else if (null === Alloy.Globals.ui.stream['id_stream']) {
	$.subscribe.text = 'SAVE STREAM';
	$.subscribe.subscribed = false;
} else {
	$.subscribe.text = 'REMOVE STREAM';
	$.subscribe.subscribed = true;
}

function subscribeTap() {
	if ($.subscribe.subscribed && null !== Alloy.Globals.ui.stream['id_stream']) {
		Alloy.Globals.http.del('streams', Alloy.Globals.ui.stream['id_stream']);
		
		$.subscribe.text = 'SAVE STREAM';
		$.subscribe.subscribed = false;
	} else {
		Alloy.Globals.http.post('streams', {
			stream : Alloy.Globals.ui.stream['stream'],
			identifier : Alloy.Globals.ui.stream['identifier'],
			title : Alloy.Globals.ui.stream['title']
		});

		if (null === Alloy.Globals.ui.stream['id_stream']) {
			Alloy.Globals.ui.stream['id_stream'] = 'saved';
			$.subscribe.text = 'STREAM SAVED';
			$.subscribe.subscribed = true;
		} else {
			$.subscribe.text = 'REMOVE STREAM';
			$.subscribe.subscribed = true;
		}
	}
}
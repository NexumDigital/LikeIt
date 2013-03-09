if (undefined === Alloy.Globals.ui.streams[Alloy.Globals.stream['stream'] + '_' + Alloy.Globals.stream['identifier']]) {
	$.subscribe.text = 'SAVE STREAM';
	$.subscribe.subscribed = false;
} else {
	$.subscribe.text = 'REMOVE STREAM';
	$.subscribe.subscribed = true;
}

if (undefined === Alloy.Globals.ui.relationships[Alloy.Globals.stream['identifier']]) {
	$.follow.text = 'FOLLOW';
	$.follow.following = false;
} else {
	switch(Alloy.Globals.ui.relationships[Alloy.Globals.stream['identifier']]['outgoing']) {
		case 'follows':
			$.follow.text = 'UNFOLLOW';
			$.follow.following = true;
			break;
		default :
			$.follow.text = 'FOLLOW';
			$.follow.following = false;
			break;
	}
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

function followTap() {
	if ($.follow.following) {
		Alloy.Globals.http.del('relationships', Alloy.Globals.stream['identifier']);
		
		Alloy.Globals.ui.relationships[Alloy.Globals.stream['identifier']]['outgoing'] = 'none';
		
		$.follow.text = 'FOLLOW';
		$.follow.following = false;
	} else {
		Alloy.Globals.http.post('relationships', {
			id_ig_other_user : Alloy.Globals.stream['identifier']
		});
		
		Alloy.Globals.ui.relationships[Alloy.Globals.stream['identifier']]['outgoing'] = 'follows';
		
		$.follow.text = 'UNFOLLOW';
		$.follow.following = true;
	}
}
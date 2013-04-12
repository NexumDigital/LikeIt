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

if (undefined === Alloy.Globals.ui.relationships[Alloy.Globals.ui.stream['identifier']]) {
	$.follow.text = 'FOLLOW';
	$.follow.following = false;
} else {
	switch(Alloy.Globals.ui.relationships[Alloy.Globals.ui.stream['identifier']]['outgoing']) {
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

function followTap() {
	if ($.follow.following) {
		Alloy.Globals.http.del('relationships', Alloy.Globals.ui.stream['identifier']);
		
		Alloy.Globals.ui.relationships[Alloy.Globals.ui.stream['identifier']]['outgoing'] = 'none';
		
		$.follow.text = 'FOLLOW';
		$.follow.following = false;
	} else {
		Alloy.Globals.http.post('relationships', {
			id_ig_other_user : Alloy.Globals.ui.stream['identifier']
		});
		
		Alloy.Globals.ui.relationships[Alloy.Globals.ui.stream['identifier']]['outgoing'] = 'follows';
		
		$.follow.text = 'UNFOLLOW';
		$.follow.following = true;
	}
}

$.right_b.alert = Titanium.UI.createAlertDialog({
	title : 'You can paste the link now',
	buttonNames : ['Got it!']
});

function facebookTap() {
	Alloy.Globals.modules.twitterbook.post({
		type : 'facebook',
		message : 'I found this awesome profile thanks to http://facebook.com/applikeit',
		urls : [Alloy.CFG.sh_url + Alloy.Globals.ui.stream['title'].replace('@', '')],
		success : function() {
		},
		cancel : function() {
		},
		error : function(e) {
		}
	});
}

function twitterTap() {
	Alloy.Globals.modules.twitterbook.post({
		type : 'twitter',
		message : 'I found this awesome profile thanks to @applikeit',
		urls : [Alloy.CFG.sh_url + Alloy.Globals.ui.stream['title'].replace('@', '')],
		success : function() {
		},
		cancel : function() {
		},
		error : function(e) {
		}
	});
}

function copyTap() {
	Ti.UI.Clipboard.setText(Alloy.CFG.sh_url + Alloy.Globals.ui.stream['title'].replace('@', ''));
	$.right_b.alert.show();
}
Alloy.Globals.data.media = [];
Alloy.Globals.data.frames = [];
Alloy.Globals.data.visible = [];
Alloy.Globals.data.containers = [];

$.grid.style_frame = {
	image : '',
	backgroundColor : 'transparent',
	defaultImage : '',
	left : 1,
	top : 1,
	right : 1,
	bottom : 1,
	width : 254,
	height : 254
};

for (var i; i < 250; i++) {
	$.grid.fireEvent('newFrame', {
		index : i
	});
}

function openZoom(e) {
	if (Alloy.Globals.data.media[e.source.index]) {
		Alloy.Globals.index.fireEvent('overlayAction', {
			kind : 'zoom',
			action : 'zoomOpenPhoto',
			param_index : e.source.index
		});
	}
}

$.grid.addEventListener('newFrame', function(e) {
	Alloy.Globals.data.frames[e.index] = Ti.UI.createImageView($.grid.style_frame);
	$.content.add(Alloy.Globals.data.frames[e.index]);
});

$.grid.addEventListener('setFrame', function(e) {
	if (e.index !== Alloy.Globals.data.visible[e.index] && undefined !== Alloy.Globals.data.media[e.index] && undefined !== Alloy.Globals.data.frames[e.index]) {
		Alloy.Globals.data.frames[e.index].backgroundColor = '#eeeeee';
		Alloy.Globals.data.frames[e.index].image = Alloy.Globals.data.media[e.index]['urls']['306'];
		Alloy.Globals.data.frames[e.index].index = e.index;
		Alloy.Globals.data.visible[e.index] = e.index;
	} else if (!$.grid.is_public && undefined !== Alloy.Globals.data.frames[e.index] && 16 > e.index) {
		Alloy.Globals.data.frames[e.index].backgroundColor = '#eeeeee';
		Alloy.Globals.data.frames[e.index].image = 'http://cdn.nexum.ws/likeit/v1/blur/'+e.index+'.png';
		Alloy.Globals.data.frames[e.index].index = e.index;
		Alloy.Globals.data.visible[e.index] = e.index;
	}
});

$.grid.addEventListener('clearFrame', function(e) {
	Alloy.Globals.data.frames[e.index].backgroundColor = 'transparent';
	Alloy.Globals.data.frames[e.index].image = '';
	delete Alloy.Globals.data.visible[e.index];
});

$.grid.addEventListener('handleResponse', function(e) {
	if ('streams' === e.response['origin'] && e.response['stream_data']['stream'] === $.grid.stream && e.response['stream_data']['identifier'] === $.grid.identifier) {
		for (var id in e.response['media_data']) {
			Alloy.Globals.data.media[$.grid.index] = e.response['media_data'][id];

			if ('feed' === $.grid.stream) {
				Alloy.Globals.ui.relationships[Alloy.Globals.data.media[$.grid.index]['author']['id']] = {};
				Alloy.Globals.ui.relationships[Alloy.Globals.data.media[$.grid.index]['author']['id']]['id_ig_other_user'] = Alloy.Globals.data.media[$.grid.index]['author']['id'];
				Alloy.Globals.ui.relationships[Alloy.Globals.data.media[$.grid.index]['author']['id']]['outgoing'] = 'follows';
			}

			if (undefined === Alloy.Globals.data.frames[$.grid.index]) {
				$.grid.fireEvent('newFrame', {
					index : $.grid.index
				});
			}
			$.grid.index++;
		}
		
		$.grid.is_public = e.response['is_public'];
		
		if(!$.grid.is_public){
			Alloy.Globals.index.fireEvent('overlayAction', {
				kind : 'error',
				action : 'errorOpen',
				param_message : 'THIS IS A PRIVATE PROFILE'
			});
		}
		
		if (0 === e.response['media_data'].length)
			$.grid.more = false;

		$.grid.max_id = e.response['next_max_id'];
	} else if ('albums' === e.response['origin'] && e.response['id_album'] === $.grid.id_album) {
		for (var id in e.response['media_data']) {
			Alloy.Globals.data.media[$.grid.index] = e.response['media_data'][id];

			if (undefined === Alloy.Globals.data.frames[$.grid.index]) {
				$.grid.fireEvent('newFrame', {
					index : $.grid.index
				});
			}

			$.grid.index++;
		}

		$.grid.more = false;
	} else if ('likes' === e.response['origin']) {
		for (var id in e.response['media_data']) {
			Alloy.Globals.data.media[$.grid.index] = e.response['media_data'][id];

			if (undefined === Alloy.Globals.data.frames[$.grid.index]) {
				$.grid.fireEvent('newFrame', {
					index : $.grid.index
				});
			}

			$.grid.index++;
		}

		$.grid.more = false;
	}

	$.grid.fireEvent('updateVisible');
	$.grid.loading = false;
});

$.grid.addEventListener('setOrigin', function(e) {
	$.grid.origin = e.origin;
	$.grid.id_album = e.id_album;
	$.grid.stream = e.stream;
	$.grid.identifier = e.identifier;

	Alloy.Globals.data.media = [];

	$.grid.index = 0;
	$.grid.scrolling = false;
	$.grid.offset_y = 0;
	$.grid.going_down = true;
	$.grid.index_visible_top = 0;
	$.grid.index_visible_top_prev = 0;

	$.grid.setContentOffset({
		y : 0
	});

	$.grid.contentHeight = Ti.UI.SIZE;

	for (var id in Alloy.Globals.data.visible) {
		$.grid.fireEvent('clearFrame', {
			index : id
		});
	}

	$.grid.max_id = null;
	$.grid.loading = true;
	$.grid.more = true;
	$.grid.is_public = true;

	switch($.grid.origin) {
		case 'albums':
			Alloy.Globals.http.get('albums', {
				id_album : $.grid.id_album
			});
			break;
		case 'likes':
			Alloy.Globals.http.get('likes/trending', {});
			break;
		case 'streams':
			Alloy.Globals.http.get('streams/instagram', {
				stream : $.grid.stream,
				identifier : $.grid.identifier
			});
			break;
	}

	Alloy.Globals.modules.flurry.logPageView();
});

$.grid.addEventListener('scrollEnd', function(e) {
	$.grid.fireEvent('updateVisible');

	for (var id in Alloy.Globals.data.visible) {
		if (id < ($.grid.index_visible_top - 36) || id > ($.grid.index_visible_top + 48)) {
			$.grid.fireEvent('clearFrame', {
				index : id
			});
		}
	}
});

$.grid.addEventListener('click', function(e) {
	$.grid.fireEvent('updateVisible');
});

$.grid.addEventListener('dragEnd', function(e) {
	$.grid.fireEvent('updateVisible');
});

$.grid.addEventListener('updateVisible', function(e) {
	if (!$.grid.scrolling) {
		$.grid.scrolling = true;

		$.grid.offset_y = (0 <= ($.grid.contentOffset.y - 1024)) ? ($.grid.contentOffset.y - 1024) : 0;
		$.grid.index_visible_top = (Math.ceil($.grid.contentWidth / 256) * Math.floor($.grid.offset_y / 256));
		$.grid.going_down = (0 >= ($.grid.index_visible_top_prev - $.grid.index_visible_top)) ? true : false;
		$.grid.index_visible_top_prev = $.grid.index_visible_top;

		switch($.grid.going_down) {
			case true:
				for (var i = $.grid.index_visible_top; i < ($.grid.index_visible_top + 48); i++) {
					$.grid.fireEvent('setFrame', {
						index : i
					});
				}
				break;
			case false:
				for (var i = $.grid.index_visible_top; i > ($.grid.index_visible_top - 36); i--) {
					$.grid.fireEvent('setFrame', {
						index : i
					});
				}
				break;
		}

		if ('streams' === $.grid.origin && undefined === Alloy.Globals.data.media[$.grid.index_visible_top + 84]) {
			if ($.grid.more && !$.grid.loading) {
				$.grid.loading = true;
				Alloy.Globals.http.get('streams/instagram', {
					stream : $.grid.stream,
					identifier : $.grid.identifier,
					max_id : $.grid.max_id
				});
			}
		}

		if (!$.grid.more && (Math.ceil($.grid.index / ($.grid.contentWidth / 256)) * 256) + 44 !== $.grid.contentHeight)
			$.grid.contentHeight = (Math.ceil($.grid.index / ($.grid.contentWidth / 256)) * 256) + 44;

		$.grid.scrolling = false;
	}
});

$.grid.addEventListener('scrollToPhoto', function(e) {
	$.grid.offset_y = ((Math.ceil((e.media_index + 1) / ($.grid.contentWidth / 256)) * 256) - 512);

	if ($.grid.offset_y > ($.grid.contentHeight - Alloy.Globals.height))
		$.grid.offset_y = ($.grid.contentHeight - Alloy.Globals.height);

	if ($.grid.offset_y < 0)
		$.grid.offset_y = 0;

	$.grid.setContentOffset({
		y : $.grid.offset_y
	});

	$.grid.fireEvent('updateVisible');
});

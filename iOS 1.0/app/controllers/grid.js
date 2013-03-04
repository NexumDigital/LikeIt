Alloy.Globals.data.photos = [];
Alloy.Globals.data.frames = [];
Alloy.Globals.data.visible = [];
Alloy.Globals.data.containers = [];
Alloy.Globals.data.tags = [];
Alloy.Globals.data.likes = [];

$.grid.style_frame = {
	image : '',
	backgroundColor : 'transparent',
	defaultImage : '',
	left : 4,
	top : 4,
	right : 4,
	bottom : 4,
	width : 248,
	height : 248
};

for (var i; i < 250; i++) {
	$.grid.fireEvent('newFrame', {
		index : i
	});
}

function openZoom(e) {
	if (Alloy.Globals.data.photos[e.source.index]) {
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
	if (e.index !== Alloy.Globals.data.visible[e.index] && undefined !== Alloy.Globals.data.photos[e.index] && undefined !== Alloy.Globals.data.frames[e.index]) {
		Alloy.Globals.data.frames[e.index].backgroundColor = '#eeeeee';
		Alloy.Globals.data.frames[e.index].image = Alloy.Globals.data.photos[e.index]['urls']['306'];
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
	$.grid.more = false;

	if (e.response['stream'] === $.grid.stream) {
		for (var id in e.response['photos_data']) {
			Alloy.Globals.data.photos[$.grid.index] = e.response['photos_data'][id];

			if (undefined === Alloy.Globals.data.frames[$.grid.index]) {
				$.grid.fireEvent('newFrame', {
					index : $.grid.index
				});
			}

			$.grid.index++;
			$.grid.more = true;
		}

		$.grid.max_id = e.response['next_max_id'];
		$.grid.fireEvent('updateVisible');
	}

	$.grid.loading = false;
});

$.grid.addEventListener('setStream', function(e) {
	$.grid.stream = e.stream;
	$.grid.identifier = e.identifier;

	Alloy.Globals.data.photos = [];

	$.grid.index = 0;
	$.grid.scrolling = false;
	$.grid.offset_y = 0;
	$.grid.going_down = true;
	$.grid.index_visible_top = 0;
	$.grid.index_visible_top_prev = 0;

	$.grid.max_id = null;
	$.grid.more = false;

	$.grid.setContentOffset({
		y : 0
	});

	$.grid.contentHeight = Ti.UI.SIZE;

	for (var id in Alloy.Globals.data.visible) {
		$.grid.fireEvent('clearFrame', {
			index : id
		});
	}

	Ti.API.info($.grid.stream);
	$.grid.loading = true;
	Alloy.Globals.http.get('streams/instagram', {
		stream : $.grid.stream,
		identifier : $.grid.identifier
	});
});

$.grid.addEventListener('scrollEnd', function(e) {

	for (var id in Alloy.Globals.data.visible) {
		if (id < ($.grid.index_visible_top - 36) || id > ($.grid.index_visible_top + 48)) {
			$.grid.fireEvent('clearFrame', {
				index : id
			});
		}
	}

	if (!$.grid.more && (Math.ceil($.grid.index / ($.grid.contentWidth / 256)) * 256) + 44 !== $.grid.contentHeight)
		$.grid.contentHeight = (Math.ceil($.grid.index / ($.grid.contentWidth / 256)) * 256) + 44;

	$.grid.fireEvent('updateVisible');
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

		if (undefined === Alloy.Globals.data.photos[$.grid.index_visible_top + 72]) {
			if ($.grid.more && !$.grid.loading) {
				$.grid.loading = true;
				Alloy.Globals.http.get('streams/instagram', {
					stream : $.grid.stream,
					identifier : $.grid.identifier,
					max_id : $.grid.max_id
				});
			}
		}

		$.grid.scrolling = false;
	}
});

$.grid.addEventListener('scrollToPhoto', function(e) {
	$.grid.offset_y = ((Math.ceil((e.photo_index + 1) / ($.grid.contentWidth / 256)) * 256) - 512);

	if ($.grid.offset_y > 0) {
		$.grid.setContentOffset({
			y : $.grid.offset_y
		});
	}

	$.grid.fireEvent('updateVisible');
});
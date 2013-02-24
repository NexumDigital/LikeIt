function openZoom(e) {
	if (undefined !== e.source.index) {
		Alloy.Globals.index.ui_overlay = Alloy.createController('zoom').getView();
		Alloy.Globals.index.add(Alloy.Globals.index.ui_overlay);

		Alloy.Globals.index.ui_overlay.openPhoto(e.source.index, photos);
	}
}

var frames = [];
var photos = [];
var backs = [];
var index = 0;
var max_frames = 324;
var last_response = [];

for (var i = 0; i < max_frames; i++) {
	frames[i] = Alloy.createController('grid_frame').getView();
	$.grid.add(frames[i]);
}

$.grid.addEventListener('appendPhotos', function(e) {
	last_response = e.response;

	Ti.API.info($.grid.contentOffset.y);
	Ti.API.info($.grid.max_y);

	if (2000 > ($.grid.max_y - $.grid.contentOffset.y)) {
		if (e.response['kind'] === $.grid.kind) {
			$.grid.more = false;

			var i = index;

			for (var id in e.response['photos_data']) {
				if (i < max_frames) {
					frames[i].updatePhoto(e.response['photos_data'][id]);
					frames[i].index = i;
					photos[index] = e.response['photos_data'][id];
					index++;

					$.grid.more = true;

					i++;
				}
			}

			$.grid.max_id = e.response['next_max_id'];

			$.grid.contentHeight = (Math.ceil((index) / ($.grid.contentWidth / 256)) * 256) + 44;
			$.grid.max_y = $.grid.contentHeight - Alloy.Globals.height;

			$.grid.loading = false;
			if ($.grid.more && !$.grid.loading) {
				$.grid.loading = true;

				$.grid.contentHeight = (Math.ceil((index + 24) / ($.grid.contentWidth / 256)) * 256) + 44;

				Alloy.Globals.http.get('streams/instagram', {
					kind : $.grid.kind,
					id : $.grid.selection_id,
					max_id : $.grid.max_id
				});
			}
		}
	} else {
		$.grid.loading = false;
	}

});

$.grid.addEventListener('resetStream', function(e) {
	$.grid.contentWidth = Ti.Platform.displayCaps.platformWidth;
	$.grid.contentHeight = ((12 / ($.grid.contentWidth / 256)) * 256) + 44;

	$.grid.setContentOffset({
		y : 0
	});

	index = 0;

	$.grid.max_id = 0;
	$.grid.max_y = 0;
	$.grid.more = false;
	$.grid.loading = false;
	$.grid.kind = e.set_kind;
	$.grid.selection_id = e.set_selection_id;

	var frames_length = frames.length;
	for (var i = 0; i < frames_length; i++) {
		frames[i].clearFrame();
	}

	Alloy.Globals.http.get('streams/instagram', {
		kind : $.grid.kind,
		id : $.grid.selection_id
	});

});

$.grid.addEventListener('dragEnd', function(e) {
	if ($.grid.more && !$.grid.loading) {
		$.grid.fireEvent('appendPhotos', {
			response : last_response
		});
	}
});

$.grid.addEventListener('scrollToPhoto', function(e) {
	var new_y = ((Math.ceil((e.photo_index + 1) / ($.grid.contentWidth / 256)) * 256) - 512);

	if (new_y > 0) {
		$.grid.setContentOffset({
			y : new_y
		});

		if ($.grid.more && !$.grid.loading) {
			$.grid.fireEvent('appendPhotos', {
				response : last_response
			});
		}
	}
});

Ti.Gesture.addEventListener('orientationchange', function(e) {
	$.grid.contentWidth = Alloy.Globals.width;
	$.grid.contentHeight = (Math.ceil(index / ($.grid.contentWidth / 256)) * 256) + 44;
	$.grid.max_y = $.grid.contentHeight - Alloy.Globals.height;
});

function closeZoom() {
	Alloy.Globals.index.fireEvent('closeOverlay');
}

function slideContent(e) {
	if (!$.zoom.sliding && ('left' === e.direction || 'right' === e.direction)) {
		$.zoom.sliding = true;
		$.zoom.prev_index = $.zoom.index;

		switch(e.direction) {
			case 'left':
				$.zoom.left_out = -640;
				$.zoom.left_in = Alloy.Globals.width + 640;
				$.zoom.index++;
				break;
			case 'right':
				$.zoom.left_out = Alloy.Globals.width + 640;
				$.zoom.left_in = -640;
				$.zoom.index--;
				break;
		}

		if ($.zoom.prev_index !== $.zoom.index && undefined !== Alloy.Globals.data.photos[$.zoom.index]) {
			$.zoom.fireEvent('openPhoto', {
				index : $.zoom.index
			});

		} else {
			$.zoom.index = $.zoom.prev_index;
			Alloy.Globals.animation.shake(Alloy.Globals.data.containers[$.zoom.index]);
			$.zoom.sliding = false;
		}
	}
}

$.zoom.slide_out = Ti.UI.createAnimation();
$.zoom.slide_in = Ti.UI.createAnimation();
$.zoom.sliding = false;
$.zoom.prev_index = 0;

$.zoom.addEventListener('openPhoto', function(e) {
	Ti.API.info('zoom: ' + e.index);

	$.zoom.index = e.index;
	if (undefined === $.zoom.left_in)
		$.zoom.left_in = ((Alloy.Globals.width - 640) / 2);

	Alloy.Globals.data.containers[$.zoom.index] = Alloy.createController('zoom_photo').getView();
	Alloy.Globals.data.containers[$.zoom.index].left = $.zoom.left_in;
	$.zoom.add(Alloy.Globals.data.containers[$.zoom.index]);

	Alloy.Globals.data.containers[$.zoom.index].fireEvent('updatePhoto', {
		index : $.zoom.index
	});

	if (undefined !== Alloy.Globals.data.photos[$.zoom.index - 1])
		$.holder_left.image = Alloy.Globals.data.photos[$.zoom.index -1]['urls']['612'];

	if (undefined !== Alloy.Globals.data.photos[$.zoom.index + 1])
		$.holder_right.image = Alloy.Globals.data.photos[$.zoom.index +1]['urls']['612'];

	$.zoom.slide_in.left = ((Alloy.Globals.width - 640) / 2);
	Alloy.Globals.data.containers[$.zoom.index].animate($.zoom.slide_in);

	if (undefined !== $.zoom.left_out) {
		$.zoom.slide_out.left = $.zoom.left_out;
		Alloy.Globals.data.containers[$.zoom.prev_index].animate($.zoom.slide_out);
	}
});

$.zoom.slide_out.addEventListener('complete', function() {
	Alloy.Globals.index.fireEvent('contentAction', {
		kind : 'grid',
		action : 'gridScrollTo',
		param_index : $.zoom.index
	});

	$.zoom.remove(Alloy.Globals.data.containers[$.zoom.prev_index]);
	Alloy.Globals.data.containers[$.zoom.prev_index] = null;
	$.zoom.sliding = false;
});

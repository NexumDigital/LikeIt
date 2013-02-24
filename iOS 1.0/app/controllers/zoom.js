function closeZoom() {
	Alloy.Globals.index.closeOverlay();
}

function slideContent(e) {
	if (!sliding) {
		sliding = true;
		prev_index = index;

		switch(e.direction) {
			case 'left':
				left_out = -640;
				left_in = Alloy.Globals.width + 640;
				index++;
				break;
			case 'right':
				left_out = Alloy.Globals.width + 640;
				left_in = -640;
				index--;
				break;
		}

		if (prev_index !== index && undefined !== photos[index]) {
			containers[index] = Alloy.createController('zoom_content').getView();
			containers[index].updatePhoto(photos[index]);
			containers[index].left = left_in;
			$.zoom.add(containers[index]);

			slide_in.left = ((Alloy.Globals.width - 640) / 2);
			containers[index].animate(slide_in);

			slide_out.left = left_out;
			containers[prev_index].animate(slide_out);

			if (undefined !== photos[index - 1])
				$.holder_left.image = photos[index -1]['urls']['612'];

			if (undefined !== photos[index + 1])
				$.holder_right.image = photos[index +1]['urls']['612'];
		} else {
			index = prev_index;
			sliding = false;
		}
	}
}

var index = 0;
var photos = [];
var containers = [];
var slide_out = Ti.UI.createAnimation();
var slide_in = Ti.UI.createAnimation();
var sliding = false;
var prev_index = 0;
var left_out = 0;
var left_in = 0;

$.zoom.openPhoto = function(index_p, photos_p) {
	index = index_p;
	photos = photos_p;

	containers[index] = Alloy.createController('zoom_content').getView();
	containers[index].updatePhoto(photos[index]);
	$.zoom.add(containers[index]);

	if (undefined !== photos[index - 1])
		$.holder_left.image = photos[index -1]['urls']['612'];

	if (undefined !== photos[index + 1])
		$.holder_right.image = photos[index +1]['urls']['612'];
}

slide_out.addEventListener('complete', function() {
	Alloy.Globals.index.ui_grid.fireEvent('scrollToPhoto', {
		photo_index : index
	});

	$.zoom.remove(containers[prev_index]);
	containers[prev_index] = null;
	sliding = false;
});

Ti.Gesture.addEventListener('orientationchange', function(e) {
	containers[index].left = ((Alloy.Globals.width - 640) / 2);
});

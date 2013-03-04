Alloy.Globals.index = $.index;

$.index.ui_header = Alloy.createController('header').getView();
$.index.add($.index.ui_header);

$.index.ui_left = Alloy.createController('left').getView();
$.index.add($.index.ui_left);

$.index.ui_content = null;

$.index.ui_overlay = null;

$.index.addEventListener('closeLeft', function() {
	var animation = Ti.UI.createAnimation();
	animation.left = -$.index.ui_left.width;
	$.index.ui_left.animate(animation);
});

$.index.addEventListener('openLeft', function() {
	var animation = Ti.UI.createAnimation();
	animation.left = 0;
	$.index.ui_left.animate(animation);
});

$.index.addEventListener('openRight', function() {
	if (null !== $.index.ui_content && 'grid' === $.index.ui_content.kind) {
		if (null !== $.index.ui_content.identifier) {
			Alloy.Globals.http.post('streams', {
				stream : $.index.ui_content.stream,
				identifier : $.index.ui_content.identifier,
				label : $.index.ui_header.getTitle()
			});
		}
	}
});

$.index.addEventListener('updateHeader', function(e) {
	if (undefined !== e.icon)
		$.index.ui_header.updateIcon(e.icon);
	if (undefined !== e.title)
		$.index.ui_header.updateTitle(e.title);
	
	$.index.ui_header.updateRight(e.icon);
});

$.index.addEventListener('closeOverlay', function() {
	if (null !== $.index.ui_overlay) {
		$.index.remove($.index.ui_overlay);
		$.index.ui_overlay = null;
	}
});

$.index.addEventListener('contentAction', function(e) {
	if ('gridOpenStream' === e.action || 'coverOpen' === e.action) {
		if (null === $.index.ui_content) {
			$.index.openContent(e.kind);
		} else if (e.kind !== $.index.ui_content.kind) {
			$.index.closeContent();
			$.index.openContent(e.kind);
		}
	}

	if (null !== $.index.ui_content && e.kind === $.index.ui_content.kind) {
		switch(e.action) {
			case 'gridOpenStream':
				$.index.fireEvent('updateHeader', {
					icon : e.param_icon,
					title : e.param_title
				});

				$.index.ui_content.fireEvent('setStream', {
					stream : e.param_stream,
					identifier : e.param_identifier
				});
				break;
			case 'gridHandleResponse':
				$.index.ui_content.fireEvent('handleResponse', {
					response : e.param_response
				});
				break;
			case 'gridScrollTo':
				$.index.ui_content.fireEvent('scrollToPhoto', {
					photo_index : e.param_index
				});
				break;
			case 'coverOpen':
				$.index.fireEvent('updateHeader', {
					icon : e.param_icon,
					title : e.param_title
				});

				$.index.ui_content.fireEvent('setCover', {
					cover : e.param_cover
				});
				break;
			case 'coverHandleResponse':
				$.index.ui_content.fireEvent('handleResponse', {
					response : e.param_response
				});
				break;
		}
	}
});

$.index.closeContent = function() {
	if (null !== $.index.ui_content) {
		$.index.remove($.index.ui_content);
		$.index.ui_content = null;
	}
}

$.index.openContent = function(kind_p) {
	if (null === $.index.ui_content) {
		switch(kind_p) {
			case 'grid':
				$.index.ui_content = Alloy.createController('grid').getView();
				$.index.ui_content.kind = kind_p;
				$.index.add($.index.ui_content);
				break;
			case 'cover':
				$.index.ui_content = Alloy.createController('cover').getView();
				$.index.ui_content.kind = kind_p;
				$.index.add($.index.ui_content);
				break;
		}
	}
}

$.index.addEventListener('overlayAction', function(e) {
	if ('zoomOpenPhoto' === e.action || 'resultsOpen' === e.action) {
		if (null === $.index.ui_overlay) {
			$.index.openOverlay(e.kind);
		} else if (e.kind !== $.index.ui_overlay.kind) {
			$.index.closeOverlay();
			$.index.openOverlay(e.kind);
		}
	}

	if (null !== $.index.ui_overlay && e.kind === $.index.ui_overlay.kind) {
		switch(e.action) {
			case 'zoomOpenPhoto':
				$.index.ui_overlay.fireEvent('openPhoto', {
					index : e.param_index
				});
				break;
			case 'resultsHandleResponse':
				$.index.ui_overlay.fireEvent('handleResults', {
					response : e.param_response
				});
				break;
			case 'resultsOpen':
				$.index.fireEvent('updateHeader', {
					icon : 'results',
					title : 'results'
				});
				break;
		}
	}
});

$.index.closeOverlay = function() {
	if (null !== $.index.ui_overlay) {
		$.index.remove($.index.ui_overlay);
		$.index.ui_overlay = null;
	}
}

$.index.openOverlay = function(kind_p) {
	if (null === $.index.ui_overlay) {
		switch(kind_p) {
			case 'results':
				$.index.ui_overlay = Alloy.createController('results').getView();
				$.index.ui_overlay.kind = kind_p;
				$.index.ui_overlay.fireEvent('adjustWidth');
				$.index.add($.index.ui_overlay);
				break;
			case 'zoom':
				$.index.ui_overlay = Alloy.createController('zoom').getView();
				$.index.ui_overlay.kind = kind_p;
				$.index.add($.index.ui_overlay);
				break;
		}
	}
}
if (!Alloy.CFG.logged) {
	$.index.view_start = Alloy.createController('start').getView();
	$.index.add($.index.view_start);
}

$.index.open();

Ti.Gesture.addEventListener('orientationchange', function(e) {
	if (null !== $.index.ui_content) {
		if ('grid' === $.index.ui_content.kind) {
			$.index.ui_content.photo_offset = Math.ceil(($.index.ui_content.contentOffset.y * $.index.ui_content.contentWidth) / Alloy.Globals.width);
			$.index.ui_content.contentWidth = Alloy.Globals.width;

			if ($.index.ui_content.offset_y > 0) {
				$.index.ui_content.setContentOffset({
					y : $.index.ui_content.photo_offset
				});
			}
		}
	}

	if (null !== $.index.ui_overlay) {
		if ('results' === $.index.ui_overlay.kind) {
			$.index.ui_overlay.fireEvent('adjustWidth');
		}

		if ('zoom' === $.index.ui_overlay.kind) {
			Alloy.Globals.data.containers[$.index.ui_overlay.index].left = ((Alloy.Globals.width - 640) / 2);
		}
	}
});

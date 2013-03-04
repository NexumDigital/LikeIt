var frames = [];

$.cover.frame = {
	backgroundImage : 'cover/frame_back.png',
	left : 0,
	top : 0,
	width : 256,
	height : 256
};

$.cover.back = {
	touchEnabled : false,
	image : 'cover/image_0.png',
	left : 4,
	top : 4,
	width : 248,
	height : 248
};

$.cover.placeholder = {
	touchEnabled : false,
	backgroundColor : '#ffffff',
	opacity : 0.8,
	width : 248,
	height : 44,
	bottom : 4,
	left : 4
};

$.cover.icon = {
	touchEnabled : false,
	image : 'cover/icon_default.png',
	width : 36,
	height : 44,
	bottom : 4,
	left : 4
};

$.cover.label = {
	touchEnabled : false,
	width : 176,
	height : 44,
	bottom : 4,
	left : 40,
	color : Alloy.CFG.ui_color,
	font : {
		fontFamily : Alloy.CFG.ui_font,
		fontSize : 14,
		fontWeight : 'bold'
	}
};

function deleteSelection(e) {
	if (undefined !== e.source.id_stream && 'default' !== e.source.id_stream) {
		Alloy.Globals.http.del('streams', e.source.id_stream);
		$.content.remove(e.source);
	}
}

function openSelection(e) {
	switch(e.source.action) {
		case 'feed':
		case 'liked':
		case 'location':
		case 'tag':
		case 'user':
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'grid',
				action : 'gridOpenStream',
				param_icon : e.source.icon,
				param_title : e.source.title,
				param_stream : e.source.action,
				param_identifier : e.source.identifier
			});
			break;
	}
}

$.cover.addEventListener('setCover', function(e) {
	for (var id in frames) {
		$.content.remove(frames[id]);
	}

	frames = [];
	$.cover.index = 0;

	switch(e.cover) {
		case 'streams':
			Alloy.Globals.http.get('streams', {});
			break;
		case 'albums':
			frames[$.cover.index] = Alloy.createController('cover_item').getView();
			frames[$.cover.index].fireEvent('updateItem', {
				action : 'liked',
				image : 'cover/image_2.png',
				icon : 'instagram',
				label : 'LIKED'
			});
			$.content.add(frames[$.cover.index++]);
			break;
	}
});

$.cover.addEventListener('handleResponse', function(e) {
	Ti.API.info(e.response);
	for (var id in e.response['streams_data']) {
		frames[$.cover.index] = Alloy.createController('cover_item').getView();
		frames[$.cover.index].fireEvent('updateItem', {
			id_stream : e.response['streams_data'][id]['id_stream'],
			action : e.response['streams_data'][id]['stream'],
			image : e.response['streams_data'][id]['thumbnail'],
			icon : e.response['streams_data'][id]['stream'],
			label : e.response['streams_data'][id]['label']
		});
		frames[$.cover.index].identifier = e.response['streams_data'][id]['identifier'];
		$.content.add(frames[$.cover.index++]);
	}
});

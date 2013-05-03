Alloy.Globals.index = $.index;

$.index.ui_header = Alloy.createController('header').getView();
$.index.add($.index.ui_header);

$.index.ui_left = Alloy.createController('left').getView();
$.index.add($.index.ui_left);

$.index.ui_right = null;

$.index.ui_content = null;

$.index.ui_overlay = null;

$.index.ui_block = null;

$.index.addEventListener('openLeft', function() {
	var animation = Ti.UI.createAnimation();
	animation.left = 0;
	$.index.ui_left.animate(animation);
});

$.index.addEventListener('closeLeft', function() {
	var animation = Ti.UI.createAnimation();
	animation.left = -$.index.ui_left.width;
	$.index.ui_left.animate(animation);
});

$.index.addEventListener('openRight', function(e) {
	if (null === $.index.ui_right) {
		switch(e.options) {
			case 'a':
				$.index.ui_right = Alloy.createController('right_a').getView();
				$.index.add($.index.ui_right);
				$.index.ui_header.updateRightSelected(true);
				break;
			case 'b':
				$.index.ui_right = Alloy.createController('right_b').getView();
				$.index.add($.index.ui_right);
				$.index.ui_header.updateRightSelected(true);
				break;
			case 'c':
				$.index.ui_right = Alloy.createController('right_c').getView();
				$.index.add($.index.ui_right);
				$.index.ui_header.updateRightSelected(true);
				break;
		}
	} else {
		$.index.closeRight();
	}
});

$.index.closeRight = function() {
	if (null !== $.index.ui_right) {
		$.index.remove($.index.ui_right);
		$.index.ui_right = null;
		$.index.ui_header.updateRightSelected(false);
	}
}

$.index.addEventListener('updateHeader', function(e) {
	if (undefined !== e.title)
		$.index.ui_header.updateTitle(e.title);
	if (undefined !== e.title)
		$.index.ui_header.updateRight(e.options);

	$.index.closeRight();
});

$.index.addEventListener('contentAction', function(e) {
	if ('gridOpenAlbum' === e.action || 'gridOpenLikes' === e.action || 'gridOpenStream' === e.action || 'coverOpen' === e.action) {
		if (null === $.index.ui_content) {
			$.index.openContent(e.kind);
		} else if (e.kind !== $.index.ui_content.kind) {
			$.index.closeContent();
			$.index.openContent(e.kind);
		}
	}

	if (null !== $.index.ui_content && e.kind === $.index.ui_content.kind) {
		switch(e.action) {
			case 'gridOpenAlbum':
				Alloy.Globals.ui.album['id_album'] = e.param_id_album;
				Alloy.Globals.ui.album['title'] = e.param_title;

				$.index.fireEvent('updateHeader', {
					title : e.param_title,
					options : 'c'
				});

				$.index.ui_content.fireEvent('setOrigin', {
					origin : 'albums',
					id_album : e.param_id_album
				});
				break;
			case 'gridOpenLikes':
				$.index.fireEvent('updateHeader', {
					title : e.param_title,
					options : null
				});

				$.index.ui_content.fireEvent('setOrigin', {
					origin : 'likes'
				});
				break;
			case 'gridOpenStream':
				Alloy.Globals.ui.stream['id_stream'] = e.param_id_stream;
				Alloy.Globals.ui.stream['title'] = e.param_title;
				Alloy.Globals.ui.stream['stream'] = e.param_stream;
				Alloy.Globals.ui.stream['identifier'] = e.param_identifier;

				switch(e.param_stream) {
					case 'tag':
					case 'location':
						e.param_options = 'a';
						break;
					case 'user':
						e.param_options = 'b';
						if (undefined === Alloy.Globals.ui.relationships[Alloy.Globals.ui.stream['identifier']]) {
							Alloy.Globals.http.get('relationships', {
								id_ig_other_user : e.param_identifier
							});
						}
						break;
					default:
						e.param_options = null;
						break;
				}

				$.index.fireEvent('updateHeader', {
					title : e.param_title,
					options : e.param_options
				});

				$.index.ui_content.fireEvent('setOrigin', {
					origin : 'streams',
					title : e.param_title,
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
					media_index : Alloy.Globals.ui.zoom_index
				});
				break;
			case 'coverOpen':
				$.index.fireEvent('updateHeader', {
					title : e.param_title,
					options : null
				});

				$.index.ui_content.fireEvent('setCover', {
					cover : e.param_cover
				});
				break;
			case 'coverHandleResponse':
				$.index.ui_content.fireEvent('handleResponse');
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
	if ('resultsHandleResponse' !== e.action) {
		if (null === $.index.ui_overlay) {
			$.index.openOverlay(e.kind);
		} else if (e.kind !== $.index.ui_overlay.kind) {
			$.index.closeOverlay();
			$.index.openOverlay(e.kind);
		}
	}

	if (null !== $.index.ui_overlay && e.kind === $.index.ui_overlay.kind) {
		switch(e.action) {
			case 'errorOpen':
				$.index.ui_overlay.fireEvent('updateMessage', {
					message : e.param_message
				});
				break;
			case 'zoomOpenPhoto':
				Alloy.Globals.ui.zoom_index = e.param_index;
				$.index.ui_overlay.fireEvent('openPhoto');
				break;
			case 'resultsOpen':
				$.index.fireEvent('updateHeader', {
					title : 'results',
					options : null
				});
				break;
			case 'resultsHandleResponse':
				$.index.ui_overlay.fireEvent('handleResults', {
					response : e.param_response
				});
				break;
		}
	}
});

$.index.addEventListener('closeOverlay', function() {
	if (null !== $.index.ui_overlay) {
		$.index.remove($.index.ui_overlay);
		$.index.ui_overlay = null;
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
			case 'error':
				$.index.ui_overlay = Alloy.createController('error').getView();
				$.index.ui_overlay.kind = kind_p;
				$.index.add($.index.ui_overlay);
				break;
			case 'input_title':
				$.index.ui_overlay = Alloy.createController('input_title').getView();
				$.index.ui_overlay.kind = kind_p;
				$.index.add($.index.ui_overlay);
				break;
			case 'results':
				$.index.ui_overlay = Alloy.createController('results').getView();
				$.index.ui_overlay.kind = kind_p;
				$.index.add($.index.ui_overlay);
				break;
			case 'start':
				$.index.ui_overlay = Alloy.createController('start').getView();
				$.index.ui_overlay.kind = kind_p;
				$.index.add($.index.ui_overlay);
				break;
			case 'solid':
				$.index.ui_overlay = Alloy.createController('solid').getView();
				$.index.ui_overlay.kind = kind_p;
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

$.index.addEventListener('blockAction', function(e) {
	$.index.openOverlay('solid');
	
	if (null === $.index.ui_block) {
		$.index.openBlock(e.kind);
	} else if (e.kind !== $.index.ui_block.kind) {
		$.index.closeBlock();
		$.index.openBlock(e.kind);
	}
	
	if (null !== $.index.ui_block && e.kind === $.index.ui_block.kind) {
		switch(e.action) {
			case 'instaLogin':
				$.index.ui_block.fireEvent('requestLogin');
				break;
			case 'instaLogout':
				$.index.ui_block.fireEvent('requestLogout');
				break;
		}
	}
});

$.index.addEventListener('closeBlock', function() {
	if (null !== $.index.ui_block) {
		$.index.remove($.index.ui_block);
		$.index.ui_block = null;
	}
	
	$.index.closeOverlay();
});

$.index.closeBlock = function() {
	if (null !== $.index.ui_block) {
		$.index.remove($.index.ui_block);
		$.index.ui_block = null;
	}
}

$.index.openBlock = function(kind_p) {
	if (null === $.index.ui_block) {
		switch(kind_p) {
			case 'block_code':
				$.index.ui_block = Alloy.createController('block_code').getView();
				$.index.ui_block.kind = kind_p;
				$.index.add($.index.ui_block);
				break;
			case 'block_email':
				$.index.ui_block = Alloy.createController('block_email').getView();
				$.index.ui_block.kind = kind_p;
				$.index.add($.index.ui_block);
				break;
			case 'block_follow':
				$.index.ui_block = Alloy.createController('block_follow').getView();
				$.index.ui_block.kind = kind_p;
				$.index.add($.index.ui_block);
				break;
			case 'block_insta':
				$.index.ui_block = Alloy.createController('block_insta').getView();
				$.index.ui_block.kind = kind_p;
				$.index.add($.index.ui_block);
				break;
			case 'block_intro':
				$.index.ui_block = Alloy.createController('block_intro').getView();
				$.index.ui_block.kind = kind_p;
				$.index.add($.index.ui_block);
				break;
		}
	}
}

$.index.addEventListener('httpHandler', function(e) {
	if (e.response['success']) {
		switch(e.method) {
			case 'GET':
				switch(e.path) {
					case 'relationships':
						Alloy.Globals.ui.relationships[e.response['relationship_data']['id_ig_other_user']] = e.response['relationship_data'];
						break;
					case 'streams':
						Alloy.Globals.ui.streams = [];
						for (var id in e.response['streams_data']) {
							Alloy.Globals.ui.streams[e.response['streams_data'][id]['id_stream']] = e.response['streams_data'][id];
						}
						$.index.fireEvent('contentAction', {
							kind : 'cover',
							action : 'coverHandleResponse'
						});
						break;
					case 'albums':
						Alloy.Globals.ui.albums = [];
						for (var id in e.response['albums_data']) {
							Alloy.Globals.ui.albums[e.response['albums_data'][id]['id_album']] = e.response['albums_data'][id];
						}

						if (undefined !== Alloy.Globals.data.containers[Alloy.Globals.ui.zoom_index]) {
							if (null !== Alloy.Globals.data.containers[Alloy.Globals.ui.zoom_index].menu_albums) {
								Alloy.Globals.data.containers[Alloy.Globals.ui.zoom_index].menu_albums.fireEvent('refreshAlbums');
							}
						}

						$.index.fireEvent('contentAction', {
							kind : 'cover',
							action : 'coverHandleResponse'
						});
						$.index.fireEvent('contentAction', {
							kind : 'grid',
							action : 'gridHandleResponse',
							param_response : e.response
						});
						break;
					case 'likes/trending':
						$.index.fireEvent('contentAction', {
							kind : 'grid',
							action : 'gridHandleResponse',
							param_response : e.response
						});
						break;
					case 'streams/instagram':
						$.index.fireEvent('contentAction', {
							kind : 'grid',
							action : 'gridHandleResponse',
							param_response : e.response
						});
						break;
					case 'streams/search':
						$.index.fireEvent('overlayAction', {
							kind : 'results',
							action : 'resultsHandleResponse',
							param_response : e.response
						});
						break;
					case 'sessions':
						Ti.API.info(e.response);

						$.index.ui_left.fireEvent('updateSubscriber', {
							profile_picture : e.response['user_data']['profile_picture'],
							username : e.response['user_data']['username']
						});

						Alloy.Globals.modules.push.register();
						Alloy.Globals.http.get('albums', {});
						Alloy.Globals.http.get('streams', {});
						break;
				}
				break;
			case 'POST':
				switch(e.path) {
					case 'albums':
						Alloy.Globals.http.get('albums', {});
						break;
					case 'sessions':
						$.index.ui_left.fireEvent('updateSubscriber', {
							profile_picture : e.response['user_data']['profile_picture'],
							username : e.response['user_data']['username']
						});
						
						if(undefined === e.response['trigger']){
							$.index.fireEvent('closeBlock');
							
							Ti.App.Properties.setString('id_session', e.response['id_session']);
							Alloy.Globals.properties.id_session = e.response['id_session'];
							Alloy.Globals.modules.flurry.setUserId(e.response['id_session'].toString());
							
							Alloy.Globals.modules.push.register();
							
							Alloy.Globals.http.get('albums', {});
							Alloy.Globals.http.get('streams', {});
						}
						break;
					case 'streams':
						Alloy.Globals.http.get('streams', {});
						break;
					case 'subscribers/email':
						$.index.fireEvent('blockAction', {
							kind : 'block_code'
						});
						
						Ti.App.Properties.setString('email', Alloy.Globals.properties.email);
						break;
					case 'subscribers/invite':
						$.index.fireEvent('closeBlock');
						break;
				}
				break;
			case 'DELETE':
				switch(e.path) {
					case 'streams':
						Alloy.Globals.http.get('streams', {});
						break;
				}
				break;
		}
	} else {
		alert(e.response['message']);
	}

	switch(e.response['trigger']) {
		case 'no_session':
			$.index.fireEvent('blockAction', {
				kind : 'block_insta',
				action : 'instaLogin'
			});
			break;
		case 'no_email':
			$.index.fireEvent('blockAction', {
				kind : 'block_follow'
			});
			break;
		case 'no_code':
			$.index.fireEvent('blockAction', {
				kind : 'block_code'
			});
			break;
	}
});

$.index.addEventListener('httpError', function(e) {
	alert('Lost internet connection :(');
});

Ti.Gesture.addEventListener('orientationchange', function(e) {
	if (null !== $.index.ui_content) {
		if ('grid' === $.index.ui_content.kind) {
			$.index.ui_content.media_offset = Math.ceil(($.index.ui_content.contentOffset.y * $.index.ui_content.contentWidth) / Alloy.Globals.width);
			$.index.ui_content.contentWidth = Alloy.Globals.width;

			if ($.index.ui_content.offset_y > 0) {
				$.index.ui_content.setContentOffset({
					y : $.index.ui_content.media_offset
				});
			}

			if (Ti.UI.SIZE !== $.index.ui_content.contentHeight)
				$.index.ui_content.contentHeight = (Math.ceil($.index.ui_content.index / ($.index.ui_content.contentWidth / 256)) * 256) + 44;
		}

		if ('cover' === $.index.ui_content.kind) {
			$.index.ui_content.contentWidth = Alloy.Globals.width;
		}
	}

	if (null !== $.index.ui_overlay) {
		$.index.ui_overlay.fireEvent('adjustContent');
	}

	if (null !== $.index.ui_block) {
		$.index.ui_block.fireEvent('adjustContent');
	}
});

if ('' === Alloy.Globals.properties.id_session) {
	$.index.openOverlay('solid');
	$.index.openBlock('block_intro');
} else {
	Alloy.Globals.http.get('sessions', {
		id_session : Alloy.Globals.properties.id_session,
		id_install : Ti.Platform.id,
		client : Ti.App.id,
		version : Ti.App.version,
		code : Alloy.Globals.properties.code
	});

	$.index.fireEvent('contentAction', {
		kind : 'grid',
		action : 'gridOpenLikes',
		param_title : 'Explore'
	});
}

$.index.open(); 
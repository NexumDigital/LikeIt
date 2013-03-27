$.right_c.alert = Titanium.UI.createAlertDialog({
	title : 'Do you really want to delete the album "' + Alloy.Globals.ui.album['title'] + '"?',
	buttonNames : ['NO!', 'yes']
});

$.right_c.alert.addEventListener('click', function(e) {
	switch (e.index) {
		case 0:
			break;
		case 1:
			Alloy.Globals.http.del('albums', Alloy.Globals.ui.album['id_album']);
			delete Alloy.Globals.ui.albums[Alloy.Globals.ui.album['id_album']];
			
			Alloy.Globals.index.fireEvent('contentAction', {
				kind : 'cover',
				action : 'coverOpen',
				param_title : 'albums',
				param_cover : 'albums'
			});
			break;
		default:
			break;
	}
});

function renameTap() {
	Alloy.Globals.index.fireEvent('overlayAction', {
		kind : 'input_title',
		action : 'inputTitle'
	});
}

function deleteTap() {
	$.right_c.alert.show();
}
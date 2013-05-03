function followTap() {
	Alloy.Globals.index.fireEvent('blockAction', {
		kind : 'block_email'
	});

	Alloy.Globals.http.post('relationships', {
		id_ig_other_user : Alloy.CFG.ig_app_user_id
	});
	
}
function startTap() {
	Alloy.Globals.index.fireEvent('blockAction', {
		kind : 'block_insta',
		action : 'instaLogin'
	});
}
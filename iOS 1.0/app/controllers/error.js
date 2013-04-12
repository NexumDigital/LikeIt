function closeOverlay() {
	Alloy.Globals.index.fireEvent('closeOverlay');
}

$.error.addEventListener('updateMessage', function(e) {
	$.message.text = e.message.toUpperCase();
});
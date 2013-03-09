$.row_type_a.updateLabel = function(text_p) {
	$.label.text = text_p.toUpperCase();
}

$.row_type_a.updateSelected = function(is_selected_p) {
	if (is_selected_p) {
		if ('instagram' === $.row_type_a.action)
			$.border.backgroundColor = Alloy.CFG.ui_color;
		else
			$.label.color = Alloy.CFG.ui_color;
	} else {
		if ('instagram' === $.row_type_a.action)
			$.border.backgroundColor = '#ebebeb';
		else
			$.label.color = '#666666';
	}
}
$.row_type_b.updateLabel = function (text_p) {
    $.label.text = text_p;
}

$.row_type_b.updateSelected = function (is_selected_p) {
    if(is_selected_p){
        $.label.color = Alloy.CFG.ui_color;
    } else {
        $.label.color = '#666666';
    }
}
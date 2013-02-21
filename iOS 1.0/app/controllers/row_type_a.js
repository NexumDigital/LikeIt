$.row_type_a.updateLabel = function (text_p) {
    $.label.text = text_p;
}

$.row_type_a.updateSelected = function (is_selected_p) {
    if(is_selected_p){
        $.border.backgroundColor = Alloy.CFG.ui_color;
    } else {
        $.border.backgroundColor = '#ebebeb';
    }
}
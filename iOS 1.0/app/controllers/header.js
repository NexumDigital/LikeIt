function openLeft () {
    var animation = Ti.UI.createAnimation();
    animation.left = 0;
    Alloy.Globals.index.ui_left.animate(animation);
}

$.header.updateIcon = function (kind_p) {
    $.title_icon.image = 'header/icon_'+kind_p+'.png';
}

$.header.updateText = function (text_p) {
    $.title_text.text = text_p.toUpperCase();
}
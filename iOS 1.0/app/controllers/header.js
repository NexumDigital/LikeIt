function openLeft () {
    var animation = Ti.UI.createAnimation();
    animation.left = 0;
    Alloy.Globals.index.ui_left.animate(animation);
}
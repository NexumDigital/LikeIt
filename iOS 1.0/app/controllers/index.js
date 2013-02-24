Alloy.Globals.index = $.index;

$.index.ui_header = Alloy.createController('header').getView();
$.index.add($.index.ui_header);

$.index.ui_left = Alloy.createController('left').getView();
$.index.add($.index.ui_left);
                
$.index.ui_grid = Alloy.createController('grid').getView();
$.index.add($.index.ui_grid);

$.index.ui_overlay = null;

$.index.closeOverlay = function(){
    if(null !== $.index.ui_overlay){
        $.index.remove($.index.ui_overlay);
        $.index.ui_overlay = null;
    }
}

if(!Alloy.CFG.logged){
    $.index.view_start = Alloy.createController('start').getView();
    $.index.add($.index.view_start);
}

$.index.open();
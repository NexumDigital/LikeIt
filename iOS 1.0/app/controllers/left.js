function closeLeft () {
    $.search_field.blur();
    
    var animation = Ti.UI.createAnimation();
    animation.left = -$.left.width;
    $.left.animate(animation);
}

function openSelection(e){
    
    switch(e.source.action){
        case 'popular':
        case 'feed':
        case 'liked':
            Alloy.Globals.index.ui_grid.fireEvent('resetStream', {
                set_kind : e.source.action
            });
            break;
    }
    
    if(null !== Alloy.Globals.index.ui_overlay){
        Alloy.Globals.index.remove(Alloy.Globals.index.ui_overlay);
        Alloy.Globals.index.ui_overlay = null;
    }
    
    closeLeft();
}

function doSearch(e){
    if('' !== $.search_field.value){
        if(null !== Alloy.Globals.index.ui_overlay){
            Alloy.Globals.index.remove(Alloy.Globals.index.ui_overlay);
            Alloy.Globals.index.ui_overlay = null;
        }
    
        Alloy.Globals.index.ui_overlay = Alloy.createController('results').getView();
        Alloy.Globals.index.add(Alloy.Globals.index.ui_overlay);
    
        Ti.Geolocation.getCurrentPosition(function(e){
            Alloy.Globals.http.get('streams/search', {
                kind : 'locations',
                lat : e.coords.latitude,
                lng : e.coords.longitude
            });
        });
        
        Alloy.Globals.http.get('streams/search', {
            kind : 'tags',
            q : $.search_field.value
        });
    
        Alloy.Globals.http.get('streams/search', {
            kind : 'users',
            q : $.search_field.value
        });
    }
    
    closeLeft();
}

var table_data = [];

table_data[0] = Alloy.createController('row_type_a').getView();
table_data[1] = Alloy.createController('row_type_b').getView();
table_data[2] = Alloy.createController('row_type_b').getView();
table_data[3] = Alloy.createController('row_type_b').getView();

table_data[0].action = 'streams';
table_data[0].updateLabel('STREAMS');
table_data[0].updateSelected(true);
table_data[1].action = 'popular';
table_data[1].updateLabel('Popular');
table_data[2].action = 'feed';
table_data[2].updateLabel('Feed');
table_data[3].action = 'liked';
table_data[3].updateLabel('Liked');

$.options.setData(table_data);
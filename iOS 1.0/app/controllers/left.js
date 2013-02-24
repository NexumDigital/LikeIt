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
            Alloy.Globals.index.ui_header.updateIcon('instagram');
            if('feed' === e.source.action)
                Alloy.Globals.index.ui_header.updateText('Friends');
            else
                Alloy.Globals.index.ui_header.updateText(e.source.action);
            
            Alloy.Globals.index.ui_grid.fireEvent('resetStream', {
                set_kind : e.source.action
            });
            
            Alloy.Globals.index.closeOverlay();
            
            closeLeft();
            break;
    }
}

function doSearch(e){
    if('' !== $.search_field.value){
        Alloy.Globals.index.closeOverlay();
        
        Alloy.Globals.index.ui_header.updateIcon('results');
        Alloy.Globals.index.ui_header.updateText('Results');
        
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
table_data[2].updateLabel('Friends');
table_data[3].action = 'liked';
table_data[3].updateLabel('Liked');

$.options.setData(table_data);
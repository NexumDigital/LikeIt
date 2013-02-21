function adjustWidth(){
    if(1 === Ti.UI.orientation || 2 === Ti.UI.orientation){
        $.tags.width = 256;
        $.people.width = 256;
        $.places.width = 256;
        
        $.tags.height = Alloy.Globals.height - 44;
        $.people.height = Alloy.Globals.height - 44;
        $.places.height = Alloy.Globals.height - 44;
    } else if(3 === Ti.UI.orientation || 4 === Ti.UI.orientation){
        $.tags.width = 352;
        $.people.width = 352;
        $.places.width = 320;
        
        $.tags.height = Alloy.Globals.height - 44;
        $.people.height = Alloy.Globals.height - 44;
        $.places.height = Alloy.Globals.height - 44;
    }
}

function openStream(e){
    
    switch(e.source.action){
        case 'user':
        case 'tag':
        case 'location':
            Alloy.Globals.index.ui_grid.fireEvent('resetStream', {
                set_kind : e.source.action,
                set_selection_id : e.source.selection_id
            });
            break;
    }
    
    if(null !== Alloy.Globals.index.ui_overlay){
        Alloy.Globals.index.remove(Alloy.Globals.index.ui_overlay);
        Alloy.Globals.index.ui_overlay = null;
    }
}

adjustWidth();

$.results.addEventListener('appendResults', function(e){
    switch(e.response['kind']){
        case 'locations':
            var places_data = [];
            for(var id in e.response['data_results']){
                places_data[id] = Alloy.createController('row_type_d').getView();
                places_data[id].action = 'location';
                places_data[id].selection_id = e.response['data_results'][id]['id'];
                places_data[id].updateLabel(e.response['data_results'][id]['text']);
            }
            $.places_table.setData(places_data);
            break;
        case 'tags':
            var tags_data = [];
            for(var id in e.response['data_results']){
                tags_data[id] = Alloy.createController('row_type_a').getView();
                tags_data[id].action = 'tag';
                tags_data[id].selection_id = e.response['data_results'][id]['id'];
                tags_data[id].updateLabel(e.response['data_results'][id]['text']);
            }
            $.tags_table.setData(tags_data);
            break;
        case 'users':
            var people_data = [];
            for(var id in e.response['data_results']){
                people_data[id] = Alloy.createController('row_type_c').getView();
                people_data[id].action = 'user';
                people_data[id].selection_id = e.response['data_results'][id]['id'];
                people_data[id].updatePhotoUrl(e.response['data_results'][id]['photo']);
                people_data[id].updateLabel(e.response['data_results'][id]['text']);
            }
            $.people_table.setData(people_data);
            break;
    }
});

Ti.Gesture.addEventListener('orientationchange', function (e) {
    adjustWidth();
});
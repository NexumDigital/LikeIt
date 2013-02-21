var data_photos = [];
var photos = [];
var backs = [];
var index = 0;
var max_frames = 324;

for(var i = 0; i < max_frames; i++){
    photos[i] = Alloy.createController('grid_frame').getView();
    $.grid.add(photos[i]);
}
        
$.grid.addEventListener('appendPhotos', function(e){
    if(e.response['kind'] === $.grid.kind){
        $.grid.more = false;
        $.grid.loading = false;
        
        var i = index;
    
        for(var id in e.response['data_photos']){
            if(i < max_frames){
                photos[i].updatePhotoUrl(e.response['data_photos'][id]['src_306']);
                index++;
        
                $.grid.more = true;

                i++;
            }
        }
        
        $.grid.max_id = e.response['next_max_id'];
    
        $.grid.contentHeight = (Math.ceil((index)/($.grid.contentWidth/256))*256) + 44;
        $.grid.max_y = $.grid.contentHeight-Alloy.Globals.height;
    
        if($.grid.more && !$.grid.loading){
            $.grid.loading = true;
            
            $.grid.contentHeight = (Math.ceil((index+24)/($.grid.contentWidth/256))*256) + 44;
        
            Alloy.Globals.http.get('streams/instagram', {
                kind : $.grid.kind,
                id : $.grid.selection_id,
                max_id : $.grid.max_id
            });
        }
    }
});

$.grid.addEventListener('resetStream', function(e){
    $.grid.contentWidth = Ti.Platform.displayCaps.platformWidth;
    $.grid.contentHeight = ((12/($.grid.contentWidth/256))*256) + 44;

    $.grid.max_y = 0;

    index = 0;
    $.grid.max_id = 0;
    $.grid.more = false;
    $.grid.loading = false;
    $.grid.kind = e.set_kind;
    $.grid.selection_id = e.set_selection_id;
    
    var length_photos = photos.length;
    for(var i = 0; i < length_photos; i++){
        photos[i].updatePhotoUrl('');
    }
    
    Alloy.Globals.http.get('streams/instagram', {
        kind : $.grid.kind,
        id : $.grid.selection_id
    });
});

Ti.Gesture.addEventListener('orientationchange', function (e) {
    $.grid.contentWidth = Ti.Platform.displayCaps.platformWidth;
    $.grid.contentHeight = (Math.ceil(index/($.grid.contentWidth/256))*256) + 44;
    $.grid.max_y = $.grid.contentHeight-Alloy.Globals.height;
});
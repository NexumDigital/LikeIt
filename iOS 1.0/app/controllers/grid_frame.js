$.grid_frame.clearFrame = function () {
    $.grid_frame.backgroundImage = '';
    
    $.thumb.backgroundColor = 'transparent';
    $.grid_frame.backgroundImage = '';
    $.thumb.image = '';
}

$.grid_frame.updatePhoto = function (photo_data_p) {
    $.grid_frame.backgroundImage = 'grid/frame_back.png';
    
    $.thumb.backgroundColor = '#eeeeee';
    $.thumb.image = photo_data_p['urls']['306'];
}
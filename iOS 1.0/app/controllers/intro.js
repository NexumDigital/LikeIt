$.intro.addEventListener('adjustContent', function(e) {
	header_container.animate(Ti.UI.createAnimation({
		height : (Alloy.Globals.height - 504)
	}));
});

var backs = [];
var headers = [];
var screens = [];
var headers = [];
var timeless = null;

var fade_back = Ti.UI.createAnimation({
	duration : 1000,
	opacity : 1
});
var fade_header_in = Ti.UI.createAnimation({
	duration : 1000,
	opacity : 1
});
var fade_header_out = Ti.UI.createAnimation({
	duration : 500,
	opacity : 0
});
var slide_up = Ti.UI.createAnimation({
	duration : 500,
	bottom : -6
});
var current_step = 1;

var header_container = Ti.UI.createView({
	top : 0,
	height : (Alloy.Globals.height - 504),
	width : 768,
	zIndex : 10
});

$.intro.add(header_container);

function nextStep() {
	switch(current_step) {
		case 1:
			backs[1] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/back_1.jpg',
				top : 0,
				height : 768,
				width : 1024
			});
			screens[1] = Ti.UI.createImageView({
				bottom : -470,
				image : 'intro/slide_1.jpg',
				height : 470,
				width : 768,
				borderRadius : 6
			});
			headers[1] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/header_1.png',
				height : 244,
				width : 768
			});
			$.intro.add(backs[1]);
			$.intro.add(screens[1]);
			header_container.add(headers[1]);
			backs[1].animate(fade_back);
			screens[1].animate(slide_up);
			headers[1].animate(fade_header_in);
			break;
		case 2:
			headers[1].animate(fade_header_out);
			backs[2] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/back_2.jpg',
				top : 0,
				height : 768,
				width : 1024
			});
			screens[2] = Ti.UI.createImageView({
				bottom : -470,
				image : 'intro/slide_2.jpg',
				height : 470,
				width : 768,
				borderRadius : 6
			});
			headers[2] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/header_2.png',
				height : 244,
				width : 768
			});
			$.intro.add(backs[2]);
			$.intro.add(screens[2]);
			header_container.add(headers[2]);
			backs[2].animate(fade_back);
			screens[2].animate(slide_up);
			headers[2].animate(fade_header_in);
			break;
		case 3:
			headers[2].animate(fade_header_out);
			backs[3] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/back_3.jpg',
				top : 0,
				height : 768,
				width : 1024
			});
			screens[3] = Ti.UI.createImageView({
				bottom : -470,
				image : 'intro/slide_3.jpg',
				height : 470,
				width : 768,
				borderRadius : 6
			});
			headers[3] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/header_3.png',
				height : 244,
				width : 768
			});
			$.intro.add(backs[3]);
			$.intro.add(screens[3]);
			header_container.add(headers[3]);
			backs[3].animate(fade_back);
			screens[3].animate(slide_up);
			headers[3].animate(fade_header_in);
			break;
		case 4:
			headers[3].animate(fade_header_out);
			backs[4] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/back_4.jpg',
				top : 0,
				height : 768,
				width : 1024
			});
			screens[4] = Ti.UI.createImageView({
				bottom : -470,
				image : 'intro/slide_4.jpg',
				height : 470,
				width : 768,
				borderRadius : 6
			});
			headers[4] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/header_4.png',
				height : 244,
				width : 768
			});
			$.intro.add(backs[4]);
			$.intro.add(screens[4]);
			header_container.add(headers[4]);
			backs[4].animate(fade_back);
			screens[4].animate(slide_up);
			headers[4].animate(fade_header_in);
			break;
		case 5:
			headers[4].animate(fade_header_out);
			backs[5] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/back_5.jpg',
				top : 0,
				height : 1024,
				width : 1024
			});
			timeless = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/timeless.png',
				height : 554,
				width : 1024,
				zIndex : 10
			});
			$.intro.add(backs[5]);
			$.intro.add(timeless);
			backs[5].animate(fade_back);
			timeless.animate(fade_header_in);
			break;
		case 6:
			backs[6] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/back_6.jpg',
				top : 0,
				height : 1024,
				width : 1024
			});
			$.intro.add(backs[6]);
			backs[6].animate(fade_back);
			break;
		case 7:
			backs[7] = Ti.UI.createImageView({
				opacity : 0,
				image : 'intro/back_7.jpg',
				top : 0,
				height : 1024,
				width : 1024
			});
			$.intro.add(backs[7]);
			backs[7].animate(fade_back);
			break;
		default :
			backs = [];
			headers = [];
			screens = [];
			headers = [];
			timeless = null;

			Alloy.Globals.index.fireEvent('closeBlock');
			Alloy.Globals.index.fireEvent('overlayAction', {
				kind : 'instagram',
				action : 'instagramOpenLogin'
			});
			break;
	}
	current_step++;
}

setTimeout(function() {
	nextStep();
}, 500); 
exports.create = function(_args) {
	if (Ti.Network.online == false || !_args.mp4)
		return;
	var url = (Ti.Android && _args.rtsp) ? _args.rtsp : _args.mp4;
	var win = Ti.UI.createWindow({
		backgroundColor : '#333',
		orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT]
	});
	Ti.Android || win.open();
	// building of image url:
	var poster = url.replace(/fms1\.rrz/, 'lecture2go').replace(/\/abo\//, '/images/').replace(/\.mp4/, '.jpg');
	win.add(Ti.UI.createImageView({
		image : poster
	}));
	var videoplayer = Ti.Media.createVideoPlayer({
		autoplay : true,
		fullscreen : true,
		backgroundColor : '#333',
		url : url,
		mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Ti.Media.VIDEO_MODE_FILL
	});
	if (!Ti.Android) {
		win.add(videoplayer);
		win.addEventListener('longpress', function() {
			videoplayer.stop();
			win.close();
		});
	}
	videoplayer.addEventListener('playbackstate', function(_e) {
		console.log(_e.playbackState);
	});
	videoplayer.addEventListener('complete', function(e) {
		if (e.reason == 0) {
			win.close();
		};
	});
	videoplayer.addEventListener('fullscreen', function(e) {
		if (e.entering == 0) {
			win.close();
		};
	});

};

exports.take = function(_args) {
	Ti.Media.showCamera({
		success : function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				require('model/tinybrain').saveMe(event.media);
				_args.onsuccess(event.media);
			} else {
				alert("got the wrong type back =" + event.mediaType);
			}
		},
		cancel : function() {
		},
		error : function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		allowEditing : true,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
};

var endpoint = 'http://tinybrain.de:8080/tb-talk/talk.json.php';
var progressIndicator = Ti.UI.Android.createProgressIndicator({
  message: 'Loading from bot …',
  location: Titanium.UI.Android.PROGRESS_INDICATOR_STATUS_BAR,
  type: Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
  cancelable: true,
  min: 0,
  max: 10
});
exports.getMe = function() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'me.png');
	if (!f.exists())
		return false;
	var me = f.read();
	return me.nativePath;
};

exports.saveMe = function(me) {
	if (!me)
		return;
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'me.png');
	f.write(me);
};

exports.api = function(_options, _callback) {
	if (!_options || !_callback)
		return;
	if (Ti.Network.online == false) {
		alert('We need network connectivity to chat with bot.');
		_callback({
			success : false
		});
	}
	progressIndicator.show()
	var client = Ti.Network.createHTTPClient({
		onload : function() {
			progressIndicator.hide();
			try {
				var answer = JSON.parse(this.responseText);
				_callback(answer);
			} catch(E) {
				_callback({
					success : false,
				});
				console.log(E);
			}
		},
		onerror : function(_e) {
			progressIndicator.hide();
			alert('We need network connectivity to chat with bot.');
		}
	});
	client.open('POST', endpoint);
	client.send(_options);
};

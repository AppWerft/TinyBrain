var endpoint = 'http://tinybrain.de:8080/tb-talk/talk.json.php';

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
	var client = Ti.Network.createHTTPClient({
		onload : function() {
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
			alert('We need network connectivity to chat with bot.');
		}
	});
	client.open('POST', endpoint);
	client.send(_options);
};

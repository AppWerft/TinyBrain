var endpoint = 'http://tinybrain.de:8080/tb-talk/talk.json.php';

exports.getMe = function() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'me.png');
	if (!f.exists()) return false;
	var me = f.read();
	return me.nativePath;
};

exports.saveMe = function(me) {
	if (!me) return;
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'me.png');
	f.write(me);
};

exports.talk = function(_args) {
	if (Ti.Network.online == false) {
		alert('We need network connectivity to chat with bot.');
		_args.onload({
			success : false
		});
	}
	var client = Ti.Network.createHTTPClient({
		onload : function() {
			try {
				_args.onload({
					success : true,
					message : JSON.parse(this.responseText).answer
				});
			} catch(E) {
				_args.onload({
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
	client.send({
		input : _args.message
	});
};

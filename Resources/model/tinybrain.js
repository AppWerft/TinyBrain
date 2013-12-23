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
			console.log('Info: responseText from API:\n' + this.responseText + '\n=========');
			try {
				var answer = JSON.parse(this.responseText);
				console.log('Info: successful parsed');
				_callback(answer);
			} catch(E) {
				_callback({
					success : false,
				});
				console.log(E);
			}
		},
		onerror : function(_e) {
		}
	});
	client.setRequestHeader('Accept', 'application/json');
	switch (_options.cmd) {
		case 'listbots':
			client.open('GET', endpoint + '?cmd=listbots', true);
			break;
		case 'init':
		case'talk':
			client.open('GET', endpoint + '?cmd=talk&message=' + encodeURI(_options.message), true);
			break;
		case 'publish':
			client.open('GET', endpoint + '?cmd=publish&message=' + encodeURI(_options.message), true);

		default:
			client.open('POST', endpoint, true);
	}
	client.send(_options);
};

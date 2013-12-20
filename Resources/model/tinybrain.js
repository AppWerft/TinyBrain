var endpoint = 'http://tinybrain.de:8080/tb-talk/talk.json.php';




exports.talk = function(_args) {
	if (Ti.Network.online == false) {
		alert('You are offline');
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
		onerror : function() {
			alert(this.error);
		}
	});
	client.open('POST', endpoint);
	client.send({
		input : _args.message
	});
};

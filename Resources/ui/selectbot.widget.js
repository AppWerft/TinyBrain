exports.create = function(_args) {
	Ti.App.TinyBrainProxy.api({
		cmd : 'listbots'
	}, function(_e) {
		if (true == _e.success) {
			var bots = _e.data, options = [];
			for (var i = 0; i < bots.length; i++) {
				options.push(bots[i].id + ' ' + bots[i].name);
			}
			var dialog = Ti.UI.createOptionDialog({
				title : "Hello, I'm the TinyBraїn. Please choose a personality for me.",
				options : options
			});
			dialog.addEventListener('click', function(_e) {
				if (_e.index >= 0) {
					// persist the avatar URL
					Ti.App.Properties.setString('avatar', bots[_e.index].avatar);
					// start chat with id
					_args.onselected(bots[_e.index].id);
				}
			});
			dialog.show();
		}
	});
};

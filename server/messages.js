const appId = Meteor.settings.smoochAppId

Meteor.methods({
  'sendMessage'({destUserId, msg, role, actions, items, name, email, mediaUrl}) {
    var msgData = {
      role: role,
      text: msg,
      name: name,
      email: email,
      actions: actions,
      mediaUrl: mediaUrl,
      items: items
    }

    console.log(msgData);

    SmoochApi.appUsers.sendMessage({
      appId,
      userId: destUserId,
      message: msgData
    });

  }
});

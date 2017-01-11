// 2. Send messages
/** */
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
      appId: Meteor.settings.smoochAppId,
      userId: destUserId,
      message: msgData
    });

  }
});
/* */

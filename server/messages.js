Meteor.methods({
  'sayHello'({msg}) {
    console.log('hello');
    console.log(msg);
  }
});

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

    console.log('sending message to: ' + destUserId + ' --- with contents: ' + msgData);
    SmoochApi.appUsers.sendMessage(destUserId, msgData);

  }
});

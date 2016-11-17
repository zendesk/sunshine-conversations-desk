var smooch = require('smooch-core');
//import { smooch } from 'smooch-core';

var SmoochBase = new smooch({
  keyId: 'app_582d3ffb5e1e583300447d8c',
  secret: 'NGKMzMLhmsP3VxRr33mVHpMa',
  scope: 'app', // app or appUser
})

Meteor.methods({
  'sayHello'({ msg }) {
    console.log("hello");
    console.log(msg);
  }
});

Meteor.methods({
  'sendMessage'({ destUserId, msg, role, actions, items, name, email, mediaUrl }) {
    var msgData = {
      role: role,
      text: msg,
      name: name,
      email: email,
      actions: actions,
      mediaUrl: mediaUrl,
      items:items
    }

    console.log(msgData);

    console.log("sending message to: " + destUserId + " --- with contents: " + msgData);
    SmoochBase.appUsers.sendMessage(destUserId, msgData);

  }
});

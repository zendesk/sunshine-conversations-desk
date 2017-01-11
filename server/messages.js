// 2. Send messages
/** */
Meteor.methods({
  'sendMessage'(userId, message) {
    SmoochApi.appUsers.sendMessage({
      appId: Meteor.settings.smoochAppId,
      userId,
      message 
    }).catch(console.error);
  }
});
/* */

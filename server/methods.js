Meteor.methods({
  sendMessage: (userId, message) => {
    // 2. Send messages
    /** */
    SmoochApi.appUsers.sendMessage({
      appId: Meteor.settings.smoochAppId,
      userId,
      message
    }).catch(console.error)
    /* */
  },

  getUser: (userId) => {
    // 3. Get user profile
    /** */
    return SmoochApi.appUsers.get({
      appId: Meteor.settings.smoochAppId,
      userId
    }).then(({appUser}) => Utils.resolveAvatarUrl(appUser))
      .catch(console.error)
    /* */
  }
});

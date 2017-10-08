Meteor.methods({
  sendMessage: (userId, message) => {
    /** 2. Send messages */
    SmoochApi.appUsers.sendMessage({
      appId: Meteor.settings.public.smoochAppId,
      userId,
      message
    }).catch(console.error)
    /* */
  },

  getUser: (userId) => {
    /** 3. Get user profile */
    return SmoochApi.appUsers.get({
      appId: Meteor.settings.public.smoochAppId,
      userId
    }).then(({appUser}) => {
      appUser.avatarUrl = Utils.resolveAvatarUrl(appUser)
      return appUser
    }).catch(console.error)
    /* */
  }
});

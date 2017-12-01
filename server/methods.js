
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
  },

  getAuthCode: (appUserId) => {
    return SmoochApi.appUsers.getAuthCode(appUserId)
      .then(({authCode}) => authCode)
      .catch(console.error);
  },

  getLinkRequests: (userId) => {
    return Integrations.getIntegrations().then((integrations) => {
      const integrationIds = integrations.map((i) => i._id);
      return SmoochApi.appUsers.getLinkRequests({
        appId: Meteor.settings.public.smoochAppId,
        userId,
        integrationIds});
    }).then(({linkRequests}) => linkRequests)
  }
});

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
    const appId = Meteor.settings.public.smoochAppId;
    return SmoochApi.appUsers.getAuthCode(appId, appUserId)
      .then(({authCode}) => authCode)
      .catch(console.error);
  },

  getLinkRequests: (userId) => {
    return Integrations.getIntegrations().then((integrations) => {
      const integrationIds = integrations.map((i) => i._id);
      return SmoochApi.appUsers.getLinkRequests({
        appId: Meteor.settings.public.smoochAppId,
        userId,
        integrationIds
      });
    }).then(({linkRequests}) => linkRequests)
  },

  setUserProperties: (userId, props) => {
    const appId = Meteor.settings.public.smoochAppId;

    return SmoochApi.appUsers.update(appId, userId, {
      'properties': props
    }).then(({appUser}) => {
      return appUser
    }).catch(console.error)
  },

  switchActor: async (conversationId, userId, actorId) => {
    const appId = Meteor.settings.public.smoochAppId;
    const lastMessage = await SmoochApi.appUsers.getMessages({
      appId,
      userId
    }).then((response) => {
      return response.messages[response.messages.length - 1];
    });

    HTTP.post(`${SmoochApi.serviceUrl}/v1/apps/${appId}/appusers/${userId}/conversation/actor`, {
      headers: SmoochApi.authHeaders,
      data: {
        actorId,
        messageId: lastMessage._id
      }
    }, (err, res) => {
      if (err) {
        console.error(err.message);
      } else {
        const {previousActorId, currentActorId} = res.data;
        const text = (previousActorId && currentActorId) ?
          `*Converstaion transferred from ${previousActorId} to ${currentActorId}*` :
          '*Conversation has already been transferred*';

        Messages.insert(Object.assign({}, {
          received: +new Date() / 1000,
          conversationId,
          role: 'appMaker',
          name: 'Notification',
          type: 'notification',
          text
        }));
      }
    });
  }
});

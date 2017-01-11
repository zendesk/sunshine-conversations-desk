function resolveAvatarUrl(appUser) {
  let avatarUrl
  appUser.clients.forEach((client) => {
    if (client.info && client.info.avatarUrl) {
      avatarUrl = client.info.avatarUrl
    }
  });

  if (!avatarUrl) {
    const hash = Gravatar.hash(appUser.email || appUser._id).toString()
    avatarUrl = `https://www.gravatar.com/avatar/${hash}.png?s=100&d=retro&t=${Date.now()}`
  }

  return avatarUrl;
}

Meteor.methods({
  getUser: (userId) => {
    /* */// 5. Get user profile
    return SmoochApi.appUsers.get({
      appId: Meteor.settings.smoochAppId,
      userId
    }).then(({appUser}) => {
      return Object.assign(appUser, {
        avatarUrl: resolveAvatarUrl(res.appUser)
      });
    }).catch((err) => {
      console.error(`User with id ${userId} not found`);
    });
    /* */
  }
});


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

  return Object.assign(appUser, {
    avatarUrl
  });
}

Meteor.methods({
  getUser: (userId) => {
    // 3. Get user profile
    /** */
    return SmoochApi.appUsers.get({
      appId: Meteor.settings.smoochAppId,
      userId
    }).then(({appUser}) => {
      return resolveAvatarUrl(appUser);
    }).catch((err) => {
      console.error(`Failed to fetch ${userId}`, err);
    });
    /* */
  }
});


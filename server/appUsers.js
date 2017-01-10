const appId = Meteor.settings.smoochAppId

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
    return SmoochApi.appUsers.get({
      appId,
      userId
    }).then((res) => {
      return Object.assign(res.appUser, {
        avatarUrl: resolveAvatarUrl(res.appUser)
      });
    }).catch((err) => {
      console.error(`User with id ${userId} not found`);
    });
  }
});


Utils = {}

Utils.resolveAvatarUrl = function resolveAvatarUrl(appUser) {
  let avatarUrl

  (appUser.clients || []).some((client) => {
    const info = client.info;
    if (!info) {
      return false;
    }

    return ['avatarUrl', 'headimgurl'].some((prop) => {
      if (!info[prop]) {
        return false;
      }
      avatarUrl = info[prop];
      return true;
    });
  });

  if (!avatarUrl) {
    const hash = Gravatar.hash(appUser.email || appUser._id).toString()
    avatarUrl = `https://www.gravatar.com/avatar/${hash}.png?s=100&d=retro&t=${Date.now()}`
  }

  return avatarUrl;
}


const appId = Meteor.settings.smoochAppId

Meteor.methods({
  getUser: (userId) => {
    return SmoochApi.appUsers.get({
      appId,
      userId
    }).then((res) => {
      return res.appUser;
    }).catch((err) => {
      console.error(`User with id ${userId} not found`);
    });
  }
});


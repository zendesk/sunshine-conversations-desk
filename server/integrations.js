Meteor.methods({
  getIntegrations: () => {
    if (SmoochApi.scope !== 'account') {
      throw new Meteor.Error('unauthorized', 'account scope required')
    }

    var appId = Meteor.settings.smoochAppId
    return SmoochApi.integrations.list(appId).then((res) => {
      return res.integrations;
    });
  }
});


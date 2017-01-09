const appId = Meteor.settings.smoochAppId

Meteor.methods({
  getIntegrations: () => {
    if (SmoochApi.scope !== 'account') {
      throw new Meteor.Error('unauthorized', 'account scope required')
    }

    return SmoochApi.integrations.list(appId).then((res) => {
      return res.integrations;
    });
  },

  createIntegration: (integration) => {
    return SmoochApi.integrations.create(appId, integration);
  },

  deleteIntegration: (integrationId) => {
    return SmoochApi.integrations.delete(appId, integrationId);
  }
});


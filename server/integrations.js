/** 5. Configure integrations */
const appId = Meteor.settings.public.smoochAppId

function checkScope() {
  if (SmoochApi.scope !== 'account') {
    throw new Meteor.Error('unauthorized', 'account scope required')
  }
}

Meteor.methods({
  getIntegrations: () => {
    checkScope();
    return SmoochApi.integrations.list(appId).then((res) => {
      return res.integrations;
    });
  },

  createIntegration: (integration) => {
    checkScope();
    return SmoochApi.integrations.create(appId, integration);
  },

  deleteIntegration: (integrationId) => {
    checkScope();
    return SmoochApi.integrations.delete(appId, integrationId);
  }
});
/* */

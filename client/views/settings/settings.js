Session.setDefault('available', true);

Meteor.call('getIntegrations', (err, res) => {
  if (err) {
    if (err.error === 'unauthorized') {
      Session.set('available', false);
    } else {
      throw err;
    }
  } else {
    Session.set('available', true);
    res.forEach((i) => Integrations.insert(i))
  }
})

Template.settings.helpers({
  integrations: () => Integrations.find(),
  available: () => Session.get('available')
})


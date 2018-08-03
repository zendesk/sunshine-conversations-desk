var smooch = require('smooch-core');

SmoochApi = new smooch({
  serviceUrl: Meteor.settings.serviceUrl,
  keyId: Meteor.settings.smoochKeyId,
  secret: Meteor.settings.smoochSecret,
  scope: 'account'
})

var smooch = require('smooch-core');

SmoochApi = new smooch({
  keyId: Meteor.settings.smoochKeyId,
  secret: Meteor.settings.smoochSecret,
  scope: 'account'
})

var smooch = require('smooch-core');

var prefix = Meteor.settings.smoochKeyId.split('_')
var scope
if (prefix[0] === 'app') {
  scope = 'app'
} else if (prefix[0] ==='act') {
  scope = 'account'
} else {
  throw new Error('Invalid smoochKeyId')
}

SmoochApi = new smooch({
  keyId: Meteor.settings.smoochKeyId,
  secret: Meteor.settings.smoochSecret,
  scope
})

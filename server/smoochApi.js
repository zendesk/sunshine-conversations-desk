var smooch = require('smooch-core');

SmoochApi = new smooch({
  keyId: Meteor.settings.smoochKeyId,
  secret: Meteor.settings.smoochSecret,
  scope: 'account'
})


// TODO: Remove once there is a core wrapper for auth code API
const fetch = require('node-fetch');
SmoochApi.appUsers.getAuthCode = function(appUserId) {
  SmoochApi.auth
  const appId = Meteor.settings.public.smoochAppId;
  const url = `${SmoochApi.serviceUrl}/apps/${appId}/appusers/${appUserId}/authcode`;
  const fetchOptions = {
      method: 'GET',
      headers: Object.assign({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }, SmoochApi.authHeaders)
  };
  return fetch(url, fetchOptions).then((response) => {
    if (response.status === 200) {
        return response.json();
    } else {
      throw new Error(`Failed to fetch auth code for user ${appUserId}`);
    }
  });
}

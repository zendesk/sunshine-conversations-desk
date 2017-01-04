Session.setDefault('available', true);

function field (name, key) {
  return {
    name,
    key
  }
}

const integrationTypes = {
  messenger: {
    name: 'Facebook Messenger',
    fields: [
      field('Page access token', 'pageAccessToken'),
      field('App ID', 'appId'),
      field('App secret', 'appSecret')
    ]
  },
  telegram: {
    name: 'Telegram',
    fields: [
      field('Token', 'token'),
    ]
  },
  twilio: {
    name: 'Twilio',
    fields: [
      field('Account SID', 'accountSid'),
      field('Auth token', 'authToken'),
      field('Phone number SID', 'phoneNumberSid')
    ]
  },
  line: {
    name: 'LINE Messenger',
    fields: [
      field('Channel access token', 'channelAccessToken'),
      field('Channel secret', 'channelSecret')
    ]
  },
  viber: {
    name: 'Viber',
    fields: [
      field('Token', 'token')
    ]
  },
  wechat: {
    name: 'WeChat',
    fields: [
      field('App ID', 'appId'),
      field('App secret', 'appSecret'),
      field('Encoding AES key', 'encodingAesKey')
    ]
  },
  frontendEmail: {
    name: 'Email',
    fields: [
      field('fromAddress')
    ]
  }
}

function refreshIntegrations (configuredIntegrations) {
  const forms = Object.assign({}, integrationTypes);

  configuredIntegrations.forEach((ci) => {
    const form = forms[ci.type];
    if (form) {
      form.integrated = true
      form.integratedClass = 'integrated'
      form.fields.forEach((field) => {
        field.value = ci[field.key]
      })
      form.integrationId = ci._id
    }
  });

  Object.keys(forms).forEach((key) => {
    forms[key].type = key;
    IntegrationForms.insert(forms[key])
  });
}

Meteor.call('getIntegrations', (err, res) => {
  if (err) {
    if (err.error === 'unauthorized') {
      Session.set('available', false);
    } else {
      throw err;
    }
  } else {
    Session.set('available', true);
    IntegrationForms.remove({});
    refreshIntegrations(res);
  }
})

Template.settings.helpers({
  integrationForms: () => IntegrationForms.find(),
  available: () => Session.get('available')
})

Template.settings.events({
  'submit .create-integration'(event) {
    event.preventDefault()
    const target = event.target;
    const type = target.type.value;
    const integration = {
      type
    }
    for (let i = 0; target.elements[i]; i++) {
      const e = target.elements[i]
      if (e.type === 'text') {
        integration[e.name] = e.value;
      }
    }

    Meteor.call('createIntegration', integration, (err, res) => {
      if (err) {
        return alert(err)
      }

      IntegrationForms.update({
        type
      }, {
        $set: {
          integrated: true,
          integrationId: res.integration._id
        }
      })
    })
  },

  'submit .delete-integration'(event) {
    event.preventDefault()
    const target = event.target
    const type = target.type.value;
    const integrationId = target.integrationId.value;
    Meteor.call('deleteIntegration', integrationId, (err, res) => {
      if (err) {
        return alert(err)
      }

      IntegrationForms.update({
        type
      }, {
        $unset: {
          integrated: 1
        }
      })
    })
  }
})

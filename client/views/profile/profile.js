function isDateString (string) {
  return string && string.length === 24 && moment(string, moment.ISO_8601, true).isValid();
}

function renderProps (obj) {
  const props = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const prop = {
      key
    };
    if (isDateString(value)) {
      prop.date = value
    } else {
      prop.string = value
    }
    props.push(prop)
  });
  return props;
}

function score(client) {
  let score = 0;
  ['lastSeen', 'linkedAt'].forEach((key) => {
    if (client[key]) {
      const unix = moment(client[key]).unix();
      score = Math.max(score, unix);
    }
  });
  return score;
}

Template.profile.helpers({
  conversation: function () {
    const conv = Conversations.findOne({
      _id: Router.current().params._id
    });

    if (conv) {
      Meteor.call('getUser', conv.userId, (err, appUser) => {
        if (err) {
          alert(err);
        } else {
          Session.set('appUser', appUser);
        }
      });
    }

    return conv;
  },

  appUser: function () {
    return Session.get('appUser')
  },

  clients: function() {
    const appUser = Session.get('appUser');
    if (!appUser || appUser.clients.length === 0) {
      return [];
    }

    appUser.clients.sort((a, b) => {
      return score(b) - score(a)
    });

    const renderedClients = [];
    appUser.clients.forEach((client) => {
      renderedClient = Object.assign({}, client);
      renderedClient.props = Object.assign(
          renderProps(_.omit(renderedClient, ['platform', 'id', 'displayName', 'lastSeen', 'linkedAt', 'info'])),
          renderProps(renderedClient.info || {}));
      renderedClients.push(renderedClient);
    });

    renderedClients[0].primary = true;
    return renderedClients;
  },

  customProperties: function () {
    const appUser = Session.get('appUser');
    return appUser ? renderProps(appUser.properties) : [];
  }
})

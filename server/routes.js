function fullName (body) {
  const {appUser, messages} = body;
  if (!appUser) {
    return 'Anonymous'
  }

  let fullName = [appUser.givenName, appUser.surname].filter((p) => p).join(' ')
  const messageName = messages && messages[0] && messages[0].name
  fullName = fullName || messageName || 'Anonymous'

  return fullName
}

function findConversation (body) {
  const appUser = body.appUser;
  if (!appUser) {
    return;
  }

  return Conversations.findOne({
    userId: appUser._id
  });
}

function createConversation (body) {
  let conv = findConversation(body)
  if (!conv) {
    conv = {};
    conv._id = Conversations.insert({
      name: fullName(body),
      userId: body.appUser._id,
      avatarUrl: Utils.resolveAvatarUrl(body.appUser)
    });
    return conv;
  }
}

function addMessages (conversation, messages, name) {
  if (!messages) {
    return
  }

  messages.forEach(function (m) {
    delete m._id;
    Messages.insert(Object.assign({}, m, {
      conversationId: conversation._id,
      name: name || m.name || 'Anonymous'
    }));
  });
}

Router.map(function () {
  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function () {
      // console.log(this.request.body);

      const body = this.request.body;
      let trigger = body.trigger;
      let conv = findConversation(body)

      /*if (!trigger && body.message && body.message.metadata) {
        console.log('No trigger!! It is a pipeline processing call');
        const appId = Meteor.settings.public.smoochAppId;
        const userId = body.appUser._id;
          SmoochApi.appUsers.get({
              appId,
              userId
          }).then(function (appUser) {
                console.log('AppUser fetched: ', appUser);
                const props = appUser.properties;
                if (props && props.AGENT_SESSION && props.AGENT_SESSION ===  'WAITING') {
                  // trigger = "message:appUser";
                  // body.messages = [];
                  // body.messages.push(body.message);
                    props.AGENT_SESSION = 'HANDLING';
                    console.log('Setting AGENT_SESSION to HANDLING');
                    return SmoochApi.appUsers.update(appId, userId, {"properties": props}).then(({appUser}) => {
                        console.log('AGENT_SESSION = HANDLING set');
                        return appUser
                    }).catch(console.error);
                }
            })
            .catch(function (err) {
                console.error('Error while fetching user', err)
            })
      }*/

      console.log(trigger);

      /** 1. Receve user messages */
      switch (trigger) {
        case 'message:appUser':
          console.log('message:appUser case');
          if (!conv) {
            conv = createConversation(body)
            SmoochApi.appUsers.getMessages(Meteor.settings.public.smoochAppId, body.appUser._id)
              .then(function(data) {
                addMessages(conv, data.messages)
              })
              .catch(function(error) {
                console.log('Error fetching history', error);
                addMessages(conv, body.messages, fullName(body))
              })
          } else {
            addMessages(conv, body.messages, fullName(body))
          }
          break;

        case 'message:appMaker':
          if (!conv) {
            break;
          }
            const appId = Meteor.settings.public.smoochAppId;
            const userId = body.appUser._id;
            SmoochApi.appUsers.get({
                appId,
                userId
            }).then(function ({appUser}) {
                console.log('AppUser fetched: ', appUser);
                const props = appUser.properties;
                if (props && props.AGENT_SESSION && props.AGENT_SESSION ===  'WAITING') {
                    // trigger = "message:appUser";
                    // body.messages = [];
                    // body.messages.push(body.message);
                    props.AGENT_SESSION = 'HANDLING';
                    console.log('Setting AGENT_SESSION to HANDLING');
                    return SmoochApi.appUsers.update(appId, userId, {"properties": props}).then(({appUser}) => {
                        console.log('AGENT_SESSION = HANDLING set');
                        return appUser
                    }).catch(console.error);
                }
            })
                .catch(function (err) {
                    console.error('Error while fetching user', err)
                });

          addMessages(conv, body.messages);
          break;

        case 'postback':
          if (!conv) {
            break;
          }
          body.postbacks.forEach(function (pb) {
            const pbMessage = 'Postback ' + pb.action.text + ' | Payload: ' + pb.action.payload;
            Messages.insert({
              conversationId: conv._id,
              message: pbMessage,
              name: fullName(body),
              role: 'appUser'
            });
          })
          break;
        case 'merge:appUser':
          body.discarded.forEach((discarded) => {
            Conversations.remove({userId: discarded._id});
          });
          break;
        default:
          break;
      }
      /* */

      if (conv && body.appUser && trigger === 'message:appUser') {
        Conversations.update({
          _id: conv._id
        }, {
          $set: {
            avatarUrl: Utils.resolveAvatarUrl(body.appUser),
            name: fullName(body)
          }
        });
      }

      this.response.end()
    }
  })
})

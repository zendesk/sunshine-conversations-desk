function fullName (appUser) {
  if (!appUser) {
    return 'Anonymous'
  }

  let fullName = [appUser.givenName, appUser.surname].filter((p) => p).join(' ');
  if (!fullName) {
    fullName = appUser.email || `Anonymous User ${Math.floor(Math.random() * 10000)}`
  }
  return fullName;
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
  const appUser = body.appUser;
  let conv = findConversation(body)
  if (!conv) {
    conv = {};
    conv._id = Conversations.insert({
      name: fullName(appUser),
      userId: appUser._id
    });
    return conv;
  }
}

function addMessages (conversation, messages, name) {
  if (!messages) {
    return
  }

  messages.forEach(function (m) {
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
      const body = this.request.body;
      const trigger = body.trigger;
      let conv = findConversation(body)

      /** 1. Receve user messages */
      switch (trigger) {
        case 'message:appUser':
          if (!conv) {
            conv = createConversation(body)
          }
          addMessages(conv, body.messages, fullName(body.appUser))
          break;

        case 'message:appMaker':
          if (!conv) {
            break;
          }
          addMessages(conv, body.messages)
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
              name: fullName(body.appUser),
              role: 'appUser'
            });
          })
          break;
        default:
          break;
      }
      /* */

      if (conv && body.appUser) {
        Conversations.update({
          _id: conv._id
        }, {
          $set: {
            name: fullName(body.appUser)
          }
        });
      }

      this.response.end()
    }
  })
})

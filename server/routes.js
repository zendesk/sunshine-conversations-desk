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

function findChannel (body) {
  const appUser = body.appUser;
  if (!appUser) {
    return;
  }

  return Channels.findOne({
    userId: appUser._id
  });
}

function createChannel (body) {
  const appUser = body.appUser;
  let channel = findChannel(body)
  if (!channel) {
    channel = {};
    channel._id = Channels.insert({
      name: fullName(appUser),
      userId: appUser._id
    });
    return channel;
  }
}

function addMessages (channel, messages, name) {
  if (!messages) {
    return
  }

  messages.forEach(function (msg) {
    Messages.insert({
      _channel: channel._id,
      message: msg.text,
      userName: name || msg.name || 'Anonymous',
      timestamp: msg.received,
      role: msg.role,
      avatarUrl: msg.avatarUrl,
      imageUrl: msg.mediaType && msg.mediaType.match('image') && msg.mediaUrl
    });
  });
}

Router.map(function () {
  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function () {
      const body = this.request.body;
      const trigger = body.trigger;
      let channel = findChannel(body)

      switch (trigger) {
        /* */// 1. Receve user messages
        case 'message:appUser':
          if (!channel) {
            channel = createChannel(body)
          }
          addMessages(channel, body.messages, fullName(body.appUser))
          break;
        /* */

        /* */// 4. Receive agent messages
        case 'message:appMaker':
          if (!channel) {
            break;
          }
          addMessages(channel, body.messages)
          break;
        /* */

        /* */// 6. Receive agent messages
        case 'postback':
          if (!channel) {
            break;
          }
          body.postbacks.forEach(function (pb) {
            const pbMessage = 'Postback ' + pb.action.text + ' | Payload: ' + pb.action.payload;
            Messages.insert({
              _channel: channel._id,
              message: pbMessage,
              userName: fullName(body.appUser),
              role: 'appUser'
            });
          })
          break;
        /* */

        default:
          break;
      }

      if (channel && body.appUser) {
        Channels.update({
          _id: channel._id
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

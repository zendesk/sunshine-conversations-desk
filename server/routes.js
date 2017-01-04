function fullName(appUser) {
  if (!appUser) {
    return 'Anonymous'
  }
  return [appUser.givenName, appUser.surname].filter((p) => p).join(' ')
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
    name = name || msg.name || 'Anonymous'
    Messages.insert({
      _channel: channel._id,
      message: msg.text,
      userName: name,
      timestamp: msg.received,
      role: msg.role,
      avatarUrl: msg.avatarUrl
    });
  });
}

Router.map(function () {
  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function () {

      console.log('Hook called.');
      console.log('Headers: ', this.request.headers);
      console.log('Data: ', this.request.body);

      const body = this.request.body;
      const trigger = body.trigger;
      let channel = findChannel(body)

      switch (trigger) {
        case 'message:appUser':
          if (!channel) {
            channel = createChannel(body)
          }
          addMessages(channel, body.messages, fullName(body.appUser))
          break;
        case 'message:appMaker':
          if (!channel) {
            break;
          }
          addMessages(channel, body.messages)
          break;
        case 'postback':
          if (!channel) {
            break;
          }
          console.log('trigger postback');
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
        default:
          break;
      }

      this.response.end()
    }
  })
})

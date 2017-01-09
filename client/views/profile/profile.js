Template.profile.helpers({
  channel: function () {
    var _id = Router.current().params._id;
    var channel = Channels.findOne({
      _id: _id
    });

    if (channel) {
      Meteor.call('getUser', channel.userId, (err, appUser) => {
        if (err) {
          alert(err);
        } else {
          Session.set('appUser', appUser);
        }
      });
    }

    return channel;
  },

  appUser: function () {
    const u = Session.get('appUser')
    u.fullName = [u.givenName, u.surname].filter((p) => p).join(' ')
    u.fullName = u.fullName || 'Anonymous'
    u.avatarUrl = 'https://www.gravatar.com/avatar/868cb513d5be9180697d8ba5c59d99d1.png?s=100&d=mm&t=1483999865666'
    return u
  }
})

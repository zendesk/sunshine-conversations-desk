Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function (){
  this.route('home', {
    path: '/'
  });

  this.route('channel', {
    path: '/channel/:_id'
  });

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {

      // Watch the Meteor log to see this output
      console.log("Hook called.");
      console.log("Headers: ", this.request.headers);
      console.log("Data: ", this.request.body);

      if(this.request.body.appUser) {
        var appUser = this.request.body.appUser;
        var channel = Channels.findOne({userId: appUser._id});
        var name = appUser.givenName + " " + appUser.surname;

        if(!channel) {
          channel = Channels.insert({name: name, userId: appUser._id});
        }

      if(this.request.body.messages) {
        this.request.body.messages.forEach(function(msg) {
          if(msg.name) {
            name = msg.name
          }

          Messages.insert({
            _channel: channel._id, // Channel reference.
            message: msg.text,
            userName: name,
            timestamp: msg.received, // Add a timestamp to each message.
            role: msg.role,
            avatarUrl: msg.avatarUrl
          });
        });
      } else if (this.request.body.postbacks) {
          this.request.body.postbacks.forEach(function(pb) {
            var pbLog = "Postback " + pb.action.text + " | Payload: " + pb.action.payload;
            console.log(pb.action);

            Messages.insert({
              _channel: channel._id, // Channel reference.
              message: pbLog,
              userName: name,
              role: "appUser"
            });
        });
      }


      }

      // `this.response.end` *must* be called, or else the connection is left open.
      this.response.end('Success!\n');
    }
  });
});

Template.conversation.onCreated(function () {
  var instance = this;
  // Listen for changes to reactive variables (such as Router.current()).
  instance.autorun(function () {
    var conversation = Router.current().params._id;
    var sub = instance.subscribe('messages', conversation);
    if (sub.ready()) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
});

Template.conversation.onRendered(function () {
  $('article').css({
    'padding-bottom': $('footer').outerHeight()
  });
});

Template.conversation.helpers({
  messages: function () {
    var _id = Router.current().params._id;
    return Messages.find({
      conversationId: _id
    });
  },

  conversation: function () {
    var _id = Router.current().params._id;
    return Conversations.findOne({
      _id: _id
    });
  },

  user: function () {
    return Meteor.users.findOne({
      _id: this._userId
    });
  },

  avatar: function () {
    var user = Meteor.users.findOne({
      _id: this._userId
    });
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  }
});

Template.message.rendered = function() {
  this.lastNode.lastElementChild.scrollIntoView()
};

Template.message.helpers({
  avatarUrl: function() {
    if (this.role === 'appUser') {
      const appUser = Session.get('appUser')
      if (appUser) {
        return appUser.avatarUrl;
      }
    } else {
      return this.avatarUrl
    }
  },

  date: function () {
    var dateNow = moment(this.received).calendar();
    var instance = Template.instance();
    if (!instance.date || instance.date != dateNow) {
      return instance.date = dateNow;
    }
  },

  time: function () {
    return moment(this.received).format('h:mm a');
  },

  imageUrl: function() {
    const isImage = (this.mediaType && this.mediaType.includes('image')) ||
      /(gif|jpg|jpeg|png)$/.test(this.mediaUrl);
    return isImage && this.mediaUrl;
  }
});

Template.messageAction.helpers({
  typeIsReply: function() {
    return this.type === 'reply';
  }
});

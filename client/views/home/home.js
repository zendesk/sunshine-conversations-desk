Template.home.onCreated(function () {
  this.subscribe('conversations');
  this.subscribe('allUserNames');
});

Template.home.helpers({
  conversations: function () {
    return Conversations.find();
  },

  avatar: function () {
    var user = Meteor.user();
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },

  active: function () {
    var _id = Router.current().params._id;
    return _id == this._id ? 'active' : '';
  }
});

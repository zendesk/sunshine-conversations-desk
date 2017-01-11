Conversations = new Mongo.Collection('conversations');

if (Meteor.isServer) {
  Conversations.allow({
    insert: function (userId, doc) {
      if (userId) {
        return true;
      }
    }
  });

  Meteor.publish('conversations', function () {
    if (this.userId) {
      return Conversations.find();
    }
  });
}

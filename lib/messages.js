Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Messages.allow({
    insert: function (userId, doc) {
      if (userId && doc.conversationid) {
        return true;
      }
    }
  });

  Meteor.publish('messages', function (conversation) {
    if (this.userId) {
      return Messages.find({
        conversationId: conversation
      });
    }
  });
}

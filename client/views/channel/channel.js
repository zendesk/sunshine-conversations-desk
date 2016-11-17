Meteor.call('sayHello', {
  msg: "world"
}, (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
  }
});

Template.channel.onCreated(function() {
  var instance = this;
  // Listen for changes to reactive variables (such as Router.current()).
  instance.autorun(function() {
    var channel = Router.current().params._id;
    var sub = instance.subscribe('messages', channel);
    if (sub.ready()) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
});

Template.channel.onRendered(function() {
  $('article').css({'padding-bottom': $('footer').outerHeight()});
});

Template.channel.helpers({
  messages: function() {
    var _id = Router.current().params._id;
    return Messages.find({_channel: _id});
  },

  channel: function() {
    var _id = Router.current().params._id;
    return Channels.findOne({_id: _id});
  },

  user: function() {
    return Meteor.users.findOne({_id: this._userId});
  },

  time: function() {
    return moment(this.timestamp).format('h:mm a');
  },

  date: function() {
    var dateNow = moment(this.timestamp).calendar();
    var instance = Template.instance();
    if (!instance.date || instance.date != dateNow) {
      return instance.date = dateNow;
    }
  },

  avatar: function() {
    var user = Meteor.users.findOne({_id: this._userId});
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  }
});

Template.messageForm.events({
  'keydown textarea': function(event, instance) {
    if (event.keyCode == 13 && !event.shiftKey) { // Check if enter was pressed (but without shift).
      event.preventDefault();
      console.log("new message");

      var _id = Router.current().params._id;
      var value = instance.find('textarea').value;
      var user = Meteor.user();

      console.log(user);

      // Markdown requires double spaces at the end of the line to force line-breaks.
      value = value.replace("\n", "  \n");
      instance.find('textarea').value = ''; // Clear the textarea.
      var chan = Channels.findOne({_id: _id});

      Meteor.call('sendMessage', {
        msg: value,
        destUserId: chan.userId,
        role: "appMaker",
        name: user.username,
        email: user.emails[0].address
      }, (err, res) => {
        if (err) {
          alert(err);
        } else {
          // success!
        }
      });

      // Restore the autosize value.
      instance.$('textarea').css({height: 37});
      window.scrollTo(0, document.body.scrollHeight);
    }
    $('article').css({'padding-bottom': $('footer').outerHeight()});
  },
  'click button.btn_link': function(event, instance) {
    event.preventDefault();
    console.log("Sending link...");

    var _id = Router.current().params._id;
    var chan = Channels.findOne({_id: _id});
    var user = Meteor.user();

    Meteor.call('sendMessage', {
      msg: "Some great websites:",
      destUserId: chan.userId,
      role: "appMaker",
      name: user.username,
      email: user.emails[0].address,
      actions: [{"type": "link", "text": "Google", "uri": "http://google.com"},
                {"type": "link", "text": "Facebook", "uri": "http://facebook.com"},
                {"type": "link", "text": "Smooch", "uri": "http://smooch.io"},
               ],

    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
      }
    });
  },
  'click button.btn_postback': function(event, instance) {
    event.preventDefault();
    console.log("Sending postback...");

    var _id = Router.current().params._id;
    var chan = Channels.findOne({_id: _id});
    var user = Meteor.user();

    Meteor.call('sendMessage', {
      msg: "Here are some postbacks:",
      destUserId: chan.userId,
      role: "appMaker",
      name: user.username,
      email: user.emails[0].address,
      actions: [{"type": "postback", "text": "Option A", "payload": "AAA"},
                {"type": "postback", "text": "Option B", "payload": "BBB"},
                {"type": "postback", "text": "Option C", "payload": "CCC"},
               ],

    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
      }
    });
  },
  'click button.btn_carousel': function(event, instance) {
    event.preventDefault();
    console.log("Sending link...");

    var _id = Router.current().params._id;
    var chan = Channels.findOne({_id: _id});
    var user = Meteor.user();

    Meteor.call('sendMessage', {
      destUserId: chan.userId,
      role: "appMaker",
      name: user.username,
      email: user.emails[0].address,
      items: [{"title": "Big Hat",
               "description": "This is a very big hat",
               "mediaUrl": "http://cdn.shopify.com/s/files/1/1010/8284/products/hat_grande.png?v=1449261629",
               "actions": [{
                 "text": "Add to Cart ($24.99)",
                 "type": "postback",
                 "payload": "BIG_HAT_ADD_TO_CART"
               }, {
                 "text": "Learn More",
                 "type": "link",
                 "uri": "http://smoochopify.myshopify.com/products/big-hat"
               }]
             },
             {"title": "Yellow Top",
              "description": "This is a plain yellow top",
              "mediaUrl": "http://cdn.shopify.com/s/files/1/1010/8284/products/shirt7_grande.png?v=1449262512",
              "actions": [{
                "text": "Add to Cart ($29.99)",
                "type": "postback",
                "payload": "YELLOW_TOP_ADD_TO_CART"
              }, {
                "text": "Learn More",
                "type": "link",
                "uri": "http://smoochopify.myshopify.com/products/yellow-top"
              }]
            },
            {"title": "Handbag",
                     "description": "This is a snazzy handbag",
                     "mediaUrl": "http://cdn.shopify.com/s/files/1/1010/8284/products/222_grande.jpeg?v=1449262676",
                     "actions": [{
                       "text": "Add to Cart ($299.99)",
                       "type": "postback",
                       "payload": "HANDBAG_ADD_TO_CART"
                     }, {
                       "text": "Learn More",
                       "type": "link",
                       "uri": "http://smoochopify.myshopify.com/products/handbag"
                     }]
            },
            {"title": "Printed Polo Shirt",
                     "description": "This is a polo shirt with dots printed on it",
                     "mediaUrl": "http://cdn.shopify.com/s/files/1/1010/8284/products/shirt6_grande.png?v=1449261846",
                     "actions": [{
                       "text": "Add to Cart ($39.95)",
                       "type": "postback",
                       "payload": "PRINTED_POLO_ADD_TO_CART"
                     }, {
                       "text": "Learn More",
                       "type": "link",
                       "uri": "http://smoochopify.myshopify.com/products/printed-polo-shirt"
                     }]
                   },
           {"title": "Bird Dress",
                    "description": "Put a bird on it 🕊",
                    "mediaUrl": "http://cdn.shopify.com/s/files/1/1010/8284/products/dress1_grande.png?v=1449261607",
                    "actions": [{
                      "text": "Add to Cart ($42.99)",
                      "type": "postback",
                      "payload": "BIRD_DRESS_ADD_TO_CART"
                    }, {
                      "text": "Learn More",
                      "type": "link",
                      "uri": "http://smoochopify.myshopify.com/products/bird-dress"
                    }]
                  }]
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
      }
    });
  },
  'click button.btn_quickreply': function(event, instance) {
      event.preventDefault();
      console.log("Sending link...");

      var _id = Router.current().params._id;
      var chan = Channels.findOne({_id: _id});
      var user = Meteor.user();

      Meteor.call('sendMessage', {
        msg: "What do you want to eat for dinner?",
        destUserId: chan.userId,
        role: "appMaker",
        name: user.username,
        email: user.emails[0].address,
        actions: [{
                    "type": "reply",
                    "text": "Tacos",
                    "iconUrl": "https://cdn.shopify.com/s/files/1/1061/1924/files/Taco_Emoji.png?9898922749706957214",
                    "payload": "TACOS"
                  }, {
                    "type": "reply",
                    "text": "Burritos",
                    "iconUrl": "http://pix.iemoji.com/images/emoji/apple/ios-9/256/burrito.png",
                    "payload": "BURRITOS"
                  }]
      }, (err, res) => {
        if (err) {
          alert(err);
        } else {
          // success!
        }
      });
    }
});

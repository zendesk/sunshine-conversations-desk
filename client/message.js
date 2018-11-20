Message = {}

function sendMessage (message) {
  const conv = Conversations.findOne({
    _id: Router.current().params._id
  });
  const user = Meteor.user();

  const messageBody = Object.assign({
    role: 'appMaker',
    name: user.username,
    email: user.emails[0].address,
  }, message);

  Meteor.call('sendMessage', conv.userId, messageBody, (err) => {
    if (err) {
      alert(err);
    }
  });
}

function sendReadReceipt () {
  const conv = Conversations.findOne({
    _id: Router.current().params._id
  });

  Meteor.call('sendReadReceipt', conv.userId, (err) => {
    if (err) {
      alert(err);
    }
  });
}

function sendTypingIndicator (start) {
  const conv = Conversations.findOne({
    _id: Router.current().params._id
  });

  Meteor.call('sendTyping', conv.userId, start, (err) => {
    if (err) {
      alert(err);
    }
  });
}

Message.sendReadReceipt = function() {
  sendReadReceipt();
}

Message.sendTypingIndicator = function(start) {
  sendTypingIndicator(start);
}

Message.sendText = function(text) {
  sendMessage({
    text
  });
}

Message.sendTrunk = function() {
  sendMessage({
    type:'image',
    text: 'Your trunk is ready.',
    actions: [
      {
        type: 'webview',
        text: 'Review Trunk',
        uri: 'https://i.imgur.com/5mPBt8y.png',
        fallback: 'https://i.imgur.com/5mPBt8y.png',
        size: 'tall'
      }
    ],
    mediaType: 'image/png',
    mediaUrl: 'https://i.imgur.com/KcovdCW.png'
  });
}

Message.sendLink = function() {
  /** 4. Structured messages - link buttons */
  sendMessage({
    text: 'Some great websites:',
    actions: [{
      'type': 'link',
      'text': 'Google',
      'uri': 'http://google.com'
    },
      {
        'type': 'link',
        'text': 'Facebook',
        'uri': 'http://facebook.com'
      },
      {
        'type': 'link',
        'text': 'Smooch',
        'uri': 'http://smooch.io'
      },
    ]
  });
  /* */
}

Message.sendQuickReply = function() {
  /** 4. Structured messages - quick replies */
  sendMessage({
    text: 'What do you want to eat for dinner?',
    actions: [{
      'type': 'reply',
      'text': 'Tacos',
      'iconUrl': 'https://cdn.shopify.com/s/files/1/1061/1924/files/Taco_Emoji.png?9898922749706957214',
      'payload': 'TACOS'
    }, {
      'type': 'reply',
      'text': 'Burritos',
      'iconUrl': 'http://pix.iemoji.com/images/emoji/apple/ios-9/256/burrito.png',
      'payload': 'BURRITOS'
    }]
  })
  /* */
}

Message.sendCarousel = function() {
  /** 4. Structured messages - carousel */
  sendMessage({
    items: [{
      'title': 'Big Hat',
      'description': 'This is a very big hat',
      'mediaUrl': 'http://cdn.shopify.com/s/files/1/1010/8284/products/hat_grande.png?v=1449261629',
      'actions': [{
        'text': 'Add to Cart ($24.99)',
        'type': 'postback',
        'payload': 'BIG_HAT_ADD_TO_CART'
      }, {
        'text': 'Learn More',
        'type': 'link',
        'uri': 'http://smoochopify.myshopify.com/products/big-hat'
      }]
    }, {
      'title': 'Yellow Top',
      'description': 'This is a plain yellow top',
      'mediaUrl': 'http://cdn.shopify.com/s/files/1/1010/8284/products/shirt7_grande.png?v=1449262512',
      'actions': [{
        'text': 'Add to Cart ($29.99)',
        'type': 'postback',
        'payload': 'YELLOW_TOP_ADD_TO_CART'
      }, {
        'text': 'Learn More',
        'type': 'link',
        'uri': 'http://smoochopify.myshopify.com/products/yellow-top'
      }]
    }, {
      'title': 'Handbag',
      'description': 'This is a snazzy handbag',
      'mediaUrl': 'http://cdn.shopify.com/s/files/1/1010/8284/products/222_grande.jpeg?v=1449262676',
      'actions': [{
        'text': 'Add to Cart ($299.99)',
        'type': 'postback',
        'payload': 'HANDBAG_ADD_TO_CART'
      }, {
        'text': 'Learn More',
        'type': 'link',
        'uri': 'http://smoochopify.myshopify.com/products/handbag'
      }]
    }, {
      'title': 'Printed Polo Shirt',
      'description': 'This is a polo shirt with dots printed on it',
      'mediaUrl': 'http://cdn.shopify.com/s/files/1/1010/8284/products/shirt6_grande.png?v=1449261846',
      'actions': [{
        'text': 'Add to Cart ($39.95)',
        'type': 'postback',
        'payload': 'PRINTED_POLO_ADD_TO_CART'
      }, {
        'text': 'Learn More',
        'type': 'link',
        'uri': 'http://smoochopify.myshopify.com/products/printed-polo-shirt'
      }]
    }, {
      'title': 'Bird Dress',
      'description': 'Put a bird on it 🕊',
      'mediaUrl': 'http://cdn.shopify.com/s/files/1/1010/8284/products/dress1_grande.png?v=1449261607',
      'actions': [{
        'text': 'Add to Cart ($42.99)',
        'type': 'postback',
        'payload': 'BIRD_DRESS_ADD_TO_CART'
      }, {
        'text': 'Learn More',
        'type': 'link',
        'uri': 'http://smoochopify.myshopify.com/products/bird-dress'
      }]
    }]
  })
  /* */
}

Message.sendPostback = function() {
  /** 4. Structured messages - postback */
  sendMessage({
    text: 'Here are some postbacks:',
    actions: [{
      'type': 'postback',
      'text': 'Option A',
      'payload': 'AAA'
    },
      {
        'type': 'postback',
        'text': 'Option B',
        'payload': 'BBB'
      },
      {
        'type': 'postback',
        'text': 'Option C',
        'payload': 'CCC'
      },
    ]
  })
  /* */
}

Message.transferToSdk = function() {
  const conv = Conversations.findOne({
    _id: Router.current().params._id
  });

  Meteor.call('getAuthCode', conv.userId, (err, authCode) => {
    if (err) {
      alert(err);
    } else {
      sendMessage({
        text: 'Do you want to transfer to a secure channel?',
        actions: [{
          'type': 'link',
          'text': 'Transfer',
          'uri': `${Meteor.absoluteUrl()}web-messenger#${authCode}`
        }]
      })
    }
  });
}

Message.transferToOtt = function() {
  const conv = Conversations.findOne({
    _id: Router.current().params._id
  });

  Meteor.call('getLinkRequests', conv.userId, (err, linkRequests) => {
    if (err) {
      alert(err);
    } else {
      const actions = linkRequests.map((lr) => {
        return {
          type: 'link',
          text: lr.type.toUpperCase(),
          uri: lr.url
        }
      })
      sendMessage({
        text: 'Transfer your preferred messaging app:',
        actions
      })
    }
  });
}

Message.leaveChat = function() {
  const conv = Conversations.findOne({
    _id: Router.current().params._id
  });

  Meteor.call('setUserProperties', conv.userId, {"AGENT_SESSION":false}, (err, appUser) => {
    if (err) {
      alert(err);
    } else {
      //Delete the conversation in SmoochDesk, will be re-retrieved next time user appears...
      sendMessage({"text": "👋"});
      Conversations.remove(Router.current().params._id);
      Router.go('/');
    }
  })
}

function sendMessage (message) {
  const channel = Channels.findOne({
    _id: Router.current().params._id
  });
  const user = Meteor.user();

  const messageBody = Object.assign({
    role: 'appMaker',
    name: user.username,
    email: user.emails[0].address,
  }, message);

  Meteor.call('sendMessage', channel.userId, messageBody, (err) => {
    if (err) {
      alert(err);
    }
  });
}

Template.messageForm.events({
  'keydown textarea': function sendText (event, instance) {
    if (event.keyCode == 13 && !event.shiftKey) { // Check if enter was pressed (but without shift).
      event.preventDefault();

      // Markdown requires double spaces at the end of the line to force line-breaks.
      let value = instance.find('textarea').value;
      value = value.replace('\n', '  \n');
      instance.find('textarea').value = ''; // Clear the textarea.

      sendMessage({
        text: value,
      });

      // Restore the autosize value.
      instance.$('textarea').css({
        height: 37
      });
      window.scrollTo(0, document.body.scrollHeight);
    }
    $('article').css({
      'padding-bottom': $('footer').outerHeight()
    });
  },

  'click a.link': function sendLink (event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()

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
  },

  'click a.carousel': function sendCarousel (event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()

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
  },

  'click a.quickreply': function sendQuickReply (event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()

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
  },

  'click a.postback': function sendPostback (event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()

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
  }
});

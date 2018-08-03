Template.messageForm.events({
  'keydown textarea': function sendText (event, instance) {
    if (event.keyCode == 13 && !event.shiftKey) { // Check if enter was pressed (but without shift).
      event.preventDefault();

      // Markdown requires double spaces at the end of the line to force line-breaks.
      let value = instance.find('textarea').value;
      value = value.replace('\n', '  \n');
      instance.find('textarea').value = ''; // Clear the textarea.

      Message.sendText(value)

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
    Message.sendLink();
  },

  'click a.quickreply': function sendQuickReply (event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()
    Message.sendQuickReply();
  },

  'click a.carousel': function sendCarousel (event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()
    Message.sendCarousel();
  },

  'click a.postback': function sendPostback (event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()
    Message.sendPostback();
  },

  'click a.transferToSdk': function transferToSdk(event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()
    Message.transferToSdk();
  },

  'click a.transferToOtt': function transferToOtt(event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()
    Message.transferToOtt();
  },

  'click a.leaveChat': function leaveChat(event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()
    Message.leaveChat();
  },

  'click a.bananabot': function bananabot(event, instance) {
    event.preventDefault();
    Dropdowns.hideAll()
    Message.switchActor('bananabot');
  }
});

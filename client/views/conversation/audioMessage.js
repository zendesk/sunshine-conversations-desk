import { ReactiveDict } from 'meteor/reactive-dict';

function getPlayer(url) {
  return new Promise((resolve, reject) => {
    const player = new AmrPlayer(url)
    player.onReady(function() {
      resolve(player);
    });
  });
}

Template.audioMessage.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.set('playback', 'paused');
});

Template.audioMessage.events({
  'click .play'(event, instance) {
      instance.state.set('playback', 'playing');
      var url = this.text;
      this.playbackState = 'playing';
      getPlayer(url).then((p) => {
        p.endedWith(() => {
          instance.state.set('playback', 'paused');
        });
        p.play()
      });
  }
});
Template.audioMessage.helpers({
  isPlaying() {
    return Template.instance().state.get('playback') === 'playing';
  }
});

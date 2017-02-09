Router.configure({
  layoutTemplate: 'layout',
  'preload': {
    'verbose': true,
    'sync': [
      '/js/amr/amrnb.js',
      '/js/amr/amrplayer.js'
    ]
  }
});

Router.route('/', {
    template: 'home',
    controller: PreloadController
});

Router.route('/conversation/:_id', {
  template: 'conversation',
  controller: PreloadController
});

Router.route('/web-messenger', {
  template: 'widget',
  controller: PreloadController
});

Router.route('/settings', {
  template: 'settings',
  controller: PreloadController
});

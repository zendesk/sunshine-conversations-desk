Router.configure({
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
    controller: PreloadController,
    layoutTemplate: 'threeColumn'
});

Router.route('/conversation/:_id', {
  template: 'conversation',
  controller: PreloadController,
  layoutTemplate: 'threeColumn'
});

Router.route('/web-messenger', {
  template: 'widget',
  controller: PreloadController,
  layoutTemplate: 'threeColumn'
});

Router.route('/settings', {
  template: 'settings',
  controller: PreloadController,
  layoutTemplate: 'twoColumn'
});

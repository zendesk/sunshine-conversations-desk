Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('home', {
    path: '/'
  });

  this.route('channel', {
    path: '/channel/:_id'
  });

  this.route('widget', {
    path: '/web-messenger'
  });

  this.route('settings', {
    path: '/settings'
  });
});

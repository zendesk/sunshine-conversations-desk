Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('home', {
    path: '/'
  });

  this.route('conversation', {
    path: '/conversation/:_id'
  });

  this.route('widget', {
    path: '/web-messenger'
  });

  this.route('settings', {
    path: '/settings'
  });
});

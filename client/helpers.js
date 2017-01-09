Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMM Do, YYYY h:mma Z');
});

Template.registerHelper('fromNow', function(date) {
  return moment(date).fromNow();
});

Template.registerHelper('capitalize', function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

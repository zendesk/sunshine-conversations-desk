Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMM Do, YYYY h:mma Z');
});

Template.registerHelper('fromNow', function(date) {
  return moment(date).fromNow();
});

// camelCasedString --> Camel Cased String
Template.registerHelper('decamel', function(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2')
  return string.charAt(0).toUpperCase() + string.slice(1);
});

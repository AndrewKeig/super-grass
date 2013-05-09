var Table = require('cli-table')
, Handlebars = require('handlebars');

var Formatter = function() {
  if (!this instanceof Formatter) return new Formatter();
};

Formatter.prototype.text = function(notification) {
  var table = new Table({ 
      head: ['name', 'status']
    , colWidths: [60, 12]
    , style : {compact : true, 'padding-left' : 1}
  });

  for(var item in notification){
    table.push([notification[item].name, notification[item].status]);
  }

  return table.toString();
};

Formatter.prototype.html = function(notification) {
  var source = "<table><tr><td style='width:200px;'><b>Name</b></td><td><b>Status</b></td></tr>{{#each items}}<tr><td>{{name}}</td><td>{{status}}</td></tr>{{/each}}</table>";
  var template = Handlebars.compile(source);
  var wrapper = {items:notification};
  var html = template(wrapper);
  return html;
};

module.exports = Formatter;

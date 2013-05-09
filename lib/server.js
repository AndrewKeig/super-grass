
var Server = function(settings, vat) {
  var EventVat = require('eventvat')
  , express = require('express')
  , cons = require('consolidate')
  , app = express();

  app.engine('html', cons.handlebars);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');

  app.get('/status', function(req, res){
    res.render('status', {
      title: 'Current Status',
      items: vat.get('status'),
      sending: vat.get('send_emails') ? true : false,
      send_emails: vat.get('send_emails') ? "Emails are enabled" : "Emails are disabled"
    });
  });

  app.get('/stop', function(req, res){
   vat.set('send_emails', false);
   res.redirect('/status');
  });

  app.get('/start', function(req, res){
   vat.set('send_emails', true);
   res.redirect('/status');
  });

  app.listen(settings.port|| 3000);
};

module.exports = Server;

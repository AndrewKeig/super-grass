var nodemailer = require("nodemailer")
  , Formatter = require("./formatter");

var Informer = function(settings) {
  if (!this instanceof Informer) return new Informer();
   this.login = settings.login;
   this.password = settings.password;
   this.to = settings.to;
   this.from = settings.from;
   this.fromName = settings.fromName;
   this.formatter = new Formatter();
};

Informer.prototype.email = function(notification) {
  var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: this.login,
      pass: this.password
    }
  });

  var message = {
    from: this.fromName + " ✔ <" + this.from + ">", 
    to: this.to, 
    subject: "Super Grass Monitor ✔"
  };

  message.text = this.formatter.text(notification);
  message.html = this.formatter.html(notification);

  smtpTransport.sendMail(message, function(error, response){
    if(error) console.log(error);
    smtpTransport.close();
  });
};

module.exports = Informer;

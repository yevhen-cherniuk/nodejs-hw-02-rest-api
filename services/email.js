const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;

    switch (env) {
      case 'development':
        this.link = process.env.LINK_HOST_DEVELOPMENT;
        break;
      case 'production':
        this.link = 'link from production';
        break;
      default:
        this.link = process.env.LINK_HOST_DEFAULT;
        break;
    }
  }

  capitalize(str) {
    const string = str.split('@')[0];
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  #createTemplateVerificationEmail(verifyToken, emailUser) {
    const mailGenerator = new Mailgen({
      theme: 'neopolitan',
      product: {
        name: 'PSG System',
        link: this.link,
      },
    });

    const email = {
      body: {
        name: this.capitalize(emailUser),
        intro: "Welcome PSG System! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with PSG System, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/v1/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(verifyToken, email) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, email);
    const msg = {
      to: email,
      subject: 'Verify your account',
      text: 'and easy to do anywhere, even with Node.js',
      html: emailHtml,
    };

    const result = await this.sender.send(msg);
    console.log(result);
  }
}

module.exports = EmailService;
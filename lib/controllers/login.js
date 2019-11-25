require('dotenv').config();
const TotalVoice = require('totalvoice-node');
const Base64 = require('js-base64').Base64;
const userDb = require('../db/user.js');

class LoginController {
  async emailLogin(req, res) {
    const totalVoiceClient = new TotalVoice(process.env.SECURITY_TOKEN);

    const { email, password } = req.body;
    const userInDatabase = userDb.getByLogin(email, password)
    if (!userInDatabase) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const token = {
      type: '2fa-sent',
      userId: userInDatabase.id,
      email: userInDatabase.email,
      sign: "0123456789"
    }
    try {
      const response = await totalVoiceClient.verificacao.enviar(userInDatabase.phone, 'app-top', 5, false);

      token.twoFactorVerificationId = response.dados.id;
      const base64Token = Base64.encode(JSON.stringify(token));

      return res.json({ message: "Authentication success, waiting 2FA validation!", token: base64Token })
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }

  }

  async verify2FA(req,res){
    const totalVoiceClient = new TotalVoice('81b488b24c3958bb17616a607889cfec');
    const authorizationHeader = req.header("Authorization");

    const token = JSON.parse(Base64.decode(authorizationHeader));

    const userInDatabase = userDb.getById(token.userId);

    totalVoiceClient.verificacao.buscar(token.twoFactorVerificationId, req.body.pin)
    .then(data=>{
      const permanentToken = {
        type: 'permanent',
        userId: userInDatabase.id,
        email: userInDatabase.email,
        sign: '0123456789'
      }
      const base64Token =  Base64.encode(JSON.stringify(permanentToken));

      return res.status(201).json({menssage: "2fa success",  permanentToken:base64Token})
    });
  }
}

module.exports = new LoginController();
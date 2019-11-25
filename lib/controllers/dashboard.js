const Base64 = require('js-base64').Base64;
const userDb = require('../db/user.js');


class DashboardController{
  get(req,res){
    const authorizationHeader = req.header("Authorization");

    const token = JSON.parse(Base64.decode(authorizationHeader));

    const user = userDb.getById(token.userId);

    const userData = {name: user.name, email: user.email, phone: user.phone};

    return res.json(userData);
  }
}

module.exports = new DashboardController();


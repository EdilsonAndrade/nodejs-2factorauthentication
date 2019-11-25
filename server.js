const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const LoginController = require('./lib/controllers/login');
const DashboardController = require('./lib/controllers/dashboard');

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: '100'
}));

router.post('/login',LoginController.emailLogin);
router.post('/verify-2fa',LoginController.verify2FA);
router.get('/dashboard',DashboardController.get);

app.use(router);


const server = app.listen(3001, ()=>{
  console.log(`Server running at: ${server.address().port}`);
});
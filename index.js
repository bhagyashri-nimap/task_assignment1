const express = require('express');
var UserModel = require('./models/UserModel')
 const cors = require('cors');
const mongoose = require('./db.js');
var router = require('./routers/router')
var cron = require("node-cron");
const app = express();
app.use(cors());
app.options('*', cors());
app.use('/',router)
cron.schedule("0 */2 * * *", () => {
  UserModel.cpuUsages()
});
const server = require('http').createServer(app);
server.listen(3000, () => {
  console.log("Success", 3000)
})

module.exports = app;
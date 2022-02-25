const app = require("./app");
const models = require("./db/models");

models.sequelize
  .sync({})
  .then(app.listen(5000, () => console.log("Server started...")));

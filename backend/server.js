const app = require("./app");
// const models = require("./db/models");

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started..."));

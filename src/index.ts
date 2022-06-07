import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

import "./controllers/MainController";
import "./controllers/UserController";
import router from "./controllers/decorators/controller";

const app = express();

app.use(cookieSession({ keys: ["expresswithtypescript"] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(8000, () => {
  console.log("Listening to port 8000 >>>");
});

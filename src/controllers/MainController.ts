import { Request, Response } from "express";
import { controller, get } from "./decorators";

@controller("")
class MainController {
  @get("/")
  getHome(req: Request, res: Response): void {
    if (req.session && req.session.isLoggedIn) {
      res.send("You are logged in!");

      return;
    }

    res.send("You aren't logged in!");
  }
}

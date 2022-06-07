import { NextFunction, Request, Response, RequestHandler } from "express";

import { controller, get, use, post } from "./decorators";

const bodyValidator = (...props: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(422).send("Invalid Request!");

      return;
    }

    for (let prop of props) {
      if (!req.body[prop]) {
        res.status(422).send("Invalid Request!");

        return;
      }
    }

    next();
  };
};

@controller("/user")
class UserController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
            <form method="POST" action="/user/login">
                <input type="text" name="username" />
                <input type="password" name="password" />
                <button>Login</button>
            </form>
        `);
  }

  @use(bodyValidator("username", "password"))
  @post("/login")
  postLogin(req: Request, res: Response): void {
    req.session = { isLoggedIn: true };

    res.redirect("/");
  }
}

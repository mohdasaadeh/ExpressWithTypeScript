import "reflect-metadata";

import { HttpMethod, MetadataKeys } from "./";
import { AppRouter } from "../AppRouter";

const router = AppRouter.checkRouter();

export function controller(rootPath: string) {
  return (target: Function) => {
    for (let key in target.prototype) {
      const httpMethod: HttpMethod = Reflect.getMetadata(
        MetadataKeys.HTTPMETHOD,
        target.prototype,
        key
      );
      const path = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];

      router[httpMethod](
        `${rootPath}${path}`,
        ...middlewares,
        target.prototype[key]
      );
    }
  };
}

export default router;

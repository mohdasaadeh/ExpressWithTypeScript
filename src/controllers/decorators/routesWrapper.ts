import { RequestHandler } from "express";
import "reflect-metadata";

import { MetadataKeys } from ".";

interface RequestPropertyDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routesWrapper(httpMethod: string) {
  return (path: string) => {
    return (target: any, key: string, desc: RequestPropertyDescriptor) => {
      Reflect.defineMetadata(MetadataKeys.HTTPMETHOD, httpMethod, target, key);
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
    };
  };
}

export const get = routesWrapper("get");
export const post = routesWrapper("post");

import * as fs from "fs";
import config from "../config";

export function accessLogger(log: string) {
  if (!fs.existsSync(config.__logdir)) {
    fs.mkdirSync(config.__logdir);
  }

  fs.appendFile(config.__logdir + "access.log", log, (err) => {
    if (err) {
      throw err;
    }
  });
}

export function errorLogger(log: string) {
  if (!fs.existsSync(config.__logdir)) {
    fs.mkdirSync(config.__logdir);
  }

  fs.appendFile(config.__logdir + "error.log", log, (err) => {
    if (err) {
      throw err;
    }
  });
}

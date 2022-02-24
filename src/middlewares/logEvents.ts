import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import fsPromises from "fs/promises";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

const logEvents = async (message: string, logName: string) => {
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm");
  const reportText = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      reportText
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = async (req: Request, res: Response, next: NextFunction) => {
  const requestIncome = `${req.method}\t${req.headers.origin}\t${req.url}`;
  logEvents(requestIncome, "reportLogs.txt");
  console.log(requestIncome);
  next();
};

export { logEvents, logger };

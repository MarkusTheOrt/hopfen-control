import fs from "fs";
import path from "path";
import DateUtil from "./DateUtil.js";

const logsPath = path.join(process.cwd(), "./Logs");

class Logger {
  /**
   * @type {fs.WriteStream}
   */
  #writeStream?: fs.WriteStream = undefined;
  #date = new Date();
  constructor() {
    if (fs.existsSync(logsPath) === false) {
      fs.mkdirSync(logsPath);
    }
    this.#writeStream = fs.createWriteStream(
      logsPath + "/" + DateUtil.ISODateString(this.#date) + ".log",
      { flags: "a" },
    );
  }

  /**
   * Logs a message to the console and logfile
   * @param {String} message Message to log
   * @param {String} level The Loglevel (INFO, WARN, ERROR, FATAL)
   * @returns
   */
  private log_internal = async (message: String, level: String) => {
    // Create new logfile for new Day
    if (this.#date.getUTCDate() !== new Date().getUTCDate()) {
      this.#date = new Date();
      this.#writeStream = fs.createWriteStream(
        logsPath + "/" + DateUtil.ISODateString(this.#date) + ".log",
      );
    }

    if (this.#writeStream?.writable === undefined) {
      await this.isLogWritable();
    }

    const messageToLog = `[${DateUtil.ISOTimeString()}] ${level}: ${message}`;

    console.log(messageToLog);

    return new Promise<void>((resolve, reject) => {
      this.#writeStream?.write(messageToLog + "\n", () => {
        resolve();
      });
    });
  };

  /**
   * Await until the WriteStream has opened.
   */
  private isLogWritable = async () => {
    return new Promise<void>((resolve, reject) => {
      this.#writeStream?.on("open", () => {
        resolve();
      });
    });
  };

  /**
   * Logs a Info to the log.
   * @param {String} message
   */
  Log = (message: String) => {
    return this.log_internal(message, " INFO");
  };

  /**
   * Logs a Warning to the log.
   * @param {String} message
   */
  Warn = (message: String) => {
    return this.log_internal(message, " WARN");
  };

  /**
   * Logs an Error to the log.
   * @param {String} message
   */
  Error = (message: String) => {
    return this.log_internal(message, "ERROR");
  };

  /**
   * Logs a Stacktrace to the log.
   * @param {Error} stackTrace
   */
  Stack = (stackTrace: Error) => {
    return this.log_internal(stackTrace.stack ?? "null", "FATAL");
  };
}

export default new Logger();

require("module-alias/register");
import Logger from "@utils/Logger";
import Motor from "@routes/Motor";
import LED from "@routes/Led";
import Express from "express";
import rpio from "rpio";

const server = Express();

server.use(Motor);
server.use(LED);

(async () => {
  rpio.mode(8, rpio.OUTPUT);

  server.listen(3000, () => {
    Logger.Log("Server listening on Port 3000");
  });
})().catch((e) => {
  Logger.Stack(e);
});

require("module-alias/register");
import Logger from "@utils/Logger";
import Motor from "@routes/Motor";
import LED from "@routes/Led";
import Express from "express";
import rpio from "rpio";

const server = Express();
const motorPins: number[] = [8, 10];
rpio.init();
rpio.mode(motorPins[0], rpio.OUTPUT);
rpio.mode(motorPins[1], rpio.OUTPUT);
server.use(Motor);
server.use(LED);

(async () => {
  server.listen(3000, () => {
    Logger.Log("Server listening on Port 3000");
  });
})().catch((e) => {
  Logger.Stack(e);
});

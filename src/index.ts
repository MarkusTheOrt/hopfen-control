require("module-alias/register");
import Logger from "@utils/Logger";
import Motor from "@routes/Motor";
import LED from "@routes/Led";
import Express from "express";
import rpio from "@utils/Rpio";
import AppStorage from "@utils/AppStorage";

const server = Express();
const motorPins: number[] = [8, 10];
const buttonPin = 11;

rpio.mode(motorPins[0], rpio.OUTPUT);
rpio.mode(motorPins[1], rpio.OUTPUT);
rpio.open(buttonPin, rpio.INPUT, rpio.PULL_UP);
server.use(Motor);
server.use(LED);

(async () => {
  rpio.write(motorPins[0], rpio.HIGH);
  rpio.write(motorPins[1], rpio.HIGH);
  AppStorage.motor = true;
  server.listen(3000, () => {
    Logger.Log("Server listening on Port 3000");
  });

  while (true) {
    const val = rpio.read(buttonPin);
    if (val) {
      console.log(1);
      rpio.write(motorPins[0], rpio.LOW);
      rpio.write(motorPins[1], rpio.LOW);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
})().catch((e) => {
  Logger.Stack(e);
});

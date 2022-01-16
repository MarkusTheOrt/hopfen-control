require("module-alias/register");
import Logger from "@utils/Logger";
import Motor from "@routes/Motor";
import Express from "express";
import rpio from "@utils/Rpio";
import Config from "@utils/Config";
import AppStorage from "@utils/AppStorage";

const server = Express();
const motorPins = Config.motorPins;
const buttonPin = Config.buttonPin;
const ledPin = Config.ledPin;

// Setup GPIO Pins.
rpio.mode(motorPins[0], rpio.OUTPUT);
rpio.mode(motorPins[1], rpio.OUTPUT);
rpio.mode(ledPin, rpio.OUTPUT);
rpio.open(buttonPin, rpio.INPUT, rpio.PULL_UP);

// Add Routes to express.
server.use(Motor);

(async () => {
  // Default motor to off.
  rpio.write(motorPins[0], rpio.HIGH);
  rpio.write(motorPins[1], rpio.HIGH);
  rpio.write(ledPin, rpio.HIGH);
  AppStorage.motor = true;
  AppStorage.led = true;
  // Express listens on 3000.
  server.listen(Config.port, () => {
    Logger.Log(`Server listening on Port ${Config.port}`);
  });

  while (true) {
    // Get current pressed value from button.
    // Value will be 0 on press due to pull up resistor.
    const val = rpio.read(buttonPin);
    // If button is pressed.
    if (val == 0) {
      // Invert motor state.
      AppStorage.motor = !AppStorage.motor;
      rpio.write(motorPins[0], AppStorage.motor ? rpio.HIGH : rpio.LOW);
      rpio.write(motorPins[1], AppStorage.motor ? rpio.HIGH : rpio.LOW);
      rpio.write(ledPin, AppStorage.motor ? rpio.HIGH : rpio.LOW);
      // Process button at a maxrate of 500msec.
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    // Polling rate of 50msec.
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
})().catch((e) => {
  // In case of an error we log it.
  // Program will restart automatically due to pm2.
  Logger.Stack(e);
});

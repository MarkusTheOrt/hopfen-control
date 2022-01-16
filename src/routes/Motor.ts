import { Router } from "express";
import Config from "@utils/Config";
import AppStorage from "../utilities/AppStorage";
import rpio from "@utils/Rpio";

const Motor = Router();
const motorPins = Config.motorPins;

// this will be accessible on http://hostname.local:port/motor/toggle
Motor.post("/motor/toggle", (req, res) => {
  AppStorage.motor = !AppStorage.motor;
  AppStorage.led = !AppStorage.led;
  rpio.write(motorPins[0], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(motorPins[1], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(Config.ledPin, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: !AppStorage.motor });
});

Motor.post("/motor/off", (req, res) => {
  AppStorage.motor = true;
  AppStorage.led = true;
  rpio.write(motorPins[0], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(motorPins[1], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(Config.ledPin, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: !AppStorage.motor });
});

Motor.post("/motor/on", (req, res) => {
  AppStorage.motor = false;
  AppStorage.led = false;
  rpio.write(motorPins[0], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(motorPins[1], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(Config.ledPin, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: !AppStorage.motor });
});

Motor.get("/motor/", (req, res) => {
  res.json({ led: !AppStorage.led, motor: !AppStorage.motor });
});

Motor.post("/motor/turn/:state", (req, res) => {
  if (req.params.state === "true") {
    AppStorage.motor = false;
    AppStorage.led = false;
  } else {
    AppStorage.motor = true;
    AppStorage.led = true;
  }
  rpio.write(motorPins[0], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(motorPins[1], AppStorage.motor ? rpio.HIGH : rpio.LOW);
  rpio.write(Config.ledPin, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: !AppStorage.motor });
});

export default Motor;

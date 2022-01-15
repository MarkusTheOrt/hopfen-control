import { Router } from "express";
import AppStorage from "../utilities/AppStorage";
import rpio from "rpio";

const LED = Router();

LED.post("/led/toggle", (req, res) => {
  AppStorage.led != AppStorage.led;
  rpio.write(8, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.led });
});

LED.post("/led/off", (req, res) => {
  AppStorage.led = false;
  rpio.write(8, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.led });
});

LED.post("/led/on", (req, res) => {
  AppStorage.led = true;
  rpio.write(8, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.led });
});

LED.get("/led/", (req, res) => {
  res.json({ led: AppStorage.led, motor: AppStorage.led });
});

LED.post("/led/turn/:state", (req, res) => {
  if (req.params.state === "true") {
    AppStorage.led = true;
  } else {
    AppStorage.led = false;
  }
  rpio.write(8, AppStorage.led ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.led });
});

export default LED;

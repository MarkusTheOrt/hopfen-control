import { Router } from "express";
import AppStorage from "../utilities/AppStorage";
import rpio from "@utils/Rpio";

const Motor = Router();

Motor.post("/motor/toggle", (req, res) => {
  AppStorage.motor != AppStorage.motor;
  rpio.write(8, AppStorage.motor ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.motor });
});

Motor.post("/motor/off", (req, res) => {
  AppStorage.motor = false;
  rpio.write(8, AppStorage.motor ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.motor });
});

Motor.post("/motor/on", (req, res) => {
  AppStorage.motor = true;
  rpio.write(8, AppStorage.motor ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.motor });
});

Motor.get("/motor/", (req, res) => {
  res.json({ led: AppStorage.led, motor: AppStorage.motor });
});

Motor.post("/motor/turn/:state", (req, res) => {
  if (req.params.state === "true") {
    AppStorage.motor = true;
  } else {
    AppStorage.motor = false;
  }
  rpio.write(8, AppStorage.motor ? rpio.HIGH : rpio.LOW);
  res.json({ success: true, newState: AppStorage.motor });
});

export default Motor;
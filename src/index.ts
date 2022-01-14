import Logger from "./utilities/Logger";

(async () => {
    Logger.Log("Starting Up Hopfen-Control.");
})().catch(e => {Logger.Stack(e)});

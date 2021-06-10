import { naticoMessage } from "../../../deps.ts";
import Listener from "../../../lib/listeners/Listener.ts";
export default class commandStarted extends Listener {
  constructor() {
    super("commandStarted", {
      emitter: "commandHandler",
      event: "commandStarted",
    });
  }

  exec(message: naticoMessage, command, args) {
    console.log("command ran", command.id);
  }
}

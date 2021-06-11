import { NaticoClient } from "./client.ts";
import { token } from "../deps.ts";
const client = new NaticoClient({ intents: ["Guilds", "GuildMessages", "GuildVoiceStates"], token });
client.start();

import { cache } from "../../deps.ts";
import { NaticoMessage } from "../../lib/NaticoMessage.ts";
import Command from "../../lib/commands/Command.ts";
export default class stats extends Command {
  constructor() {
    super("stats", {
      name: "stats",
      aliases: ["stats"],
      examples: ["stats"],
      description: "Sends some general stats of the bot",
      enabled: true,
      slash: true,
      category: "general",
    });
  }
  exec(message: NaticoMessage) {
    let totalMemberCount = 0;
    let cachedMemberCount = 0;

    for (const guild of cache.guilds.values()) {
      totalMemberCount += guild.memberCount;
      cachedMemberCount += guild.members.size;
    }

    const embed = this.client.util
      .embed()
      .setColor("random")
      .addField("Guilds:", cache.guilds.size.toLocaleString(), true)
      .addField("Total Members:", totalMemberCount.toLocaleString(), true)
      .addField("Cached Members:", cachedMemberCount.toLocaleString(), true)
      .addField("Channels:", cache.channels.size.toLocaleString(), true)
      .addField("Messages:", cache.messages.size.toLocaleString(), true)
      .addField("Deno Version:", `v${Deno.version.deno}`, true);

    return message.reply({ embed });
  }
}

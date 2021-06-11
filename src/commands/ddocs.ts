import { NaticoMessage } from "../../lib/NaticoMessage.ts";
import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.min.js";
import axiod from "https://deno.land/x/axiod/mod.ts";
import Command from "../../lib/commands/Command.ts";
export default class ddoc extends Command {
  constructor() {
    super("ddoc", {
      name: "ddoc",
      aliases: ["ddoc", "discorddeno", "discordeno", "ddocs"],
      examples: ["ddoc message"],
      description: "Searches the discord deno docs", //docs were obtained via https://doc.deno.land/api/docs?entrypoint=https://deno.land/x/discordeno/mod.ts
      enabled: true,
      slash: true,
      required: true,
      category: "general",
      options: [
        {
          type: 3,
          name: "query",
          description: "query",
          required: true,
        },
      ],
    });
  }
  async fetch(q: string) {
    const denodoc = await axiod(
      "https://gist.githubusercontent.com/SkyBlockDev/aa24237591b296c528a322d4a352199f/raw/5d365841be7611f046315653bd5555eabade6d65/denodocs.json",
      { method: "get" }
    );
    const fuse = new Fuse(denodoc.data, { keys: ["name"] });

    return await fuse.search(q);
  }
  makeEmbed(result: any) {
    const baseUrl = "https/deno.land/x/discordeno@11.0.0-rc.5/mod.ts";
    const srcUrl = `${result.location.filename}#L${result.location.line}`;
    return this.client.util
      .embed()
      .setColor("#FF0000")
      .setDescription(result.jsDoc || `No jsdoc`)
      .addField("❯ src", `[${result.location.filename.replace("https://", "")}](${srcUrl})`)
      .addField(
        "❯ doc link",
        `[doc.deno.land/${baseUrl}#${result.name}](https://doc.deno.land/${baseUrl}#${result.name})`
      )
      .setTitle(`<:dd:847527964208005160>  ${result.name}`, `https://doc.deno.land/https${baseUrl}#${result.name}`)
      .setColor("#1F85DE");
  }
  pages(results) {
    results = results.slice(0, 20);
    const pages = [];
    let i = 1;
    for (const result of results) {
      pages.push(this.makeEmbed(result.item).setFooter(`${i}/${results.length}`));
      i++;
    }
    return pages;
  }
  async exec(message: NaticoMessage, { query }: { query: string }) {
    const result = await this.fetch(query);

    if (!result) return await message.reply("Docs not found");

    const pages = this.pages(result);
    if (message.isSlash) return message.reply(pages[0]);
    return message.CreateEmbedsButtonsPagination(pages);
  }
}

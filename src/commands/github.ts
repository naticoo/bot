import { NaticoMessage } from '../../lib/NaticoMessage.ts';
import Command from '../../lib/commands/Command.ts';
import axiod from 'https://deno.land/x/axiod/mod.ts';
export default class github extends Command {
	constructor() {
		super('github', {
			name: 'github',
			aliases: ['github', 'githubuser'],
			examples: ['github skyblockdev'],
			description: 'Sends some stats about a user github profile',
			enabled: true,
			slash: true,
			required: true,
			category: 'general',
			options: [
				{
					type: 3,
					name: 'user',
					description: 'github user you want to see the stats of',
					required: true,
				},
			],
		});
	}
	async fetch(q: string) {
		const user = await axiod(`https://api.github.com/users/${q}`);
		return user.data;
	}
	makeEmbed(user: any) {
		let info = '';
		if (user.email) info += `**email:** ${user.email}\n`;
		info += `**hireable:** ${user.hireable ? 'Yes' : 'No'}\n`;
		if (user.blog) info += `**blog:** ${user.blog}\n`;
		if (user.location) info += `**location:** ${user.location}\n`;
		if (user.name) info += `**NickName:** ${user.name}\n`;
		if (user.bio) info += `**bio:** ${user.bio}\n`;
		let stats = '';
		stats += `**Joined at** ${user.created_at}\n`; //need help trying to format this
		stats += `**Public repos** ${user.public_repos || 'none'}\n`;
		stats += `**Public gists** ${user.public_gists || 'none'}\n`;
		stats += `**Followers** ${user.followers}\n`;
		stats += `**Following** ${user.following}`;
		return this.client.util
			.embed()
			.setTitle(user.login, user.html_url)
			.addField('➥ Info', info)
			.addField('➥ Stats', stats)
			.setThumbnail(
				user.avatar_url ||
					'https://cdn.discordapp.com/avatars/838065056096059463/e404cfbe142fc10026e0914530532e55.webp?size=4096'
			);
	}
	async exec(message: NaticoMessage, { user }: { user: string }) {
		const us = await this.fetch(user);
		console.log(us);
		if (us?.message) return message.reply('User not found');
		const embed = this.makeEmbed(us);
		message.reply({ embed: embed });
	}
}

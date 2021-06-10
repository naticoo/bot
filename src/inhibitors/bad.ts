import {
	NaticoInhibitor,
	DiscordenoMessage,
	NaticoCommand,
} from '../../deps.ts';
export default class bad extends NaticoInhibitor {
	constructor() {
		super('bad', {
			priority: 1,
		});
	}

	exec(_message: DiscordenoMessage, _command: NaticoCommand): Promise<boolean> {
		// console.log(command.id);
		// await message.reply('Hello world!');
		// return true;
		//this.client.commandHandler.handleCommand(message);
		return galse;
	}
}

import {
	join,
	settings,
	startBot,
	token,
	Collection,
	NaticoClient as nClient,
	cache,
	botId,
	NaticoCommandHandler,
	NaticoTaskHandler,
	NaticoListenerHandler,
} from '../deps.ts';
import { ClientUtil } from '../lib/ClientUtil.ts';
export class NaticoClient extends nClient {
	public cache: typeof cache;
	public id: bigint;
	public librariesio: string;
	public buttonCollectors: Collection<bigint, ButtonCollector>;
	public messageCollectors: Collection<bigint, MessageCollector>;
	constructor() {
		super({});
		this.librariesio = settings.librariesio;
		this.cache = cache;
		this.id = botId;
		this.buttonCollectors = new Collection<bigint, ButtonCollector>();
		this.messageCollectors = new Collection<bigint, MessageCollector>();
		this.util = new ClientUtil(this);
	}
	taskHandler: NaticoTaskHandler = new NaticoTaskHandler(this, {
		directory: join(Deno.cwd(), 'src', 'tasks'),
	});
	listenerHandler: NaticoListenerHandler = new NaticoListenerHandler(this, {
		directory: join(Deno.cwd(), 'src', 'listeners'),
	});
	commandHandler: NaticoCommandHandler = new NaticoCommandHandler(this, {
		directory: join(Deno.cwd(), 'src', 'commands'),
		cooldown: 5000, // 5 seconds
		guildonly: true,
		prefix: () => {
			return settings.prefix;
		},
		owners: settings.ids.owner,
	});
	async start() {
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
		});
		//-----------------------
		//------Loaders----------
		//-----------------------
		await this.commandHandler.loadALL();
		await this.taskHandler.loadALL();
		await this.listenerHandler.loadALL();
		//-----------------------
		//------Starters---------
		//-----------------------
		return this.login();
	}
	login() {
		return startBot({
			token,
			intents: ['Guilds', 'GuildMessages', 'GuildVoiceStates'],
			eventHandlers: this.events,
		});
	}
}

export * from 'https://deno.land/x/discordeno@11.0.0-rc.4/mod.ts';
export { join } from 'https://deno.land/std@0.95.0/path/mod.ts';
export * from 'https://deno.land/std@0.95.0/fmt/colors.ts';
export * from 'https://deno.land/std@0.97.0/fs/mod.ts';
export * from './lib/interfaces.ts';
export * from './settings.ts';
export * from 'https://denopkg.com/naticoo/framework@master/mod.ts';
import config from './settings.ts';

export const { token, settings, credentials } = config;

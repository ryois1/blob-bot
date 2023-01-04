const permissions = {
	CREATE_INSTANT_INVITE: 'Create instant invite',
	KICK_MEMBERS: 'Kick members',
	BAN_MEMBERS: 'Ban members',
	ADMINISTRATOR: 'Administrator',
	MANAGE_CHANNELS: 'Manage channels',
	MANAGE_GUILD: 'Manage server',
	ADD_REACTIONS: 'Add Reactions',
	VIEW_AUDIT_LOG: 'View audit log',
	PRIORITY_SPEAKER: 'Priority speaker',
	STREAM: 'Video',
	VIEW_CHANNEL: 'View channel',
	SEND_MESSAGES: 'Send messages',
	SEND_TTS_MESSAGES: 'Send TTS messages',
	MANAGE_MESSAGES: 'Manage messages',
	EMBED_LINKS: 'Embed links',
	ATTACH_FILES: 'Attach files',
	READ_MESSAGE_HISTORY: 'Read message history',
	MENTION_EVERYONE: 'Mention everyone',
	USE_EXTERNAL_EMOJIS: 'Use external emojis',
	VIEW_GUILD_INSIGHTS: 'View server insights',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	MUTE_MEMBERS: 'Mute members',
	DEAFEN_MEMBERS: 'Deafen members',
	MOVE_MEMBERS: 'Move members',
	USE_VAD: 'Use voice activity',
	CHANGE_NICKNAME: 'Change nickname',
	MANAGE_NICKNAMES: 'Manage nicknames',
	MANAGE_ROLES: 'Manage roles',
	MANAGE_WEBHOOKS: 'Manage webhooks',
	MANAGE_EMOJIS_AND_STICKERS: 'Manage emojis and stickers',
	USE_APPLICATION_COMMANDS: 'Use Application Commands',
	REQUEST_TO_SPEAK: 'Request to Speak',
	MANAGE_THREADS: 'Manage Threads',
	USE_PUBLIC_THREADS: 'Use Public Threads',
	USE_PRIVATE_THREADS: 'Use Private Threads',
	USE_EXTERNAL_STICKERS: 'Use External Stickers',
	SEND_MESSAGES_IN_THREADS: 'Send Messages In Threads',
	START_EMBEDDED_ACTIVITIES: 'Start Embedded Activities',
	MODERATE_MEMBERS: 'Moderate Members',
};

/**
   * @param {import("discord.js").PermissionResolvable[]} perms
   */
const parsePermissions = (perms) => {
	const permissionWord = `permission${perms.length > 1 ? 's' : ''}`;
	return perms.map((perm) => `\`${permissions[perm]}\``).join(', ') + permissionWord;
};
module.exports = {
	permissions,
	parsePermissions,
};
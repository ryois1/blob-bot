const { EmbedBuilder } = require('discord.js');
const config = require('@root/config');

class EmbedResponse {
	constructor(data, client) {
		this._color = data.color;
		this._title = data.title;
		this._url = data.url;
		// Author { name: 'Author Name', iconURL: 'URL for icon', url: 'URL to click' }
		this._author = data.author;
		this._description = data.description;
		this._thumbnail = data.thumnail;
		// Field { name: 'Inline field title', value: 'Some value here', inline: true }
		this._fields = data.fields;
		this._image = data.image;
		this._timestamp = data.timestamp || Date.now();
		// Footer { text: 'Footer Text', iconURL: 'URL for icon' }
		this._footer = data.footer || { text: 'Blob Bot', iconURL: client.user.avatarURL() };
	}

	/**
   * Returns a Discord.js Embed element.
   *
   * @returns EmbedResponse
   *
   */
	build() {
		const response = new EmbedBuilder();
		const color = getColor(this._color);
		if (color) response.setColor(color);
		if (this._title) response.setTitle(this._title);
		if (this._url) response.setURL(this._url);
		if (this._author) response.setAuthor(this._author);
		if (this._description) response.setDescription(this._description);
		if (this._thumbnail) response.setThumbnail(this._thumbnail);
		if (this._fields) response.addFields(this._fields);
		if (this._image) response.setImage(this._image);
		if (this._timestamp) response.setTimestamp(this._timestamp);
		return response;
	}
}

function generateRandomHexColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function getColor(color) {
	const regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
	if (!regex.test(color)) {
		if (color == 'RANDOM') {
			return generateRandomHexColor();
		}
		const configColor = config.EMBED_COLORS[color];
		if (!configColor) {
			return config.EMBED_COLORS.BOT_EMBED;
		}
		else {
			return configColor;
		}
	}
	return color;
}
module.exports = EmbedResponse;
# Blob Bot
Blob bot is a custom NodeJS and Discord.js based Discord Bot.
# Running Blob Bot
```bash
sudo docker run -d -t -i -e TOKEN='your discord token' \
-e PREFIX='!' \
--restart unless-stopped \
--name blob-bot ryois/blob-bot
```
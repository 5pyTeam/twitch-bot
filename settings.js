const fs = require("fs");
const settingsSchema =
  '{token: "Your token here",globalStreamMessage:""streamers{"streamerName"}}';
if (!fs.existsSync("settings.json")) {
  fs.writeFileSync();
}

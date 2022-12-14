import * as alt from 'alt';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
let TopListUpdate;
const neededValues = [
    'minage',
    'whitelist',
    'language',
    'framework',
    'voice',
    'chat',
    'secretPID'
];
neededValues.forEach((value) => {
    if (!(value in process.env)) {
        alt.log(`the needed key '${value}' is missing in .env file`);
        process.exit(0);
    }
});
async function doPostRequest() {
    var postdata = {
        minage: process.env.minage,
        whitelist: process.env.whitelist,
        language: process.env.language,
        framework: process.env.framework,
        voice: process.env.voice,
        chat: process.env.chat,
        servername: alt.getServerConfig().name,
        serverip: alt.getServerConfig().host,
        serverport: alt.getServerConfig().port,
        gamemode: alt.getServerConfig().gamemode,
        platform: 'altv',
        onlineplayers: alt.Player.all.length,
        maxplayers: alt.getServerConfig().players,
        secretToken: alt.getServerConfig().secretSID,
        secretToken2: process.env.secretPID
    };
    var headers = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    await axios.post('https://gta-spot.com/announce.php', postdata, headers)
    .then(response => {
        if (response.data == "ok")
            alt.log("data transfer success");
        else
            alt.log(response.data);
    })
      .catch(error => {
        if (error.response)
            alt.log(error.response.status);
        else if (error.request)
            alt.log(error.request);
        else
            alt.log(error.message);
    });
}
TopListUpdate = alt.setInterval(doPostRequest, 540000);
doPostRequest();

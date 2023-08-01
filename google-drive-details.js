const Express = require(`express`);
const BodyParser = require(`body-parser`);
const cors = require(`cors`);

// Init App
const App = Express();

// Cross origin
App.use(cors());

// BodyParser middleware
// Create application/json parser
App.use(BodyParser.json({ limit: `50mb` })); // Set request size

App.use(BodyParser.urlencoded({ limit: `50mb`, extended: true }));
// Passport init

// Middleware
App.use((req, res, next) => {
    next();
});

// Set port
App.set(`port`, (3000));
App.set(`host`, ('https://localhost'));


var getGoogleDriveContent = () => {
    const { google } = require('googleapis');
    const fs = require('fs');
    const readline = require('readline');

    // Set up Google Drive API credentials
    const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
    const TOKEN_PATH = 'token.json';

    // Helper function to get the access token
    function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return callback(err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback();
        });
    });
    }

    // Main function to interact with Google Drive
    async function main() {
    const credentials = require('./credentials.json');
    const oAuth2Client = new google.auth.OAuth2(
        credentials.installed.client_id,
        credentials.installed.client_secret,
        credentials.installed.redirect_uris[0]
    );

    try {
        // Check if we have a previously stored token
        const token = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
    } catch (err) {
        // If not, get a new token
        getAccessToken(oAuth2Client, main);
        return;
    }

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    const res = await drive.files.list(
        {
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        });
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.forEach((file) => {
                fileId = file.id;
                drive.permissions.list(
                    {
                      fileId,
                      fields: 'permissions(id, type, emailAddress)',
                    },
                    (err, res) => {
                      if (err) return console.log('The API returned an error: ' + err);
                      const permissions = res.data.permissions;
                      console.log(`${file.name} (${file.id})`);
                      if (permissions.length) {
                        permissions.forEach((permission) => {
                            console.log(`${permission.type}: ${permission.emailAddress} (${permission.id})`);
                        });
                        console.log(`-------------------------------------------------------------------------`);
                      } else {
                        console.log('No users found with access.');
                      }
                    }
                  );
            });
        } 
        else 
        {
            console.log('No files found.');
        }

    }

    main();

}

App.listen(App.get(`port`), () => {
    // console.log(`Server started at ${App.get(`host`)}:${App.get(`port`)}`);
    getGoogleDriveContent()
});
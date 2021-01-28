'use strict';

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first time.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';
let _fileToUpload = undefined

class Gdrive {
    constructor() {
      this.fileToUpload = undefined;
    } 

    upload(res, fileToUpload) {
      this.fileToUpload = fileToUpload;
      _fileToUpload = fileToUpload
      
      fs.readFile(CREDENTIALS_PATH, (err, content) => {
        if (err) {
          res.status(400).json({"error": 'Error loading client secret file (credentials.json):' + err})
        }
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(res, JSON.parse(content), uploadFile);
      });
    }
}
module.exports = Gdrive;  

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(res, credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(res, oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    return callback(res, oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(res, oAuth2Client, callback) {
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
      if (err) {
        res.status(400).json({"error": 'Error retrieving access token' + err})
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          res.status(400).json({"error": 'Error storing access token' + err})
        }
        console.log('Token stored to', TOKEN_PATH);
      });
      return callback(res, oAuth2Client);
    });
  });
}

/**
* Describe with given media and metaData and upload it using google.drive.create method()
*/
function uploadFile(res, auth) {
    const drive = google.drive({version: 'v3', auth});
    const fileMetadata = {
        'name': _fileToUpload
    };
    const media = {
        mimeType: 'application/x-sqlite3',
        body: fs.createReadStream(_fileToUpload)
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, (err, file) => {
        if (err) {
            res.status(400).json({"error": 'Upload fehlgeschlagen: ' + err})
        } else {
            res.json({
              "message": 'Upload erfolgreich. File Id: ' + file.data.id,
            })
        }
    });
}

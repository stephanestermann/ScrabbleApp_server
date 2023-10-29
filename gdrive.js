'use strict';

const fs = require('fs');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

let _fileToUpload = undefined
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const CREDENTIALS_JSON = 'credentials.json';
// This Folder need's permissions in GDrive for the Service-Account-User
const FOLDER_ID = '1qErj7oxU5hFefMs8nPmsUqbEYBLkYepa'

class Gdrive {
    constructor() {
      this.fileToUpload = undefined;
    } 

    async upload(res, fileToUpload) {
      this.fileToUpload = fileToUpload;
      _fileToUpload = fileToUpload

      try {
        const auth = await authorize()
        await uploadFile(auth, res)
      } catch (err) {
        res.status(400).json({"error": 'Authorization bei GDrive fehlgeschlagen: ' + err})
      }
    }
}
module.exports = Gdrive;  

async function authorize() {
  return new GoogleAuth({
    keyFile: CREDENTIALS_JSON,
    scopes: SCOPES,
  });
}

async function uploadFile(auth, response) {
  const service = google.drive({version: 'v3', auth});

  const fileMetadata = {
    name: _fileToUpload,
    parents: [FOLDER_ID],
  };
  const media = {
    mimeType: 'application/x-sqlite3',
    body: fs.createReadStream(_fileToUpload)
  };

  try {
    const file = await service.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    response.json({
      "message": 'Upload erfolgreich. File Id: ' + file.data.id,
    })
  } catch (err) {
    response.status(400).json({"error": 'Upload fehlgeschlagen: ' + err})
  }
}

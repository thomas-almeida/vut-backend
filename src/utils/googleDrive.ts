import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Configurar a autenticação
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'credentials.json'), // JSON de credenciais
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

// Upload para o Google Drive
export async function uploadToDrive(filePath: string, folderId: string) {
  const fileName = path.basename(filePath);

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, webViewLink, webContentLink',
  });

  // Remover o arquivo local após upload
  fs.unlinkSync(filePath);

  return response.data;
}

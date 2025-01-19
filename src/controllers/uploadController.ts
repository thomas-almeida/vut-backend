import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploadToDrive } from '../utils/googleDrive';

const prisma = new PrismaClient();

// ID da pasta no Google Drive
const GOOGLE_DRIVE_FOLDER_ID = 'SEU_FOLDER_ID_AQUI';

export async function uploadProfilePicture(req: Request, res: Response) {
  const userId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo não enviado!' });
  }

  try {
    // Upload da imagem para o Google Drive
    const uploadedFile = await uploadToDrive(req.file.path, GOOGLE_DRIVE_FOLDER_ID);

    if (!uploadedFile.id || !uploadedFile.webViewLink) {
      return res.status(500).json({ error: 'Erro ao salvar no Google Drive.' });
    }

    // Atualizar link no banco de dados
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: { profilePicture: uploadedFile.webViewLink },
    });

    res.status(200).json({ message: 'Upload concluído!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer upload.' });
  }
}

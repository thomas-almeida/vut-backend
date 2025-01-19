import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { hashPassword, comparePassword, generateToken } from "../utils/auth"
import { uploadToDrive } from "../utils/googleDrive"

const prisma = new PrismaClient()
const GOOGLE_DRIVE_FOLDER_ID = '1_6vFiy6GobWX-RUp22yvsy1_jIIw1fts'

export async function SignUp(req: Request, res: Response): Promise<void> {
  const { email, password, username } = req.body;

  if (!req.file) {
    res.status(400).json({ error: 'Imagem não fornecida' });
    return;
  }

  try {
    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email já cadastrado' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const uploadedFile = await uploadToDrive(req.file?.path as string, GOOGLE_DRIVE_FOLDER_ID);

    // Criar o usuário com o time e packs
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        profilePicture: uploadedFile.webViewLink,
        level: 1,
        vutCoins: 0,
        vutDollars: 0,
        team: {
          create: {
            ownerId: undefined, // Vai ser preenchido no próximo passo
            name: '',
            pictureUrl: '',
          },
        },
        packs: {
          create: [],
        },
      },
      include: {
        team: true, // Incluindo o time na resposta
      },
    });

    // Atualizar o ownerId no time após a criação do usuário
    await prisma.userTeam.update({
      where: { id: user.team.id },
      data: {
        ownerId: user.id,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
}

async function SignIn(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: 'usuário nao encontrado' })
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ error: 'senha invalida' })
    }

    const token = generateToken(user.id)
    res.status(200).json({
      token, userId: user.id
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Erro ao fazer login'
    })
  }
}

export default {
  SignUp,
  SignIn
}
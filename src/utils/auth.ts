import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Chave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Gerar Token JWT
export function generateToken(userId: number): string {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

// Verificar Token JWT
export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

// Hash da senha
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Comparar senha com hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

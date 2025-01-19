import multer from 'multer';
import path from 'path';

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // O diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  },
});

const upload = multer({ storage });

export default upload;

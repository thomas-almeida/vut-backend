declare namespace Express {
  export interface Request {
    file?: Express.Multer.File; // A propriedade file estará disponível no tipo Request
  }
}

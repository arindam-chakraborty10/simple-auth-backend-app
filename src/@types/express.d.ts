declare namespace Express {
  interface Request {
    token: string | null;
    userDetails: any | null;
  }
}

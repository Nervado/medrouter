export class JwtConfig {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}

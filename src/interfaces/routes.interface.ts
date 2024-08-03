export interface IRoutes {
  id: string;
  upstream: string[];
  rewritePrefix: string;
  prefix: string;
  isAuth: boolean;
  jwtSecrets: string;
}

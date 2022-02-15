export interface IApp {
  name: string;
  port: string;
  host: string;
  environment: string;
}

export interface IMongo {
  host: string;
  port: string;
  dbName: string;
  password?: string;
}

export interface IJwt {
  secret: string;
  expiryTime: string;
}

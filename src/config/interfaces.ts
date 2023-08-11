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
  password: string;
  username: string;
}

export interface IJwt {
  secret: string;
  expiryTime: string;
}

export interface IRedis {
  url: string;
  port: string;
}

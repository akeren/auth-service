# Authentication with Blog service

An authentication built using **node.js+typescript+mongoDB+jest**. I created this piece of work to gain an in depth knowledge around working with typescript and writing elegant test cases.

## API Endpoints

| Methods | Endpoints                                         | Access  |
| ------- | -----------------------------------------------   | ------- |
| POST    | /api/v1/auth/register                             | Public  |
| POST    | /api/v1/auth/login                                | Public  |
| GET     | /api/v1/auth/me                                   | Private |
| POST    | /api/v1/auth/logout                               | Private |
| GET     | /api/v1/articles/me                               | Private |
| POST    | /api/v1/articles                                  | Private |
| GET     | /api/v1/articles                                  | Public  |
| GET     | /api/v1/articles/:id                              | Public  |
